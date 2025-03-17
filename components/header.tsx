"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Badge,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  InputBase,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material"
import { ShoppingCart, Search, Person, Favorite, Menu as MenuIcon, Close, KeyboardArrowDown } from "@mui/icons-material"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const { cart, getTotalPrice, clearCart } = useCart()
  const { getFavoritesCount } = useFavorites()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [isScrolled, setIsScrolled] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const favoritesCount = getFavoritesCount()

  // Add this state for search input
  const [searchQuery, setSearchQuery] = useState("")

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleCategoryClick = (category: string) => {
    handleMenuClose()
    router.push(`/category/${encodeURIComponent(category)}`)
  }

  // Add this function to handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleNewItemsClick = () => {
    router.push("/new-items")
  }

  const handlePromotionsClick = () => {
    router.push("/promotions")
  }

  const handleContactsClick = () => {
    router.push("/contacts")
  }

  const handleFavoritesClick = () => {
    router.push("/profile?tab=favorites")
  }

  const handleCheckout = () => {
    toggleDrawer(false)
    router.push("/checkout")
  }

  const categories = ["Смартфоны", "Ноутбуки", "Умные часы", "Наушники", "Фотоаппараты", "Игровые консоли"]

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "white",
          color: "text.primary",
          boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 70 }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileMenuOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mr: 3,
                }}
              >
                TechNova
              </Typography>
            </Link>

            {!isMobile && (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDown />}
                    onClick={handleMenuOpen}
                    sx={{
                      mr: 1,
                      fontWeight: 500,
                      transition: "all 0.2s",
                      textTransform: "none",
                      "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    Категории
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                      mt: 1,
                      "& .MuiPaper-root": {
                        borderRadius: 2,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        padding: 1,
                      },
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        sx={{
                          borderRadius: 1,
                          my: 0.5,
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                      >
                        {category}
                      </MenuItem>
                    ))}
                  </Menu>

                  <Button
                    color="inherit"
                    sx={{
                      mr: 1,
                      fontWeight: 500,
                      textTransform: "none",
                      transition: "all 0.2s",
                      "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                    onClick={handleNewItemsClick}
                  >
                    Новинки
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      mr: 1,
                      fontWeight: 500,
                      textTransform: "none",
                      transition: "all 0.2s",
                      "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                    onClick={handlePromotionsClick}
                  >
                    Акции
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 500,
                      textTransform: "none",
                      transition: "all 0.2s",
                      "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                    onClick={handleContactsClick}
                  >
                    Контакты
                  </Button>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSearch}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: alpha("#000", 0.05),
                    borderRadius: 3,
                    px: 2,
                    ml: "auto",
                    mr: 2,
                    width: 300,
                    transition: "all 0.3s ease",
                    "&:focus-within": {
                      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                      bgcolor: "white",
                    },
                  }}
                >
                  <InputBase
                    placeholder="Поиск товаров..."
                    sx={{
                      flex: 1,
                      py: 1,
                      fontSize: "0.9rem",
                      color: "inherit",
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <IconButton type="submit" size="small" sx={{ color: "inherit" }}>
                    <Search fontSize="small" />
                  </IconButton>
                </Box>
              </>
            )}

            <Box sx={{ display: "flex", alignItems: "center", ml: isMobile ? "auto" : 0 }}>
              {!isMobile && (
                <>
                  <IconButton
                    color="inherit"
                    sx={{
                      mr: 1,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-2px)" },
                    }}
                    onClick={() => {
                      const user = localStorage.getItem("user")
                      if (user) {
                        router.push("/profile")
                      } else {
                        router.push("/auth/login")
                      }
                    }}
                  >
                    <Person />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    sx={{
                      mr: 1,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-2px)" },
                    }}
                    onClick={handleFavoritesClick}
                  >
                    <Badge
                      badgeContent={favoritesCount}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "0.7rem",
                          height: 18,
                          minWidth: 18,
                        },
                      }}
                    >
                      <Favorite />
                    </Badge>
                  </IconButton>
                </>
              )}
              <IconButton
                color="inherit"
                onClick={() => toggleDrawer(true)}
                aria-label="Корзина"
                sx={{
                  position: "relative",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-2px)" },
                  "&::after":
                    totalItems > 0
                      ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 8,
                          height: 8,
                          bgcolor: "error.main",
                          borderRadius: "50%",
                        }
                      : {},
                }}
              >
                <Badge
                  badgeContent={totalItems}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.7rem",
                      height: 18,
                      minWidth: 18,
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: 300,
            bgcolor: "white",
            color: "text.primary",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TechNova
          </Typography>
          <Box>
            <IconButton onClick={() => setMobileMenuOpen(false)} color="inherit">
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />
        <Box sx={{ p: 2 }}>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: alpha("#000", 0.05),
              borderRadius: 3,
              px: 2,
              mb: 2,
            }}
          >
            <InputBase
              placeholder="Поиск товаров..."
              sx={{ flex: 1, py: 1, fontSize: "0.9rem", color: "inherit" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="submit" size="small" color="inherit">
              <Search fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />
        <List>
          <ListItem component="div">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Категории
            </Typography>
          </ListItem>
          {categories.map((category) => (
            <ListItem
              component={Link}
              href={`/category/${encodeURIComponent(category)}`}
              onClick={() => setMobileMenuOpen(false)}
              key={category}
              sx={{
                textDecoration: "none",
                color: "inherit",
                transition: "background 0.2s",
                "&:hover": {
                  bgcolor: alpha("#000", 0.05),
                },
              }}
            >
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />
        <List>
          <ListItem
            component={Link}
            href="/new-items"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              textDecoration: "none",
              color: "inherit",
              transition: "background 0.2s",
              "&:hover": {
                bgcolor: alpha("#000", 0.05),
              },
            }}
          >
            <ListItemText primary="Новинки" />
          </ListItem>
          <ListItem
            component={Link}
            href="/promotions"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              textDecoration: "none",
              color: "inherit",
              transition: "background 0.2s",
              "&:hover": {
                bgcolor: alpha("#000", 0.05),
              },
            }}
          >
            <ListItemText primary="Акции" />
          </ListItem>
          <ListItem
            component={Link}
            href="/contacts"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              textDecoration: "none",
              color: "inherit",
              transition: "background 0.2s",
              "&:hover": {
                bgcolor: alpha("#000", 0.05),
              },
            }}
          >
            <ListItemText primary="Контакты" />
          </ListItem>
        </List>
        <Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />
        <List>
          <ListItem
            onClick={() => {
              setMobileMenuOpen(false)
              const user = localStorage.getItem("user")
              if (user) {
                router.push("/profile")
              } else {
                router.push("/auth/login")
              }
            }}
            sx={{
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": {
                bgcolor: alpha("#000", 0.05),
              },
            }}
          >
            <ListItemText primary="Личный кабинет" />
          </ListItem>
          <ListItem
            onClick={() => {
              setMobileMenuOpen(false)
              router.push("/profile?tab=favorites")
            }}
            sx={{
              cursor: "pointer",
              transition: "background 0.2s",
              "&:hover": {
                bgcolor: alpha("#000", 0.05),
              },
            }}
          >
            <ListItemText primary="Избранное" />
          </ListItem>
        </List>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            maxWidth: "100%",
            bgcolor: "white",
            color: "text.primary",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Корзина
              </Typography>
              <IconButton onClick={() => toggleDrawer(false)} color="inherit">
                <Close />
              </IconButton>
            </Box>
          </Box>

          {cart.length === 0 ? (
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <ShoppingCart sx={{ fontSize: 60, color: "rgba(0,0,0,0.2)", mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Корзина пуста
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
                Добавьте товары в корзину, чтобы оформить заказ
              </Typography>
              <Button
                variant="contained"
                onClick={() => toggleDrawer(false)}
                sx={{
                  px: 3,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 500,
                  py: 1,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Перейти к покупкам
              </Button>
            </Box>
          ) : (
            <>
              <List sx={{ flexGrow: 1, overflow: "auto", p: 0 }}>
                {cart.map((item) => (
                  <ListItem
                    key={item.product.id}
                    sx={{
                      py: 2,
                      px: 3,
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      transition: "background-color 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.01)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", width: "100%" }}>
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 2,
                          overflow: "hidden",
                          mr: 2,
                          bgcolor: "#f5f5f5",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Box
                          component="img"
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {item.product.brand}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.product.price.toLocaleString("ru-RU")} ₽ × {item.quantity}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                            {(item.quantity * item.product.price).toLocaleString("ru-RU")} ₽
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ p: 3, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h6">Итого:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                    {getTotalPrice().toLocaleString("ru-RU")} ₽
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mb: 2,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={clearCart}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Очистить корзину
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  )
}

