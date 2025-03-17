"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Container,
  Typography,
  Box,
  Paper,
  Skeleton,
  Chip,
  Grid,
  Rating,
  Divider,
  Button,
  Tabs,
  Tab,
} from "@mui/material"
import { useParams } from "next/navigation"
import type { Product } from "@/types/product"
import AddToCartButton from "@/components/add-to-cart-button"
import { fetchProductById } from "@/lib/api"
import { Favorite, FavoriteBorder, LocalShipping, VerifiedUser } from "@mui/icons-material"
import Footer from "@/components/footer"
import { useFavorites } from "@/context/favorites-context"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = await fetchProductById(params.id)
        setProduct(foundProduct)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleToggleFavorite = () => {
    if (!product) return

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={24} width="60%" sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={30} width="40%" sx={{ mb: 4 }} />
            <Skeleton variant="rectangular" height={120} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={50} sx={{ mb: 2 }} />
          </Grid>
        </Grid>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h4">Товар не найден</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Извините, запрашиваемый товар не существует или был удален.
          </Typography>
          <Button variant="contained" href="/" sx={{ mt: 3 }}>
            Вернуться в каталог
          </Button>
        </Paper>
      </Container>
    )
  }

  const favorited = isFavorite(product.id)

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.name}
                sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
              {product.isNew && (
                <Chip
                  label="Новинка"
                  color="primary"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    fontWeight: 600,
                    borderRadius: 1,
                  }}
                />
              )}
              {product.onSale && (
                <Chip
                  label={`-${product.discountPercent}%`}
                  color="error"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: product.isNew ? 52 : 16,
                    left: 16,
                    fontWeight: 600,
                    borderRadius: 1,
                  }}
                />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {product.brand}
              </Typography>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
                  (24 отзыва)
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: product.onSale ? "error.main" : "primary.main" }}
                >
                  {product.price.toLocaleString("ru-RU")} ₽
                </Typography>

                {product.onSale && product.oldPrice && (
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      ml: 2,
                      color: "text.secondary",
                      textDecoration: "line-through",
                    }}
                  >
                    {product.oldPrice.toLocaleString("ru-RU")} ₽
                  </Typography>
                )}
              </Box>

              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                {product.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <AddToCartButton product={product} />
                </Box>
                <Button
                  variant="outlined"
                  startIcon={favorited ? <Favorite color="error" /> : <FavoriteBorder />}
                  sx={{ borderRadius: 2, py: 1.2, px: 3 }}
                  onClick={handleToggleFavorite}
                  color={favorited ? "error" : "primary"}
                >
                  {favorited ? "В избранном" : "В избранное"}
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LocalShipping color="primary" />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Бесплатная доставка
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      При заказе от 5000 ₽
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <VerifiedUser color="primary" />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Гарантия 1 год
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Официальная гарантия производителя
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Paper elevation={0} sx={{ borderRadius: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="product tabs"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  py: 2,
                },
              }}
            >
              <Tab label="Описание" id="product-tab-0" aria-controls="product-tabpanel-0" />
              <Tab label="Характеристики" id="product-tab-1" aria-controls="product-tabpanel-1" />
              <Tab label="Отзывы (24)" id="product-tab-2" aria-controls="product-tabpanel-2" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt,
                  nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies
                  tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </Typography>
                <Typography variant="body1" paragraph>
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget
                  nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl
                  eget nisl.
                </Typography>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Основные характеристики
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Бренд
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.brand}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Модель
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.name.split(" ").pop()}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Гарантия
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          12 месяцев
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Страна производства
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Китай
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Дополнительно
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Вес
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          0.5 кг
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Размеры
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          10 × 15 × 5 см
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Комплектация
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Устройство, кабель, инструкция
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          Артикул
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.id}12345
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Typography variant="body1" paragraph>
                  Отзывы о товаре будут доступны после модерации.
                </Typography>
              </TabPanel>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

