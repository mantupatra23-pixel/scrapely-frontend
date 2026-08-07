import React from "react";
import { AppProvider } from "@/context/AppContext";
import "@/app/globals.css";

export const metadata = {
  title: "Scrapely.ai - B2B Lead Intelligence Workstation",
  description: "Autonomous B2B Scraping Engine and Data Extraction Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full bg-[#0f172a] text-slate-100 antialiased">
      <body className="h-full min-h-screen bg-[#0f172a] font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
