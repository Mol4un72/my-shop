import { OrderDetails } from "@/components/order/order-details"
import { Suspense } from "react"

type Props = {
    params: Promise<{ id: string }>
}

export default function OrderID({params}: Props) {
    return(
        <>
            <Suspense fallback={null}>
                <OrderIDPage params={params}/>
            </Suspense>
        </>
    )
}

async function OrderIDPage({params}: Props) {
    const { id } = await params
    
    return(
        <>
            <OrderDetails orderID={id}/>
        </>
    )
}