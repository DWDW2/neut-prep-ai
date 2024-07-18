import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
  accessToken: string;
  provider: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch('http://localhost:5000/user/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user as CustomUser;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const customUser = user as CustomUser;
        customUser.provider = account.provider; 

        if (account.provider === 'google') {
          const response = await fetch('http://localhost:5000/user/registerGoogle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_token: account.id_token,
            }),
          });

          const tokenaccess = await fetch('http://localhost:5000/user/loginGoogle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_token: account.id_token
            }),
          })
          const data = await tokenaccess.json();
          if (data.accessToken) {
            token.accessToken = data.accessToken;
          }
        } else if (account.provider === 'credentials') {
          if (user.accessToken) {
            token.accessToken = user.accessToken;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
