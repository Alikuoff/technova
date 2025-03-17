import type { Product } from "@/types/product"

// Create a reusable function to fetch products
export async function fetchProductsData(): Promise<Product[]> {
  const res = await fetch("/api/products", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`)
  }

  return res.json()
}

// Create a function to get a single product by ID
export async function fetchProductById(id: string | number): Promise<Product | null> {
  const res = await fetch(`/api/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  if (!res.ok) {
    if (res.status === 404) {
      return null
    }
    throw new Error(`HTTP error! Status: ${res.status}`)
  }

  return res.json()
}

