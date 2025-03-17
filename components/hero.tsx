"use client"

import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hero() {
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
    <Box
      sx={{
        background: isDarkMode
          ? "linear-gradient(135deg, rgba(30,64,175,0.8) 0%, rgba(17,24,39,0.8) 100%)"
          : "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,0.8) 100%)",
        color: "white",
        py: { xs: 8, md: 12 },
        mb: 6,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          filter: isDarkMode ? "brightness(0.7)" : "brightness(0.9)",
          animation: "zoomIn 20s ease infinite alternate",
          "@keyframes zoomIn": {
            "0%": {
              transform: "scale(1)",
            },
            "100%": {
              transform: "scale(1.1)",
            },
          },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? "radial-gradient(circle at 20% 30%, rgba(30,64,175,0.7) 0%, rgba(17,24,39,0.7) 70%)"
            : "radial-gradient(circle at 20% 30%, rgba(37,99,235,0.6) 0%, rgba(17,24,39,0.5) 70%)",
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              zIndex: 1,
              animation: "fadeInUp 0.8s ease-out",
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                mb: 2,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                background: "linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Премиум техника для современной жизни
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, color: "rgba(255,255,255,0.9)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
            >
              Откройте для себя лучшие технологические новинки по выгодным ценам
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
              <Button
                component={Link}
                href="#products"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "#2563eb",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "white",
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                  },
                }}
              >
                Смотреть товары
              </Button>
              <Button
                component={Link}
                href="/new-items"
                variant="outlined"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                Новинки
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              position: "relative",
              animation: "fadeInRight 0.8s ease-out",
              "@keyframes fadeInRight": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "90%" },
                height: { xs: 250, md: 350 },
                borderRadius: 6,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transform: "perspective(1000px) rotateY(-5deg)",
                transition: "all 0.5s ease",
                "&:hover": {
                  transform: "perspective(1000px) rotateY(0deg)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent 50%)",
                  pointerEvents: "none",
                },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
                alt="Latest technology products"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

