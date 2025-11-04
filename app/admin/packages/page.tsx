"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";

interface PackageType {
  id: number;
  name: string;
}

export default function PackagesPage(){
  const router = useRouter();
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        if (!res.ok) throw new Error("Failed to fetch Packages");
        const data: PackageType[] = await res.json();
        setPackages(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading Packages...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* header */}
      <div className="w-full bg-white flex items-center p-4 shadow-md justify-between">
        <h3 className="text-2xl text-black font-bold">Packages</h3>
        <button
          onClick={() => router.push("/admin/packages/add")}
          className="bg-green-600 text-white px-4 py-2 hover:bg-green-100 transition"
        >
          Add Packages
        </button>
      </div>

      {/* main content */}
      <div className="flex-1 p-4">
        {packages.length > 0 ? (
          <CRUDTable
            endpoint="packages"
            columns={["name", "description", "price", "discount", "stock", "imgUrl", "isFeatured", "isActive", "createdAt", "updatedAt", "createdById" ]}
            data={packages}
            setData={setPackages} 
          />
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No packages found.
          </div>
        )}
      </div>
    </div>
  );
};


