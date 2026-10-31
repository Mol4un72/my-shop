'use client'

import { CartItem } from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"
import { useCart } from '@/context/cart-context'
import { useOrder } from "@/context/order-context"
import Link from 'next/link'

export default function CartPage() {

    const { cart } = useCart()
    const { createOrder } = useOrder()
    const total = cart.reduce((sum, item) => {return sum += item.totalPrice * item.quantity}, 0).toFixed(2)
    
    return (
        <>
            <section className="flex flex-col p-6 gap-2 md:max-w-200 md:flex-row md:mx-auto"> 
                <div className="flex flex-col w-full">
                    <div className="flex justify-between md:hidden">
                        <h2 className="text-2xl">Cart</h2>
                        <p className="mt-auto">{cart.length} items</p>
                    </div>
                    {cart.length === 0 ? (
                        <div className="h-[400px] border rounded-lg border-[var(--color-border)] flex flex-col items-center justify-center gap-1 p-4 text-center">
                            <h2 className="text-2xl font-semibold">
                                Your cart is empty
                            </h2>
                            <p className="mt-2 text-gray-500">
                                Add products to your cart.
                            </p>
                            <Link href="/products">
                                <Button
                                    text="go to shopping"
                                    className="px-4 max-w-fit"
                                    variant="secondary"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="h-[400px] p-2 border rounded-lg border-[var(--color-border)] overflow-y-auto flex flex-col gap-4">
                            {cart.map((item) => (
                                <CartItem
                                    key={item.product.id}
                                    product={item.product}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4 md:gap-2 md:min-w-60 md:h-fit">
                    <div className="flex flex-col bg-[var(--color-surface)] w-full h-full flex-1 rounded-lg p-3 gap-2">
                        <div>
                            <div className="flex justify-between">
                                <p className="text-[var(--color-text-muted)]">Products({cart.length})</p>
                                <p className="text-sm">
                                    {total}$
                                </p>
                            </div>
                        </div>
                        <hr className="text-[var(--color-border)]"/>
                        <div className="flex justify-between">
                            <p className="text-xl">All</p>
                            <p>
                                {total}$
                            </p>
                        </div>
                    </div>
                    <Button className="h-12 text-lg" text='Place an order' onClick={createOrder}/>
                    <Link href={`/products`} className="flex justify-center"> 
                        <button className="text-lg text-[var(--color-blue)]">Continue shopping</button>
                    </Link>
                </div>
            </section>
        </>
    )
}