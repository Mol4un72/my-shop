import "./globals.css";
import { Header } from "@/components/layout/header"

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>
        <Header />
          {children}
      </body>
    </html>
  );
}
