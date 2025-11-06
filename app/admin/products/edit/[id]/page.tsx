"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
// import { toast } from "react-hot-toast";

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
    imageUrl: "",
    gallery: [] as string[],
  });

  // Fetch existing product
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
          imageUrl: p.imageUrl,
          gallery: JSON.parse(p.gallery || "[]"),
        });
      } catch (err) {
        console.error(err);
        // toast.error("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle toggle switches
  const handleToggle = (name: string, checked: boolean) => {
    setForm({ ...form, [name]: checked });
  };

  // Handle gallery uploads (for now using URLs, but you can integrate Cloudinary later)
  const handleAddGallery = () => {
    setForm({ ...form, gallery: [...form.gallery, ""] });
  };

  const handleGalleryChange = (index: number, value: string) => {
    const updated = [...form.gallery];
    updated[index] = value;
    setForm({ ...form, gallery: updated });
  };

  const handleRemoveGallery = (index: number) => {
    const updated = form.gallery.filter((_, i) => i !== index);
    setForm({ ...form, gallery: updated });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`/api/products/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        weight: Number(form.weight),
        gallery: form.gallery,
      });

    //   toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
    //   toast.error("Failed to update product");
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
        <div>
          <label className="block font-medium mb-1">Name</label>
          <Input name="name" value={form.name} onChange={handleChange} required />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Price, Stock, SKU, Weight */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-medium mb-1">Price</label>
            <Input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Stock</label>
            <Input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">SKU</label>
            <Input name="sku" value={form.sku} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Weight</label>
            <Input
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="block font-medium mb-1">Main Image URL</label>
          <Input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
          {form.imageUrl && (
            <Image
              src={form.imageUrl}
              alt="Product"
              width={120}
              height={120}
              className="rounded-md mt-2"
            />
          )}
        </div>

        {/* Gallery */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block font-medium mb-1">Gallery Images</label>
            <Button type="button" onClick={handleAddGallery}>
              + Add Image
            </Button>
          </div>

          <div className="space-y-2 mt-2">
            {form.gallery.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={url}
                  onChange={(e) => handleGalleryChange(index, e.target.value)}
                  placeholder="Image URL"
                />
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleRemoveGallery(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {form.gallery.map(
              (url, i) =>
                url && (
                  <Image
                    key={i}
                    src={url}
                    alt="Gallery"
                    width={80}
                    height={80}
                    className="rounded-md border"
                  />
                )
            )}
          </div>
        </div>

        {/* Switches */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={form.isFeatured}
              onCheckedChange={(v) => handleToggle("isFeatured", v)}
            />
            <span>Featured Product</span>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={form.isActive}
              onCheckedChange={(v) => handleToggle("isActive", v)}
            />
            <span>Active Product</span>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={saving}
          className="w-full mt-4 font-medium"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
