import type { Metadata } from "next";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../../globals.css";
import SideNav from "@/components/shared/sideNav/SideNav";
import Topbar from "@/components/shared/topBar/Topbar";
import { redirect } from "next/navigation";

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
  if (!user ) redirect('/');
  const { id } = user;
  return (
    <main className="main_container">
      <div className="sidebar_container">
        <SideNav />
      </div>
      <div className="layout_primary">
        <div className="topbar_container">
          <Topbar userId={id || ""} />
        </div>
        <div className="content_container">
          {children}
        </div>
      </div>
    </main>
  );
}
