"use client"

import React from 'react'
import { useEffect, useState } from "react"
import { useOrders } from "@/hooks/use-orders"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"

const STATUS_STEPS = [
  { status: "pending", label: "Order Placed", icon: Clock },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: CheckCircle },
]

export default function OrderTrackingPage({ params }: { params: { id: number } }) {

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
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-background">
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

  const currentStepIndex = STATUS_STEPS.findIndex((step) => step.status === order.status)

  return (
    <main className="min-h-screen font-poppins">
      <div className="mx-auto max-w-7xl px-4 py-30 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Track Your Order</h1>
          <p className="mt-2 text-muted-foreground">Order {order.orderNumber}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold text-foreground">Delivery Status</h2>

              <div className="space-y-6">
                {STATUS_STEPS.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = index <= currentStepIndex
                  const isCurrent = index === currentStepIndex

                  return (
                    <div key={step.status} className="flex gap-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            isCompleted ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {index < STATUS_STEPS.length - 1 && (
                          <div className={`w-1 h-12 ${isCompleted ? "bg-green-600" : "bg-muted"}`} />
                        )}
                      </div>

                      {/* Status Info */}
                      <div className="pb-6">
                        <h3 className={`font-semibold ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </h3>
                        {isCurrent && <p className="mt-1 text-sm text-green-600 font-medium">Current Status</p>}
                        {isCompleted && !isCurrent && <p className="mt-1 text-sm text-muted-foreground">Completed</p>}
                        {!isCompleted && <p className="mt-1 text-sm text-muted-foreground">Pending</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Order Items */}
            <Card className="mt-6 p-6">
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
                        <span className="font-medium text-foreground">Rs. {item.price.toFixed(2)}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Order Details</h2>

              <div className="space-y-4 border-b border-border pb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="mt-1 font-semibold text-foreground">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="mt-1 font-semibold text-foreground">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="mt-1 font-semibold text-foreground">{order.estimatedDelivery}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">Rs. {order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium text-foreground">Rs. {order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">Free</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">Rs. {order.total.toFixed(2)}</span>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/orders">
                  <Button className="w-full bg-secondary text-white hover:bg-primary" variant="outline">
                    View All Orders
                  </Button>
                </Link>

                <Link href="/products">
                  <Button className="w-full bg-primary hover:bg-secondary" variant="ghost">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
