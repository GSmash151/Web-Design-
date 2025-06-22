'use client';

import { useSession } from "next-auth/react";
import { createContext } from "react";
import CircleLoader from "../components/circle-loader";

export const GlobalContext = createContext(null);

export default function GlobalContext({children}){
    
    const {data: session} = useSession();

    if (session === undefined) return <CircleLoader />;

    return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
}