'use client'
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import {QueryClientProvider, useQueryClient, QueryClient} from 'react-query'
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
      <ClerkProvider>
        <html lang="en">
          <body className={nunito.className}>
              {children}
          </body>
        </html>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
