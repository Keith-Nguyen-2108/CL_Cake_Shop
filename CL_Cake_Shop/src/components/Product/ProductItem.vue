<template>
  <div
    :class="[
      'product-item cursor-pointer d-flex justify-content-center',
      !product.stock_count ? 'out-of-stock' : ''
    ]"
  >
    <a-card hoverable>
      <template #cover>
        <img alt="example" :src="getImgUrl(product.image_url)" />
      </template>
      <a-card-meta>
        <template #title>
          <p class="mb-0 h5">{{ product.name }}</p>
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <span
                :class="['product-item_price', product.is_on_discount ? 'original-price b8' : 'b5']"
                >${{ product.original_price }}</span
              >
              <span v-if="product.is_on_discount" class="discount-price ms-2 b5"
                >${{ product.discounted_price }}</span
              >
            </div>
            <span class="b6">Quantity: {{ product.stock_count }}</span>
          </div>
        </template>
        <template #description>
          <div class="product-item__description">{{ product.description }}</div>
          <a-button
            type="primary"
            class="mt-2"
            :disabled="!product.stock_count"
            @click="() => addProductToCart(product.id)"
            >Add to Cart</a-button
          >
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { ProductItem } from '@/types'
import { useStore } from '@/hooks'

export default defineComponent({
  name: 'ProductItem',

  props: {
    product: {
      type: Object as PropType<ProductItem[]>,
      default: undefined
    }
  },

  setup() {
    const { addProductToCart } = useStore()

    const getImgUrl = (url) => new URL(`/src/assets/${url}`, import.meta.url).href

    return {
      getImgUrl,
      addProductToCart
    }
  }
})
</script>

<style scoped lang="scss">
.product-item {
  &.out-of-stock {
    position: relative;
    z-index: 1;

    &::before {
      content: 'Out of Stock';
      top: 8%;
      background: #be9c79;
      color: white;
      position: absolute;
      border-radius: 0.1em;
      left: 48%;
      transform: rotate(-30deg) translate(-50%, -48%);
      font-size: 40px;
      width: 90%;
      text-align: center;
      z-index: 2;
    }

    .ant-card {
      &-cover {
        img {
          filter: grayscale(1);
        }
      }
    }
  }

  .ant-card {
    width: 300px;
    height: 380px;

    &-cover {
      img {
        padding: 5px;
        width: 100%;
        height: 200px;
        object-fit: contain;
      }
    }
  }
  &_price {
    text-decoration: none;
    position: relative;
    &.original-price {
      color: rgb(145, 145, 145);
      &::before {
        content: '';
        top: 50%;
        background: red;
        width: 110%;
        position: absolute;
        height: 0.1em;
        border-radius: 0.1em;
        left: -5%;
        transform: rotate(-30deg);
      }
    }
  }
  &__description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .discount-price {
    color: red;
  }
}
</style>
