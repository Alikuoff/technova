"use client"

import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { LocalShipping, Payment, CreditCard, AccountBalance, Money, AccessTime, CheckCircle } from "@mui/icons-material"
import Footer from "@/components/footer"

export default function DeliveryPaymentPage() {
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
          Доставка и оплата
        </Typography>

        <Grid container spacing={4}>
          {/* Delivery Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <LocalShipping color="primary" sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                  Способы доставки
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Курьерская доставка
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Доставка осуществляется курьерской службой по всей России. Наши курьеры доставят ваш заказ прямо
                      до двери в удобное для вас время.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Сроки доставки:
                      </Typography>
                      <List dense disablePadding>
                        <ListItem disableGutters>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <AccessTime fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Москва и Санкт-Петербург: 1-2 рабочих дня" />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <AccessTime fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Другие города: 3-7 рабочих дней" />
                        </ListItem>
                      </List>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Стоимость:
                      </Typography>
                      <Typography variant="body2">От 300 ₽ (бесплатно при заказе от 5000 ₽)</Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Самовывоз из пунктов выдачи
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Вы можете забрать свой заказ в одном из многочисленных пунктов выдачи в вашем городе. Это удобно,
                      если вас не будет дома в момент доставки.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Сроки доставки в пункт выдачи:
                      </Typography>
                      <List dense disablePadding>
                        <ListItem disableGutters>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <AccessTime fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Москва и Санкт-Петербург: 1-2 рабочих дня" />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <AccessTime fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Другие города: 2-5 рабочих дней" />
                        </ListItem>
                      </List>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Стоимость:
                      </Typography>
                      <Typography variant="body2">От 200 ₽ (бесплатно при заказе от 3000 ₽)</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Важная информация о доставке
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Проверка товара при получении"
                      secondary="Вы можете проверить товар при получении перед оплатой (при наложенном платеже)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Отслеживание заказа"
                      secondary="Вы получите трек-номер для отслеживания вашего заказа"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Страховка"
                      secondary="Все отправления застрахованы на полную стоимость заказа"
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>

          {/* Payment Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Payment color="primary" sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                  Способы оплаты
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <CreditCard color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Банковская карта
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Visa, MasterCard, МИР. Безопасная оплата через защищенное соединение.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Money color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Наличными
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Оплата наличными курьеру при получении заказа или в пункте выдачи.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <AccountBalance color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Банковский перевод
                      </Typography>
                    </Box>
                    <Typography variant="body2">Для юридических лиц. Оплата по выставленному счету.</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Payment color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Электронные деньги
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      ЮMoney, WebMoney, QIWI и другие популярные электронные платежные системы.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Безопасность платежей
                </Typography>
                <Typography variant="body1" paragraph>
                  Все платежи на сайте защищены с помощью современных технологий шифрования. Мы не храним данные ваших
                  банковских карт. Оплата происходит через защищенное соединение напрямую на сервере банка-эквайера.
                </Typography>
                <Typography variant="body1">
                  При оплате заказа банковской картой, списание средств происходит в момент подтверждения заказа. Если
                  по каким-то причинам вы решите отменить заказ, средства будут возвращены на вашу карту в полном
                  объеме.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

