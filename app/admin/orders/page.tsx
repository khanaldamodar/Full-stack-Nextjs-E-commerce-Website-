"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";

interface OrderType {
  id: number;
  name: string;
}

const OrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch Orders");
        const data: OrderType[] = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading Orders...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="h-screen flex flex-col">

      {/* main content */}
      <div className="flex-1 p-4">
        {orders.length > 0 ? (
          <CRUDTable
            endpoint="orders"
            columns={["name"]}
            data={orders}
            setData={setOrders} 
          />
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No Orders Found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

