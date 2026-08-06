"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPublicRoute = pathname === "/" || pathname === "/signin" || pathname === "/signup";

  if (!mounted) {
    return (
      <html lang="en" className="dark h-full bg-[#0e1117] text-slate-100">
        <body className="h-full bg-[#0e1117]"></body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark h-full bg-[#0e1117] text-slate-100 antialiased">
      <body className="flex h-full min-h-screen overflow-x-hidden font-sans">
        {isPublicRoute ? (
          <main className="w-full min-h-screen overflow-y-auto bg-[#0e1117]">
            {children}
          </main>
        ) : (
          <div className="flex h-full w-full overflow-hidden">
            <SidebarNavigation 
              collapsed={sidebarCollapsed} 
              setCollapsed={setSidebarCollapsed} 
            />
            <div className="flex flex-1 flex-col overflow-hidden">
              <WorkspaceHeader />
              <main className="flex-1 overflow-y-auto bg-[#0e1117] p-4 lg:p-6">
                {children}
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
