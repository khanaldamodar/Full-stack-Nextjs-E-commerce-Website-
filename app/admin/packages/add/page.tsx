"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Upload } from "lucide-react";
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

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  const [searchProductQuery, setSearchProductQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products
  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchProductQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchProductQuery, products]);

  const handleAddProduct = (product: any) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  // Fetch categories
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onError = (errors: any) => {
    if (errors.price) toast.error(errors.price.message);
    if (errors.discount) toast.error(errors.discount.message);
    if (errors.stock) toast.error(errors.stock.message);
  };

  const onSubmit = async (data: any) => {
    if (selectedProducts.length < 2) {
      return toast.error("Please select at least 2 products");
    }

    if (!selectedCategories[0]) {
      return toast.error("Please select a category");
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

      if (selectedImage) formData.append("image", selectedImage);

      selectedProducts.forEach((product) => {
        formData.append("productIds[]", product.id);
      });

      formData.append("categoryId", selectedCategories[0].id.toString());

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

            {/* Category Dropdown */}
            <div className="mt-6">
              <label className="block mb-2 font-medium">Category</label>
              <select
                name="categoryId"
                value={selectedCategories[0]?.id || ""}
                onChange={(e) => {
                  const selected = categories.find(
                    (cat) => cat.id === Number(e.target.value)
                  );
                  setSelectedCategories(selected ? [selected] : []);
                }}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Products</h3>
              <div className="relative mb-3">
                <Input
                  placeholder="Search product..."
                  className="pl-3"
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Creating Package..." : "Create Package"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
