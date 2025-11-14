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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPackagePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);

  const [searchProductQuery, setSearchProductQuery] = useState("");
  const [searchCategoryQuery, setSearchCategoryQuery] = useState("");
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

  // Filter products by search
  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchProductQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchProductQuery, products]);

  // Add product to selected list
  const handleAddProduct = (product: any) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Remove product
  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  // Fetch all categories
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data);
        setFilteredCategories(res.data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Filter categories by search
  useEffect(() => {
    const results = categories.filter((c) =>
      c.name.toLowerCase().includes(searchCategoryQuery.toLowerCase())
    );
    setFilteredCategories(results);
  }, [searchCategoryQuery, categories]);

  // Add category to selected list
  const handleAddCategories = (category: any) => {
    if (!selectedCategories.find((c) => c.id === category.id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Remove category
  const handleRemoveCategories = (id: number) => {
    setSelectedCategories(selectedCategories.filter((c) => c.id !== id));
  };

  // Handle image file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission errors
  const onError = (errors: any) => {
    if (errors.price) toast.error(errors.price.message);
    if (errors.discount) toast.error(errors.discount.message);
    if (errors.stock) toast.error(errors.stock.message);
  };

  // Submit form
  const onSubmit = async (data: any) => {
    if (selectedProducts.length === 0) {
      return toast.error("Please select at least one product");
    }

    if (data.price < 0) return toast.error("Price cannot be negative");
    if (data.discount < 0) return toast.error("Discount cannot be negative");
    if (data.stock < 0) return toast.error("Stock cannot be negative");

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("discount", (data.discount ?? 0).toString());
      formData.append("stock", data.stock.toString());
      formData.append("isFeatured", data.isFeatured ? "true" : "false");
      formData.append("isActive", data.isActive ? "true" : "false");

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      selectedProducts.forEach((product) => {
        formData.append("productIds[]", product.id);
      });

      selectedCategories.forEach((category) => {
        formData.append("categoryIds[]", category.id);
      });

      await axios.post("/api/packages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      });

      toast.success("Package created successfully");
      reset();
      setSelectedProducts([]);
      setSelectedCategories([]);
      setSelectedImage(null);
      setImagePreview(null);
      router.push("/admin/packages");
    } catch (error: any) {
      console.error(
        "Error creating package:",
        error.response?.data || error.message
      );
      toast.error("Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Add New Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            {/* Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("name", { required: "Package name is required" })}
                placeholder="Package Name"
              />
              <Input
                {...register("price", {
                  valueAsNumber: true,
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                })}
                type="number"
                placeholder="Price"
              />
            </div>

            {/* Discount & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("discount", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Discount cannot be negative" },
                  max: { value: 100, message: "Discount cannot exceed 100%" },
                })}
                type="number"
                placeholder="Discount %"
              />
              <Input
                {...register("stock", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Stock cannot be negative" },
                })}
                type="number"
                placeholder="Stock"
              />
            </div>

            {/* Description */}
            <Textarea
              {...register("description")}
              placeholder="Package Description"
              rows={3}
            />

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
                <input
                  type="checkbox"
                  defaultChecked
                  {...register("isActive")}
                />{" "}
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
                  value={searchProductQuery}
                  onChange={(e) => setSearchProductQuery(e.target.value)}
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

            {/* Category Selection */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Select Categories</h3>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search category..."
                  className="pl-10"
                  value={searchCategoryQuery}
                  onChange={(e) => setSearchCategoryQuery(e.target.value)}
                />
              </div>

              <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between py-2 border-b last:border-none"
                    >
                      <span>{category.name}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddCategories(category)}
                      >
                        Add
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center">
                    No categories found
                  </p>
                )}
              </div>

              {selectedCategories.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Selected Categories</h4>
                  <div className="space-y-2">
                    {selectedCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between bg-gray-50 border rounded-md p-2"
                      >
                        <span>{category.name}</span>
                        <Trash2
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          onClick={() => handleRemoveCategories(category.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Creating Package..." : "Create Package"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
