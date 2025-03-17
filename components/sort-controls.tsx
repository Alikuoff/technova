"use client"

import type React from "react"

import { ToggleButtonGroup, ToggleButton, Typography, Paper } from "@mui/material"
import { ArrowUpward, ArrowDownward } from "@mui/icons-material"

interface SortControlsProps {
  sortField: "name" | "price"
  sortDirection: "asc" | "desc"
  onSortChange: (field: "name" | "price", direction: "asc" | "desc") => void
}

export default function SortControls({ sortField, sortDirection, onSortChange }: SortControlsProps) {
  const handleFieldChange = (_event: React.MouseEvent<HTMLElement>, newField: "name" | "price" | null) => {
    if (newField !== null) {
      onSortChange(newField, sortDirection)
    }
  }

  const handleDirectionChange = (_event: React.MouseEvent<HTMLElement>, newDirection: "asc" | "desc" | null) => {
    if (newDirection !== null) {
      onSortChange(sortField, newDirection)
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>
        Сортировать по:
      </Typography>

      <ToggleButtonGroup
        value={sortField}
        exclusive
        onChange={handleFieldChange}
        aria-label="sort field"
        size="small"
        sx={{
          "& .MuiToggleButton-root": {
            borderRadius: 2,
            px: 2,
            py: 1,
            textTransform: "none",
            fontWeight: 500,
          },
        }}
      >
        <ToggleButton value="name" aria-label="sort by name">
          Названию
        </ToggleButton>
        <ToggleButton value="price" aria-label="sort by price">
          Цене
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        value={sortDirection}
        exclusive
        onChange={handleDirectionChange}
        aria-label="sort direction"
        size="small"
        sx={{
          "& .MuiToggleButton-root": {
            borderRadius: 2,
            px: 2,
            py: 1,
            textTransform: "none",
            fontWeight: 500,
          },
        }}
      >
        <ToggleButton value="asc" aria-label="ascending">
          <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} />
          По возрастанию
        </ToggleButton>
        <ToggleButton value="desc" aria-label="descending">
          <ArrowDownward fontSize="small" sx={{ mr: 0.5 }} />
          По убыванию
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  )
}

