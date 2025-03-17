"use client"

import { useEffect, useState } from "react"
import { Container, Typography, Box, CircularProgress } from "@mui/material"
import ProductListing from "@/components/product-listing"
import Footer from "@/components/footer"
import { fetchProductsData } from "@/lib/api"
import type { Product } from "@/types/product"

export default function PromotionsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchProductsData()

        // Filter only products on sale
        const saleProducts = allProducts.filter((product) => product.onSale)
        setProducts(saleProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    )
  }

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
          Акции и скидки
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
              В данный момент акционных товаров нет
            </Typography>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  )
}

