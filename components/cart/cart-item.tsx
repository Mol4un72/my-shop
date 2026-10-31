import Image from 'next/image'
import type { Product } from '@/mock/products'
import { CountButton } from '../ui/count-button'
import { X } from 'lucide-react'
import { useCart } from '@/context/cart-context'

type Props = {
    product: Product
    quantity?: number
    selectedWeight?: number
    price?: number
    readOnly?: boolean
    isOrder?: boolean
}

export function CartItem({
    product,
    quantity: propQuantity,
    selectedWeight: propWeight,
    price: propPrice,
    readOnly = false,
    isOrder = false,
}: Props) {

    const { cart, removeFromCart, updateQuantity } = useCart()
    const cartItem = cart.find(item => item.product.id === product.id)
    const quantity = propQuantity ?? cartItem?.quantity ?? 1
    const selectedWeight = propWeight ?? cartItem?.selectedWeight
    const weightIndex = cartItem
        ? cartItem.product.weight.indexOf(cartItem.selectedWeight)
        : -1
    const price = propPrice ?? (cartItem?.product.category === 'cheese'
        ? (cartItem?.product.price as number) * cartItem?.selectedWeight / 100
        : (cartItem?.product.price as number[])[weightIndex])
    const isReadOnly = readOnly || isOrder
    
    return(
        <article
            className='bg-white border border-[var(--color-border)] rounded-2xl p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-shadow flex gap-3.5 sm:gap-4 items-center'
        >
            <div className='overflow-hidden rounded-xl size-20 sm:size-24 shrink-0 bg-[var(--color-surface)]'>
                <Image 
                    src={product.imageUrl}
                    width={100}
                    height={100}
                    alt={product.name}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='flex flex-1 flex-col min-w-0'>
                <h3 className='font-semibold text-sm sm:text-base text-[var(--color-text)] truncate'>
                    {product.name}
                </h3>
                {selectedWeight && (
                    <span className='text-xs font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-0.5 rounded-md w-fit mt-1'>
                        {selectedWeight}g
                    </span>
                )}
                <p className='mt-2 text-base sm:text-lg font-bold text-[var(--color-blue)]'>
                    {typeof price === 'number' ? `${price.toFixed(2)}$` : `${price}$`}
                </p>
            </div>
            <div className='flex flex-col items-end justify-between self-stretch ml-auto shrink-0'>
                {isReadOnly ? (
                    <span className='text-sm font-semibold text-[var(--color-text)] bg-[var(--color-surface)] px-2.5 py-1 rounded-lg mt-auto'>
                        ×{quantity}
                    </span>
                ) : (
                    <>
                        <button 
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className='cursor-pointer p-1 rounded-lg text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 transition-colors'
                            aria-label={`Remove ${product.name} from cart`}
                        >
                            <X size={18} />
                        </button>
                        <CountButton 
                            onMinus={() => updateQuantity(product.id, Math.max(1, quantity - 1))} 
                            onPlus={() => updateQuantity(product.id, quantity + 1)} 
                            value={quantity}
                        />
                    </>
                )}
            </div>
        </article>
    )
}
