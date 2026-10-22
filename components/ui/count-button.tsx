"use client"

import { useState } from 'react'

type Props = {
    className?: string,
    variant: 'product_item' | 'cart_item'
}

export function CountButton(props: Props) {

    const variants = {
        product_item: 'gap-4 px-2',
        cart_item: 'gap-2 px-2'
    }

    const[count, setCount]=useState(1)
    const variant = props.variant ?? 'standart'
    
    return(
        <>
            <div className={`flex flex-row rounded-lg border border-[var(--color-border)] items-center justify-center ${props.className} ${variants[variant]}`}>
                <button
                    onClick={() => {
                        setCount((count) => {
                            if (count == 1) return count
                            else return count - 1
                        })
                    }}
                >
                    -
                </button>
                {count}
                <button
                    onClick={() => {
                        setCount(count => count + 1)
                    }}
                >
                    +
                </button>
            </div>
        </>
    )
}