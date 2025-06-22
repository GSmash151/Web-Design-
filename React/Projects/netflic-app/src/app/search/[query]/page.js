// src/app/search/[query]/page.js

'use client';

import { useContext } from "react"; // Import useContext
import { GlobalContext } from "../../../context"; // Correct path to your GlobalContext
import { useSession } from "next-auth/react";
import UnauthPage from "../../../components/unauth-page"; // Correct path for UnauthPage
import CircleLoader from "../../../components/circle-loader"; // Correct path for CircleLoader
import ManageAccounts from "../../../components/manage-accounts"; // Correct path for ManageAccounts
import { useParams } from "next/navigation"; // Import useParams to get the query from the URL

export default function Search() {
    // --- ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP LEVEL ---
    const {
        loggedInAccount,
        accountsLoading,
        pageLoader
    } = useContext(GlobalContext); // Hook 1: useContext

    const { data: session } = useSession(); // Hook 2: Corrected useSession()

    const params = useParams(); // Hook 3: useParams to get the dynamic 'query'

    // Log for debugging
    console.log("Search Query:", params.query);
    console.log("Session in Search:", session);
    console.log("LoggedInAccount in Search:", loggedInAccount);
    console.log("PageLoader in Search:", pageLoader);
    console.log("AccountsLoading in Search:", accountsLoading);

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
                <h1>Search Results for "{decodeURIComponent(params.query || '')}"</h1>
                <p>Showing content for {loggedInAccount.name}.</p>
                {/* Your actual search results content will go here */}
                {/* You'd typically fetch data based on `params.query` here */}
                {/* <SearchResultsDisplay query={params.query} /> */}
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