"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Public routes (Landing page, Auth pages) jahan Sidebar hide rahega
  const isPublicRoute = pathname === "/" || pathname === "/login" || pathname === "/register";

  return (
    <html lang="en" className="dark h-full bg-[#0b0c10] text-slate-100 antialiased">
      <body className="flex h-full min-h-screen overflow-x-hidden font-sans">
        {isPublicRoute ? (
          // Public Landing Page / Auth View (No Sidebar, Pure Full Width)
          <main className="w-full min-h-screen overflow-y-auto bg-[#0b0c10]">
            {children}
          </main>
        ) : (
          // Logged In App Workstation View (Sidebar + Header + App Content)
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
