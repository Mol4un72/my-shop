'use client'

import { OrderItem } from '@/components/order/order-item'
import { useOrder } from '@/context/order-context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ClipboardList, ArrowRight } from 'lucide-react'

export default function OrdersPage() {
    const { orderList } = useOrder()

    return (
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">My Orders</h1>
                <span className="text-sm font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-full">
                    {orderList.length} {orderList.length === 1 ? 'order' : 'orders'}
                </span>
            </div>

            {orderList.length === 0 ? (
                <div className="bg-white border border-[var(--color-border)] rounded-3xl flex flex-col items-center justify-center gap-3 p-12 text-center shadow-xs">
                    <div className="size-16 rounded-2xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)]">
                        <ClipboardList size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-text)]">
                        No orders yet
                    </h2>
                    <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
                        You haven&apos;t placed any orders yet. Add items to your cart to make your first order.
                    </p>
                    <Link href="/products" className="mt-3">
                        <Button
                            text="Explore catalog"
                            icon={<ArrowRight size={16} />}
                            className="px-6 h-11 text-base font-semibold"
                        />
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {orderList.map((order) => (
                        <Link key={order.id} href={`/orders/${order.id}`}>
                            <OrderItem order={order} />
                        </Link>
                    ))}
                </div>
            )}
        </main>
    )
}
