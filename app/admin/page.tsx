"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/admin-components/Card";

interface DashboardType {
  totalProducts: number;
  totalPackages: number;
  totalCategories: number;
  totalBrands: number;
  totalOrders: number;
  totalPayments: number;
}

const Page = () => {
  const [dashboard, setDashboard] = useState<DashboardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard");
        const data: DashboardType = await res.json();
        setDashboard(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading Dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!dashboard) return <div className="p-6">No data available.</div>;

  const stats = [
    { label: "Total Brands", value: dashboard.totalBrands },
    { label: "Total Products", value: dashboard.totalProducts },
    { label: "Total Packages", value: dashboard.totalPackages },
    { label: "Total Payments", value: dashboard.totalPayments },
    { label: "Total Orders", value: dashboard.totalOrders },
    { label: "Total Categories", value: dashboard.totalCategories },
  ];

  return (
    <div className="min-h-screen sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {stats.map((item, index) => (
          <Card key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default Page;
