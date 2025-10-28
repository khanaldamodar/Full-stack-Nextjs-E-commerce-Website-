"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useOrders } from "@/hooks/use-orders"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ChevronRight, Lock } from "lucide-react"

interface CheckoutData {
  shippingAddress: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export default function PaymentPage() {
  const router = useRouter()
  const { cart, isLoaded, subtotal, tax, total, clearCart } = useCart()
  const { createOrder } = useOrders()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData")
    if (data) {
      setCheckoutData(JSON.parse(data))
    } else {
      router.push("/checkout")
    }
  }, [router])

  if (!isLoaded || !checkoutData) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background">
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

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target

    // Format card number
    if (name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    }

    // Format expiry date
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "")
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4)
      }
    }

    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4)
    }

    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    // Validate payment method
    if (paymentMethod === "credit-card") {
      if (!cardData.cardName || !cardData.cardNumber || !cardData.expiryDate || !cardData.cvv) {
        alert("Please fill in all card details")
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const orderNumber = `ORD-${Date.now()}`
      const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

      const order = createOrder({
        orderNumber,
        date: new Date().toISOString().split("T")[0],
        items: cart,
        subtotal,
        tax,
        shipping: 0,
        total,
        status: "processing",
        shippingAddress: checkoutData.shippingAddress,
        paymentMethod: paymentMethod === "credit-card" ? "Credit Card" : "PayPal",
        estimatedDelivery,
      })

      // Clear cart and redirect
      clearCart()
      sessionStorage.removeItem("checkoutData")
      router.push(`/order-confirmation/${order.id}`)
    }, 2000)
  }

  return (
    <main className="min-h-screen font-poppins py-15">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Payment</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Cart</span>
            <ChevronRight className="h-4 w-4" />
            <span>Shipping</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Payment</span>
            <ChevronRight className="h-4 w-4" />
            <span>Confirmation</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Payment Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-card/50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                  <div>
                    <p className="font-medium text-foreground">Credit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-card/50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                  <div>
                    <p className="font-medium text-foreground">PayPal</p>
                    <p className="text-sm text-muted-foreground">Fast and secure payment</p>
                  </div>
                </label>
              </div>
            </Card>

            {/* Credit Card Form */}
            {paymentMethod === "credit-card" && (
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Card Details</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={cardData.cardName}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="mt-2 font-mono"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="mt-2 font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="mt-2 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* PayPal Info */}
            {paymentMethod === "paypal" && (
              <Card className="p-6">
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                  <p className="font-medium">You will be redirected to PayPal to complete your payment securely.</p>
                </div>
              </Card>
            )}

            {/* Billing Address Summary */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Billing Address</h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{checkoutData.billingAddress.fullName}</p>
                <p>{checkoutData.billingAddress.address}</p>
                <p>
                  {checkoutData.billingAddress.city}, {checkoutData.billingAddress.state}{" "}
                  {checkoutData.billingAddress.zipCode}
                </p>
                <p>{checkoutData.billingAddress.country}</p>
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
                  <span className="text-muted-foreground">Tax (10%)</span>
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

              <Button className="mt-6 w-full bg-secondary" size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Place Order
                  </>
                )}
              </Button>

              <Link href="/checkout">
                <Button variant="outline" className="mt-3 w-full bg-transparent">
                  Back to Checkout
                </Button>
              </Link>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Your payment information is secure and encrypted
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
