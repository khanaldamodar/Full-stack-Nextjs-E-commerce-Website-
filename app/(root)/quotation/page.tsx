"use client";

import Heading from "@/components/global/Heading";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Quotation() {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="mt-20 font-poppins font-semibold min-h-screen py-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="text-center mb-4">
        <Heading title="Quotation" />
      </div>

      {step === 1 && <PersonalDetails onNext={() => setStep(2)} />}
      {step === 2 && (
        <QuotationDetails onBack={() => setStep(1)} categories={categories} />
      )}
    </div>
  );
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  categoryId: number;
}

interface Selection {
  category?: Category;
  products: number[];
}

export function PersonalDetails({ onNext }: { onNext: () => void }) {
  const [formData, setFormData] = useState({
    organization: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleNext = () => {
    const { organization, name, email, phone, address } = formData;

    if (
      [organization, name, email, phone, address].some(
        (val) => val.trim() === ""
      )
    ) {
      toast.error("Please fill all personal details.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number (digits only).");
      return;
    }

    onNext();
  };

  return (
    <div className="flex justify-center items-start">
      <form className="bg-white rounded-3xl w-full max-w-3xl p-10 shadow-lg">
        <h2 className="text-black underline underline-offset-8 text-2xl font-bold mb-8">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="organization"
              className="mb-2 text-gray-700 font-medium"
            >
              Organization Name
            </label>
            <input
              type="text"
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#9bb648] transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#9bb648] transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#9bb648] transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#9bb648] transition"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="mb-2 text-gray-700 font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#9bb648] transition"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={handleNext}
            className="bg-[#9bb648] text-white font-semibold py-3 px-8 rounded-xl transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export function QuotationDetails({
  onBack,
  categories,
}: {
  onBack: () => void;
  categories: Category[];
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selections, setSelections] = useState<Selection[]>([
    { category: undefined, products: [] },
  ]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const productsByCategory = (categoryId: number) =>
    products.filter((p) => p.categoryId === categoryId);

  const handleCategoryChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const cat = categories.find((c) => c.id === Number(e.target.value));
    setSelections((prev) =>
      prev.map((sel, i) =>
        i === index ? { ...sel, category: cat, products: [] } : sel
      )
    );
  };

  const handleProductToggle = (index: number, productId: number) => {
    setSelections((prev) =>
      prev.map((sel, i) =>
        i === index
          ? {
              ...sel,
              products: sel.products.includes(productId)
                ? sel.products.filter((id) => id !== productId)
                : [...sel.products, productId],
            }
          : sel
      )
    );
  };

  const addSelection = () => {
    setSelections((prev) => [...prev, { category: undefined, products: [] }]);
  };

  const undoSelection = () => {
    setSelections((prev) => prev.slice(0, prev.length - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allValid = selections.every(
      (sel) => sel.category && sel.products.length > 0
    );
    if (!allValid) {
      toast.error("Please complete all selections.");
      return;
    }

    console.log("Submitted", selections);
    toast.success("Quotation submitted successfully!");
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl w-full max-w-3xl p-10 shadow-lg"
      >
        <h2 className="text-black underline underline-offset-8 text-2xl font-bold">
          Quotation Details
        </h2>

        
        {selections.map((sel, index) => (
          <div key={index} className="mb-6 border p-4 rounded-lg">
            <div className="mb-4">
              <label className="block mb-2 font-medium">Category</label>
              <select
                value={sel.category?.id || ""}
                onChange={(e) => handleCategoryChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">-- Select Category --</option>

                
                {categories
                  .filter(
                    (cat) =>
                      !selections.some(
                        (s, i) => i !== index && s.category?.id === cat.id
                      )
                  )
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Products</label>
              {sel.category ? (
                productsByCategory(sel.category.id).length === 0 ? (
                  <p className="text-gray-500">No products available</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {productsByCategory(sel.category.id).map((product) => (
                      <label
                        key={product.id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={sel.products.includes(product.id)}
                          onChange={() =>
                            handleProductToggle(index, product.id)
                          }
                        />
                        {product.name}
                      </label>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-gray-500">Select a category first</p>
              )}
            </div>
          </div>
        ))}

        
        <div className="flex items-center mb-6">
          
          {selections[selections.length - 1].category &&
            selections[selections.length - 1].products.length > 0 && (
              <button
                type="button"
                onClick={addSelection}
                className="bg-[#9bb648] text-white font-semibold py-2 px-6 rounded-xl transition"
              >
                + Add Another Category
              </button>
            )}

          
          {selections.length > 1 && (
            <button
              type="button"
              onClick={undoSelection}
              className="ml-4 bg-red-500 text-white font-semibold py-2 px-6 rounded-xl transition"
            >
              -
            </button>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition"
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-[#9bb648] text-white font-semibold py-3 px-8 rounded-xl transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
