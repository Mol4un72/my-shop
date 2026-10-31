'use client'

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

    const readyProduct: ReadyToBuyProduct = {
        product: product,
        quantity: 1,
        selectedWeight: product.weight[0],
        totalPrice: product.category === 'dairy'
            ? (product.price as number[])[0]
            : (product.price as number)
    }

    const displayPrice = product.category === 'dairy'
        ? (product.price as number[])[0]
        : product.price as number
    
    return(
        <article 
            className="group relative bg-white border border-[var(--color-border)] rounded-2xl p-3 flex flex-col justify-between hover:shadow-md hover:border-[var(--color-blue)]/40 transition-all duration-200"
        >
            <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
                <div className="overflow-hidden rounded-xl aspect-[4/3] bg-[var(--color-surface)] mb-2.5">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={300}
                        height={225}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
                        {product.category}
                    </span>
                    <h3 className='font-semibold text-base md:text-lg text-[var(--color-text)] line-clamp-1 group-hover:text-[var(--color-blue)] transition-colors mt-0.5'>
                        {product.name}
                    </h3>
                    <p className='text-xs text-[var(--color-text-muted)] mt-0.5'>
                        {product.weight.join(' / ')} g
                    </p>
                    <p className="text-lg font-bold text-[var(--color-blue)] mt-auto pt-2">
                        {displayPrice}$
                    </p>
                </div>
            </Link>
            <div className='mt-3'>
                <Button 
                    text="Add to cart"
                    className='w-full h-9 text-sm'
                    icon={<ShoppingCart size={15} />}
                    onClick={() => addToCart(readyProduct)}
                />
            </div>
        </article>
    )
}
