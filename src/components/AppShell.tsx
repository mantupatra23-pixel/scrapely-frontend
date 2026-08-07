"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen w-full bg-[#0f172a]" />;
  }

  const currentPath = pathname || "/";
  const isPublicRoute =
    currentPath === "/" || currentPath === "/signin" || currentPath === "/signup";

  // Public Landing / Auth Pages (ZERO Sidebar, Full Screen)
  if (isPublicRoute) {
    return (
      <main className="w-full min-h-screen overflow-y-auto bg-[#0f172a]">
        {children}
      </main>
    );
  }

  // Workstation App View (Single Sidebar + Single Header)
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f172a]">
      <SidebarNavigation
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <WorkspaceHeader />
        <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
