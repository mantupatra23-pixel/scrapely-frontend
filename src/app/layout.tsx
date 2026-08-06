"use client";

import React, { useState } from "react";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <html lang="en" className="dark h-full bg-[#0b0c10] text-slate-100 antialiased">
      <body className="flex h-full min-h-screen overflow-hidden font-sans">
        {/* Sidebar Container */}
        <SidebarNavigation 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />

        {/* Main Application Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <WorkspaceHeader />
          <main className="flex-1 overflow-y-auto bg-[#0f1117] p-4 lg:p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
