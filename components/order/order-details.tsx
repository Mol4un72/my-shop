'use client'

import { useOrder } from "@/context/order-context"
import Link from "next/link"
import { Button } from "../ui/button"
import { CartItem } from "../cart/cart-item"
import { ArrowLeft } from "lucide-react"

export function OrderDetails({orderID}: {orderID: string}) {

    const { orderList } = useOrder()
    const orderItem = orderList.find((item) => item.id == orderID)
    
    return(
        <>
            <div className="flex flex-col gap-4 p-4 md:max-w-130 md:mx-auto">
                <h2 className="text-3xl flex justify-center">Order №{orderItem?.id}</h2>
        
                <div className="border border-[var(--color-border)] rounded-lg p-2 h-[500px] overflow-y-auto md:h-[400px]">
                    {orderList.length === 0 ? (
                        <div className="h-[484px] md:h-[384px] flex flex-col items-center justify-center gap-1 px-4">
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
                            {orderItem?.items.map((item, index) => (
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
                    )}
                </div>
                <Link className="flex flex-row justify-center" href={`/orders`}>
                    <ArrowLeft />Back to orders
                </Link>
            </div>
        </>
    )
}