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
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-slate-100 flex items-center justify-center">
        <div className="text-xs text-slate-400">Loading Workstation...</div>
      </div>
    );
  }

  const currentPath = pathname || "/";
  const isPublicRoute =
    currentPath === "/" || currentPath === "/signin" || currentPath === "/signup";

  if (isPublicRoute) {
    return (
      <main className="w-full min-h-screen overflow-y-auto bg-[#0f172a]">
        {children}
      </main>
    );
  }

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
