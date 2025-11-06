'use client'
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUpdate } from "@/services/useUpdate";

interface CategoryType {
  id: number;
  name: string;
}

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = Number(params?.id);

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [name, setName] = useState("");

  const { updateData, loading: updating, error: updateError } = useUpdate<CategoryType>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('/api/categories');
        const data: CategoryType[] = await res.json();
        const matchingCategory = data.find(b => b.id === categoryId);
        if (matchingCategory) {
          setCategory(matchingCategory);
          setName(matchingCategory.name);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    // Include the ID in the endpoint
    const result = await updateData(`categories/${category.id}`, { ...category, name }, "PUT");
    if (result) {
      alert("Category updated successfully!");
      router.push("/admin/categories");
    }
  };

  if (!category) return <div className="p-6 text-white">Loading category...</div>;

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 w-2/5 rounded p-5 shadow-xl border-2 border-[#aec958]">
        <h1 className="text-2xl text-white font-bold text-center mb-2 pt-4">Update Category</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="rounded-xl p-2 gap-4 shadow-lg flex justify-center items-center mx-auto">
            <div className="flex-col flex gap-4">
              <label htmlFor="name" className="text-xl text-black">Category Name</label>
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
