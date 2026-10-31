
'use client'

import { OrderItem } from '@/components/order/order-item'
import { useOrder } from '@/context/order-context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OrdersPage() {
    const { orderList } = useOrder()

    return (
        <section className="flex flex-col gap-4 p-4 md:max-w-130 md:mx-auto">
            <h2 className="text-3xl flex justify-center">My orders</h2>

            <div className="border border-[var(--color-border)] rounded-lg p-2 h-[660px] overflow-y-auto md:h-[500px]">
                {orderList.length === 0 ? (
                    <div className="min-h-[644px] md:min-h-[484px] flex flex-col items-center justify-center gap-1 px-4">
                        <h2 className="text-2xl font-semibold">
                            No orders found
                        </h2>

                        <p className="mt-2 text-gray-500 text-center">
                            Go to cart and make your order.
                        </p>

                        <Link href="/cart">
                            <Button
                                text="to cart page"
                                className="px-4 max-w-fit"
                                variant="secondary"
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
            </div>
        </section>
    )
}
