import { Nunito } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import "./globals.css";
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from "next-auth/react";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
});

export const metadata = {
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <html lang="en">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta name="description" content="Prepare for the NUET (Nazarbayev University Entrance Test) with AI-generated tasks and personalized roadmaps tailored to your needs." />
            <meta name="keywords" content="NUET, Nazarbayev University Entrance Test, AI-generated tasks, personalized roadmaps, exam preparation" />
            <meta property="og:title" content="NUET Exam Preparation" />
            <meta property="og:description" content="Prepare for the NUET with AI-generated tasks and personalized roadmaps." />
            <meta property="og:image" content="/Thur.jpg" />
            <meta property="og:url" content="https://nuet-prep-ai.vercel.app" />
            <meta property="og:type" content="website" />
           
            <link rel="icon" href="/favicon.ico" />
            <title>NUET Exam Preparation</title>
          </Head>
          <body className={nunito.className}>
            {children}
            <Analytics />
          </body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
