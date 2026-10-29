'use client'

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { Product } from '@/mock/products'

type CartItem = {
  product: Product
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: Product['id']) => void
  updateQuantity: (id: Product['id'], quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(
        item => item.product.id === product.id
      )

      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { product, quantity: 1 }]
    })
  }

  function removeFromCart(id: Product['id']) {
    setCart(prev =>
      prev.filter(item => item.product.id !== id)
    )
  }

  function updateQuantity(id: Product['id'], quantity: number) {
    const item = cart.find(item => item.product.id === id)
    setCart(prev =>
      prev.map(item =>
        item.product.id === id
          ? {...item, quantity}
          : item
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
