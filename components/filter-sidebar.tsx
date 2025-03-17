"use client"

import type React from "react"

import {
  Paper,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  Checkbox,
} from "@mui/material"
import { ExpandMore } from "@mui/icons-material"

interface FilterSidebarProps {
  priceRange: [number, number]
  onPriceRangeChange: (newRange: [number, number]) => void
  showOnlyNew: boolean
  onNewProductsToggle: (checked: boolean) => void
  minMaxPrices: [number, number]
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  showOnlySale?: boolean
  onSaleToggle?: (checked: boolean) => void
}

export default function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  showOnlyNew,
  onNewProductsToggle,
  minMaxPrices,
  categories,
  selectedCategory,
  onCategoryChange,
  showOnlySale = false,
  onSaleToggle,
}: FilterSidebarProps) {
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    onPriceRangeChange(newValue as [number, number])
  }

  const handleNewProductsChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onNewProductsToggle(checked)
  }

  const handleSaleProductsChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (onSaleToggle) {
      onSaleToggle(checked)
    }
  }

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      onCategoryChange(null) // Deselect if already selected
    } else {
      onCategoryChange(category)
    }
  }

  const brands = ["Apple", "Samsung", "Sony", "LG", "Canon", "Xiaomi", "Ninebot", "DeLonghi", "Яндекс"]

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.08)",
        position: "sticky",
        top: 90,
      }}
    >
      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
        Фильтры
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Цена
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={minMaxPrices[0]}
          max={minMaxPrices[1]}
          aria-labelledby="price-range-slider"
          valueLabelFormat={(value) => `${value.toLocaleString("ru-RU")} ₽`}
          sx={{
            color: "primary.main",
            "& .MuiSlider-thumb": {
              height: 16,
              width: 16,
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {priceRange[0].toLocaleString("ru-RU")} ₽
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {priceRange[1].toLocaleString("ru-RU")} ₽
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <FormControlLabel
        control={<Switch checked={showOnlyNew} onChange={handleNewProductsChange} color="primary" />}
        label={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Только новинки
          </Typography>
        }
      />

      {onSaleToggle && (
        <FormControlLabel
          control={<Switch checked={showOnlySale} onChange={handleSaleProductsChange} color="error" />}
          label={
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Только со скидкой
            </Typography>
          }
        />
      )}

      <Divider sx={{ my: 3 }} />

      <Accordion
        elevation={0}
        defaultExpanded
        sx={{
          "&::before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0, "&.Mui-expanded": { minHeight: 48 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Категории
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {category}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      <Accordion
        elevation={0}
        defaultExpanded
        sx={{
          "&::before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0, "&.Mui-expanded": { minHeight: 48 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Бренд
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={<Checkbox size="small" />}
                label={
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {brand}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      <Accordion
        elevation={0}
        sx={{
          "&::before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0, "&.Mui-expanded": { minHeight: 48 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Наличие
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox size="small" defaultChecked />}
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  В наличии
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Под заказ
                </Typography>
              }
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}

