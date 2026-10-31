'use client'

import { useOrder } from "@/context/order-context"
import Link from "next/link"
import { Button } from "../ui/button"
import { CartItem } from "../cart/cart-item"
import { ArrowLeft, ClipboardList } from "lucide-react"

export function OrderDetails({orderID}: {orderID: string}) {
    const { orderList } = useOrder()
    const orderItem = orderList.find((item) => item.id === orderID)
    
    if (!orderItem) {
        return (
            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="size-16 rounded-2xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)]">
                    <ClipboardList size={32} />
                </div>
                <h1 className="text-2xl font-bold text-[var(--color-text)]">
                    Order not found
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
                    We couldn&apos;t find an order with ID №{orderID}.
                </p>
                <Link href="/orders" className="mt-2">
                    <Button text="Back to all orders" variant="secondary" className="px-5 h-10 text-sm" />
                </Link>
            </main>
        )
    }

    return (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
            <Link 
                href="/orders" 
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-blue)] transition-colors self-start"
            >
                <ArrowLeft size={18} />
                <span>Back to orders</span>
            </Link>

            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[var(--color-border)]">
                    <div>
                        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">
                            Order details
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
                            №{orderItem.id}
                        </h1>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            Placed on {orderItem.date}
                        </p>
                    </div>

                    <div className="flex sm:flex-col sm:items-end gap-2">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                            orderItem.delivered 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                            <span className={`size-1.5 rounded-full ${orderItem.delivered ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {orderItem.delivered ? 'Delivered' : 'In preparation'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        Items ({orderItem.items.length})
                    </h2>
                    <div className="flex flex-col gap-3">
                        {orderItem.items.map((item, index) => (
                            <CartItem
                                key={`${item.product.id}-${item.selectedWeight}-${index}`}
                                product={item.product}
                                quantity={item.quantity}
                                selectedWeight={item.selectedWeight}
                                price={item.totalPrice}
                                readOnly
                            />
                        ))}
                    </div>
                </div>

                <div className="border-t border-[var(--color-border)] pt-4 flex justify-between items-baseline">
                    <span className="text-base font-semibold text-[var(--color-text)]">Total paid</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-blue)]">
                        {orderItem.total.toFixed(2)}$
                    </span>
                </div>
            </div>
        </main>
    )
}
