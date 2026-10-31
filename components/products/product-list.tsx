import { ProductItem } from "./product-item"
import { products } from '../../mock/products'
import { initialFilters } from "./sidebar"
import { Button } from "../ui/button"

type Props = {
    className?: string,
    filters: typeof initialFilters,
    onApply: (filters: typeof initialFilters) => void,
    setFilters: (filters: typeof initialFilters) => void
}

export function ProductList({ className, filters, onApply, setFilters }: Props) {

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
        <div className="flex justify-center w-full">
            {filtered.length === 0 ? (
                <div className="flex flex-col gap-1 items-center justify-center text-center py-20 px-4">
                    <h2 className="text-2xl font-semibold">
                        No products found
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Try changing your filters.
                    </p>
                    <Button onClick={() => resetFilters(initialFilters)} text="Reset filters" variant="secondary" />
                </div>
            ) : (
                <section className="grid grid-cols-2 w-full gap-2 md:grid-cols-3 md:gap-4 md:m-4 lg:grid-cols-4">
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