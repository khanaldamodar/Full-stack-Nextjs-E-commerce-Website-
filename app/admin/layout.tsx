import { Metadata } from "next";
import Sidebar from "@/components/admin-components/Sidebar";

import React from "react";
import { ToastContainer } from "react-toastify";
// export const metadata: Metadata = {
//   title: "Set Nepal | Admin Dashboard",
//   description: "Admin dashboard for managing the application",
//   icons:{
//     icon: "/logo.jpeg",
//   }
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-6 text-zinc-800 overflow-y-auto ">
        {children}
      </main>
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
    </div>
  );
}
