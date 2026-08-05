import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrapely — Autonomous B2B Lead Generation SaaS",
  description: "Extract high-intent B2B business leads on autopilot with real-time accuracy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
