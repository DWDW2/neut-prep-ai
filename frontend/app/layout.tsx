import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
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
      <body className={nunito.className}>
          {children}
      </body>
      
    </html>
  );
}
