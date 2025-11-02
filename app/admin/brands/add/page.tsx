"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface BrandType {
  name: string;
}

export default function Page() {
  const router = useRouter();
  const [brand, setBrand] = useState<BrandType>({ name: "" });
  const [loading, setLoading] = useState(false);

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);

    try {
      const token = Cookies.get("token"); // Get auth token if needed
      const response = await fetch("http://localhost:3000/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(brand),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Brand added successfully!");
        setBrand({ name: "" }); // Clear input
        // Optional: redirect to brand list page
        // router.push("/admin/brands");
      } else {
        alert(`Error: ${data.message || "Could not add brand"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 bg-zinc-800 w-2/5 rounded p-5">
        <h1 className="text-2xl text-white font-bold text-center mb-2 pt-4">Add Brand</h1>
        <form onSubmit={handleAddBrand} className="w-full">
          <div className="rounded-xl p-2 gap-4 shadow-lg flex justify-center items-center mx-auto w-full">
            <div className="flex-col flex gap-4 w-full">
              <label htmlFor="name" className="text-xl text-white">Brand Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={brand.name}
                onChange={(e) => setBrand({ name: e.target.value })}
                className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 w-full"
                placeholder="Brand Name"
              />
            </div>
          </div>

          <div className="flex justify-center mx-auto items-center pb-2 w-full">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-white hover:bg-zinc-100 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
