import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { FavoritesProvider } from "@/context/favorites-context"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "TechNova - Магазин электроники",
  description: "Product catalog with filtering and sorting",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ThemeProvider>
          <FavoritesProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'