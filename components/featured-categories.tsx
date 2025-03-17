"use client"

import { Box, Container, Grid, Paper, Typography, alpha, useTheme } from "@mui/material"
import { Laptop, Smartphone, Watch, Headphones, Camera, SportsEsports } from "@mui/icons-material"
import Link from "next/link"
import { useEffect, useState } from "react"

const categories = [
  {
    name: "Смартфоны",
    icon: <Smartphone sx={{ fontSize: 40 }} />,
    color: "#4A6572",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "Смартфоны",
  },
  {
    name: "Ноутбуки",
    icon: <Laptop sx={{ fontSize: 40 }} />,
    color: "#F9AA33",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "Ноутбуки",
  },
  {
    name: "Умные часы",
    icon: <Watch sx={{ fontSize: 40 }} />,
    color: "#344955",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "Умные часы",
  },
  {
    name: "Наушники",
    icon: <Headphones sx={{ fontSize: 40 }} />,
    color: "#232F34",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "Наушники",
  },
  {
    name: "Фотоаппараты",
    icon: <Camera sx={{ fontSize: 40 }} />,
    color: "#4A6572",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "Фотоаппараты",
  },
  {
    name: "Игровые консоли",
    icon: <SportsEsports sx={{ fontSize: 40 }} />,
    color: "#F9AA33",
    image:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "Игровые консоли",
  },
]

export default function FeaturedCategories() {
  const theme = useTheme()
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
  return (
    <Box sx={{ py: 8, bgcolor: isDarkMode ? "#111827" : "#f8fafc" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 4,
                bgcolor: "#2563eb",
                borderRadius: 2,
              },
            }}
          >
            Популярные категории
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper
                component={Link}
                href={`/category/${encodeURIComponent(category.slug)}`}
                elevation={0}
                sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  height: 180,
                  borderRadius: 4,
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  color: "inherit",
                  position: "relative",
                  overflow: "hidden",
                  border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
                  boxShadow: isDarkMode ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 4px 15px rgba(0, 0, 0, 0.05)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: isDarkMode ? "0 10px 25px rgba(0, 0, 0, 0.3)" : "0 10px 25px rgba(0, 0, 0, 0.12)",
                    "& .category-overlay": {
                      opacity: 0.7,
                    },
                    "& .category-name": {
                      transform: "translateY(-8px)",
                    },
                    "& .category-image": {
                      transform: "scale(1.1)",
                    },
                  },
                }}
              >
                <Box
                  className="category-image"
                  component="img"
                  src={category.image}
                  alt={category.name}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                />
                <Box
                  className="category-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    zIndex: 1,
                    transition: "opacity 0.3s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      color: "white",
                      mb: 1,
                      p: 1.5,
                      borderRadius: "50%",
                      bgcolor: alpha("#2563eb", 0.2),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {category.icon}
                  </Box>
                </Box>
                <Box
                  className="category-name"
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    p: 2,
                    textAlign: "center",
                    width: "100%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "white", mb: 1 }}>
                    {category.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

