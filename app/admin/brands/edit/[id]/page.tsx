"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUpdate } from "@/services/useUpdate";

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

  const { updateData, loading: updating, error: updateError } = useUpdate<BrandType>();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch('/api/brands');
        const data: BrandType[] = await res.json();
        const matchingBrand = data.find(b => b.id === brandId);
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

    const updatedBrand: any = { ...brand, name};
    const result = await updateData(`brands`, updatedBrand, "PATCH");

    if (result) {
      alert("Brand updated successfully!");
      router.push("/admin/brands"); 
    }
  };

  if (!brand) return <div className="p-6 text-white">Loading brand...</div>;

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 w-2/5 rounded p-5 shadow-xl border-2 border-[#aec958]">
        <h1 className="text-2xl text-black font-bold text-center mb-2 pt-4">Update Brand</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="rounded-xl p-2 gap-4 flex justify-center items-center mx-auto w-full">
            <div className="flex-col flex gap-4 w-full">
              <label htmlFor="name" className="text-xl text-black">Brand Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-3 text-black placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-[#aec958] w-full border border-[#aec958]"
              />
            </div>
          </div>

          <div className="flex justify-center mx-auto items-center pb-2 w-full">
            <button
              type="submit"
              disabled={updating}
              className="mt-4 bg-[#4998d1] hover:bg-[#3b7aa8] text-white cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full shadow-md"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
          {updateError && <div className="text-red-500 mt-2">{updateError}</div>}
        </form>
      </div>
    </div>
  );
}
