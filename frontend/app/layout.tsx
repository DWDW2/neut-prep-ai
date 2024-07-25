'use client'
import { Nunito } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import {QueryClientProvider, QueryClient} from 'react-query'
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
  const queryClient = new QueryClient()
  return (
      <QueryClientProvider client={queryClient}>  
        <SessionProvider >
          <html lang="en">
            <head>
            <script
              id="MathJax-script"
              async
              src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
            ></script>
            </head>
            <body className={nunito.className}>
                {children}
                <Analytics />
            </body>
          </html>
        </SessionProvider>
      </QueryClientProvider>
  );
}
