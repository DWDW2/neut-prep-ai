import { Nunito } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import GlobalProvider from "@/components/GlobalProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
});

export const metadata = {
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  description: "Prepare for the NUET (Nazarbayev University Entrance Test) with AI-generated tasks and personalized roadmaps tailored to your needs.",
  keywords: "NUET, Nazarbayev University Entrance Test, AI-generated tasks, personalized roadmaps, exam preparation",
  ogTitle: "NUET Exam Preparation",
  ogDescription: "Prepare for the NUET with AI-generated tasks and personalized roadmaps.",
  ogImage: "/Thur.jpg",
  ogUrl: "https://nuet-prep-ai.vercel.app",
  ogType: "website",
  favicon: "/favicon.ico",
  title: "NUET Exam Preparation"
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
