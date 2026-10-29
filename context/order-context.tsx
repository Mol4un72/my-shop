'use client'

import { useContext, createContext, useState, ReactNode } from "react";
import type { Product } from '@/mock/products'
import { useCart } from '@/context/cart-context'

type OrderItem = {
    product: Product
    quantity: number
}

export type Order = {
    id: string
    items: OrderItem[]
    total: number
    date: string
    delivered: boolean
}

type OrderList = Order[]

type OrderContextType = {
    orderList: OrderList
    createOrder: () => void
    removeOrder: (id: string) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({children}: {children: ReactNode}) {
    const[orderList, setOrder] = useState<OrderList>([])
    const { cart, clearCart } = useCart()
    
    
    function createOrder() {
        if (cart.length == 0) return
        const newOrder: Order = {
            id: crypto.randomUUID().slice(0,8),
            items: cart,
            total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            date: new Date().toISOString(),
            delivered: false,
        }
        setOrder(prev => [...prev, newOrder])
        clearCart()
    }

    function removeOrder(id: string) {
        setOrder(prev => 
            prev.filter((item) => item.id !== id)
        )
    }

    return(
           <OrderContext.Provider
               value={{ orderList, createOrder, removeOrder}}
           >
               {children}
           </OrderContext.Provider>
       )
}

export function useOrder() {
    const context = useContext(OrderContext)

    if (!context) {
        throw new Error('useOrder must be used inside OrderProvider')
    }

    return context
}