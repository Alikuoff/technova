"use client"

import Link from "next/link"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Avatar,
  TextField,
  IconButton,
  Badge,
  Alert,
  Chip,
  CircularProgress,
} from "@mui/material"
import { Person, ShoppingBag, Favorite, Settings, Edit, PhotoCamera, Logout } from "@mui/icons-material"
import Footer from "@/components/footer"
import { useFavorites } from "@/context/favorites-context"
import { useCart } from "@/context/cart-context"

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

interface User {
  id: number
  name: string
  email: string
  isLoggedIn: boolean
}

// Define Order and OrderItem types directly here
interface OrderItem {
  product: {
    id: number
    name: string
    price: number
    brand: string
    description: string
    isNew: boolean
    imageUrl: string
    category: string
    onSale?: boolean
    oldPrice?: number
    discountPercent?: number
  }
  quantity: number
  price: number
}

interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  date: string
  status: "Обработка" | "Подтвержден" | "В пути" | "Доставлен" | "Отменен"
  address?: string
  paymentMethod?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [orders, setOrders] = useState<Order[]>([])
  const [tabValue, setTabValue] = useState(tabParam === "orders" ? 1 : tabParam === "favorites" ? 2 : 0)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "+7 (999) 123-4567",
    address: "ул. Примерная, д. 123, кв. 45, г. Москва, 123456",
  })
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setProfileData((prev) => ({
        ...prev,
        name: parsedUser.name,
        email: parsedUser.email,
      }))

      // Load orders from localStorage
      const storedOrders = localStorage.getItem("orders")
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders))
      }

      setLoading(false)
    } else {
      // Redirect to login if not logged in
      router.push("/auth/login")
    }
  }, [router])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setSelectedOrder(null) // Reset selected order when changing tabs
  }

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user")
    // Redirect to home page
    router.push("/")
  }

  const handleEditProfile = () => {
    setEditMode(true)
  }

  const handleSaveProfile = () => {
    // Update user data
    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.name,
        email: profileData.email,
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    setEditMode(false)
    setSaveSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleBackToOrders = () => {
    setSelectedOrder(null)
  }

  const handleCancelOrder = (orderId: string) => {
    // Get current orders
    const currentOrders = [...orders]

    // Find and update the order status
    const updatedOrders = currentOrders.map((order) => (order.id === orderId ? { ...order, status: "Отменен" } : order))

    // Update state and localStorage
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    // Update selected order if it's the one being canceled
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: "Отменен" })
    }
  }

  const handleRemoveFromFavorites = (productId: number) => {
    removeFromFavorites(productId)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Доставлен":
        return "success"
      case "Отменен":
        return "error"
      case "В пути":
        return "info"
      default:
        return "primary"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 8, minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Container>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
          Личный кабинет
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, position: "sticky", top: 90 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <IconButton
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        width: 32,
                        height: 32,
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                      size="small"
                    >
                      <PhotoCamera fontSize="small" />
                    </IconButton>
                  }
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: "primary.main",
                      fontSize: "2rem",
                      mb: 1,
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Badge>
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Tabs
                orientation="vertical"
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    py: 1.5,
                  },
                }}
              >
                <Tab
                  icon={<Person />}
                  iconPosition="start"
                  label="Профиль"
                  id="profile-tab-0"
                  aria-controls="profile-tabpanel-0"
                />
                <Tab
                  icon={<ShoppingBag />}
                  iconPosition="start"
                  label="Мои заказы"
                  id="profile-tab-1"
                  aria-controls="profile-tabpanel-1"
                />
                <Tab
                  icon={<Favorite />}
                  iconPosition="start"
                  label="Избранное"
                  id="profile-tab-2"
                  aria-controls="profile-tabpanel-2"
                />
                <Tab
                  icon={<Settings />}
                  iconPosition="start"
                  label="Настройки"
                  id="profile-tab-3"
                  aria-controls="profile-tabpanel-3"
                />
              </Tabs>

              <Divider sx={{ my: 2 }} />

              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ mt: 2, borderRadius: 2, py: 1 }}
              >
                Выйти
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
              <TabPanel value={tabValue} index={0}>
                {saveSuccess && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Данные профиля успешно сохранены!
                  </Alert>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Личные данные
                  </Typography>

                  {!editMode && (
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={handleEditProfile}
                      sx={{ borderRadius: 2 }}
                    >
                      Редактировать
                    </Button>
                  )}
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Имя"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Телефон"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Адрес доставки"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      multiline
                      rows={2}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                </Grid>

                {editMode && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ borderRadius: 2 }}>
                      Отмена
                    </Button>
                    <Button variant="contained" onClick={handleSaveProfile} sx={{ borderRadius: 2 }}>
                      Сохранить
                    </Button>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  {selectedOrder ? "Детали заказа" : "Мои заказы"}
                </Typography>

                {selectedOrder ? (
                  <>
                    <Button variant="outlined" onClick={handleBackToOrders} sx={{ mb: 3, borderRadius: 2 }}>
                      ← Назад к списку заказов
                    </Button>

                    <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="h6">Заказ #{selectedOrder.id}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          от {formatDate(selectedOrder.date)}
                        </Typography>
                      </Box>
                      <Chip
                        label={selectedOrder.status}
                        color={getStatusColor(selectedOrder.status) as any}
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>

                    <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "#f8f9fa" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Информация о доставке
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Адрес:</strong> {selectedOrder.address}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Способ оплаты:</strong>{" "}
                        {selectedOrder.paymentMethod === "card"
                          ? "Банковская карта"
                          : selectedOrder.paymentMethod === "cash"
                            ? "Наличными при получении"
                            : "Электронные деньги"}
                      </Typography>
                    </Paper>

                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Товары в заказе
                    </Typography>

                    <List disablePadding>
                      {selectedOrder.items.map((item, index) => (
                        <Paper
                          key={`${item.product.id}-${index}`}
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            border: "1px solid rgba(0,0,0,0.08)",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Box
                              sx={{
                                width: 70,
                                height: 70,
                                borderRadius: 1,
                                overflow: "hidden",
                                mr: 2,
                                bgcolor: "#f5f5f5",
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
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {item.product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.product.brand}
                              </Typography>
                              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                <Typography variant="body2">
                                  {item.quantity} × {item.price.toLocaleString("ru-RU")} ₽
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {(item.quantity * item.price).toLocaleString("ru-RU")} ₽
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </List>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: "#f8f9fa",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Итого:
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {selectedOrder.totalAmount.toLocaleString("ru-RU")} ₽
                      </Typography>
                    </Paper>

                    {selectedOrder.status !== "Доставлен" && selectedOrder.status !== "Отменен" && (
                      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelOrder(selectedOrder.id)}
                          sx={{ borderRadius: 2 }}
                        >
                          Отменить заказ
                        </Button>
                      </Box>
                    )}
                  </>
                ) : orders.length > 0 ? (
                  <List>
                    {orders.map((order) => (
                      <Paper
                        key={order.id}
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={3}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Номер заказа
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {order.id}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sm={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Дата
                            </Typography>
                            <Typography variant="body1">{formatDate(order.date)}</Typography>
                          </Grid>

                          <Grid item xs={6} sm={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Статус
                            </Typography>
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status) as any}
                              size="small"
                              sx={{ fontWeight: 500 }}
                            />
                          </Grid>

                          <Grid item xs={6} sm={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Сумма
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {order.totalAmount.toLocaleString("ru-RU")} ₽
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sm={3} sx={{ textAlign: { xs: "left", sm: "right" } }}>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: 2 }}
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              Подробнее
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <ShoppingBag sx={{ fontSize: 60, color: "rgba(0,0,0,0.2)", mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      У вас пока нет заказов
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Перейдите в каталог, чтобы сделать первый заказ
                    </Typography>
                    <Button variant="contained" component={Link} href="/" sx={{ borderRadius: 2 }}>
                      Перейти в каталог
                    </Button>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Избранное
                </Typography>

                {favorites.length > 0 ? (
                  <Grid container spacing={3}>
                    {favorites.map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: "1px solid rgba(0,0,0,0.08)",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{
                              height: 150,
                              mb: 2,
                              borderRadius: 1,
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              component="img"
                              src={item.imageUrl}
                              alt={item.name}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>

                          <Typography
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
                            }}
                          >
                            {item.name}
                          </Typography>

                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              color: "primary.main",
                              mb: 2,
                            }}
                          >
                            {item.price.toLocaleString("ru-RU")} ₽
                          </Typography>

                          <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              fullWidth
                              sx={{ borderRadius: 2 }}
                              onClick={() => handleAddToCart(item)}
                            >
                              В корзину
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              sx={{ borderRadius: 2, minWidth: "auto" }}
                              onClick={() => handleRemoveFromFavorites(item.id)}
                            >
                              <Favorite fontSize="small" />
                            </Button>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Favorite sx={{ fontSize: 60, color: "rgba(0,0,0,0.2)", mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Список избранного пуст
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Добавляйте товары в избранное, чтобы не потерять их
                    </Typography>
                    <Button variant="contained" component={Link} href="/" sx={{ borderRadius: 2 }}>
                      Перейти в каталог
                    </Button>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Настройки
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Безопасность
                  </Typography>

                  <Button variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
                    Изменить пароль
                  </Button>

                  <Typography variant="body2" color="text.secondary">
                    Рекомендуется менять пароль не реже одного раза в 3 месяца
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Уведомления
                  </Typography>

                  <List disablePadding>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText
                        primary="Email-уведомления о заказах"
                        secondary="Получать уведомления о статусе заказов"
                      />
                      <Button variant="text" color="primary">
                        Включено
                      </Button>
                    </ListItem>
                    <Divider component="li" />
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText primary="SMS-уведомления" secondary="Получать SMS о статусе заказов" />
                      <Button variant="text" color="primary">
                        Отключено
                      </Button>
                    </ListItem>
                    <Divider component="li" />
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText primary="Новости и акции" secondary="Получать информацию о новинках и акциях" />
                      <Button variant="text" color="primary">
                        Включено
                      </Button>
                    </ListItem>
                  </List>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: "error.main" }}>
                    Опасная зона
                  </Typography>

                  <Typography variant="body2" paragraph>
                    Удаление аккаунта приведет к потере всех данных, включая историю заказов и личную информацию. Это
                    действие необратимо.
                  </Typography>

                  <Button variant="outlined" color="error" sx={{ borderRadius: 2 }}>
                    Удалить аккаунт
                  </Button>
                </Paper>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

