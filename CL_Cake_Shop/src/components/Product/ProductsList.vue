<template>
  <div class="products-list py-5">
    <h1 class="text-center page-title mb-4">Products List</h1>
    <div class="products-list__container pt-3">
      <a-row class="align-product">
        <a-col
          :sm="24"
          :md="12"
          :lg="8"
          v-for="product in listProducts"
          :key="product.id"
          class="mb-4"
        >
          <product-item :product="product" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/hooks'

import ProductItem from './ProductItem.vue'

export default defineComponent({
  name: 'ProductsList',

  components: {
    ProductItem
  },

  setup() {
    const { listProducts } = useStore()

    return {
      listProducts
    }
  }
})
</script>

<style lang="scss" scoped>
.products-list {
  &__container {
    width: 90%;
    margin: 0 auto;
    @media screen and (min-width: 1000px) {
      width: 1000px;
    }

    .align-product {
      justify-content: start;
      @media screen and (max-width: 525px) {
        justify-content: center;
      }
    }
  }
}
</style>
