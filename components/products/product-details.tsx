'use client'

import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from "lucide-react";
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { CountButton } from '../ui/count-button';
import type { Product } from '@/mock/products'
import { useCart } from '@/context/cart-context'
import { ReadyToBuyProduct } from './product-item';

type Props = {
   product: Product
}

export function ProductDetails({ product }: Props) {

    const[readyProduct, setReadyProduct] = useState<ReadyToBuyProduct>({
        product: product,
        quantity: 1,
        selectedWeight: product.weight[0],
        totalPrice: product.category === 'dairy'
            ? (product.price as number[])[0]
            : (product.price as number)
    })
    const [weightIndex, setWeightIndex] = useState(0)
    const weights = product.weight
    const price = product.category === 'cheese'
        ? (readyProduct.product.price as number) * weights[weightIndex] / 100
        : (readyProduct.product.price as number[])[weightIndex]
    const { addToCart } = useCart()
        
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
                    <p className='text-2xl text-[var(--color-blue)]'>{(price * readyProduct.quantity).toFixed(2)}$</p>

                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[var(--color-text-muted)]'>Weight</h3>
                        <div className='flex flex-row gap-2'>
                            {weights.map((value, index) => (
                                <Button 
                                    key={value}
                                    text={`${value}g`}
                                    variant={weightIndex === index ? "weight_choose" : "secondary"}
                                    onClick={() => {
                                        setWeightIndex(index)
                                                                        
                                        const newPrice = product.category === 'cheese'
                                            ? (product.price as number) * weights[index] / 100
                                            : (product.price as number[])[index]
                                                                        
                                        setReadyProduct(prev => ({
                                            ...prev,
                                            selectedWeight: weights[index],
                                            totalPrice: newPrice
                                        }))
                                    }}
                                    className="h-10"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3>Description</h3>
                        <p className='text-[var(--color-text-muted)]'>{product.description}</p>
                    </div>
                    <div className='flex flex-row gap-6'>
                        <CountButton 
                            value={readyProduct.quantity} 
                            onMinus={() => setReadyProduct(prev => ({
                                ...prev,
                                quantity: Math.max(1, prev.quantity - 1)
                            }))}
                            onPlus={() => setReadyProduct(prev => ({
                                ...prev,
                                quantity: prev.quantity + 1
                            }))}
                            className='min-w-25'
                        />
                        <Button
                            text="add to cart" 
                            icon={<ShoppingCart size={18}/>}
                            className='h-10 w-full text-xl'
                            onClick={() => {
                                    addToCart(readyProduct)
                                    console.log(readyProduct)
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}