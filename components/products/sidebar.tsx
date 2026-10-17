"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "../ui/button"

export function Sidebar() {

    const[open, setOpen] = useState(false)
    const initialFilters = {
        category1: "",
        category2: "",
        category3: "",
    }
    const[filters, setFilters] = useState(initialFilters)
    
    function resetFilters() {
        setFilters(initialFilters)
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
            <aside>
                <div 
                    className={`
                        ${open ? "fixed inset-0 z-50" : "hidden"}
                        bg-white p-6
                        md:relative md:block md:w-55 md:border-r md:border-[var(--color-border)] md:p-4
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
                        
                        <button
                            onClick={() => {setOpen(false)}}
                        >
                            <X size={32} strokeWidth={2.5} />
                        </button>
                    </div>
                        
                    <div className="flex flex-col gap-3 h-screen w-full mt-4">
                        
                        <h2 className="text-4xl md:text-2xl">Filters</h2>
                        
                        <div className="flex flex-col text-3xl gap-4 md:text-xl">
                            <div className="flex flex-col gap-1">
                                <label>Category</label>
                                <select 
                                    className="border rounded-lg"
                                    value={filters.category1}
                                    onChange={(e) =>
                                      setFilters({ ...filters, category1: e.target.value })
                                    }
                                >
                                    <option value="" disabled>choose category</option>
                                    <option>catehgory 1</option>
                                    <option>catehgory 2</option>
                                    <option>catehgory 3</option>
                                </select>
                            </div>
                                
                            <div className="flex flex-col gap-1">
                                <label>Category</label>
                                <select 
                                    className="border rounded-lg"
                                    value={filters.category2}
                                    onChange={(e) =>
                                      setFilters({ ...filters, category2: e.target.value })
                                    }    
                                >
                                    <option value="" disabled>choose category</option>
                                    <option>catehgory 1</option>
                                    <option>catehgory 2</option>
                                    <option>catehgory 3</option>
                                </select>
                            </div>
                                
                            <div className="flex flex-col gap-1">
                                <label>Category</label>
                                <select 
                                    className="border rounded-lg"
                                    value={filters.category3}
                                    onChange={(e) =>
                                      setFilters({ ...filters, category3: e.target.value })
                                    }
                                >
                                    <option value="" disabled>choose category</option>
                                    <option>catehgory 1</option>
                                    <option>catehgory 2</option>
                                    <option>catehgory 3</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Price</label>
                                <div className="flex flex-row gap-3">
                                    <input placeholder="from" className="w-full text-xl border rounded-md p-2 h-8" />
                                    <input placeholder="to" className="w-full text-xl border rounded-md p-2 h-8" />
                                </div>
                            </div>
                            <button
                                className="hidden md:flex flex-start"
                                onClick={() => {
                                    resetFilters()
                                }}
                            >
                                Reset all
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}