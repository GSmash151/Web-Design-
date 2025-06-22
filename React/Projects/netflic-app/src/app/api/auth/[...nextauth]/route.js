import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github';
// Remove or correct this line: import {env} from 
// process.env is globally available in Node.js environments for environment variables.

const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Fix the typo: toLocalCase() should be toLowerCase()
            if (session?.user?.name) { // Add a check to ensure name exists before splitting
              session.user.username = session.user.name
                .split(" ")
                .join("")
                .toLowerCase(); // Corrected typo
            }

            console.log(session, 'session')
            
            session.user.uid = token.sub;

            return session;
        }
    },
    // It's highly recommended to use an environment variable for your secret,
    // especially in production. Example: process.env.NEXTAUTH_SECRET
    secret: process.env.NEXTAUTH_SECRET || "a_very_long_and_random_secret_string_for_development", // Use env var for secret
};

// Export the handlers for GET and POST requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };