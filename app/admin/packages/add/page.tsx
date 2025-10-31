"use client";

import { useState } from "react";

interface Product {
  uniqueId: number;
  productValue: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([{ uniqueId: Date.now(), productValue: "" }]);

  const handleAddProduct = () => {
    setProducts([...products, { uniqueId: Date.now(), productValue: "" }]);
  };

  const handleChangeProduct = (uniqueId: number, value: string) => {
    const updatedProducts = products.map(p =>
      p.uniqueId === uniqueId ? { ...p, productValue: value } : p
    );
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (uniqueId: number) => {
    setProducts(products.filter(p => p.uniqueId !== uniqueId));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-3 gap-6 bg-zinc-800 p-4">
      <h1 className="text-2xl text-white font-bold text-center mb-2 pt-2">Add Packages</h1>
      <form>
        <div className="rounded-xl p-2 gap-4 shadow-lg grid grid-cols-3 w-full">
          {/* Package Name */}
          <div className="flex-col flex gap-4">
            <label htmlFor="packageName" className="text-xl text-white">Package Name</label>
            <input
              type="text"
              id="packageName"
              name="packageName"
              required
              placeholder="Package Name"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Description */}
          <div className="flex-col flex gap-4">
            <label htmlFor="packageDescription" className="text-xl text-white">Description</label>
            <input
              type="text"
              id="packageDescription"
              name="packageDescription"
              required
              placeholder="Package Description"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Price */}
          <div className="flex-col flex gap-4">
            <label htmlFor="price" className="text-xl text-white">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              required
              placeholder="Price"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Discount */}
          <div className="flex-col flex gap-4">
            <label htmlFor="discount" className="text-xl text-white">Discount</label>
            <input
              type="text"
              id="discount"
              name="discount"
              required
              placeholder="Discount"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Stock */}
          <div className="flex-col flex gap-4">
            <label htmlFor="stock" className="text-xl text-white">Stock</label>
            <input
              type="text"
              id="stock"
              name="stock"
              required
              placeholder="Stock"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Image */}
          <div className="flex-col flex gap-4">
            <label htmlFor="packageImage" className="text-xl text-white">Image</label>
            <input
              type="file"
              id="packageImage"
              name="packageImage"
              className="p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Featured */}
          <div className="flex-col flex gap-2">
            <label className="text-xl text-white">Featured</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <input type="radio" name="featured" value="yes" className="w-4 h-4 accent-zinc-900" required /> Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="featured" value="no" className="w-4 h-4 accent-zinc-900" /> No
              </label>
            </div>
          </div>

          {/* Active */}
          <div className="flex-col flex gap-2">
            <label className="text-xl text-white">Active</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <input type="radio" name="active" value="yes" className="w-4 h-4 accent-zinc-900" required /> Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="active" value="no" className="w-4 h-4 accent-zinc-900" /> No
              </label>
            </div>
          </div>

          {/* Products dynamic dropdown */}
          <div className="flex-col flex gap-2 col-span-3">
            <label className="text-xl text-white">Products</label>
            {products.map((p, index) => (
              <div key={p.uniqueId} className="flex gap-2 items-center mt-2">
                <select
                  value={p.productValue}
                  onChange={(e) => handleChangeProduct(p.uniqueId, e.target.value)}
                  className="flex-1 p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  <option value="">Select a Product</option>
                  <option value="product1">Product 1</option>
                  <option value="product2">Product 2</option>
                  <option value="product3">Product 3</option>
                </select>

                {index === products.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="bg-green-500 text-white p-2 rounded-xl"
                  >
                    +
                  </button>
                )}

                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(p.uniqueId)}
                    className="bg-red-500 text-white p-2 rounded-xl"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-white hover:bg-zinc-100 text-black font-bold py-3 px-8 rounded-2xl transition-all duration-200"
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
}
