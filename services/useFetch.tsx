import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useFetch<T = any>(endpoint: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    async function fetchData() {
      try {
        const response = await fetch(`/api/${endpoint}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...(options.headers || {}),
          },
        });

        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
}
