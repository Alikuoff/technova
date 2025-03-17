"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Container, Grid, Box, Typography, CircularProgress, Pagination } from "@mui/material"
import ProductCard from "./product-card"
import FilterSidebar from "./filter-sidebar"
import SortControls from "./sort-controls"
import type { Product } from "@/types/product"
import { fetchProductsData } from "@/lib/api"

interface ProductListingProps {
  initialProducts?: Product[]
  showFilters?: boolean
}

export default function ProductListing({ initialProducts, showFilters = true }: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const productsPerPage = 6

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlySale, setShowOnlySale] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Sort state
  const [sortConfig, setSortConfig] = useState<{
    field: "name" | "price"
    direction: "asc" | "desc"
  }>({
    field: "name",
    direction: "asc",
  })

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (initialProducts) {
          setProducts(initialProducts)
          setFilteredProducts(initialProducts)

          // Set initial price range based on min and max prices
          if (initialProducts.length > 0) {
            const prices = initialProducts.map((p: Product) => p.price)
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            setPriceRange([minPrice, maxPrice])
          }

          setLoading(false)
          return
        }

        const data = await fetchProductsData()
        setProducts(data)
        setFilteredProducts(data)

        // Set initial price range based on min and max prices
        if (data.length > 0) {
          const prices = data.map((p: Product) => p.price)
          const minPrice = Math.min(...prices)
          const maxPrice = Math.max(...prices)
          setPriceRange([minPrice, maxPrice])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [initialProducts])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Apply price filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply new products filter
    if (showOnlyNew) {
      result = result.filter((product) => product.isNew)
    }

    // Apply sale products filter
    if (showOnlySale) {
      result = result.filter((product) => product.onSale)
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortConfig.field === "name") {
        return sortConfig.direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else {
        return sortConfig.direction === "asc" ? a.price - b.price : b.price - a.price
      }
    })

    setFilteredProducts(result)
    setPage(1) // Reset to first page when filters change
  }, [products, priceRange, showOnlyNew, showOnlySale, selectedCategory, sortConfig])

  const handleSortChange = (field: "name" | "price", direction: "asc" | "desc") => {
    setSortConfig({ field, direction })
  }

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange)
  }

  const handleNewProductsToggle = (checked: boolean) => {
    setShowOnlyNew(checked)
  }

  const handleSaleProductsToggle = (checked: boolean) => {
    setShowOnlySale(checked)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Get unique categories from products
  const categories = [...new Set(products.map((product) => product.category))]

  // Pagination
  const indexOfLastProduct = page * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage)

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ py: showFilters ? 6 : 0 }}>
      {showFilters && (
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
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
            Каталог товаров
          </Typography>
        </Container>
      )}

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {showFilters && (
            <Grid item xs={12} md={3}>
              <FilterSidebar
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                showOnlyNew={showOnlyNew}
                onNewProductsToggle={handleNewProductsToggle}
                minMaxPrices={[Math.min(...products.map((p) => p.price)), Math.max(...products.map((p) => p.price))]}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                showOnlySale={showOnlySale}
                onSaleToggle={handleSaleProductsToggle}
              />
            </Grid>
          )}

          <Grid item xs={12} md={showFilters ? 9 : 12}>
            <Box sx={{ mb: 3 }}>
              <SortControls
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSortChange={handleSortChange}
              />
            </Box>

            {filteredProducts.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor: "#f8f9fa",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Товары не найдены
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Попробуйте изменить параметры фильтрации
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {currentProducts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={showFilters ? 4 : 3}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>

                {pageCount > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

