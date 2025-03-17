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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { ExpandMore, Security, Replay, Warning, CheckCircle, Info, HelpOutline } from "@mui/icons-material"
import Footer from "@/components/footer"

export default function WarrantyReturnsPage() {
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
          Гарантия и возврат
        </Typography>

        <Grid container spacing={4}>
          {/* Warranty Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Security color="primary" sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                  Гарантийное обслуживание
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                Все товары, представленные в нашем магазине, имеют официальную гарантию производителя. Мы работаем
                только с проверенными поставщиками и гарантируем качество продукции.
              </Typography>

              <Grid container spacing={3} sx={{ mt: 2 }}>
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
                      Сроки гарантии
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Смартфоны и планшеты" secondary="12 месяцев" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Ноутбуки и компьютеры" secondary="24 месяца" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Аудиотехника" secondary="12 месяцев" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Фототехника" secondary="24 месяца" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Аксессуары" secondary="6 месяцев" />
                      </ListItem>
                    </List>
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
                      Условия гарантии
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Гарантия распространяется на заводские дефекты и неисправности, возникшие по вине производителя.
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Гарантия не распространяется на:
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Warning color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Механические повреждения" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Warning color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Повреждения, вызванные попаданием жидкости" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Warning color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Повреждения, вызванные неправильной эксплуатацией" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Warning color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Следы самостоятельного ремонта" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Как воспользоваться гарантией
                </Typography>
                <Typography variant="body1" paragraph>
                  Если вы обнаружили неисправность в приобретенном товаре, вы можете обратиться в наш сервисный центр
                  или в авторизованный сервисный центр производителя.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Обращение в наш сервисный центр"
                      secondary="Принесите товар в наш магазин вместе с чеком и гарантийным талоном. Наши специалисты проведут диагностику и определят причину неисправности."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Обращение в авторизованный сервисный центр производителя"
                      secondary="Вы можете обратиться напрямую в сервисный центр производителя. Адреса сервисных центров указаны в гарантийном талоне."
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>

          {/* Returns Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Replay color="primary" sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                  Возврат товара
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                В соответствии с Законом РФ «О защите прав потребителей», вы имеете право вернуть товар надлежащего
                качества в течение 14 дней с момента покупки, если он не подошел вам по форме, габаритам, фасону,
                расцветке, размеру или комплектации.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Условия возврата товара надлежащего качества
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Товар не был в употреблении"
                      secondary="На товаре отсутствуют следы эксплуатации, царапины, потертости и другие повреждения"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Сохранены товарный вид и потребительские свойства"
                      secondary="Товар должен быть в оригинальной упаковке с сохранением всех ярлыков и этикеток"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Сохранены документы"
                      secondary="Необходимо предоставить чек или другой документ, подтверждающий факт покупки"
                    />
                  </ListItem>
                </List>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Порядок возврата
                </Typography>
                <Typography variant="body1" paragraph>
                  Для возврата товара вам необходимо:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Шаг 1: Заполнить заявление"
                      secondary="Заполните заявление на возврат товара, указав причину возврата"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Шаг 2: Подготовить товар"
                      secondary="Упакуйте товар в оригинальную упаковку со всеми комплектующими"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Шаг 3: Доставить товар"
                      secondary="Принесите товар в наш магазин или отправьте его почтой/курьерской службой"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Шаг 4: Получить возврат денежных средств"
                      secondary="После проверки товара мы вернем вам деньги тем же способом, которым была произведена оплата"
                    />
                  </ListItem>
                </List>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Часто задаваемые вопросы
                </Typography>
                <Accordion
                  elevation={0}
                  sx={{ mb: 2, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden" }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HelpOutline color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Можно ли вернуть товар, купленный со скидкой?
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Да, товары, приобретенные со скидкой, подлежат возврату и обмену на тех же условиях, что и товары,
                      приобретенные по полной стоимости. Исключение составляют товары, на которых указано, что они не
                      подлежат возврату и обмену.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  elevation={0}
                  sx={{ mb: 2, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden" }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HelpOutline color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Сколько времени занимает возврат денежных средств?
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Возврат денежных средств осуществляется в течение 10 рабочих дней с момента получения нами
                      возвращенного товара. При оплате банковской картой средства возвращаются на ту же карту, с которой
                      была произведена оплата. При оплате наличными возврат осуществляется наличными в магазине или
                      банковским переводом.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  elevation={0}
                  sx={{ mb: 2, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden" }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HelpOutline color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Можно ли вернуть товар, если утеряна упаковка?
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Отсутствие оригинальной упаковки может стать причиной отказа в возврате товара надлежащего
                      качества. Однако если товар оказался ненадлежащего качества (с дефектом), то отсутствие упаковки
                      не является основанием для отказа в возврате или обмене.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  elevation={0}
                  sx={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden" }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HelpOutline color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Как вернуть товар, купленный через интернет-магазин?
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      Для возврата товара, купленного через интернет-магазин, вам необходимо связаться с нашей службой
                      поддержки по телефону или электронной почте. Наши специалисты подробно объяснят процедуру возврата
                      и помогут организовать обратную доставку товара. Обратите внимание, что для товаров, купленных
                      дистанционно, срок возврата составляет 7 дней с момента получения.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

