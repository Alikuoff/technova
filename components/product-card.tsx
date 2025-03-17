"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Card, CardContent, CardActions, Typography, Box, Chip, Rating, IconButton } from "@mui/material"
import Link from "next/link"
import type { Product } from "@/types/product"
import AddToCartButton from "./add-to-cart-button"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { useFavorites } from "@/context/favorites-context"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const favorited = isFavorite(product.id)

  const [isDarkMode, setIsDarkMode] = useState(false)

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

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorited) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        boxShadow: isDarkMode ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 4px 15px rgba(0, 0, 0, 0.05)",
        border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.03)",
        bgcolor: isDarkMode ? "#1e293b" : "white",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: isDarkMode ? "0 15px 30px rgba(0, 0, 0, 0.3)" : "0 15px 30px rgba(0, 0, 0, 0.1)",
        },
        animation: "fadeIn 0.5s ease-out",
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component={Link}
          href={`/products/${product.id}`}
          sx={{
            height: 220,
            bgcolor: isDarkMode ? "#0f172a" : "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            textDecoration: "none",
            color: "inherit",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDarkMode
                ? "linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.1) 100%)"
                : "linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.03) 100%)",
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              "&:hover": {
                transform: "scale(1.08)",
              },
            }}
          />
        </Box>
        <IconButton
          size="small"
          onClick={toggleFavorite}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "white",
              transform: "scale(1.1)",
            },
          }}
        >
          {favorited ? (
            <Favorite
              color="error"
              sx={{
                animation: "heartBeat 0.3s ease-out",
                "@keyframes heartBeat": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.2)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        {product.isNew && (
          <Chip
            label="Новинка"
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              fontWeight: 600,
              borderRadius: 2,
              zIndex: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
              top: product.isNew ? 46 : 10,
              left: 10,
              fontWeight: 600,
              borderRadius: 2,
              zIndex: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2, pt: 2.5 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {product.brand}
          </Typography>
        </Box>

        <Typography
          component={Link}
          href={`/products/${product.id}`}
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: "3em",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={4.5} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            (24)
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 700,
              color: product.onSale ? "error.main" : "primary.main",
              background: product.onSale
                ? "linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)"
                : "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.price.toLocaleString("ru-RU")} ₽
          </Typography>

          {product.onSale && product.oldPrice && (
            <Typography
              variant="body2"
              component="span"
              sx={{
                ml: 1,
                color: "text.secondary",
                textDecoration: "line-through",
              }}
            >
              {product.oldPrice.toLocaleString("ru-RU")} ₽
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <AddToCartButton product={product} />
      </CardActions>
    </Card>
  )
}

