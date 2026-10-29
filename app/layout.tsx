import "./globals.css";
import { Header } from "@/components/layout/header"
import { Suspense } from "react";
import { CartProvider } from "@/context/cart-context";
import { OrderProvider } from "@/context/order-context";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>
        <CartProvider>
          <OrderProvider>
            <Suspense fallback={null}>
                <Header />
            </Suspense>
              {children}
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
