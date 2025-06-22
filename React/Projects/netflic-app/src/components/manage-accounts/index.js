// src/components/manage-accounts/index.js

"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context"; // Adjust path as per your actual structure
import CircleLoader from "../circle-loader"; // Adjust path as per your actual structure
import { useRouter } from "next/navigation";
import AccountForm from "../account-form"; // ASSUMING you create this component in src/components/account-form/index.js

export default function ManageAccounts() {
  // --- ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP LEVEL ---
  const {
    accounts,
    accountsLoading,
    loggedInAccount,
    setLoggedInAccount,
    session,
    showAccountForm,
    setShowAccountForm,
    currentEditAccount,
    setCurrentEditAccount,
    fetchAccounts, // Get the fetchAccounts function from context
  } = useContext(GlobalContext);

  const router = useRouter();

  // Effect to redirect to browse page if an account becomes logged in
  useEffect(() => {
    if (loggedInAccount) {
      router.push("/browser"); // Redirect to main browse page
    }
  }, [loggedInAccount, router]);

  // --- Helper Functions for Account Actions ---

  // Function to handle selecting an account (logging into a profile)
  const handleSelectAccount = async (account) => {
    // Here, you would ideally call your login-to-account API
    // For simplicity, we'll just set it directly to context and local storage
    try {
      // OPTIONAL: Call your /api/account/login-to-account if you need server-side validation
      const res = await fetch("/api/account/login-to-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: session.user.uid, // User's main ID
          name: account.name, // Profile name
          // If you require PIN for selection on this screen, you'd prompt user for it here
          // pin: "User provided PIN"
        }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message); // Show error if login API fails
        return;
      }

      setLoggedInAccount(account);
      localStorage.setItem("loggedInAccount", JSON.stringify(account)); // Persist selected account
      router.push("/browser"); // Redirect to the browse page
    } catch (error) {
      console.error("Error selecting account:", error);
      alert("Could not select account. Please try again.");
    }
  };

  // Function to handle deleting an account
  const handleDeleteAccount = async (accountId) => {
    if (!confirm("Are you sure you want to delete this profile?")) {
      return; // User cancelled
    }

    try {
      const res = await fetch("/api/account/remove-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: accountId }), // Pass the account ID
      });
      const data = await res.json();

      if (data.success) {
        alert("Profile deleted successfully!");
        fetchAccounts(); // Re-fetch accounts to update the list in context

        // If the deleted account was the currently logged-in one, clear it
        if (loggedInAccount && loggedInAccount._id === accountId) {
          setLoggedInAccount(null);
          localStorage.removeItem("loggedInAccount");
          // No need to redirect here as the main Browse page will pick up !loggedInAccount
        }
      } else {
        console.error("Failed to delete account:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Network error deleting account:", error);
      alert("Error deleting account. Please check your network.");
    }
  };

  // Function to handle editing an account (opens the form)
  const handleEditAccount = (account) => {
    setCurrentEditAccount(account); // Set the account to be edited
    setShowAccountForm(true); // Open the form
  };

  // Function to handle creating a new account (opens the form)
  const handleCreateNewAccount = () => {
    setCurrentEditAccount(null); // Ensure no account is set for editing (it's new)
    setShowAccountForm(true); // Open the form
  };

  // --- Conditional Renderings for Loading and Authentication ---

  // Show loading spinner while accounts are being fetched or session is not ready
  if (accountsLoading || !session) {
    return <CircleLoader />;
  }

  // If session is present and accounts have loaded, render the UI
  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-[54px] my-[36px]">
          Who's watching?
        </h1>
      </div>

      {accounts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {accounts.map((account) => (
            <div key={account._id} className="flex flex-col items-center group">
              {/* Account Card (clickable for selection) */}
              <div
                className="w-28 h-28 md:w-40 md:h-40 rounded-md overflow-hidden cursor-pointer
                                           relative transition-transform duration-300 transform group-hover:scale-105"
                onClick={() => handleSelectAccount(account)}
              >
                {/* Placeholder for avatar/image - replace with actual images if you have them */}
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-4xl font-bold rounded-md">
                  {account.name ? account.name[0].toUpperCase() : ""}
                </div>
              </div>
              <span className="mt-4 text-xl md:text-2xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                {account.name}
              </span>
              {/* Action Buttons (Edit/Delete) */}
              <div className="flex space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEditAccount(account)}
                  className="text-sm px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAccount(account._id)}
                  className="text-sm px-3 py-1 bg-red-700 rounded hover:bg-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Add Profile Card (if less than 4 accounts) */}
          {accounts.length < 4 && (
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={handleCreateNewAccount}
            >
              <div
                className="w-28 h-28 md:w-40 md:h-40 rounded-md overflow-hidden
                                           bg-gray-700 flex items-center justify-center text-5xl font-bold text-gray-400
                                           relative transition-transform duration-300 transform group-hover:scale-105"
              >
                +
              </div>
              <span className="mt-4 text-xl md:text-2xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                Add Profile
              </span>
            </div>
          )}
        </div>
      ) : (
        // Message and button if no accounts exist yet
        <div className="text-center">
          <p className="text-xl md:text-2xl mb-6">
            No profiles found. Let's create your first one!
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            onClick={handleCreateNewAccount}
          >
            Create Your First Profile
          </button>
        </div>
      )}

      {/* Account Creation/Edit Form (Modal or Overlay) */}
      {showAccountForm && (
        <AccountForm
          onClose={() => setShowAccountForm(false)}
          accountToEdit={currentEditAccount}
          onAccountCreatedOrUpdated={fetchAccounts} // Callback to refresh accounts after form submission
        />
      )}
    </div>
  );
}
