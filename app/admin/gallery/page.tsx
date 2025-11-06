"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";

interface GalleryType {
  id: number;
  title: string;
  description: string;
}

const GalleryPage = () => {
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery items");
        const data: GalleryType[] = await res.json();
        setGallery(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading gallery...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="h-screen flex flex-col ">
      {/* header */}
      <div className="w-full flex items-center p-4 shadow-md justify-between bg-[#aec958]">
        <h3 className="text-2xl text-white font-bold">Gallery</h3>
        <button
          onClick={() => router.push("/admin/gallery/add")}
          className="bg-[#4998d1] rounded-2xl text-white px-4 py-2 hover:bg-green-100 transition"
        >
          Add Gallery Item
        </button>
      </div>

      {/* main content */}
      <div className="flex-1 p-4 w-full">
        {gallery.length > 0 ? (
          <CRUDTable
            endpoint="gallery"
            columns={["title", "description"]}
            data={gallery}
            setData={setGallery}
          />
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No gallery items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
