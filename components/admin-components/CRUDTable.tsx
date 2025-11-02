"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface CRUDTableProps {
  endpoint: string;
  columns: string[];
}

export default function CRUDTable({ endpoint, columns }: CRUDTableProps) {
  const [data, setData] = useState<any[]>([]);
  const token = Cookies.get("token");
  const router = useRouter();

const fetchData = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    const result = await res.json();

    // pick the array from API response
    const items = result.categories || result.data || result; 
    setData(Array.isArray(items) ? items : []);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};


  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5">
            <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 w-12 text-center">SN</th>
            {columns.map((col) => (
              <th key={col} className="border p-2">
                {col}
              </th>
            ))}
            <th className="border p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-zinc-700">
              <td className="border p-2 text-center">{index + 1}</td>
              {columns.map((col) => (
                <td key={col} className="border p-2">
                  {item[col]}
                </td>
              ))}
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  className="bg-yellow-400 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 rounded"
                  
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
