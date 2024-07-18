'use client'
import { Nunito } from "next/font/google";
import "./globals.css";
import {QueryClientProvider, useQueryClient, QueryClient} from 'react-query'
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
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
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>  
      <SessionProvider >
        <html lang="en">
          <body className={nunito.className}>
              {children}
          </body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
