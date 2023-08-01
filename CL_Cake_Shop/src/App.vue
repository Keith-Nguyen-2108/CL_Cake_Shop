<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { Navbar } from '@/components'
</script>

<style scoped></style>
