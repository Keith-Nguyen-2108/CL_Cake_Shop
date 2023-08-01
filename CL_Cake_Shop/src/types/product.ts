export type ProductItem = {
  id: number
  name: string
  image_url: string
  description: string
  original_price: number
  is_on_discount: boolean
  discounted_price: number | null
  stock_count: number
}

export interface ItemCart extends ProductItem {
  quantity: number
  price: number
  customText?: string
}
