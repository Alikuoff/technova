import { Box, Container, Divider, Grid, IconButton, Link as MuiLink, List, ListItem, Typography } from "@mui/material"
import { Facebook, Instagram, Twitter, YouTube, LinkedIn, Payment } from "@mui/icons-material"
import Link from "next/link"

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#111827",
        color: "white",
        pt: 8,
        pb: 4,
        mt: 10,
        backgroundImage: "radial-gradient(circle at 100% 0%, rgba(37,99,235,0.2) 0%, rgba(17,24,39,1) 60%)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.5rem",
              }}
            >
              TechNova
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}>
              Ваш надежный магазин электроники и современных технологий. Мы предлагаем лучшие товары по
              конкурентоспособным ценам.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    color: "#2563eb",
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    color: "#2563eb",
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    color: "#2563eb",
                  },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    color: "#2563eb",
                  },
                }}
              >
                <YouTube />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "white",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    color: "#2563eb",
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Категории
            </Typography>
            <List disablePadding>
              {["Смартфоны", "Ноутбуки", "Умные часы", "Наушники", "Фотоаппараты", "Игровые консоли"].map(
                (item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }} component="div">
                    <MuiLink
                      component={Link}
                      href={`/category/${encodeURIComponent(item)}`}
                      underline="none"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: "#2563eb",
                          transform: "translateX(5px)",
                          display: "inline-block",
                        },
                      }}
                    >
                      {item}
                    </MuiLink>
                  </ListItem>
                ),
              )}
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Информация
            </Typography>
            <List disablePadding>
              {[
                "О компании",
                "Доставка и оплата",
                "Гарантия и возврат",
                "Контакты",
                "Блог",
                "Политика конфиденциальности",
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }} component="div">
                  <MuiLink
                    component={Link}
                    href={
                      item === "Контакты"
                        ? "/contacts"
                        : item === "Доставка и оплата"
                          ? "/delivery-payment"
                          : item === "Гарантия и возврат"
                            ? "/warranty-returns"
                            : "#"
                    }
                    underline="none"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: "#2563eb",
                        transform: "translateX(5px)",
                        display: "inline-block",
                      },
                    }}
                  >
                    {item}
                  </MuiLink>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Контакты
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { color: "white" },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#2563eb",
                    marginRight: 1.5,
                  }}
                />
                ул. Технологическая, 123
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { color: "white" },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#2563eb",
                    marginRight: 1.5,
                  }}
                />
                Москва, 123456
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { color: "white" },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#2563eb",
                    marginRight: 1.5,
                  }}
                />
                +7 (123) 456-7890
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { color: "white" },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#2563eb",
                    marginRight: 1.5,
                  }}
                />
                info@technova.ru
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Payment sx={{ fontSize: 40, color: "rgba(255,255,255,0.7)" }} />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} TechNova. Все права защищены.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <MuiLink
              component={Link}
              href="#"
              underline="none"
              sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#2563eb" }, fontSize: "0.875rem" }}
            >
              Условия использования
            </MuiLink>
            <MuiLink
              component={Link}
              href="#"
              underline="none"
              sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#2563eb" }, fontSize: "0.875rem" }}
            >
              Политика конфиденциальности
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

