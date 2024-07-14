import NextAuth from "next-auth";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface CustomSession extends Session {
    accessToken?: string;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // If account is not null, it means the user has just logged in or linked an account
            if (account) {
                // You can store the access token from the OAuth provider in the JWT
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass the access token to the session object
            (session as CustomSession).accessToken = token.accessToken as string;
            return session;
        },
    },
});

export { handler as GET, handler as POST };