"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Search, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";

export default function AddPackagePage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch products from API
  useEffect(() => {
    axios.get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Filter products dynamically
  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  // ✅ Add product to selected list
  const handleAddProduct = (product: any) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // ✅ Remove product from selection
  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  // ✅ Image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  // ✅ Submit package
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("discount", data.discount || "0");
      formData.append("stock", data.stock || "0");
      formData.append("isFeatured", data.isFeatured ? "true" : "false");
      formData.append("isActive", data.isActive ? "true" : "false");
      if (data.image?.[0]) formData.append("image", data.image[0]);

      selectedProducts.forEach((product) => {
        formData.append("productIds[]", product.id);
      });

      await axios.post("/api/packages", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        
        },
      });

      reset();
      setSelectedProducts([]);
      router.push("/admin/packages");
    } catch (error: any) {
      console.error("Error creating package:", error.response?.data || error.message);
      alert("Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add New Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input {...register("name", { required: true })} placeholder="Package Name" />
              <Input {...register("price", { required: true })} type="number" placeholder="Price" />
            </div>

            {/* Discount & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input {...register("discount")} type="number" placeholder="Discount %" />
              <Input {...register("stock")} type="number" placeholder="Stock" />
            </div>

            {/* Description */}
            <Textarea {...register("description")} placeholder="Package Description" rows={3} />

            {/* Image Upload */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Upload className="w-5 h-5 text-gray-600" />
                <span>Upload Image</span>
                <input {...register("image")} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              {imagePreview && (
                <Image src={imagePreview} alt="Preview" width={100} height={100} className="rounded-lg object-cover" />
              )}
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("isFeatured")} />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked {...register("isActive")} />
                Active
              </label>
            </div>

            {/* Product Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Products</h3>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search product..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Product List */}
              <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between py-2 border-b last:border-none"
                    >
                      <span>{product.name}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddProduct(product)}
                      >
                        Add
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center">No products found</p>
                )}
              </div>

              {/* Selected Products */}
              {selectedProducts.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Selected Products</h4>
                  <div className="space-y-2">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between bg-gray-50 border rounded-md p-2"
                      >
                        <span>{product.name}</span>
                        <Trash2
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          onClick={() => handleRemoveProduct(product.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? "Creating Package..." : "Create Package"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
