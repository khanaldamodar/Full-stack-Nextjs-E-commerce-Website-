"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export interface UseDeleteResult {
  deleteItem: (id: string | number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useDelete<T extends { id: string | number }>(
  data: T[],
  setData: React.Dispatch<React.SetStateAction<T[]>>,
  apiEndpoint: string
): UseDeleteResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async (id: string | number): Promise<boolean> => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return false;

    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${apiEndpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete item");
      }

      setData(prev => prev.filter(item => item.id !== id));
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete item");
      setLoading(false);
      return false;
    }
  };

  return { deleteItem, loading, error };
}
