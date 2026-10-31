"use client"

import { useState } from "react"
import { SlidersHorizontal, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
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
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    
    function resetFilters() {
        setFilters(initialFilters)
        onApply(initialFilters)
    }

    const productTypes = {
      cheese: [
        { value: 'hard cheese', label: 'Hard cheese' },
        { value: 'soft cheese', label: 'Soft cheese' },
        { value: 'brine-ripened cheese', label: 'Brine-ripened cheese' },
      ],
      dairy: [
        { value: 'milk', label: 'Milk' },
        { value: 'kefir', label: 'Kefir' },
        { value: 'ryazhenka', label: 'Ryazhenka' },
      ],
    }

    const hasActiveFilters = Boolean(
        filters.category || filters.species || filters.weight || filters.price.from || filters.price.to
    )

    function handleCategoryChange(category: string) {
        const updated = { ...filters, category, species: '' }
        setFilters(updated)
        onApply(updated)
    }
    
    return (
        <section className="w-full bg-white border border-[var(--color-border)] rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col gap-3">
            {/* Top row: Category segmented pills + Reset button */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('')}
                        className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                            filters.category === ''
                                ? 'bg-[var(--color-blue)] text-white shadow-xs'
                                : 'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
                        }`}
                    >
                        All products
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('cheese')}
                        className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                            filters.category === 'cheese'
                                ? 'bg-[var(--color-blue)] text-white shadow-xs'
                                : 'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
                        }`}
                    >
                        Cheese
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('dairy')}
                        className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                            filters.category === 'dairy'
                                ? 'bg-[var(--color-blue)] text-white shadow-xs'
                                : 'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
                        }`}
                    >
                        Dairy
                    </button>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    {/* Mobile toggle for sub-filters */}
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="cursor-pointer md:hidden inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                    >
                        <SlidersHorizontal size={14} className="text-[var(--color-blue)]" />
                        <span>Filters</span>
                        {isMobileOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {/* Reset button */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="cursor-pointer inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-muted)] hover:text-red-500 transition-colors px-2 py-1"
                            title="Reset all filters"
                        >
                            <RotateCcw size={12} />
                            <span>Reset</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Bottom row: Inline dropdowns and price inputs (always visible on desktop, collapsible on mobile) */}
            <div className={`pt-2.5 border-t border-[var(--color-border)] ${isMobileOpen ? 'flex' : 'hidden md:flex'} flex-wrap items-center gap-2.5 text-xs sm:text-sm`}>
                {/* Species dropdown */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[var(--color-text-muted)] font-medium hidden lg:inline">Species:</span>
                    <select
                        className="cursor-pointer border border-[var(--color-border)] rounded-xl px-2.5 py-1.5 bg-white text-[var(--color-text)] text-xs sm:text-sm outline-none focus:border-[var(--color-blue)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        value={filters.species}
                        disabled={!filters.category}
                        onChange={(e) => setFilters({ ...filters, species: e.target.value })}
                    >
                        <option value="">{filters.category ? 'All species' : 'Species (choose category)'}</option>
                        {filters.category === 'cheese' && (
                            productTypes.cheese.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))
                        )}
                        {filters.category === 'dairy' && (
                            productTypes.dairy.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))
                        )}
                    </select>
                </div>

                {/* Weight dropdown */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[var(--color-text-muted)] font-medium hidden lg:inline">Weight:</span>
                    <select
                        className="cursor-pointer border border-[var(--color-border)] rounded-xl px-2.5 py-1.5 bg-white text-[var(--color-text)] text-xs sm:text-sm outline-none focus:border-[var(--color-blue)] transition-colors"
                        value={filters.weight}
                        onChange={(e) => setFilters({ ...filters, weight: e.target.value })}
                    >
                        <option value="">All weights</option>
                        <option value="100">100g</option>
                        <option value="250">250g</option>
                        <option value="500">500g</option>
                        <option value="1000">1000g</option>
                    </select>
                </div>

                {/* Price range inputs */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[var(--color-text-muted)] font-medium hidden lg:inline">Price:</span>
                    <div className="flex items-center gap-1">
                        <input
                            type="number"
                            min="0"
                            placeholder="From $"
                            value={filters.price.from}
                            onChange={(e) => setFilters({ ...filters, price: { ...filters.price, from: e.target.value } })}
                            className="w-18 sm:w-20 border border-[var(--color-border)] rounded-xl px-2 py-1.5 text-xs sm:text-sm outline-none focus:border-[var(--color-blue)] transition-colors"
                        />
                        <span className="text-[var(--color-text-muted)]">-</span>
                        <input
                            type="number"
                            min="0"
                            placeholder="To $"
                            value={filters.price.to}
                            onChange={(e) => setFilters({ ...filters, price: { ...filters.price, to: e.target.value } })}
                            className="w-18 sm:w-20 border border-[var(--color-border)] rounded-xl px-2 py-1.5 text-xs sm:text-sm outline-none focus:border-[var(--color-blue)] transition-colors"
                        />
                    </div>
                </div>

                {/* Apply button */}
                <div className="ml-auto flex items-center gap-2 shrink-0">
                    <Button
                        text="Apply"
                        className="h-8 px-4 text-xs font-semibold"
                        onClick={() => {
                            onApply(filters)
                            setIsMobileOpen(false)
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
