import type { Metadata } from "next";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../../globals.css";
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
          <div className="main_container">
            <div className='layout_main'>
              <div className="layout_primary">
              <Topbar userId={user?.id || ''} />
              </div>
              <div className="layout_wrapper">
              {children}
              </div>
            </div>
            <SideNav />
          </div>
  );
}
