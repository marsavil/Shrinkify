import type { Metadata } from "next";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/shared/sideNav/SideNav";
import Topbar from "@/components/shared/topBar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shrinkify",
  description: "A link shortener created on NextJS 14",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} container`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
