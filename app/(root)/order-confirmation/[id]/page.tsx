"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Truck, MapPin } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const {id} = React.use(params)
  const { getOrder, isLoaded } = useOrders()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (isLoaded) {
      const foundOrder = getOrder(id)
      setOrder(foundOrder)
    }
  }, [isLoaded, params.id, getOrder])

  if (!isLoaded) {
    return (
      <main className="min-h-screen font-poppins">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="min-h-screen font-poppins py-15">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">Order not found</p>
              <Link href="/products">
                <Button className="mt-4">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-15 font-poppins">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Thank you for your purchase</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Number and Date */}
            <Card className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{order.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="mt-1 text-lg font-semibold text-blue-600 capitalize">{order.status}</p>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Order Items</h2>

              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 border-b border-border pb-4 last:border-0">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="mt-2 text-sm">
                        <span className="text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="mx-2 text-muted-foreground">×</span>
                        <span className="font-medium text-foreground">${item.price.toFixed(2)}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h2 className="mb-3 text-lg font-bold text-foreground">Shipping Address</h2>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    <p className="mt-2">{order.shippingAddress.email}</p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="font-medium text-foreground">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">Free</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
              </div>

              <div className="mt-6 space-y-3">
                <Link href={`/order-tracking/${order.id}`}>
                  <Button className="w-full" variant="default">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                </Link>

                <Link href="/products">
                  <Button className="w-full bg-transparent" variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                A confirmation email has been sent to {order.shippingAddress.email}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
