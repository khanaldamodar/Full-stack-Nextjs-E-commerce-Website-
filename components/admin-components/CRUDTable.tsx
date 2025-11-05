"use client";

import { useRouter } from "next/navigation";
import { useDelete } from "@/services/useDelete";

interface CRUDTableProps {
  endpoint: string;                 
  columns: string[];               
  data: any[];                     
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function CRUDTable({ endpoint, columns, data, setData }: CRUDTableProps) {
  const router = useRouter();

  
  const { deleteItem, loading: deleting } = useDelete(data, setData, `/api/${endpoint}`);

  if (!data || data.length === 0) {
    return <div className="p-5 text-gray-400 text-center">No data available</div>;
  }

  return (
<div className="w-full p-5 overflow-x-auto flex">
  <table className="w-full min-w-[600px] max-w-[1600px] border-collapse border">

    <thead className="bg-green-100">
      <tr>
        <th className="border p-2 w-20 text-center">SN</th>
        {columns.map((col) => (
          <th
            key={col}
            className="border p-2 capitalize text-left whitespace-nowrap"
          >
            {col}
          </th>
        ))}
        <th className="border p-2 w-60 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {data.map((item, index) => (
        <tr key={item.id} className="hover:bg-green-200">
          <td className="border p-2 text-center">{index + 1}</td>

          {columns.map((col) => (
            <td key={col} className="border p-2 whitespace-nowrap">
              {Array.isArray(item[col])
                ? item[col].map((subItem: any) => subItem.name).join(", ")
                : item[col]}
            </td>
          ))}

          <td className="border p-2 w-60 flex gap-2 justify-center">
            <button
              className="bg-yellow-400 px-3 py-1 rounded text-sm"  
              onClick={() => router.push(`/admin/${endpoint}/edit/${item.id}`)}
            >
              Edit
            </button>

            <button
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              onClick={() => router.push(`/admin/${endpoint}/view/${item.id}`)}
            >
              View
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded text-sm" 
              onClick={() => deleteItem(item.id)}
              disabled={deleting}
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
