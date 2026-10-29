import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/mock/products'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ArrowLeft } from "lucide-react";
import { WeightChoose } from '@/components/products/weight-choose'
import { ProductActions } from '@/components/products/[id]/product-actions'

type Props = {
    params: Promise<{ id: string }>
}

export default function ProductsID({ params }: Props) {
    return (
        <main>
            <Suspense fallback={null}>
                <ProductDetails params={params} />
            </Suspense>
        </main>
    )
}

async function ProductDetails({ params }: Props) {
    const { id } = await params

    const product = products.find((product) => product.id === id)

    if (!product) {
        notFound()  
    }

    return (
        <section className='flex flex-col items-center gap-4 px-6 mt-2'>
            <Link href={`/products`} 
                className='
                    flex items-center gap-2 text-2xl
                    md:hidden
                '
            >
                <ArrowLeft className='size-5'/><p>Back to products</p>
            </Link>
            <div 
                className='
                    flex flex-col gap-4
                    md:flex-row md:mt-10
                '
            >
                <Image
                    src={product.imageUrl}
                    width={1000}
                    height={1000}
                    alt={product.name}
                    className='
                        w-full rounded-lg aspect-[4/3] object-cover
                        md:h-100
                    '
                />
                <div 
                    className='
                        flex flex-col gap-6
                        md:w-full
                    '
                >
                    <div>
                        <h2 className='text-4xl'>{product.name}</h2>
                        <div className='flex justify-between'>
                            <p>{product.producer}</p>
                            <p className='text-[var(--color-blue)]/80'>{product.availability}</p>
                        </div>
                    </div>
                    <p className='text-2xl text-[var(--color-blue)]'>{product.price} $</p>

                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[var(--color-text-muted)]'>Weight</h3>
                        <WeightChoose />
                    </div>

                    <div>
                        <h3>Description</h3>
                        <p className='text-[var(--color-text-muted)]'>{product.description}</p>
                    </div>

                    <ProductActions />
                    
                </div>
            </div>
        </section>
    )
}