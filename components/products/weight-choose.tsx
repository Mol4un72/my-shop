"use client"

import { useState } from "react"
import { Button } from '@/components/ui/button'

export function WeightChoose() {

    const[weight, setWeight] = useState(100)

    const weights = [100, 250, 1000]
    
    return(
        <>
            <div className='flex flex-row gap-2'>
                {weights.map((value) => (
                    <Button 
                        key={value}
                        text={`${value}g`}
                        variant={weight === value ? "weight_choose" : "secondary"}
                        onClick={() => setWeight(value)}
                        className="h-10"
                    />
                ))}
            </div>
        </>
    )
}