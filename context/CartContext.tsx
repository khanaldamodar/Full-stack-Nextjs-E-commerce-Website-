"use client"

import React, { createContext, useContext } from "react"
import { useCart, CartItem } from "@/hooks/use-cart"

interface CartContextValue {
  cart: CartItem[]
  isLoaded: boolean
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  subtotal: number
  tax: number
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartState = useCart()
  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
