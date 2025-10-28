"use client"

import { useState, useEffect, useCallback } from "react"

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
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
  paymentMethod: string
  estimatedDelivery: string
}

const ORDERS_COOKIE_NAME = "user_orders"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load orders from cookies on mount
  useEffect(() => {
    const loadOrders = () => {
      try {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith(ORDERS_COOKIE_NAME + "="))
          ?.split("=")[1]

        if (cookieValue) {
          const decodedOrders = JSON.parse(decodeURIComponent(cookieValue))
          setOrders(decodedOrders)
        }
      } catch (error) {
        console.error("Error loading orders from cookies:", error)
      }
      setIsLoaded(true)
    }

    loadOrders()
  }, [])

  // Save orders to cookies
  const saveOrdersToCookie = useCallback((items: Order[]) => {
    try {
      const ordersJson = JSON.stringify(items)
      const encodedOrders = encodeURIComponent(ordersJson)
      document.cookie = `${ORDERS_COOKIE_NAME}=${encodedOrders}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year
    } catch (error) {
      console.error("Error saving orders to cookies:", error)
    }
  }, [])

  // Create new order
  const createOrder = useCallback(
    (orderData: Omit<Order, "id">) => {
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
      }

      setOrders((prevOrders) => {
        const updatedOrders = [newOrder, ...prevOrders]
        saveOrdersToCookie(updatedOrders)
        return updatedOrders
      })

      return newOrder
    },
    [saveOrdersToCookie],
  )

  // Update order status
  const updateOrderStatus = useCallback(
    (orderId: string, status: Order["status"]) => {
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
        saveOrdersToCookie(updatedOrders)
        return updatedOrders
      })
    },
    [saveOrdersToCookie],
  )

  // Get order by ID
  const getOrder = useCallback(
    (orderId: string) => {
      return orders.find((order) => order.id === orderId)
    },
    [orders],
  )

  return {
    orders,
    isLoaded,
    createOrder,
    updateOrderStatus,
    getOrder,
  }
}
