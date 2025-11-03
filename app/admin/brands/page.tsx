"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";
import { useFetch } from "@/services/useFetch";

const BrandsPage = () => {
  const router = useRouter();

  interface BrandType {
    id: number;
    name: string;
  }

  const { data, error, loading } = useFetch<BrandType[]>("brands");

  if (loading) return <div className="p-6 text-lg">Loading brands...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading data!</div>;

  return (
    <div className="h-screen flex flex-col">
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

      {/* main content */}
      <div className="flex-1 p-4">
        {data && data.length > 0 ? (
          <CRUDTable
            endpoint="brands"
            columns={["name"]}  
            data={data.map((brand) => ({
              id: brand.id,   
              name: brand.name,
            }))}
          />

        ) : (
          <div className="text-center text-gray-400 mt-10">
            No brands found.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
