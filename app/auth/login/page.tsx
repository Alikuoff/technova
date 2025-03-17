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
  Alert,
  Link as MuiLink,
} from "@mui/material"
import { Visibility, VisibilityOff, Google, Facebook, Apple } from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })
  const [loginError, setLoginError] = useState<string | null>(null)

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

    // Clear login error when typing
    if (loginError) {
      setLoginError(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      password: formData.password.length < 6,
    }

    setErrors(newErrors)

    // If no errors, submit form
    if (!Object.values(newErrors).some(Boolean)) {
      // For demo purposes, let's simulate a successful login
      // In a real app, you would call your authentication API here

      // Simulate login with test@example.com / password123
      if (formData.email === "test@example.com" && formData.password === "password123") {
        // Store user info in localStorage (in a real app, you'd use a more secure method)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            name: "Тестовый Пользователь",
            email: formData.email,
            isLoggedIn: true,
          }),
        )

        // Redirect to profile page
        router.push("/profile")
      } else {
        setLoginError("Неверный email или пароль. Попробуйте test@example.com / password123")
      }
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
          Вход в личный кабинет
        </Typography>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
          {loginError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {loginError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
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
              sx={{ mb: 2 }}
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

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <MuiLink component={Link} href="/auth/reset-password" underline="hover" sx={{ fontSize: "0.875rem" }}>
                Забыли пароль?
              </MuiLink>
            </Box>

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
              Войти
            </Button>

            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Еще нет аккаунта?{" "}
                <MuiLink component={Link} href="/auth/register" underline="hover" sx={{ fontWeight: 600 }}>
                  Зарегистрироваться
                </MuiLink>
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                или войти через
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

