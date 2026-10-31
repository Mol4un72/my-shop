import { Suspense } from 'react'
import { products } from '@/mock/products'
import { notFound } from 'next/navigation'
import { ProductDetails } from '@/components/products/product-details'

type Props = {
    params: Promise<{ id: string }>
}

export default function ProductsID({ params }: Props) {
    return (
        <Suspense fallback={null}>
            <ProductPageContent params={params} />
        </Suspense>
    )
}

async function ProductPageContent({ params }: Props) {
    const { id } = await params
    const product = products.find((item) => item.id === id)

    if (!product) {
        notFound()
    }

    return <ProductDetails product={product} />
}