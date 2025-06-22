// src/app/profiles/page.js (or wherever you manage profiles)
"use client"; // This page will need to be a client component

import { useContext } from "react";
import { GlobalContext } from "@/context"; // Correct path to your GlobalContext
// You might also need the UnauthPage or other components here

export default function ProfilesPage() {
  const {
    accounts,
    accountsLoading,
    showAccountForm,
    setShowAccountForm,
    currentEditAccount,
    setCurrentEditAccount,
    loggedInAccount,
    setLoggedInAccount,
    session, // Access the session from context if needed
  } = useContext(GlobalContext);

  // You'd use this state to render your UI
  if (accountsLoading) {
    return <div>Loading accounts...</div>;
  }

  if (!session) {
    // Redirect or show unauthorized message if no session
    // You might move this check to a wrapper component or layout specific to authenticated routes
    return <p>Please sign in to manage profiles.</p>;
  }

  return (
    <div>
      <h1>Manage Profiles for {session.user?.name}</h1>
      {accounts.length > 0 ? (
        <ul>
          {accounts.map((account) => (
            <li key={account._id}>
              {account.name}
              <button onClick={() => setLoggedInAccount(account)}>
                Select
              </button>
              <button
                onClick={() => {
                  setCurrentEditAccount(account);
                  setShowAccountForm(true);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteAccount(account._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts found. Create one!</p>
      )}
      {accounts.length < 4 && (
        <button
          onClick={() => {
            setCurrentEditAccount(null); // Clear for new account
            setShowAccountForm(true);
          }}
        >
          Create New Account
        </button>
      )}

      {showAccountForm && (
        // Your Account Creation/Edit Form component would go here
        // It would also consume GlobalContext to call setAccounts, etc.
        <p>
          Account Form Here (for {currentEditAccount ? "Editing" : "Creating"})
        </p>
      )}

      <h2>
        Currently Logged In As:{" "}
        {loggedInAccount ? loggedInAccount.name : "None"}
      </h2>
    </div>
  );
}
