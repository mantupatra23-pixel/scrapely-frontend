"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Public routes jahan app sidebar aur app header hide rehte hain
  const isPublicRoute = pathname === "/" || pathname === "/signin" || pathname === "/signup";

  return (
    <html lang="en" className="dark h-full bg-[#090d16] text-slate-100 antialiased">
      <body className="flex h-full min-h-screen overflow-x-hidden font-sans">
        {isPublicRoute ? (
          /* Public Views: Pure Full Width Landing / Auth Page */
          <main className="w-full min-h-screen overflow-y-auto bg-[#090d16]">
            {children}
          </main>
        ) : (
          /* Logged In App Workstation View: Sidebar + Workspace Header + Application View */
          <div className="flex h-full w-full overflow-hidden">
            <SidebarNavigation 
              collapsed={sidebarCollapsed} 
              setCollapsed={setSidebarCollapsed} 
            />
            <div className="flex flex-1 flex-col overflow-hidden">
              <WorkspaceHeader />
              <main className="flex-1 overflow-y-auto bg-[#0f1117] p-4 lg:p-6">
                {children}
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
