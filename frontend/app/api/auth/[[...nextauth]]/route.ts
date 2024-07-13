import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials, { CredentialsProvider } from 'next-auth/providers/credentials';
const { NEXT_PUBLIC_GOOGLE_CLIENT_ID, NEXT_PUBLIC_GOOGLE_CLIENT_SECRET } = process.env;


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',  
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
});


export {handler as GET, handler as POST};
