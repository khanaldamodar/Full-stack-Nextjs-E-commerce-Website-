"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface OrderType {
  shippingAddress: string;
  paymentMethod: string;
}

export default function Page() {
  const [order, setOrder] = useState<OrderType>({
    shippingAddress: "",
    paymentMethod: "COD",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(order), // only sends shippingAddress & paymentMethod
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order added successfully!");
        setOrder({
          shippingAddress: "",
          paymentMethod: "COD",
        });
      } else {
        alert(`Error: ${data.message || "Could not add Order"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 bg-zinc-800 w-6/10 rounded p-5">
        <h1 className="text-2xl text-white font-bold text-center mb-2 pt-4">
          Add Order
        </h1>
        <form onSubmit={handleAddOrder}>
          <div className="rounded-xl p-2 gap-4 shadow-lg justify-center items-center mx-auto grid grid-cols-2">

            {/* Product Id & Quantity (UI only) */}
            <div className="flex-col flex gap-4">
              <label htmlFor="productId" className="text-xl text-white">
                Product Id
              </label>
              <input
                type="number"
                id="productId"
                className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="Product Id"
                disabled
              />
</div>
<div className="flex-col flex gap-4">
              <label htmlFor="productQuantity" className="text-xl text-white">
                Product Quantity
              </label>
              <input
                type="text"
                id="productQuantity"
                className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="Product Quantity"
                disabled
              />
            </div>

            {/* Shipping Address */}
            <div className="flex-col flex gap-4 w-full">
              <label htmlFor="shippingAddress" className="text-xl text-white">
                Shipping Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                required
                value={order.shippingAddress}
                onChange={(e) =>
                  setOrder({ ...order, shippingAddress: e.target.value })
                }
                className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="e.g. Kathmandu, Nepal"
              />
            </div>

            {/* Payment Method */}
            <div className="flex-col flex gap-4 w-full">
              <label htmlFor="paymentMethod" className="text-xl text-white">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={order.paymentMethod}
                onChange={(e) =>
                  setOrder({ ...order, paymentMethod: e.target.value })
                }
                className="p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mx-auto items-center pb-2">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-white hover:bg-zinc-100 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
