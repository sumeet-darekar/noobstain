import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeyad Etman",
  description: "Zeyad's Space on the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Header />
          <main className="flex min-h-[calc(100vh-18rem)] flex-col justify-between px-6 ">
            {children}
          </main>
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  );
}
