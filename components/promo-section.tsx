"use client"

import { Box, Button, Container, Grid, Paper, Typography, useTheme } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PromoSection() {
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
    <Box sx={{ py: 10, bgcolor: isDarkMode ? "#0f172a" : "#fff" }}>
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
            Специальные предложения
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 0,
                height: "100%",
                overflow: "hidden",
                borderRadius: 4,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                minHeight: 350,
                boxShadow: isDarkMode ? "0 8px 25px rgba(0, 0, 0, 0.2)" : "0 8px 25px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: isDarkMode ? "0 15px 30px rgba(0, 0, 0, 0.3)" : "0 15px 30px rgba(0, 0, 0, 0.1)",
                  "& .promo-image": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <Box
                component="img"
                className="promo-image"
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Special offer"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.9,
                  transition: "transform 0.6s ease",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)",
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  p: 5,
                }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    bgcolor: "error.main",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    mb: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Скидка до 30%
                </Box>
                <Typography variant="h4" component="h3" sx={{ color: "white", fontWeight: 800, mb: 1 }}>
                  Премиум аудиотехника
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 3 }}>
                  Погрузитесь в мир кристально чистого звука с нашей коллекцией наушников и аудиосистем
                </Typography>
                <Button
                  component={Link}
                  href="/category/Наушники"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "#f97316",
                    color: "white",
                    py: 1.2,
                    px: 3,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(249, 115, 22, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#ea580c",
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 20px rgba(249, 115, 22, 0.5)",
                    },
                  }}
                >
                  Узнать больше
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 0,
                height: "100%",
                overflow: "hidden",
                borderRadius: 4,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                minHeight: 350,
                boxShadow: isDarkMode ? "0 8px 25px rgba(0, 0, 0, 0.2)" : "0 8px 25px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: isDarkMode ? "0 15px 30px rgba(0, 0, 0, 0.3)" : "0 15px 30px rgba(0, 0, 0, 0.1)",
                  "& .promo-image": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <Box
                component="img"
                className="promo-image"
                src="https://images.unsplash.com/photo-1588200908342-23b585c03e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="New arrivals"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.9,
                  transition: "transform 0.6s ease",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)",
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  p: 5,
                }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    mb: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Новые поступления
                </Box>
                <Typography variant="h4" component="h3" sx={{ color: "white", fontWeight: 800, mb: 1 }}>
                  Технологии будущего
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 3 }}>
                  Откройте для себя последние технологические новинки, которые изменят вашу повседневную жизнь
                </Typography>
                <Button
                  component={Link}
                  href="/new-items"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    py: 1.2,
                    px: 3,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "white",
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 20px rgba(255, 255, 255, 0.4)",
                    },
                  }}
                >
                  Смотреть все
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

