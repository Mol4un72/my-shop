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
                    className='rounded-lg min-h-16 aspect-square md:min-h-30 w-full md:max-h-45 lg:max-h-55'
                />
                <div>
                    <p className='text-lg md:text-xl lg:text-2xl'>{product.name}</p>
                    <p className='text-[var(--color-text-muted)]'>{product.price}</p>
                </div>
                <div className='flex flex-row gap-1'>
                    <Button 
                        text="Buy"
                        className='w-full min-h-8 md:min-h-8'
                        icon={<ShoppingCart size={15} className='mt-1'/>}
                    />
                </div>
            </article>
        </>
    )
}