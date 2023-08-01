<template>
  <div class="checkout-modal">
    <a-modal :open="visible" title="Order Summary" width="600px" @cancel="onClose">
      <div class="checkout-modal__container pt-3">
        <a-table bordered :columns="CHECKOUT_COLUMNS" :data-source="order" :pagination="false">
          <template #name="{ record }">
            <div>{{ record.name }}</div>
            <div v-if="record.customText" class="b9 pt-2">Custom text: {{ record.customText }}</div>
          </template>
          <template #img="{ record }">
            <div className="d-flex justify-content-center">
              <img :src="getImgUrl(record.image_url)" alt="" className="checkout-item-image" />
            </div>
          </template>
          <template #price="{ text }"> $ {{ text }} </template>
          <template #total="{ record }">
            $ {{ (record.price * record.quantity).toFixed(2) }}
          </template>
        </a-table>

        <div class="py-3 d-flex justify-content-end">
          <p class="h5">Total: $ {{ totalOfOrder?.toFixed(2) }}</p>
        </div>
      </div>
      <template #footer>
        <a-button key="back" danger @click="onClose">Cancel</a-button>
        <a-button key="submit" type="primary" @click="payOrder"> Pay </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Modal } from 'ant-design-vue'
import { CheckCircleTwoTone } from '@ant-design/icons-vue'

import { CHECKOUT_COLUMNS } from '@/constants'
import { useStore, showConfirmModal } from '@/hooks'

export default defineComponent({
  name: 'CheckoutModal',

  components: { CheckCircleTwoTone },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  emits: ['submit-text', 'update:visible'],

  setup(_, { emit }) {
    const { order, totalOfOrder, clearOrder, checkoutOrder } = useStore()

    const getImgUrl = (url) => new URL(`/src/assets/${url}`, import.meta.url).href

    const onClose = () => {
      emit('update:visible', false)
      clearOrder()
    }

    const checkoutSuccess = () => {
      Modal.success({
        title: 'This is a success message',
        content: h('div', { class: 'h5' }, [
          h('p', 'Thank you for trusting and ordering from the shop!')
        ])
      })
    }

    const payOrder = () => {
      showConfirmModal('Are you sure you want to checkout this order?', undefined, () => {
        checkoutOrder()
        onClose()
        setTimeout(() => {
          checkoutSuccess()
        }, 500)
      })
    }

    return {
      CHECKOUT_COLUMNS,
      order,
      totalOfOrder,
      getImgUrl,
      onClose,
      payOrder
    }
  }
})
</script>

<style lang="scss" scoped>
.checkout-modal {
  position: relative;
  &__container {
    .checkout-item-image {
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
