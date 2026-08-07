"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import { useApp } from "@/context/AppContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, setSidebarCollapsed } = useApp();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#0f172a]" />;
  }

  const isPublicRoute =
    pathname === "/" || pathname === "/signin" || pathname === "/signup";

  // Public Layout (Full Width Landing / Auth Forms)
  if (isPublicRoute) {
    return (
      <main className="w-full min-h-screen overflow-y-auto bg-[#0f172a]">
        {children}
      </main>
    );
  }

  // Authenticated Workstation Layout (Fixed Sidebar + Top Navbar + Full-Width Content)
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f172a]">
      {/* Fixed Left Sidebar */}
      <SidebarNavigation
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Fixed Top Navbar */}
        <WorkspaceHeader />

        {/* Full-Width Workspace View Content */}
        <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
