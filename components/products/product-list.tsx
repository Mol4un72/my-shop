import { ProductItem } from "./product-item"
import { products } from '../../mock/products'
import Link from 'next/link'

export function ProductList({ className }: {className?: string}) {
    return(
        <>
            <div className="flex justify-center">
                <section 
                    className="grid grid-cols-2 w-full gap-2 md:grid-cols-3 md:gap-4 md:w-full md:m-4 lg:grid-cols-4 "
                >
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <ProductItem 
                                key={product.id}
                                product={product}
                            />
                        </Link>
                    ))}
                </section>
            </div>
        </>
    )
}