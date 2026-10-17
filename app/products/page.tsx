import { ProductList } from "@/components/products/product-list"
import { Sidebar } from "@/components/products/sidebar"

export default function ProductsPage() {
    return(
        <>
            <main className="flex flex-col gap-1.5 p-3 md:flex-row md:p-0 md:gap-0">
                <Sidebar />
                <div className="min-w-0 flex-1 ">
                    <ProductList />
                </div>
            </main>
        </>
    )
}