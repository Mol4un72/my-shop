'use client'

import { useState } from 'react'
import { Product } from '@/mock/products'  
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import Link from 'next/link'

export type ReadyToBuyProduct = {
    product: Product
    quantity: number
    selectedWeight: number
    totalPrice: number
}

export function ProductItem({ product }: {product: Product}) {

    const { addToCart } = useCart()
    const[readyProduct, setReadyProduct] = useState<ReadyToBuyProduct>({
        product: product,
        quantity: 1,
        selectedWeight: product.weight[0],
        totalPrice: product.category === 'dairy'
            ? (product.price as number[])[0]
            : (product.price as number)
    })
    
    return(
        <>
            <article 
                className="flex flex-col gap-2 border border-[var(--color-border)] rounded-lg w-full min-h-50 p-2"
            >
                <Link key={product.id} href={`/products/${product.id}`}>
                    <Image
                        src={product.imageUrl}
                        alt="Product Image"
                        width={200}
                        height={150}
                        className='rounded-lg min-h-16 aspect-square md:min-h-30 w-full md:max-h-45 lg:max-h-55'
                    />
                    <div>
                        <h3 className='text-lg md:text-xl lg:text-2xl'>{product.name}</h3>
                        <div className="flex flex-row">
                            <p className='text-[var(--color-text-muted)]'>{product.weight.join(' / ')} g</p>
                        </div>
                        <p className="text-[var(--color-blue)]">
                            {product.category === 'dairy'
                                ? (product.price as number[])[0]
                                : product.price as number
                            }$
                        </p>
                    </div>
                </Link>
                <div className='flex flex-row gap-1'>
                    <Button 
                        text="add to cart"
                        className='w-full min-h-8 md:min-h-8'
                        icon={<ShoppingCart size={15} className='mt-1'/>}
                        onClick={() => addToCart(readyProduct)}
                    />
                </div>
            </article>
        </>
    )
}