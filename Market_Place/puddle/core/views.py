from django.shortcuts import render

# Create your views here.
from django.shortcuts import redirect, render
from item.models import Category, Item
from .forms import SignupForm, LoginForm


# Create your views here.
def index(request):
    items = Item.objects.filter(is_sold=False)[0:6]
    categories = Category.objects.all()
    return render(
        request,
        "core/index.html",
        {
            "categories": categories,
            "items": items,
        },
    )


def contact(request):
    return render(request, "core/contact.html")

def login(request):
  pass


def signup(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/login/")
    else:
        form = SignupForm()
    return render(request, "core/signup.html", {"form": form})
