'use client'

import { useState } from 'react'
import { Sidebar, initialFilters } from './sidebar'
import { ProductList } from './product-list'

export function Catalog() {
    const [filters, setFilters] = useState(initialFilters)
    const [appliedFilters, setAppliedFilters] = useState(initialFilters)

    function applyFilters(filters: typeof initialFilters) {
        setAppliedFilters(filters)
    }

    return (
        <main className="flex flex-col gap-1.5 p-3 md:flex-row md:p-0 md:gap-0">
            <Sidebar filters={filters} setFilters={setFilters} onApply={applyFilters} />
            <div className="min-w-0 flex-1">
                <ProductList filters={appliedFilters} setFilters={setFilters} onApply={applyFilters}/>
            </div>
        </main>
    )
}