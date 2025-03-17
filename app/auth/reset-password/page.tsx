"use client"

import type React from "react"

import { useState } from "react"
import { Container, Typography, Box, Paper, TextField, Button, Link as MuiLink, Alert } from "@mui/material"
import Link from "next/link"
import Footer from "@/components/footer"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (emailError) {
      setEmailError(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true)
      return
    }

    // Simulate sending reset password email
    setResetSent(true)
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
          Восстановление пароля
        </Typography>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
          {resetSent ? (
            <>
              <Alert severity="success" sx={{ mb: 3 }}>
                Инструкции по восстановлению пароля отправлены на ваш email.
              </Alert>

              <Typography variant="body1" paragraph>
                Мы отправили инструкции по восстановлению пароля на адрес {email}. Пожалуйста, проверьте вашу почту и
                следуйте инструкциям в письме.
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                Если вы не получили письмо в течение нескольких минут, проверьте папку "Спам" или попробуйте запросить
                восстановление пароля еще раз.
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button variant="outlined" component={Link} href="/auth/login" sx={{ borderRadius: 2, py: 1.2 }}>
                  Вернуться к входу
                </Button>

                <Button variant="contained" onClick={() => setResetSent(false)} sx={{ borderRadius: 2, py: 1.2 }}>
                  Отправить снова
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1" paragraph>
                Введите email, который вы использовали при регистрации, и мы отправим вам инструкции по восстановлению
                пароля.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  error={emailError}
                  helperText={emailError ? "Пожалуйста, введите корректный email" : ""}
                  sx={{ mb: 3 }}
                  required
                />

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
                  Восстановить пароль
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <MuiLink component={Link} href="/auth/login" underline="hover">
                    Вернуться к входу
                  </MuiLink>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  )
}

