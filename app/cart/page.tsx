import { CartItem } from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"
import { products } from '@/mock/products'

export default function CartPage() {
    return (
        <>
            <section className="flex flex-col p-6 gap-2 md:max-w-200 md:flex-row md:mx-auto"> 
                <div className="flex flex-col w-full">
                    <div className="flex justify-between md:hidden">
                        <h2 className="text-2xl">Cart</h2>
                        <p className="mt-auto">{products.length} items</p>
                    </div>
                    <div className="max-h-[400px] p-2 border rounded-lg border-[var(--color-border)] overflow-y-auto flex flex-col gap-4">
                       {products.map((product) => (
                           <CartItem 
                               key={product.id}
                               product={product}
                           />
                       ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:gap-2 md:min-w-60 md:h-fit">
                    <div className="flex flex-col bg-[var(--color-surface)] w-full h-full flex-1 rounded-lg p-3 gap-2">
                        <div>
                            <div className="flex justify-between">
                                <p className="text-[var(--color-text-muted)]">Products({products.length})</p>
                                <p className="text-sm">1000$</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-[var(--color-text-muted)]">Delivery</p>
                                <p className="text-[var(--color-blue)]/80">Free</p>
                            </div>
                        </div>
                        <hr className="text-[var(--color-border)]"/>
                        <div className="flex justify-between">
                            <p className="text-xl">All</p>
                            <p>1000$</p>
                        </div>
                    </div>
                    <Button className="h-12 text-lg" text='Place an order'/>
                    <button className="text-lg text-[var(--color-blue)]">Continue shopping</button>
                </div>
            </section>
        </>
    )
}