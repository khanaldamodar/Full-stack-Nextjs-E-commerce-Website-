"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Edit, Eye, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  title = "Table Data",
  onView,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  // ✅ Filter data by search
  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lower)
      )
    );
  }, [data, search]);

  // ✅ Sort data
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const valA = String(a[sortKey]);
      const valB = String(b[sortKey]);
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [filtered, sortKey, sortAsc]);

  // ✅ Paginate data
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, page]);

  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <Card className="shadow-md border rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <motion.table
          className="w-full text-left border-collapse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <thead className="bg-gray-100 dark:bg-gray-800 text-sm uppercase text-gray-600">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => {
                    if (sortKey === col.key) setSortAsc(!sortAsc);
                    else {
                      setSortKey(col.key);
                      setSortAsc(true);
                    }
                  }}
                  className="px-4 py-3 cursor-pointer select-none hover:text-primary transition-colors"
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">{sortAsc ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
              {(onEdit || onDelete || onView) && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className={clsx(
                    "border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                  )}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-sm">
                      {col.render ? col.render(item) : String(item[col.key])}
                    </td>
                  ))}

                  {(onEdit || onDelete || onView) && (
                    <td className="px-4 py-3 flex gap-2">
                      {onView && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(item)}
                          className="hover:text-blue-600"
                        >
                          <Eye size={18} />
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          className="hover:text-green-600"
                        >
                          <Edit size={18} />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item)}
                          className="hover:text-red-600 text-red-800"
                        >
                          <Trash2 size={18} />
                        </Button>
                      )}
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-6 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
