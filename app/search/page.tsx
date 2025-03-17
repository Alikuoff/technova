"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Container, Typography, Box } from "@mui/material"
import ProductListing from "@/components/product-listing"
import Footer from "@/components/footer"
import { fetchProductsData } from "@/lib/api"
import type { Product } from "@/types/product"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await fetchProductsData()

        if (query) {
          const searchQuery = query.toLowerCase()
          const filteredProducts = allProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery) ||
              product.description.toLowerCase().includes(searchQuery) ||
              product.brand.toLowerCase().includes(searchQuery) ||
              product.category.toLowerCase().includes(searchQuery),
          )
          setProducts(filteredProducts)
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [query])

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: 700,
            textAlign: "center",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 4,
              bgcolor: "primary.main",
              borderRadius: 2,
            },
          }}
        >
          {query ? `Результаты поиска: ${query}` : "Поиск"}
        </Typography>

        {products.length > 0 ? (
          <ProductListing initialProducts={products} showFilters={false} />
        ) : (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "#f8f9fa",
              borderRadius: 2,
              my: 4,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Товары не найдены
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Попробуйте изменить поисковый запрос
            </Typography>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  )
}

