//src/app/provider.js

'use client'

import GlobalState from "@/context";
import NextAuthProvider from "../auth-provider";

export default function Providers({ children }) {
  return (
    <NextAuthProvider>
      <GlobalState>{children}</GlobalState>
    </NextAuthProvider>
  );
}
