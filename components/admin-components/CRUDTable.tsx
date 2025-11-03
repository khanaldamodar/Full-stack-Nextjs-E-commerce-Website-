"use client";

import { useRouter } from "next/navigation";
interface CRUDTableProps {
  endpoint: string; 
  columns: string[];
  data: any[];
}

export default function CRUDTable({ endpoint, columns, data }: CRUDTableProps) {
  const router = useRouter();

  if (!data || data.length === 0) {
    return <div className="p-5 text-gray-400 text-center">No data available</div>;
  }

  return (
    <div className="p-5 overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 w-12 text-center">SN</th>
            {columns.map((col) => (
              <th key={col} className="border p-2 capitalize text-left">
                {col}
              </th>
            ))}
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-green-400">
              <td className="border p-2 text-center">{index + 1}</td>

              {columns.map((col) => (
                <td key={col} className="border p-2">
                  {Array.isArray(item[col])
                    ? item[col].map((subItem: any) => subItem.name).join(", ")
                    : item[col]}
                </td>
              ))}

              <td className="border p-2 flex gap-2 justify-center">
                <button
                  className="bg-yellow-400 px-2 rounded"
                  onClick={() => router.push(`/admin/${endpoint}/edit/${item.id}`)}
                >
                  Edit
                </button>
                <button className="bg-blue-500 text-white px-2 rounded">
                  View
                </button>
                <button className="bg-red-500 text-white px-2 rounded">
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