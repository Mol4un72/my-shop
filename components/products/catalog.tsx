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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
            <Sidebar filters={filters} setFilters={setFilters} onApply={applyFilters} />
            <ProductList filters={appliedFilters} setFilters={setFilters} onApply={applyFilters}/>
        </main>
    )
}
