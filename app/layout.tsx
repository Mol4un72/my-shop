import "./globals.css";
import { Header } from "@/components/layout/header"
import { Suspense } from "react";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>
        <Suspense fallback={null}>
            <Header />
        </Suspense>
          {children}
      </body>
    </html>
  );
}
