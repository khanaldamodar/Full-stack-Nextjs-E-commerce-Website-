"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    weight: "",
    categoryId: "",
    brandId: "",
    isFeatured: false,
    isActive: true,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        const p = res.data.product;

        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          sku: p.sku,
          weight: p.weight,
          categoryId: p.categoryId || "",
          brandId: p.brandId || "",
          isFeatured: p.isFeatured,
          isActive: p.isActive,
        });

        setPreviewImage(p.imageUrl);
        setGalleryPreview(JSON.parse(p.gallery || "[]"));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle inputs
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Submit updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      // main image
      if (imageFile) formData.append("image", imageFile);

      // gallery new uploads
      galleryFiles.forEach((file) => formData.append("gallery[]", file));

      // existing gallery urls
      galleryPreview.forEach((url) =>
        formData.append("existingGallery[]", url)
      );

      await axios.put(`/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      });

      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading product...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <Input name="name" value={form.name} onChange={handleChange} required />

        {/* Description */}
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        {/* Main Image */}
        <div>
          <p className="font-medium">Main Image</p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setImageFile(file);
              setPreviewImage(URL.createObjectURL(file));
            }}
          />

          {previewImage && (
            <Image
              src={previewImage}
              width={100}
              height={100}
              alt="Product"
              className="rounded mt-2 border"
            />
          )}
        </div>

        {/* Gallery */}
        <div>
          <p className="font-medium">Gallery Images</p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setGalleryFiles([...galleryFiles, ...files]);

              const previews = files.map((f) => URL.createObjectURL(f));
              setGalleryPreview([...galleryPreview, ...previews]);
            }}
          />

          <div className="flex gap-2 mt-2 flex-wrap">
            {galleryPreview.map((url, i) => (
              <div key={i} className="relative">
                <Image
                  src={url}
                  width={80}
                  height={80}
                  alt="Gallery"
                  className="border rounded"
                />

                <button
                  type="button"
                  onClick={() => {
                    setGalleryPreview(
                      galleryPreview.filter((_, idx) => idx !== i)
                    );
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
