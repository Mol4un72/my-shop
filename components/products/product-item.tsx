import { Product } from '@/types/product'  
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function ProductItem({ product }: {product: Product}) {
    return(
        <>
            <article 
                className="flex flex-col gap-2 border border-[var(--color-border)] rounded-lg w-full min-h-50 p-2"
            >
                <Image
                    src={product.imageUrl}
                    alt="Product Image"
                    width={200}
                    height={150}
                    className='rounded-lg md:h-40 w-full'
                />
                <div>
                    <p>{product.name}</p>
                    <p className='text-[var(--color-text-muted)]'>{product.price}</p>
                </div>
                <div className='flex flex-row gap-1'>
                    <Button 
                        text="Buy"
                        className='w-full min-h-8 md:min-h-10'
                        icon={<ShoppingCart size={15} className='mt-1'/>}
                    />
                </div>
            </article>
        </>
    )
}