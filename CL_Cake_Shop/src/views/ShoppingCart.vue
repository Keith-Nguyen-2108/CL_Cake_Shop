<template>
  <div class="shopping-cart py-1">
    <h1 class="text-center page-title mb-4">Shopping Cart</h1>
    <div class="shopping-cart__container pt-3">
      <a-table
        :columns="CART_COLUMNS"
        :data-source="cartItems"
        :row-selection="rowSelection"
        :row-key="(record) => record.id"
        :pagination="false"
        bordered
      >
        <template #name="{ record }">
          <div>{{ record.name }}</div>
          <div v-if="record.customText" class="b8 pt-2">Custom text: {{ record.customText }}</div>
        </template>
        <template #img="{ record }">
          <div className="d-flex justify-content-center">
            <img :src="getImgUrl(record.image_url)" alt="" className="cart-item-image" />
          </div>
        </template>
        <template #price="{ text }"> $ {{ text }} </template>
        <template #quantity="{ record }">
          <a-input-number
            v-model:value="record.quantity"
            :min="1"
            :max="record.stock_count"
            @change="updateCartItem(record.id, $event)"
          />
        </template>
        <template #total="{ record }">
          $ {{ (record.price * record.quantity).toFixed(2) }}
        </template>
        <template #action="{ record }">
          <div class="d-flex justify-content-between justify-content-sm-center">
            <a-tooltip title="Add custom text">
              <plus-square-outlined
                :key="record.id"
                class="me-md-3 btn-edit"
                @click="openModal(record)"
              />
            </a-tooltip>
            <a-tooltip title="Remove from cart">
              <delete-outlined
                :key="record.id"
                class="btn-danger"
                @click="deleteCartItem(record.id)"
              />
            </a-tooltip>
          </div>
        </template>
      </a-table>

      <div class="py-3 d-flex justify-content-end">
        <div>
          <a-button
            type="primary"
            class="mt-2 float-end"
            :disabled="!listSelected.length"
            @click="handleCheckout"
          >
            Checkout
          </a-button>
        </div>
      </div>
    </div>
    <custom-modal
      v-model:visible="isCustomText"
      :value="product?.customText || ''"
      @submit-text="handleCustomText"
    />

    <checkout-modal v-model:visible="isCheckout" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons-vue'

import { useStore, showConfirmModal } from '@/hooks'
import { CART_COLUMNS } from '@/constants'
import { CustomModal, CheckoutModal } from '@/components'
import { ItemCart } from '@/types'

export default defineComponent({
  name: 'ShoppingCart',

  components: { CustomModal, PlusSquareOutlined, DeleteOutlined, CheckoutModal },

  setup() {
    const isCustomText = ref<Boolean>(false)
    const isCheckout = ref<Boolean>(false)
    const product = ref<ItemCart>()
    const listSelected = ref<number[]>([])

    const { cartItems, updateCartItem, removeFormList, createOrder } = useStore()

    const rowSelection = computed(() => {
      return {
        selectedRowKeys: listSelected.value,
        onChange: (selectedRowKeys: number[]) => {
          listSelected.value = selectedRowKeys
        }
      }
    })

    const getImgUrl = (url) => new URL(`/src/assets/${url}`, import.meta.url).href

    const deleteCartItem = (id: number) => {
      showConfirmModal(
        'Are you sure you want to delete this item?',
        'Deleted Successfully!',
        async () => {
          await removeFormList(id)
        }
      )
    }

    const openModal = (cartItem: ItemCart) => {
      product.value = cartItem
      isCustomText.value = true
    }

    const handleCustomText = (text: string) => {
      if (!text) return
      const cartItem = cartItems.value.find(
        (cartItem: ItemCart) => cartItem.id === product.value.id
      )
      cartItem.customText = text.trim()
    }

    const handleCheckout = () => {
      if (!listSelected.value.length) return

      isCheckout.value = true
      createOrder(listSelected.value)
    }

    return {
      CART_COLUMNS,
      product,
      cartItems,
      rowSelection,
      listSelected,
      isCustomText,
      isCheckout,
      getImgUrl,
      updateCartItem,
      deleteCartItem,
      handleCustomText,
      openModal,
      handleCheckout
    }
  }
})
</script>

<style lang="scss" scoped>
.shopping-cart {
  &__container {
    width: 90%;
    margin: 0 auto;
    @media screen and (min-width: 1000px) {
      width: 1000px;
    }

    .cart-item-image {
      width: 100px;
      height: 100px;
      object-fit: contain;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
