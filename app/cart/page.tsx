'use client'

import { CartItem } from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"
import { useCart } from '@/context/cart-context'
import { useOrder } from "@/context/order-context"
import Link from 'next/link'
import { ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react"

export default function CartPage() {
    const { cart } = useCart()
    const { createOrder } = useOrder()
    const total = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0).toFixed(2)
    
    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6"> 
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">Shopping Cart</h1>
                <span className="text-sm font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-full">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {cart.length === 0 ? (
                <div className="bg-white border border-[var(--color-border)] rounded-3xl flex flex-col items-center justify-center gap-3 p-12 text-center shadow-xs">
                    <div className="size-16 rounded-2xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)]">
                        <ShoppingBag size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-text)]">
                        Your cart is empty
                    </h2>
                    <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
                        Explore our selection of fresh dairy and artisan cheese and add your favorite items.
                    </p>
                    <Link href="/products" className="mt-3">
                        <Button
                            text="Start shopping"
                            icon={<ArrowRight size={16} />}
                            className="px-6 h-11 text-base font-semibold"
                        />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Items List */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                        {cart.map((item, index) => (
                            <CartItem
                                key={`${item.product.id}-${item.selectedWeight}-${index}`}
                                product={item.product}
                            />
                        ))}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 shadow-xs flex flex-col gap-4 sticky top-24">
                        <h2 className="text-lg font-semibold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
                            Order Summary
                        </h2>
                        
                        <div className="flex flex-col gap-2.5 text-sm">
                            <div className="flex justify-between text-[var(--color-text-muted)]">
                                <span>Items ({cart.length})</span>
                                <span className="font-medium text-[var(--color-text)]">{total}$</span>
                            </div>
                            <div className="flex justify-between text-[var(--color-text-muted)]">
                                <span>Delivery</span>
                                <span className="font-medium text-emerald-600">Free pickup</span>
                            </div>
                        </div>

                        <div className="border-t border-[var(--color-border)] pt-3 flex justify-between items-baseline">
                            <span className="text-base font-semibold text-[var(--color-text)]">Total</span>
                            <span className="text-2xl font-extrabold text-[var(--color-blue)]">{total}$</span>
                        </div>

                        <Button 
                            className="w-full h-12 text-base font-semibold shadow-sm" 
                            text="Place an order" 
                            onClick={createOrder}
                        />

                        <Link href="/products" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[var(--color-blue)] hover:underline pt-1"> 
                            <ArrowLeft size={16} />
                            <span>Continue shopping</span>
                        </Link>
                    </div>
                </div>
            )}
        </main>
    )
}
