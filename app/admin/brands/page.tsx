"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";

const BrandsPage = () => {
  const router = useRouter();

  return (
    <div className="h-screen">
      {/* header */}
      <div className="w-full bg-zinc-700 flex items-center p-4 shadow-md justify-between">
        <h3 className="text-2xl text-white font-bold">Brands</h3>
        <button
          onClick={() => router.push("/admin/brands/add")}
          className="bg-zinc-600 text-white px-4 py-2 hover:bg-zinc-700 transition"
        >
          Add Brand
        </button>
      </div>
      <div>
        <CRUDTable endpoint="brands" columns={["name"]} />
      </div>
    </div>
  );
};

export default BrandsPage;
