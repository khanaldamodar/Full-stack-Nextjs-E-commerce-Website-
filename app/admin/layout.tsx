"use client";

import Sidebar from "@/components/admin-components/Sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-zinc-700 p-6 text-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
