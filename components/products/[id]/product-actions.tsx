'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CountButton } from "@/components/ui/count-button"
import { ShoppingCart } from "lucide-react"

export function ProductActions() {

    const[productCount, setProductCount] = useState(1)
    
    return(
        <>
            <div className='flex flex-row gap-6'>
                <CountButton value={productCount} onMinus={() => setProductCount(prev => Math.max(1, prev - 1))} onPlus={() => setProductCount(prev => prev + 1)} className='min-w-25'/>
                <Button
                    text="add to cart" 
                    icon={<ShoppingCart size={18}/>}
                    className='h-10 w-full text-xl'
                />
            </div>
        </>
    )
}