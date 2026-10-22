import Image from 'next/image'
import type { Product } from '@/types/product'
import { CountButton } from '../ui/count-button'
import { X } from 'lucide-react'

export function CartItem({ product }: {product: Product}) {
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
                    <p className='text-[var(--color-text-muted)] text-sm'>100g</p>
                    <h3 className='mt-auto text-[var(--color-blue)]'>{product.price}</h3>
                </div>
                <div className='flex flex-col items-end justify-between ml-auto'>
                    <button><X size={20} /></button>
                    <CountButton variant='cart_item' />
                </div>
            </article>
        </>
    )
}