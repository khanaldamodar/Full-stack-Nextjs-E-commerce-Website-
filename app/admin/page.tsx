"use client";
import React from "react";
import Card from "@/components/admin-components/Card";
const stats = [
  { label: "Brands", value: 1726 },
  { label: "Product", value: 1726 },
  { label: "Packages", value: 1726 },
  { label: "jnfiwuefnuwef", value: 1726 },
  { label: "jnfiwuefnuwef", value: 1726 },
];

const Page = () => {
  return (
    <div className="min-h-screen p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((item, index) => (
          <Card key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default Page;
