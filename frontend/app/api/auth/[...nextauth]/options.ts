import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import BASE_URL from "@/lib/env";

interface CustomUser extends User {
  accessToken: string; 
  refreshToken: string; 
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
        try {
          const res = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Login failed: ${errorText}`);
          }
          const user = await res.json();
          return {
            ...user,
            provider: 'credentials',
          } as CustomUser;
        } catch (error:any) {
          console.error('Login failed:', error.message);
          return null;
        }
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
          try {
            const register = await fetch(`${BASE_URL}/user/register`,{
              method: 'POST',
              body: JSON.stringify({
                id_token: account.id_token
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })  
            
            const tokenAccess = await fetch(`${BASE_URL}/user/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_token: account.id_token
              }),
            });
            const data = await tokenAccess.json();
            if(register.ok && register.status !== 400){
              try {
                const roadmap = await fetch(`${BASE_URL}/roadmap/generate-roadmap`,{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.accessToken}`
                  },
                })
              } catch (error) {
                console.log(error)
              }
            }
            if (!tokenAccess.ok) {
              const errorText = await tokenAccess.text();
              throw new Error(`Token fetch failed: ${errorText}`);
            }

            if (data.accessToken && data.refreshToken) {
              token.accessToken = data.accessToken;
              token.refreshToken = data.refreshToken; 
            }
          } catch (error:any) {
            console.error('Token fetch failed:', error.message);
          }
        } else if (account.provider === 'credentials') {
          if (user.accessToken && user.refreshToken) {
            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string; 
      return session;
    },
  },
};
