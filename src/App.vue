<script setup lang="ts">
import { DefaultLayout, BlankLayout } from './components/layout'
</script>

<template>
  <div class="layout">
    <BlankLayout v-if="$route.meta.layout === 'blank'" />
    <DefaultLayout v-else />
  </div>
</template>
