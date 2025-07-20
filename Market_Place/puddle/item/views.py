from django.contrib.auth.decorators import login_required  # To restrict access to views for authenticated users only
from django.db.models import Q  # For advanced filtering (OR conditions)
from django.shortcuts import render, get_object_or_404, redirect  # Shortcut functions for rendering, object fetching, and redirects
from .models import Category, Item  # Importing the models used in the views
from .forms import NewItemForm, EditItemForm  # Importing the forms used for creating and editing items


# View for listing items, with optional search filtering
def items(request):
    query = request.GET.get('query', '')  # Get the search query from the URL (if any)
    category_id = request.GET.get('category', 0)
    categories = Category.objects.all()  # Fetch all categories
    items = Item.objects.filter(is_sold=False)  # Fetch all items that are not sold

    if category_id:
        items = items.filter(category_id=category_id)

    if query:
        # Filter items by name or description containing the query (case-insensitive)
        items = items.filter(Q(name__icontains=query) | Q(description__icontains=query))
        
    # Render the items list template with filtered items and categories
    return render(request, 'item/items.html', {
        'items': items,
        'query': query,
        'categories': categories,
        'category_id': int(category_id),
    })


# View for displaying details of a single item
def detail(request, pk):
    item = get_object_or_404(Item, pk=pk)  # Fetch the item by primary key or return 404
    # Fetch up to 3 related unsold items in the same category, excluding the current one
    related_items = Item.objects.filter(category=item.category, is_sold=False).exclude(pk=pk)[0:3]

    # Render the item detail page with the item and related items
    return render(
        request,
        "item/detail.html",
        {
            "item": item,
            "related_items": related_items,
        },
    )


# View for creating a new item (only for logged-in users)
@login_required
def new(request):
    if request.method == "POST":
        form = NewItemForm(request.POST, request.FILES)  # Bind form data including files

        if form.is_valid():
            item = form.save(commit=False)  # Create item instance without saving to DB
            item.created_by = request.user  # Assign the currently logged-in user as the creator
            item.save()  # Save to database
            return redirect("item:detail", pk=item.id)  # Redirect to the detail page of the new item
    else:
        form = NewItemForm  # Show empty form on GET request

    # Render the item creation form
    return render(request, "item/form.html", {"form": form, "title": "New item"})


# View for editing an existing item (only for the item's creator)
@login_required
def edit(request, pk):
    item = get_object_or_404(Item, pk=pk, created_by=request.user)  # Ensure the user owns the item

    if request.method == "POST":
        form = EditItemForm(request.POST, request.FILES, instance=item)  # Bind form to existing item

        if form.is_valid():
            form.save()  # Save updates to database
            return redirect("item:detail", pk=item.id)  # Redirect to item detail page
    else:
        form = EditItemForm(instance=item)  # Prepopulate form with existing item data

    # Render the item edit form
    return render(request, "item/form.html", {"form": form, "title": "Edit item"})


# View for deleting an item (only for the item's creator)
@login_required
def delete(request, pk):
    item = get_object_or_404(Item, pk=pk, created_by=request.user)  # Ensure the user owns the item
    item.delete()  # Delete the item from the database
    return redirect("dashboard:index")  # Redirect user to dashboard after deletion
