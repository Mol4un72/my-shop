import { ProductItem } from "./product-item"
import { products } from '../../mock/products'

export function ProductList() {
    return(
        <>
            <div className="flex justify-center">
                <section 
                    className="grid grid-cols-2 w-full gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 md:w-full"
                >
                    {products.map((product) => (
                        <ProductItem 
                            key={product.id}
                            product={product}
                        />
                    ))}
                </section>
            </div>
        </>
    )
}