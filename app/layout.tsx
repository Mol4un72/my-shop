import "./globals.css";
import { Header } from "@/components/layout/header"
import { Suspense, ReactNode } from "react";
import { CartProvider } from "@/context/cart-context";
import { OrderProvider } from "@/context/order-context";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] antialiased font-sans">
        <CartProvider>
          <OrderProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <div className="flex-1 pb-12">
              {children}
            </div>
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
