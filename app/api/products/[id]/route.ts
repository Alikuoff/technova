import { NextResponse } from "next/server"
import type { Product } from "@/types/product"

// Mock product data - same as in the products route
const products: Product[] = [
  {
    id: 1,
    name: "Смартфон Samsung Galaxy S21",
    price: 49990,
    oldPrice: 59990,
    discountPercent: 17,
    onSale: true,
    brand: "Samsung",
    description:
      "Флагманский смартфон с мощным процессором, отличной камерой и ярким дисплеем. Идеально подходит для любых задач.",
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Смартфоны",
  },
  {
    id: 2,
    name: "Ноутбук Apple MacBook Pro 13",
    price: 129990,
    brand: "Apple",
    description:
      "Профессиональный ноутбук с процессором M1, длительным временем автономной работы и великолепным Retina-дисплеем.",
    isNew: false,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Ноутбуки",
  },
  {
    id: 3,
    name: "Наушники Sony WH-1000XM4",
    price: 27990,
    oldPrice: 32990,
    discountPercent: 15,
    onSale: true,
    brand: "Sony",
    description:
      "Беспроводные наушники с шумоподавлением, высоким качеством звука и длительным временем работы от аккумулятора.",
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Наушники",
  },
  {
    id: 4,
    name: "Умные часы Apple Watch Series 7",
    price: 36990,
    brand: "Apple",
    description: "Современные умные часы с большим дисплеем, множеством датчиков для отслеживания здоровья и фитнеса.",
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Умные часы",
  },
  {
    id: 5,
    name: "Планшет Samsung Galaxy Tab S7",
    price: 59990,
    brand: "Samsung",
    description: "Мощный планшет с большим экраном, поддержкой стилуса S Pen и возможностью работы в режиме ноутбука.",
    isNew: false,
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Планшеты",
  },
  {
    id: 6,
    name: "Фотоаппарат Canon EOS R6",
    price: 189990,
    oldPrice: 219990,
    discountPercent: 14,
    onSale: true,
    brand: "Canon",
    description:
      "Полнокадровая беззеркальная камера с высоким качеством изображения, быстрым автофокусом и стабилизацией изображения.",
    isNew: false,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Фотоаппараты",
  },
  {
    id: 7,
    name: "Игровая консоль Sony PlayStation 5",
    price: 49990,
    oldPrice: 54990,
    discountPercent: 9,
    onSale: true,
    brand: "Sony",
    description:
      "Мощная игровая консоль нового поколения с поддержкой 4K-графики, быстрой загрузкой и инновационным контроллером DualSense.",
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Игровые консоли",
  },
  {
    id: 8,
    name: "Телевизор LG OLED C1",
    price: 119990,
    brand: "LG",
    description: "OLED-телевизор с великолепным качеством изображения, поддержкой HDR и идеальным черным цветом.",
    isNew: false,
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Телевизоры",
  },
  {
    id: 9,
    name: "Умная колонка Яндекс Станция Макс",
    price: 16990,
    brand: "Яндекс",
    description: "Умная колонка с голосовым помощником Алиса, мощным звуком и возможностью управления умным домом.",
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Умные колонки",
  },
  {
    id: 10,
    name: "Робот-пылесос Xiaomi Roborock S7",
    price: 39990,
    oldPrice: 49990,
    discountPercent: 20,
    onSale: true,
    brand: "Xiaomi",
    description:
      "Умный робот-пылесос с функцией влажной уборки, мощным всасыванием и интеллектуальной навигацией для эффективной очистки дома.",
    isNew: false,
    imageUrl:
      "https://images.unsplash.com/photo-1582830858840-8dcb6a3f6f6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Умный дом",
  },
  {
    id: 11,
    name: "Электросамокат Ninebot KickScooter Max G30",
    price: 59990,
    brand: "Ninebot",
    description:
      "Мощный электросамокат с большим запасом хода, надежной конструкцией и высокой максимальной скоростью.",
    isNew: false,
    imageUrl:
      "https://images.unsplash.com/photo-1590674668192-1e0b12301da6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Электротранспорт",
  },
  {
    id: 12,
    name: "Кофемашина DeLonghi Magnifica S",
    price: 42990,
    oldPrice: 47990,
    discountPercent: 10,
    onSale: true,
    brand: "DeLonghi",
    description:
      "Автоматическая кофемашина с возможностью приготовления различных видов кофе, встроенной кофемолкой и капучинатором.",
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1570087935869-9e23839d5b73?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Бытовая техника",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const product = products.find((p) => p.id.toString() === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

