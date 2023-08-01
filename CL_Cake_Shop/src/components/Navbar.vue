<template>
  <div class="header w-100">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="logo d-flex align-items-center cursor-pointer" @click="$router.push('/')">
          <div class="logo__avatar">
            <img class="logo__avatar-img" src="@/assets/logo.png" alt />
          </div>
          <div class="logo__name-branch">
            <h3 class="b2 text-logo mb-0">CL</h3>
            <p class="b6 mb-0">Cake Shop</p>
          </div>
        </div>
        <div class="d-flex">
          <search-outlined class="b5 cursor-pointer" />
          <badge :count="cartItems.length" @click="$router.push('/cart')">
            <shopping-cart-outlined class="b5 cursor-pointer ms-4" />
          </badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Badge } from 'ant-design-vue'
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue'

import { useStore } from '@/hooks'

export default defineComponent({
  name: 'Navbar',

  components: {
    SearchOutlined,
    ShoppingCartOutlined,
    Badge
  },

  setup() {
    const { cartItems } = useStore()

    return { cartItems }
  }
})
</script>

<style lang="scss" scoped>
.header {
  padding-block: 20px;

  @media screen and (max-width: 525px) {
    padding-inline: 10px;
  }

  .logo {
    &__avatar {
      border-right: 2px solid rgb(56, 56, 56);
      &-img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        padding-right: 10px;
      }
    }
    &__name-branch {
      padding-left: 10px;

      .text-logo {
        letter-spacing: 2px;
      }
    }
  }
}
</style>
