"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material"
import { LocalShipping, Payment, CheckCircle } from "@mui/icons-material"
import { useCart } from "@/context/cart-context"
import Footer from "@/components/footer"
import type { Product } from "@/types/product"

// Define Order and OrderItem types directly here since we're not using the context
interface OrderItem {
  product: Product
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

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [activeStep, setActiveStep] = useState(0)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Москва",
    postalCode: "",
    comment: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Check if cart is empty
    if (cart.length === 0 && !orderComplete) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [cart, orderComplete, router])

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }))
    }
  }

  const validateShippingInfo = () => {
    const newErrors: Record<string, boolean> = {}

    if (!shippingInfo.fullName.trim()) newErrors.fullName = true
    if (!shippingInfo.phone.trim()) newErrors.phone = true
    if (!shippingInfo.email.trim() || !/^\S+@\S+\.\S+$/.test(shippingInfo.email)) newErrors.email = true
    if (!shippingInfo.address.trim()) newErrors.address = true
    if (!shippingInfo.city.trim()) newErrors.city = true
    if (!shippingInfo.postalCode.trim()) newErrors.postalCode = true

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (activeStep === 0 && !validateShippingInfo()) {
      return
    }

    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handlePlaceOrder = () => {
    // Create order items from cart
    const orderItems: OrderItem[] = cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price,
    }))

    // Create full address string
    const fullAddress = `${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.address}`

    // Generate order ID
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

    // Create new order
    const newOrder: Order = {
      id: newOrderId,
      items: orderItems,
      totalAmount: getTotalPrice() + (getTotalPrice() > 5000 ? 0 : 300),
      date: new Date().toISOString(),
      status: "Обработка",
      address: fullAddress,
      paymentMethod,
    }

    // Get existing orders from localStorage or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")

    // Add new order to the beginning of the array
    const updatedOrders = [newOrder, ...existingOrders]

    // Save updated orders to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    // Clear cart
    clearCart()

    // Set order complete
    setOrderId(newOrderId)
    setOrderComplete(true)
    setActiveStep(3)
  }

  const steps = ["Доставка", "Оплата", "Подтверждение"]

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <CircularProgress />
      </Box>
    )
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
          {orderComplete ? "Заказ оформлен" : "Оформление заказа"}
        </Typography>

        {!orderComplete ? (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                  {activeStep === 0 && (
                    <>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <LocalShipping color="primary" sx={{ mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Информация о доставке
                        </Typography>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="ФИО получателя"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleShippingInfoChange}
                            error={errors.fullName}
                            helperText={errors.fullName ? "Введите ФИО получателя" : ""}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Телефон"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingInfoChange}
                            error={errors.phone}
                            helperText={errors.phone ? "Введите номер телефона" : ""}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={handleShippingInfoChange}
                            error={errors.email}
                            helperText={errors.email ? "Введите корректный email" : ""}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Адрес"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleShippingInfoChange}
                            error={errors.address}
                            helperText={errors.address ? "Введите адрес доставки" : ""}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Город"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingInfoChange}
                            error={errors.city}
                            helperText={errors.city ? "Введите город" : ""}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Почтовый индекс"
                            name="postalCode"
                            value={shippingInfo.postalCode}
                            onChange={handleShippingInfoChange}
                            error={errors.postalCode}
                            helperText={errors.postalCode ? "Введите почтовый индекс" : ""}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Комментарий к заказу"
                            name="comment"
                            multiline
                            rows={3}
                            value={shippingInfo.comment}
                            onChange={handleShippingInfoChange}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {activeStep === 1 && (
                    <>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Payment color="primary" sx={{ mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Способ оплаты
                        </Typography>
                      </Box>

                      <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            border: paymentMethod === "card" ? "2px solid" : "1px solid",
                            borderColor: paymentMethod === "card" ? "primary.main" : "rgba(0,0,0,0.1)",
                          }}
                        >
                          <FormControlLabel
                            value="card"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  Банковская карта
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Visa, MasterCard, Мир
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>

                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            border: paymentMethod === "cash" ? "2px solid" : "1px solid",
                            borderColor: paymentMethod === "cash" ? "primary.main" : "rgba(0,0,0,0.1)",
                          }}
                        >
                          <FormControlLabel
                            value="cash"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  Наличными при получении
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Оплата курьеру при доставке
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>

                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: paymentMethod === "online" ? "2px solid" : "1px solid",
                            borderColor: paymentMethod === "online" ? "primary.main" : "rgba(0,0,0,0.1)",
                          }}
                        >
                          <FormControlLabel
                            value="online"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  Электронные деньги
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  ЮMoney, WebMoney, QIWI
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>
                      </RadioGroup>
                    </>
                  )}

                  {activeStep === 2 && (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Подтверждение заказа
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Информация о доставке
                        </Typography>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: "#f8f9fa" }}>
                          <Typography variant="body2">
                            <strong>Получатель:</strong> {shippingInfo.fullName}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Телефон:</strong> {shippingInfo.phone}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Email:</strong> {shippingInfo.email}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Адрес:</strong> {shippingInfo.city}, {shippingInfo.postalCode},{" "}
                            {shippingInfo.address}
                          </Typography>
                          {shippingInfo.comment && (
                            <Typography variant="body2">
                              <strong>Комментарий:</strong> {shippingInfo.comment}
                            </Typography>
                          )}
                        </Paper>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Способ оплаты
                        </Typography>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: "#f8f9fa" }}>
                          <Typography variant="body2">
                            {paymentMethod === "card" && "Банковская карта"}
                            {paymentMethod === "cash" && "Наличными при получении"}
                            {paymentMethod === "online" && "Электронные деньги"}
                          </Typography>
                        </Paper>
                      </Box>

                      <Alert severity="info" sx={{ mb: 3 }}>
                        Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями оферты и политикой
                        конфиденциальности.
                      </Alert>
                    </>
                  )}

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    {activeStep > 0 && (
                      <Button onClick={handleBack} variant="outlined" sx={{ borderRadius: 2 }}>
                        Назад
                      </Button>
                    )}
                    {activeStep < 2 ? (
                      <Button onClick={handleNext} variant="contained" sx={{ borderRadius: 2, ml: "auto" }}>
                        Продолжить
                      </Button>
                    ) : (
                      <Button
                        onClick={handlePlaceOrder}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 2, ml: "auto" }}
                      >
                        Оформить заказ
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, position: "sticky", top: 90 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Ваш заказ
                  </Typography>

                  <List disablePadding>
                    {cart.map((item) => (
                      <ListItem key={item.product.id} disablePadding sx={{ py: 1.5 }}>
                        <Box sx={{ display: "flex", width: "100%" }}>
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
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
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.product.name}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                {item.quantity} × {item.product.price.toLocaleString("ru-RU")} ₽
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {(item.quantity * item.product.price).toLocaleString("ru-RU")} ₽
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">
                      Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {getTotalPrice().toLocaleString("ru-RU")} ₽
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Доставка</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {getTotalPrice() > 5000 ? "Бесплатно" : "300 ₽"}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Итого
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {(getTotalPrice() + (getTotalPrice() > 5000 ? 0 : 300)).toLocaleString("ru-RU")} ₽
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
            <CheckCircle color="success" sx={{ fontSize: 80, mb: 3 }} />

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Спасибо за заказ!
            </Typography>

            <Typography variant="body1" paragraph>
              Ваш заказ #{orderId} успешно оформлен.
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              Мы отправили подтверждение на ваш email. Вы можете отслеживать статус заказа в личном кабинете.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
              <Button variant="outlined" onClick={() => router.push("/")} sx={{ borderRadius: 2, px: 3 }}>
                Вернуться в каталог
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push(`/profile?tab=orders`)}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Мои заказы
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
      <Footer />
    </>
  )
}

