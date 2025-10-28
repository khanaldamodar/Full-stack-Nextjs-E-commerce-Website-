"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, isLoaded, subtotal, tax, total } = useCart()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [billingData, setBillingData] = useState(formData)

  if (!isLoaded) {
    return (
      <main className="min-h-screen font-poppins">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen font-poppins">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">Your cart is empty</p>
              <Link href="/products">
                <Button className="mt-4">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (sameAsBilling) {
      setBillingData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBillingData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    // Validate form
    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
      alert("Please fill in all required fields")
      return
    }

    // Store checkout data in sessionStorage for next step
    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({
        shippingAddress: formData,
        billingAddress: sameAsBilling ? formData : billingData,
      }),
    )

    router.push("/payment")
  }

  return (
    <main className="min-h-screen font-poppins">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Cart</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Shipping</span>
            <ChevronRight className="h-4 w-4" />
            <span>Payment</span>
            <ChevronRight className="h-4 w-4" />
            <span>Confirmation</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Shipping Address</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>

            {/* Billing Address */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sameAsBilling"
                  checked={sameAsBilling}
                  onChange={(e) => setSameAsBilling(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="sameAsBilling" className="font-medium cursor-pointer">
                  Billing address same as shipping
                </Label>
              </div>

              {!sameAsBilling && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="billingFullName">Full Name *</Label>
                    <Input
                      id="billingFullName"
                      name="fullName"
                      value={billingData.fullName}
                      onChange={handleBillingChange}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingEmail">Email *</Label>
                    <Input
                      id="billingEmail"
                      name="email"
                      type="email"
                      value={billingData.email}
                      onChange={handleBillingChange}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="billingAddress">Street Address *</Label>
                    <Input
                      id="billingAddress"
                      name="address"
                      value={billingData.address}
                      onChange={handleBillingChange}
                      placeholder="123 Main Street"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingCity">City *</Label>
                    <Input
                      id="billingCity"
                      name="city"
                      value={billingData.city}
                      onChange={handleBillingChange}
                      placeholder="New York"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingState">State/Province *</Label>
                    <Input
                      id="billingState"
                      name="state"
                      value={billingData.state}
                      onChange={handleBillingChange}
                      placeholder="NY"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingZipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="billingZipCode"
                      name="zipCode"
                      value={billingData.zipCode}
                      onChange={handleBillingChange}
                      placeholder="10001"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Shipping Method */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Shipping Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-card/50">
                  <input type="radio" name="shipping" value="standard" defaultChecked className="h-4 w-4" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Standard Shipping</p>
                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                  </div>
                  <span className="font-semibold text-foreground">Free</span>
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-card/50">
                  <input type="radio" name="shipping" value="express" className="h-4 w-4" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Express Shipping</p>
                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                  </div>
                  <span className="font-semibold text-foreground">Rs. 15.00</span>
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-card/50">
                  <input type="radio" name="shipping" value="overnight" className="h-4 w-4" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Overnight Shipping</p>
                    <p className="text-sm text-muted-foreground">Next business day</p>
                  </div>
                  <span className="font-semibold text-foreground">Rs. 35.00</span>
                </label>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Order Summary</h2>

              <div className="mb-4 max-h-64 space-y-3 overflow-y-auto border-b border-border pb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-foreground">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (13%)</span>
                  <span className="font-medium text-foreground">Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">Free</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">Rs. {total.toFixed(2)}</span>
              </div>

              <Button className="mt-6 w-full bg-secondary cursor-pointer" size="lg" onClick={handleContinue} >
                Continue to Payment
              </Button>

              <Link href="/cart">
                <Button variant="outline" className="mt-3 w-full bg-primary hover:bg-secondary hover:text-white cursor-pointer">
                  Back to Cart
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
