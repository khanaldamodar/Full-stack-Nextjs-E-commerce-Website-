"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUpdate } from "@/services/useUpdate";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface BrandType {
  id: number;
  name: string;
}

export default function EditBrandPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = Number(params?.id);

  const [brand, setBrand] = useState<BrandType | null>(null);
  const [name, setName] = useState("");

  const {
    updateData,
    loading: updating,
    error: updateError,
  } = useUpdate<BrandType>();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch("/api/brands");
        const data: BrandType[] = await res.json();
        const matchingBrand = data.find((b) => b.id === brandId);
        if (matchingBrand) {
          setBrand(matchingBrand);
          setName(matchingBrand.name);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrand();
  }, [brandId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand) return;

    const updateBrand: any = { ...brand, name };
    const result = await updateData(`brands/${brandId}`, updateBrand, "PUT");
    if (result) {
      toast.success("Brand added successfully");
      router.push("/admin/brands");

      const updateBrand: any = { ...brand, name };
      const result = await updateData(`brands/${brandId}`, updateBrand, "PUT");
      if (result) {
        toast.success("Brand updated successfully!");
        router.push("/admin/brands");

        const updateBrand: any = { ...brand, name };
        const result = await updateData(
          `brands/${brand.id}`,
          updateBrand,
          "PUT"
        );

        if (result) {
          toast.success("Brand updated successfully!");
          router.push("/admin/brands");
        }
      }

      if (!brand)
        return (
          <div className="p-6 text-black text-center text-xl font-poppins">
            Loading brand...
          </div>
        );

      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <h1 className="text-3xl font-bold text-center text-black mb-6">
              Edit Brand
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-secondary mb-2"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter brand name"
                  className="w-full p-3 rounded-xl border border-[#aec958] focus:ring-4 focus:ring-[#aec958]/40 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>

              {updateError && (
                <p className="text-red-400 text-sm font-medium">
                  {updateError}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={updating}
                className="w-full py-3 rounded-xl bg-linear-to-r from-[#3b82f6] to-[#60a5fa] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                {updating ? "Updating..." : "Update Brand"}
              </motion.button>
            </form>

            <button
              onClick={() => router.push("/admin/brands")}
              className="mt-4 w-full text-center text-sm text-[#aec958] font-semibold hover:underline"
            >
              ← Back to Brand List
            </button>
          </motion.div>
        </div>
      );
    }
  };
}
