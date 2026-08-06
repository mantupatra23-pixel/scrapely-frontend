"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import WorkspaceHeader from "@/components/WorkspaceHeader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname() || "/";

  const isPublicRoute =
    pathname === "/" || pathname === "/signin" || pathname === "/signup";

  if (isPublicRoute) {
    return (
      <main className="w-full min-h-screen overflow-y-auto bg-[#0f172a]">
        {children}
      </main>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#0f172a]">
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
