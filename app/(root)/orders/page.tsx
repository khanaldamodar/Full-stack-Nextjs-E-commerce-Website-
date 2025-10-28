"use client"

import { useEffect, useState } from "react"
import { useOrders } from "@/hooks/use-orders"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"

export default function OrdersPage() {
  const { orders, isLoaded } = useOrders()
  const [displayOrders, setDisplayOrders] = useState<any[]>([])

  useEffect(() => {
    if (isLoaded) {
      setDisplayOrders(orders)
    }
  }, [isLoaded, orders])

  if (!isLoaded) {
    return (
      <main className="min-h-screen font-poppins py-15">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen font-poppins py-15">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
          <p className="mt-2 text-muted-foreground">{displayOrders.length} order(s) found</p>
        </div>

        {displayOrders.length === 0 ? (
          <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-foreground">No orders yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Start shopping to place your first order</p>
              <Link href="/products">
                <Button className="mt-4">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {displayOrders.map((order) => (
              <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-foreground">{order.orderNumber}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Order Date</p>
                        <p className="font-medium text-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Items</p>
                        <p className="font-medium text-foreground">{order.items.length} item(s)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Est. Delivery</p>
                        <p className="font-medium text-foreground">{order.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>

                  <Link href={`/order-tracking/${order.id}`}>
                    <Button variant="outline" size="sm">
                      Track <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
