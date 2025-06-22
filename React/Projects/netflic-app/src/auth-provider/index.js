// src/app/auth-provider/index.js

"use Client"

import {SessionProvider } from "next-auth/react"

export default function NextAuthProvider({ children}) {
    return <SessionProvider>{children}</SessionProvider>
}