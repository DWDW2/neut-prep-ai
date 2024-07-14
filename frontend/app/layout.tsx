'use client'
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
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
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
