import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Menu",
  description: "Create Your Menu Here!!",
};


const myFont = localFont({
  src: "/font/myFont.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={myFont.className}>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
