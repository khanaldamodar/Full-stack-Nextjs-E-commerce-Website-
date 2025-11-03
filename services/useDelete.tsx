'use client';
import { useState } from 'react';

export interface UseDeleteResult {
  deleteItem: (id: string | number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

/**
 * A reusable hook to delete an item from API and update local state
 * @param data - the current array of items
 * @param setData - setter for updating the data array
 * @param apiEndpoint - the base endpoint for deletion (e.g., '/api/brands')
 */
export function useDelete<T extends { id: string | number }>(
  data: T[],
  setData: React.Dispatch<React.SetStateAction<T[]>>,
  apiEndpoint: string
): UseDeleteResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async (id: string | number): Promise<boolean> => {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return false;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      // Update local state
      setData(prev => prev.filter(item => item.id !== id));

      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete item');
      setLoading(false);
      return false;
    }
  };

  return { deleteItem, loading, error };
}
