'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/mock/products'
import { CountButton } from '../ui/count-button'
import { X } from 'lucide-react'
import { useCart } from '@/context/cart-context'

export function CartItem({ product }: {product: Product}) {

    const { cart, removeFromCart, updateQuantity } = useCart()
    const cartItem = cart.find(item => item.product.id === product.id)
    const quantity = cartItem?.quantity ?? 1
    
    return(
        <>
            <article
                className='flex gap-4 border border-[var(--color-border)] rounded-lg p-4'
            >
                <Image 
                    src={product?.imageUrl}
                    width={100}
                    height={100}
                    alt={product?.name}
                    className='aspect-[4/3] rounded-lg'
                />
                <div className='flex flex-1 flex-col'>
                    <h3>{product.name}</h3>
                    <p className='text-[var(--color-text-muted)] text-sm'>{product.weight}</p>
                    <h3 className='mt-auto text-[var(--color-blue)]'>{(product.price * quantity).toFixed(2)}$</h3>
                </div>
                <div className='flex flex-col items-end justify-between ml-auto'>
                    <button onClick={() => removeFromCart(product.id)}><X size={20} /></button>
                    <CountButton onMinus={() => updateQuantity(product.id, Math.max(1, quantity - 1))} onPlus={() => updateQuantity(product.id, quantity + 1)} value={quantity}/>
                </div>
            </article>
        </>
    )
}