"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ViewProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  const gallery = JSON.parse(product.gallery || "[]");

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2" size={18} /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full rounded-lg"
          />
        </div>
        <div className="space-y-3">
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Weight:</strong> {product.weight} kg</p>
          <p><strong>Brand:</strong> {product.brand?.name || "N/A"}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-8 mb-3">Gallery</h2>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                width={200}
                height={200}
                className="object-cover w-full rounded-md border"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No gallery images uploaded.</p>
        )}
      </div>
    </div>
  );
}
