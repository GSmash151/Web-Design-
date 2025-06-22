// src/app/movies/page.js

"use client";

import { useContext } from "react"; // Import useContext
import { GlobalContext } from "../../context"; // Correct path to your GlobalContext
import { useSession } from "next-auth/react";
import UnauthPage from "../../components/unauth-page";
import CircleLoader from "../../components/circle-loader"; // Assuming you have a CircleLoader
import ManageAccounts from "../../components/manage-accounts"; // Import ManageAccounts

export default function Movies() {
  // --- ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP LEVEL ---
  const { loggedInAccount, accountsLoading, pageLoader } =
    useContext(GlobalContext); // Hook 1: useContext

  const { data: session } = useSession(); // Hook 2: useSession

  // Log for debugging
  console.log("Session in Movies:", session);
  console.log("LoggedInAccount in Movies:", loggedInAccount);
  console.log("PageLoader in Movies:", pageLoader);
  console.log("AccountsLoading in Movies:", accountsLoading);

  // --- CONDITIONAL RENDERING (AFTER ALL HOOKS) ---

  // 1. Show global page loader if context is still initializing
  if (pageLoader) {
    return <CircleLoader />;
  }

  // 2. Show loading if accounts are still being fetched after session is known
  if (session && accountsLoading) {
    return <CircleLoader />;
  }

  // 3. If no user session, show the Unauthorized Page
  if (!session) {
    return <UnauthPage />;
  }

  // 4. If a session exists, but no account is logged in, show the ManageAccounts component.
  //    This prompts the user to select or create a profile.
  if (session && !loggedInAccount) {
    return <ManageAccounts />;
  }

  // 5. If everything is good (session exists and an account is selected/logged in)
  if (session && loggedInAccount) {
    return (
      <div>
        <h1>Movies Page for {loggedInAccount.name}</h1>
        <p>Here you will see a list of movies.</p>
        {/* Your actual movie content will go here */}
        {/* For example: */}
        {/* <MovieCategoryRow title="Trending Now" movies={trendingMovies} /> */}
        {/* <MovieCategoryRow title="New Releases" movies={newReleases} /> */}
      </div>
    );
  }

  // Fallback in case none of the above conditions are met (should ideally not be reached)
  return (
    <div>
      <CircleLoader />
      <p>An unexpected state occurred. Please refresh or try again.</p>
    </div>
  );
}
