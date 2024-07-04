import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
}); 

export const metadata: Metadata = {
  title: "NUET AI",
  description: "Improve your score",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
          {children}
      </body>
      
    </html>
  );
}
