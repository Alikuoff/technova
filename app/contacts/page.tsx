"use client"

import type React from "react"

import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
} from "@mui/material"
import { Phone, Email, LocationOn, AccessTime, Send } from "@mui/icons-material"
import Footer from "@/components/footer"

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      name: formData.name.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === "",
    }

    setErrors(newErrors)

    // If no errors, submit form
    if (!Object.values(newErrors).some(Boolean)) {
      // Here you would normally send the data to your backend
      console.log("Form submitted:", formData)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      // Show success message
      setSnackbarOpen(true)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
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
          Контакты
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, height: "100%" }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Наши контакты
              </Typography>

              <List disablePadding>
                <ListItem disableGutters sx={{ mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Адрес"
                    secondary="ул. Технологическая, 123, Москва, 123456"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>

                <ListItem disableGutters sx={{ mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Телефон"
                    secondary="+7 (123) 456-7890"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>

                <ListItem disableGutters sx={{ mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary="info@catalog.ru"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>

                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <AccessTime color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Режим работы"
                    secondary="Пн-Пт: 9:00 - 20:00, Сб-Вс: 10:00 - 18:00"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Мы на карте
              </Typography>

              <Box
                component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5803072832404!2d37.618675376890715!3d55.75362497268344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sThe%20Moscow%20Kremlin!5e0!3m2!1sen!2sru!4v1710530151861!5m2!1sen!2sru"
                sx={{
                  border: 0,
                  width: "100%",
                  height: 250,
                  borderRadius: 2,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Напишите нам
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Если у вас есть вопросы, предложения или вы хотите оставить отзыв, заполните форму ниже, и мы свяжемся с
                вами в ближайшее время.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ваше имя"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      helperText={errors.name ? "Пожалуйста, введите ваше имя" : ""}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      helperText={errors.email ? "Пожалуйста, введите корректный email" : ""}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField fullWidth label="Телефон" name="phone" value={formData.phone} onChange={handleChange} />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Сообщение"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      helperText={errors.message ? "Пожалуйста, введите ваше сообщение" : ""}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        mt: 1,
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      Отправить сообщение
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}>
              Часто задаваемые вопросы
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Как оформить заказ?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Выберите товары, добавьте их в корзину, перейдите в корзину и нажмите кнопку "Оформить заказ".
                  Следуйте инструкциям на экране для завершения заказа.
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Какие способы оплаты доступны?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Мы принимаем оплату банковскими картами, электронными деньгами, наличными при получении и банковским
                  переводом для юридических лиц.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Как долго осуществляется доставка?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Доставка по Москве осуществляется в течение 1-2 рабочих дней. Доставка в регионы занимает от 3 до 7
                  рабочих дней в зависимости от удаленности.
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Как вернуть товар?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Вы можете вернуть товар в течение 14 дней с момента получения, если он не был в употреблении и
                  сохранены все документы и упаковка. Для возврата свяжитесь с нашей службой поддержки.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
        </Alert>
      </Snackbar>

      <Footer />
    </>
  )
}

