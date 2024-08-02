import { Nunito } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from "next";
import "./globals.css";
import GlobalProvider from "@/components/GlobalProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
});

export const metadata:Metadata = {
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  description: "Prepare for the NUET (Nazarbayev University Entrance Test) with AI-generated tasks and personalized roadmaps tailored to your needs.",
  keywords: "NUET, Nazarbayev University Entrance Test, AI-generated tasks, personalized roadmaps, exam preparation",
  openGraph: {
    title: "NUET AI",
    description: "Prepare for the NUET (Nazarbayev University Entrance Test) with AI-generated tasks and personalized roadmaps tailored to your needs 🚀🚀🚀.",
    url: 'https://nuet-prep-ai.vercel.app/',
    siteName: "NUET AI",
    type: 'website',
  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <GlobalProvider>
        <html lang="en">
          <body className={nunito.className}>
            {children}
            <Analytics />
          </body>
        </html>
      </GlobalProvider>
  );
}
