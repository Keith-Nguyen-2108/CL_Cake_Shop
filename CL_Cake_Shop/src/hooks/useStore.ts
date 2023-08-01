import { computed, ref } from 'vue'
import { ProductItem, ItemCart } from '@/types'
import { useNotification } from './useNotification'
import productsList from '@/products.js'

const listProducts = ref<ProductItem[]>(productsList)
const cartItems = ref<ItemCart[]>([])
const order = ref<ItemCart[]>([])

export const useStore = () => {
  // Cart

  const totalOfOrder = computed(() => {
    if (!order.value.length) return 0
    let price = 0
    order.value.forEach((cartItem: ItemCart) => {
      price += cartItem.price * cartItem.quantity
    })
    return price
  })

  const addProductToCart = (id: number) => {
    const product = listProducts.value.find((product: ProductItem) => product.id === id)
    if (product) {
      if (!product.stock_count) return

      const isExistingProduct = cartItems.value.find((product: ItemCart) => product.id === id)
      if (isExistingProduct) {
        isExistingProduct.quantity++
        useNotification('success', 'Product updated to cart!')
      } else {
        const cartItem = {
          ...product,
          ...{
            quantity: 1,
            price: product.discounted_price || product.original_price
          }
        }
        cartItems.value = [...cartItems.value, cartItem]
        useNotification('success', 'Product added to cart!')
      }
    }
  }

  const updateCartItem = (itemId: number, quantity: number) => {
    const cartProduct = cartItems.value.find((cartItem: ItemCart) => cartItem.id === itemId)
    if (cartProduct) cartProduct.quantity = quantity
  }

  const removeFormList = (id: number) => {
    cartItems.value = cartItems.value.filter((cartItem: ItemCart) => cartItem.id !== id)
  }

  // Order

  const createOrder = (productsList: number[]) => {
    productsList.map((productId: number) => {
      const cartItem = cartItems.value.find((cartItem: ItemCart) => cartItem.id === productId)
      if (cartItem) order.value = [...order.value, cartItem]
    })
  }

  const checkoutOrder = () => {
    order.value.map((orderItem: ItemCart) => {
      const product = listProducts.value.find((product: ProductItem) => product.id === orderItem.id)
      if (product) product.stock_count -= orderItem.quantity

      removeFormList(orderItem.id)
    })
  }

  const clearOrder = () => (order.value = [])

  return {
    listProducts,
    cartItems,
    totalOfOrder,
    order,
    addProductToCart,
    updateCartItem,
    removeFormList,
    createOrder,
    clearOrder,
    checkoutOrder
  }
}
