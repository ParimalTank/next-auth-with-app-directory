# Authentication with NextAuth.js using Google Provider

This project uses [NextAuth.js](https://next-auth.js.org/) to handle authentication. NextAuth.js is a complete open-source authentication solution for Next.js applications. It supports various authentication providers, including Google, which we are using in this project.

## Setup

To get started with NextAuth.js using Google Provider, follow these steps:

## 1. **Install NextAuth.js:**
   ```bash
   npm install next-auth
   ```

## 2. Create a Google OAuth 2.0 Client

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.
3. Navigate to the "Credentials" page in the API & Services section.
4. Click on "Create Credentials" and select "OAuth 2.0 Client IDs".
5. Configure the OAuth consent screen with the necessary information.
6. Add your authorized redirect URI. It should be in the format:
   ```bash
   http://localhost:3000/api/auth/callback/google
7. After creating the OAuth 2.0 Client, you will get a Client ID and Client Secret.

## 3. Configure NextAuth.js

Create a `[...nextauth].js` file inside the `pages/api/auth` directory with the following configuration:

```javascript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Optional: Configure session and callbacks as per your needs
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});
 ```

## 4. Set Environment Variables

Ensure you have the environment variables set up in your `.env.local` file:

```plaintext
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 5. Use the signIn and signOut Methods

NextAuth.js provides `signIn` and `signOut` methods to handle authentication in your components.

```javascript
import { signIn, signOut, useSession } from 'next-auth/react';

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return <button onClick={() => signIn('google')}>Sign in with Google</button>;
}

export default AuthButton;
```

## 6. Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Next.js Documentation](https://nextjs.org/docs)


