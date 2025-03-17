"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  date: string
  status: "Обработка" | "Подтвержден" | "В пути" | "Доставлен" | "Отменен"
  address?: string
  paymentMethod?: string
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (items: OrderItem[], address: string, paymentMethod: string) => string
  getOrderById: (id: string) => Order | undefined
  cancelOrder: (id: string) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on initial render
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addOrder = (items: OrderItem[], address: string, paymentMethod: string): string => {
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0)

    const newOrder: Order = {
      id: orderId,
      items,
      totalAmount,
      date: new Date().toISOString(),
      status: "Обработка",
      address,
      paymentMethod,
    }

    setOrders((prevOrders) => [newOrder, ...prevOrders])
    return orderId
  }

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id)
  }

  const cancelOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.map((order) => (order.id === id ? { ...order, status: "Отменен" } : order)))
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        cancelOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

