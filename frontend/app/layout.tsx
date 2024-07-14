'use client'
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
}); 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={nunito.className}>
            {children}
        </body>
      </html>
    </SessionProvider>
  );
}
