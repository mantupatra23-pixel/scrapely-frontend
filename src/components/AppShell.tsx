"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import { useApp } from "@/context/AppContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, setSidebarCollapsed } = useApp();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPath = pathname || "/";
  const isPublicRoute =
    currentPath === "/" || currentPath === "/signin" || currentPath === "/signup";

  // SSR or Initial Render Fallback
  if (!mounted) {
    return (
      <main className="w-full min-h-screen bg-[#0f172a] text-slate-100">
        {children}
      </main>
    );
  }

  // Public Landing & Auth Layout
  if (isPublicRoute) {
    return (
      <main className="w-full min-h-screen overflow-y-auto bg-[#0f172a]">
        {children}
      </main>
    );
  }

  // Authenticated App Workstation Layout
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f172a]">
      <SidebarNavigation
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <WorkspaceHeader />
        <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
