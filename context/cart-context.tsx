'use client'

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { Product } from '@/mock/products'
import type { ReadyToBuyProduct } from '@/components/products/product-item'

type CartContextType = {
  cart: ReadyToBuyProduct[]
  addToCart: (item: ReadyToBuyProduct) => void
  removeFromCart: (id: Product['id']) => void
  updateQuantity: (id: Product['id'], quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ReadyToBuyProduct[]>([])

  function addToCart(newItem: ReadyToBuyProduct) {
    setCart(prev => {
      const existing = prev.find(
        item => 
          item.product.id === newItem.product.id &&
          item.selectedWeight === newItem.selectedWeight &&
          item.totalPrice === newItem.totalPrice
      )

      if (existing) {
        return prev.map(item =>
          item.product.id === newItem.product.id &&
          item.selectedWeight === newItem.selectedWeight &&
          item.totalPrice === newItem.totalPrice
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, newItem]
    })
  }

  function removeFromCart(id: Product['id']) {
    setCart(prev =>
      prev.filter(item => item.product.id !== id)
    )
  }

  function updateQuantity(id: Product['id'], quantity: number) {
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
