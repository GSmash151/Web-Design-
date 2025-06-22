// src/app/browser/page.js

'use client';

import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { useSession } from "next-auth/react";
import UnauthPage from "../../components/unauth-page";
import CircleLoader from "../../components/circle-loader";
import { useRouter } from "next/navigation";
import ManageAccounts from "../../components/manage-accounts"; // <-- Import the new component

export default function Browse() {
    // --- ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP LEVEL ---
    const {
        loggedInAccount,
        accounts,
        accountsLoading,
        pageLoader,
        setLoggedInAccount // Might need this if you implement auto-login/selection
    } = useContext(GlobalContext);

    const { data: session } = useSession();

    const router = useRouter();

    // Effect to handle initial account selection or redirect
    useEffect(() => {
        // If session exists, accounts are loaded, but no account is logged in,
        // and there are accounts available, try to redirect to account selection.
        // Or if you have logic to auto-select the first account, it would go here.
        // For now, we'll let the render logic handle showing ManageAccounts.
        // If you had a dedicated /accounts page and wanted to redirect:
        // if (session && !loggedInAccount && !accountsLoading && accounts.length > 0) {
        //      router.push('/accounts');
        // }
    }, [session, loggedInAccount, accountsLoading, accounts, router, setLoggedInAccount]);


    // Log for debugging
    console.log("Session in Browse:", session);
    console.log("LoggedInAccount in Browse:", loggedInAccount);
    console.log("Accounts in Browse:", accounts);
    console.log("PageLoader in Browse:", pageLoader);
    console.log("AccountsLoading in Browse:", accountsLoading);


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

    // 4. If a session exists, but no account is logged in, show the ManageAccounts component
    //    This component will handle listing accounts, selecting one, or creating new ones.
    if (session && !loggedInAccount) {
      return <ManageAccounts />; // <-- Render ManageAccounts component here
    }

    // 5. If everything is good (session exists, and an account is selected/logged in)
    if (session && loggedInAccount) {
        return (
            <div>
                <h1>Welcome, {loggedInAccount.name}!</h1>
                <p>Enjoy Browse content.</p>
                {/* Your main Browse content for the 'Browse' page goes here */}
                <div>Browse Main Content Area</div>
                {/* You might also want a button here to go to Manage Accounts if user wants to switch profiles */}
                {/* <button onClick={() => router.push('/accounts')}>Switch Profile</button> */}
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