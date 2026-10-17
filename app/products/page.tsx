import { ProductList } from "@/components/products/product-list"
import { Sidebar } from "@/components/products/sidebar"

export default function ProductsPage() {
    return(
        <>
            <main className="flex flex-col m-3 gap-2 md:flex-row">
                <Sidebar />
                <div className="min-w-0 flex-1 ">
                    <ProductList />
                </div>
            </main>
        </>
    )
}