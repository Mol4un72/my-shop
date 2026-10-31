import { ProductItem } from "./product-item"
import { products } from '../../mock/products'
import { initialFilters } from "./sidebar"
import { Button } from "../ui/button"
import { PackageSearch } from "lucide-react"

type Props = {
    filters: typeof initialFilters,
    onApply: (filters: typeof initialFilters) => void,
    setFilters: (filters: typeof initialFilters) => void
}

export function ProductList({ filters, onApply, setFilters }: Props) {

    const filtered = products.filter((item) => {
        if (filters.category && item.category !== filters.category) return false
        if (filters.species && item.species !== filters.species) return false
        if (filters.weight && !item.weight.includes(Number(filters.weight))) return false

        const prices = Array.isArray(item.price) ? item.price : [item.price]

        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        if (filters.price.from && maxPrice < Number(filters.price.from)) return false
        if (filters.price.to && minPrice > Number(filters.price.to)) return false

        return true
    })

    function resetFilters(filters: typeof initialFilters) {
        setFilters(filters)
        onApply(filters)
    }
    
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p className="text-sm text-[var(--color-text-muted)]">
                    Showing <span className="font-semibold text-[var(--color-text)]">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
                </p>
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white border border-[var(--color-border)] rounded-2xl flex flex-col gap-3 items-center justify-center text-center py-16 px-6 shadow-xs">
                    <div className="size-14 rounded-2xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)]">
                        <PackageSearch size={28} />
                    </div>
                    <h2 className="text-xl font-semibold text-[var(--color-text)]">
                        No products found
                    </h2>
                    <p className="text-sm text-[var(--color-text-muted)] max-w-sm">
                        No products match your selected filters. Try broadening your criteria.
                    </p>
                    <Button 
                        onClick={() => resetFilters(initialFilters)} 
                        text="Reset filters" 
                        variant="secondary" 
                        className="mt-2 text-sm"
                    />
                </div>
            ) : (
                <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {filtered.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                        />
                    ))}
                </section>
            )}
        </div>
    )
}
