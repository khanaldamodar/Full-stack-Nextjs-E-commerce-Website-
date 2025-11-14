"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";
import { Search, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const packageId = params.id;

  const { register, handleSubmit, reset, setValue } = useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Fetch package details
  useEffect(() => {
    axios
      .get(`/api/packages/${packageId}`)
      .then((res) => {
        const pkg = res.data;
        setValue("name", pkg.name);
        setValue("price", pkg.price);
        setValue("discount", pkg.discount);
        setValue("stock", pkg.stock);
        setValue("description", pkg.description);
        setValue("isFeatured", pkg.isFeatured);
        setValue("isActive", pkg.isActive);
        setSelectedProducts(pkg.products || []);
        if (pkg.imageUrl) setImagePreview(pkg.imageUrl);
      })
      .catch((err) => console.error("Error fetching package:", err));
  }, [packageId, setValue]);

  // Filter products by search
  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleAddProduct = (product: any) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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

      // Append image if changed
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // Send product IDs as JSON string
      formData.append(
        "productIds",
        JSON.stringify(selectedProducts.map((p) => p.id))
      );

      const token = Cookies.get("token") || "";

      await axios.put(`/api/packages/${packageId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Package updated successfully");
      router.push("/admin/packages");
    } catch (error: any) {
      console.error(
        "Error updating package:",
        error.response?.data,
        error.response?.status
      );
      toast.error("Failed to update package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Edit Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Package Name</span>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Package Name"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Price</span>
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Price"
                />
              </label>
            </div>

            {/* Discount & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Discount %</span>
                <Input
                  {...register("discount")}
                  type="number"
                  placeholder="Discount %"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1 font-medium">Stock</span>
                <Input
                  {...register("stock")}
                  type="number"
                  placeholder="Stock"
                />
              </label>
            </div>

            {/* Description */}
            <label className="flex flex-col">
              <span className="mb-1 font-medium">Description</span>
              <Textarea
                {...register("description")}
                placeholder="Package Description"
                rows={3}
              />
            </label>

            {/* Image Upload */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Upload className="w-5 h-5 text-gray-600" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              )}
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("isFeatured")} /> Featured
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("isActive")} /> Active
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
                  <p className="text-gray-500 text-sm text-center">
                    No products found
                  </p>
                )}
              </div>

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
            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Updating Package..." : "Update Package"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
