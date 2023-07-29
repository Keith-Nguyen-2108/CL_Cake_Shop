<template>
  <div class="product-item cursor-pointer d-flex justify-content-center">
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
          <a-button class="mt-2 primary--text">Add to Cart</a-button>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { ProductItem } from '@/types'

export default defineComponent({
  name: 'ProductItem',

  props: {
    product: {
      type: Object as PropType<ProductItem[]>,
      default: undefined
    }
  },

  setup() {
    const getImgUrl = (url) => new URL(`/src/assets/${url}`, import.meta.url).href

    return {
      getImgUrl
    }
  }
})
</script>

<style scoped lang="scss">
.product-item {
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
