'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from '@/components/ui/button'
import { CountButton } from '../ui/count-button'
import type { Product } from '@/mock/products'
import { useCart } from '@/context/cart-context'
import { ReadyToBuyProduct } from './product-item'

type Props = {
   product: Product
}

export function ProductDetails({ product }: Props) {
    const [weightIndex, setWeightIndex] = useState(0)
    const weights = product.weight

    const initialPrice = product.category === 'cheese'
        ? (product.price as number) * weights[0] / 100
        : (product.price as number[])[0]

    const [readyProduct, setReadyProduct] = useState<ReadyToBuyProduct>({
        product: product,
        quantity: 1,
        selectedWeight: weights[0],
        totalPrice: initialPrice
    })
    
    const [isAdded, setIsAdded] = useState(false)
    const { addToCart } = useCart()

    // Slider state
    const images = (product.images && product.images.length > 0 ? product.images : [product.imageUrl]).slice(0, 3)
    const [activeSlide, setActiveSlide] = useState(0)
    const [touchStart, setTouchStart] = useState<number | null>(null)

    function handlePrevSlide() {
        setActiveSlide((prev) => (prev - 1 + images.length) % images.length)
    }

    function handleNextSlide() {
        setActiveSlide((prev) => (prev + 1) % images.length)
    }

    function handleTouchStart(e: React.TouchEvent) {
        setTouchStart(e.targetTouches[0].clientX)
    }

    function handleTouchEnd(e: React.TouchEvent) {
        if (touchStart === null) return
        const touchEnd = e.changedTouches[0].clientX
        const distance = touchStart - touchEnd
        if (distance > 40 && images.length > 1) handleNextSlide()
        if (distance < -40 && images.length > 1) handlePrevSlide()
        setTouchStart(null)
    }

    const price = product.category === 'cheese'
        ? (product.price as number) * weights[weightIndex] / 100
        : (product.price as number[])[weightIndex]

    function handleAddToCart() {
        addToCart(readyProduct)
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 1500)
    }
        
    return (
        <section className='max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6'>
            <Link 
                href="/products" 
                className='inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-blue)] transition-colors self-start'
            >
                <ArrowLeft size={18} />
                <span>Back to products</span>
            </Link>

            <div className='bg-white border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start'>
                {/* Photo Slider */}
                <div 
                    className='group relative overflow-hidden rounded-2xl aspect-[4/3] bg-[var(--color-surface)] shadow-2xs select-none'
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Slides track */}
                    <div 
                        className="flex w-full h-full transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    >
                        {images.map((src, index) => (
                            <div key={index} className="w-full h-full shrink-0 relative">
                                <Image
                                    src={src}
                                    width={800}
                                    height={600}
                                    alt={`${product.name} - Photo ${index + 1}`}
                                    className='w-full h-full object-cover'
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* PC Desktop Arrows with hover effect */}
                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrevSlide}
                                aria-label="Previous photo"
                                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/85 backdrop-blur-xs text-[var(--color-navy)] items-center justify-center shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                                <ChevronLeft size={22} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNextSlide}
                                aria-label="Next photo"
                                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/85 backdrop-blur-xs text-[var(--color-navy)] items-center justify-center shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                                <ChevronRight size={22} />
                            </button>
                        </>
                    )}

                    {/* Dots pagination: maximum 3 dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-xs">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActiveSlide(idx)}
                                aria-label={`Slide ${idx + 1}`}
                                className={`cursor-pointer rounded-full transition-all duration-200 ${
                                    activeSlide === idx
                                        ? 'w-5 h-2 bg-white'
                                        : 'size-2 bg-white/60 hover:bg-white/90'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className='flex flex-col gap-6'>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2.5 py-1 rounded-md">
                                {product.category}
                            </span>
                            {product.species && (
                                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                                    • {product.species}
                                </span>
                            )}
                        </div>
                        <h1 className='text-3xl sm:text-4xl font-bold text-[var(--color-text)]'>
                            {product.name}
                        </h1>
                        <div className='flex items-center justify-between mt-2 text-sm'>
                            {product.producer && (
                                <p className='text-[var(--color-text-muted)]'>
                                    Producer: <span className="text-[var(--color-text)] font-medium">{product.producer}</span>
                                </p>
                            )}
                            {product.availability && (
                                <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full'>
                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                    {product.availability}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="border-y border-[var(--color-border)] py-4 flex items-baseline gap-2">
                        <span className='text-3xl sm:text-4xl font-extrabold text-[var(--color-blue)]'>
                            {(price * readyProduct.quantity).toFixed(2)}$
                        </span>
                        {readyProduct.quantity > 1 && (
                            <span className="text-xs text-[var(--color-text-muted)]">
                                ({price.toFixed(2)}$ / item)
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]'>
                            Select weight
                        </h2>
                        <div className='flex flex-wrap gap-2'>
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
                                    className="min-w-20 h-10 text-sm font-medium"
                                />
                            ))}
                        </div>
                    </div>

                    {product.description && (
                        <div className="flex flex-col gap-1">
                            <h2 className='text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]'>
                                Description
                            </h2>
                            <p className='text-sm text-[var(--color-text-muted)] leading-relaxed'>
                                {product.description}
                            </p>
                        </div>
                    )}

                    <div className='flex flex-row items-center gap-3 pt-2'>
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
                            className='min-w-28 h-12'
                        />
                        <Button
                            text={isAdded ? "Added!" : "Add to cart"} 
                            icon={isAdded ? <CheckCircle2 size={18} /> : <ShoppingCart size={18}/>}
                            className={`h-12 flex-1 text-base font-semibold shadow-sm transition-all ${
                                isAdded ? 'bg-emerald-600 text-white' : ''
                            }`}
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
