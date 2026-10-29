"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "../ui/button"

export const initialFilters = {
        category: '',
        species: '',
        weight: '',
        price: {
            from: '',
            to: '',
        },
    }
    
type Props = {
    filters: typeof initialFilters,
    setFilters: (filters: typeof initialFilters) => void,
    onApply: (filters: typeof initialFilters) => void,
}

export function Sidebar({ filters, setFilters, onApply }: Props) {

    const[open, setOpen] = useState(false)
    
    function resetFilters() {
        setFilters(initialFilters)
        onApply(initialFilters)
    }

    const productTypes = {
      cheese: [
        { value: 'hard cheese', label: 'hard cheese' },
        { value: 'soft cheese', label: 'soft cheese' },
        { value: 'brine-ripened cheese', label: 'brine-ripened cheese' },
      ],
      dairy: [
        { value: 'milk', label: 'milk' },
        { value: 'kefir', label: 'kefir' },
        { value: 'ryazhenka', label: 'ryazhenka' },
      ],
    }
    
    return(
        <>
            <div className="flex justify-center">
                <Button
                    text="filters"
                    className="md:hidden bg-white/0 text-2xl border rounded-lg h-10 px-10"
                    onClick={() => {
                        setOpen(true)
                    }}
                />
            </div>
            <aside className="z-0">
                <div 
                    className={`
                        ${open ? "fixed inset-0 z-50" : "hidden"}
                        bg-white p-6
                        md:fixed md:block md:max-w-45 md:border-r md:border-[var(--color-border)] md:px-4 md:py-0
                    `}
                >
                    <div className="flex justify-between text-3xl md:hidden">
                        <button
                            onClick={() => {
                                resetFilters()
                            }}
                        >
                            Reset all
                        </button>
                    </div>
                        
                    <div className="flex flex-col gap-3 h-screen w-full my-10 md:my-2">
                        
                        <div className="flex flex-row justify-between">
                            <h2 className="text-4xl md:text-2xl">Filters</h2>

                            <button
                                onClick={() => {
                                    setOpen(false)
                                    onApply(filters)
                                }}
                                className="md:hidden"
                            >
                                <X size={32} strokeWidth={2.5} />
                            </button>
                        </div>
                        
                        <div className="flex flex-col text-2xl gap-4 md:text-xl">
                            <div className="flex flex-col gap-1">
                                <label>Category</label>
                                <select 
                                    className="border border-[var(--color-border)] rounded-lg md:text-sm"
                                    value={filters.category}
                                    onChange={(e) =>
                                      setFilters({ ...filters, category: e.target.value, species: '' })
                                    }
                                >
                                    <option value="" disabled>choose category</option>
                                    <option value={'cheese'}>cheese</option>
                                    <option value={'dairy'}>dairy</option>
                                </select>
                            </div>
                                
                            <div className="flex flex-col gap-1">
                                <label>Species</label>
                                <select 
                                    className="border rounded-lg border-[var(--color-border)] md:text-sm"
                                    value={filters.species}
                                    onChange={(e) =>
                                      setFilters({ ...filters, species: e.target.value })
                                    }    
                                >
                                    <option value="" disabled>choose category</option>
                                    {filters.category == 'cheese' && (
                                        productTypes.cheese.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))
                                    )}
                                    {filters.category == 'dairy' && (
                                        productTypes.dairy.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                                
                            <div className="flex flex-col gap-1">
                                <label>Weight</label>
                                <select 
                                    className="border rounded-lg border-[var(--color-border)] md:text-sm"
                                    value={filters.weight}
                                    onChange={(e) =>
                                      setFilters({ ...filters, weight: e.target.value })
                                    }
                                >
                                    <option value="" disabled>choose category</option>
                                    <option>100g</option>
                                    <option>250g</option>
                                    <option>500g</option>
                                    <option>1000g</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Price</label>
                                <div className="flex flex-row gap-3">
                                    <input 
                                        value={filters.price.from}
                                        onChange={(e) => 
                                            setFilters({...filters, price: {...filters.price, from: e.target.value}})
                                        } 
                                        placeholder="from" 
                                        className="w-full md:max-h-6 text-xl border rounded-md p-2 h-8 border-[var(--color-border)] md:text-sm" 
                                    />
                                    <input 
                                        value={filters.price.to}
                                        onChange={(e) => 
                                            setFilters({...filters, price: {...filters.price, to: e.target.value}})
                                        } 
                                        placeholder="to" 
                                        className="w-full md:max-h-6 text-xl border rounded-md p-2 h-8 border-[var(--color-border)] md:text-sm" 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button 
                                    text="aply" 
                                    variant="secondary" 
                                    className="hidden md:block md:text-sm" 
                                    onClick={() => onApply(filters)}
                                />
                                <Button
                                    text="reset all"
                                    variant="secondary"
                                    className="text-md md:text-sm md:block md:justify-center md:h-fit"
                                    onClick={() => {
                                        resetFilters()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-45" />
            </aside>
        </>
    )
}