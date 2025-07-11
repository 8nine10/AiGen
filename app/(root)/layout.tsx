import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";

import Topbar from '@/components/shared/Topbar'
import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
// import RightSidebar from '@/components/shared/RightSidebar'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AIGen',
  description: 'A Next.js 14 Meta Application'
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <Topbar />
          
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            {/* <RightSidebar /> */}
          </main>

          <Bottombar />
        </body>
      </ClerkProvider>
    </html>
  );
}
