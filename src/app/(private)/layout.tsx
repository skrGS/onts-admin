"use client";

import { Navbar } from "@/components/nav-bar";
import InitProvider from "@/components/init-provider";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InitProvider>
      <div className="flex flex-row min-h-full bg-slate-50">
        <Navbar />
        <div className="flex flex-col w-full pl-72">
          <Header />
          {children}
        </div>
      </div>
    </InitProvider>
  );
}
