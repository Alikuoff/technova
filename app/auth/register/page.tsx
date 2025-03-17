"use client"

import type React from "react"

import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  Alert,
} from "@mui/material"
import { Visibility, VisibilityOff, Google, Facebook, Apple } from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [termsError, setTermsError] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      password: formData.password.length < 6,
      confirmPassword: formData.password !== formData.confirmPassword,
    }

    setErrors(newErrors)

    // Check terms agreement
    if (!agreeTerms) {
      setTermsError(true)
      return
    }

    // If no errors, submit form
    if (!Object.values(newErrors).some(Boolean)) {
      // For demo purposes, let's simulate a successful registration
      // In a real app, you would call your registration API here

      // Store user info in localStorage (in a real app, you'd use a more secure method)
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          name: formData.name,
          email: formData.email,
          isLoggedIn: true,
        }),
      )

      // Show success message
      setRegisterSuccess(true)

      // Redirect to profile page after a delay
      setTimeout(() => {
        router.push("/profile")
      }, 2000)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(e.target.checked)
    if (e.target.checked) {
      setTermsError(false)
    }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 8 }}>
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
          Регистрация
        </Typography>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
          {registerSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Регистрация успешно завершена! Перенаправляем вас в личный кабинет...
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              helperText={errors.name ? "Пожалуйста, введите ваше имя" : ""}
              sx={{ mb: 3 }}
              required
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email ? "Пожалуйста, введите корректный email" : ""}
              sx={{ mb: 3 }}
              required
            />

            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password ? "Пароль должен содержать минимум 6 символов" : ""}
              sx={{ mb: 3 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Подтверждение пароля"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword ? "Пароли не совпадают" : ""}
              sx={{ mb: 3 }}
              required
            />

            <FormControlLabel
              control={<Checkbox checked={agreeTerms} onChange={handleTermsChange} color="primary" />}
              label={
                <Typography variant="body2">
                  Я согласен с{" "}
                  <MuiLink component={Link} href="#" underline="hover">
                    условиями использования
                  </MuiLink>{" "}
                  и{" "}
                  <MuiLink component={Link} href="#" underline="hover">
                    политикой конфиденциальности
                  </MuiLink>
                </Typography>
              }
              sx={{ mb: 1 }}
            />

            {termsError && (
              <Typography variant="caption" color="error" sx={{ display: "block", mb: 2 }}>
                Необходимо согласиться с условиями использования
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                mb: 3,
              }}
            >
              Зарегистрироваться
            </Button>

            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Уже есть аккаунт?{" "}
                <MuiLink component={Link} href="/auth/login" underline="hover" sx={{ fontWeight: 600 }}>
                  Войти
                </MuiLink>
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                или зарегистрироваться через
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="outlined" startIcon={<Google />} sx={{ borderRadius: 2, py: 1.2 }}>
                Google
              </Button>
              <Button variant="outlined" startIcon={<Facebook />} sx={{ borderRadius: 2, py: 1.2 }}>
                Facebook
              </Button>
              <Button variant="outlined" startIcon={<Apple />} sx={{ borderRadius: 2, py: 1.2 }}>
                Apple
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  )
}

