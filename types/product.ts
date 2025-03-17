export interface Product {
  id: number
  name: string
  price: number
  brand: string
  description: string
  isNew: boolean
  imageUrl: string
  category: string
  onSale?: boolean
  oldPrice?: number
  discountPercent?: number
}

