// next-auth.d.ts
import NextAuth from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    refreshToken: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {

    accessToken: string;
  }
}
