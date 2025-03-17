"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Hero from "@/components/hero"
import ProductListing from "@/components/product-listing"
import FeaturedCategories from "@/components/featured-categories"
import PromoSection from "@/components/promo-section"
import Footer from "@/components/footer"
import { fetchProductsData } from "@/lib/api"
import type { Product } from "@/types/product"

export default function Home() {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)

    // Add listener for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark")
          setIsDarkMode(isDark)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await fetchProductsData()

        if (filter === "new") {
          const newProducts = allProducts.filter((product) => product.isNew)
          setProducts(newProducts)
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    if (filter) {
      fetchProducts()
    }
  }, [filter])

  return (
    <main className={isDarkMode ? "dark" : ""}>
      <Hero />
      <FeaturedCategories />
      <div id="products">
        {filter === "new" ? <ProductListing initialProducts={products} showFilters={false} /> : <ProductListing />}
      </div>
      <PromoSection />
      <Footer />
    </main>
  )
}

