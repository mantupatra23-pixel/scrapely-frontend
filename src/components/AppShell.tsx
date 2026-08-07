"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPublicRoute =
    pathname === "/" || pathname === "/signin" || pathname === "/signup";

  if (!mounted) {
    return <div className="min-h-screen bg-[#0f172a]" />;
  }

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
