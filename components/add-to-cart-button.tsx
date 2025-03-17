"use client"

import { Button, ButtonGroup, IconButton, Box, useTheme } from "@mui/material"
import { Add, Remove, ShoppingCart } from "@mui/icons-material"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types/product"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart()
  const theme = useTheme()
  const quantity = getItemQuantity(product.id)

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(product.id)
  }

  if (quantity === 0) {
    return (
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddToCart}
        startIcon={<ShoppingCart />}
        sx={{
          py: 1.2,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        }}
      >
        В корзину
      </Button>
    )
  }

  return (
    <ButtonGroup
      variant="contained"
      fullWidth
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
        "& .MuiButtonGroup-grouped:not(:last-of-type)": {
          borderColor: "rgba(255,255,255,0.2)",
        },
      }}
    >
      <IconButton
        color="primary"
        onClick={handleRemoveFromCart}
        aria-label="Уменьшить количество"
        sx={{
          borderRadius: "12px 0 0 12px",
          bgcolor: "primary.main",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
          },
        }}
      >
        <Remove sx={{ color: "white" }} />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          bgcolor: "primary.main",
          color: "white",
          fontWeight: 600,
          py: 1.2,
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
        }}
      >
        {quantity}
      </Box>
      <IconButton
        color="primary"
        onClick={handleAddToCart}
        aria-label="Увеличить количество"
        sx={{
          borderRadius: "0 12px 12px 0",
          bgcolor: "primary.main",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
          },
        }}
      >
        <Add sx={{ color: "white" }} />
      </IconButton>
    </ButtonGroup>
  )
}

