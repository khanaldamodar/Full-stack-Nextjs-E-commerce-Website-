"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface BrandType {
  id: number;
  name: string;
}

export default function EditBrandPage() {
  const params = useParams();
  const brandId = Number(params?.id);
  const [brand, setBrand] = useState<BrandType | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch('/api/brands');
        const data = await res.json();
        const matchingBrand = data.find((brand: BrandType) => brand.id === brandId);
        console.log("Fetched brand data:", matchingBrand);
        setBrand(matchingBrand || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrand();
  }, []);

  // return (
  //   <div className="p-6 text-white">
  //     <h2 className="text-xl font-bold">Brand ID: {brandId}</h2>
  //     <h2 className="text-lg mt-2">
  //       Brand Name: {brand?.name}
  //     </h2>
  //   </div>
  // );


  return(
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 bg-zinc-800 w-2/5 rounded p-5">
        <h1 className="text-2xl text-white font-bold text-center mb-2 pt-4">Update Brand</h1>
        <form className="w-full">
          <div className="rounded-xl p-2 gap-4 shadow-lg flex justify-center items-center mx-auto w-full">
            <div className="flex-col flex gap-4 w-full">
              <label htmlFor="name" className="text-xl text-white">Brand Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
              	 className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 w-full"
                
                value={brand?.name}
              />
            </div>
          </div>

          <div className="flex justify-center mx-auto items-center pb-2 w-full">
            <button
              type="submit"

              className="mt-4 bg-white hover:bg-zinc-100 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
