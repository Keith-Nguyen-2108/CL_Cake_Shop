<template>
  <main>
    <navbar />
    <div class="banner">
      <img class="banner-img" src="@/assets/banner.png" alt />
    </div>
    <products-list />
  </main>
</template>

<script lang="ts">
import { Navbar, ProductsList } from '@/components'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',

  components: {
    Navbar,
    ProductsList
  }
})
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 400px;

  @media screen and (max-width: 525px) {
    height: 200px;
  }

  &-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
