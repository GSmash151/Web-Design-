// src/context/index.js

'use client'

import { createContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export const GlobalContext = createContext(null)

export default function GlobalState({children}){
    const { data: session } = useSession();

    const [accounts, setAccounts] = useState([]);
    const [accountsLoading, setAccountsLoading] = useState(true);
    const [showAccountForm, setShowAccountForm] = useState(false);
    const [currentEditAccount, setCurrentEditAccount] = useState(null);

    const [loggedInAccount, setLoggedInAccount] = useState(null);
    const [pageLoader, setPageLoader] = useState(true);

    // Function to fetch accounts - now exposed in context value
    const fetchAccounts = async () => {
        if (session?.user?.uid) {
            setAccountsLoading(true);
            try {
                const response = await fetch(`/api/account/get-all-account?uid=${session.user.uid}`, {
                    method: 'GET',
                });
                const data = await response.json();
                if (data.success) {
                    setAccounts(data.data);
                } else {
                    console.error("Failed to fetch accounts:", data.message);
                    setAccounts([]);
                }
            } catch (error) {
                console.error("Network error fetching accounts:", error);
                setAccounts([]);
            } finally {
                setAccountsLoading(false);
            }
        } else {
            setAccounts([]);
            setAccountsLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [session]);

    useEffect(() => {
        const storedAccount = localStorage.getItem('loggedInAccount');
        if (storedAccount) {
            setLoggedInAccount(JSON.parse(storedAccount));
        }
        setPageLoader(false);
    }, []);


    return (
        <GlobalContext.Provider
            value={{
                accounts,
                setAccounts,
                accountsLoading,
                setAccountsLoading,
                showAccountForm,
                setShowAccountForm,
                currentEditAccount,
                setCurrentEditAccount,
                loggedInAccount,
                setLoggedInAccount,
                pageLoader,
                setPageLoader,
                session,
                fetchAccounts // <-- EXPOSED THIS FUNCTION
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}