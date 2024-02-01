<script setup lang="ts">
import { useRoute } from 'vue-router';
import { DefaultLayout, BlankLayout } from './components/layout';
import { usePermissionStore } from './store';
import { installGuard, router } from './router';
const route = useRoute();
const permissionStore = usePermissionStore();
async function bootstrap() {
  await permissionStore.bootstrap();
  installGuard(router);
  router.replace(route);
}
bootstrap();
</script>

<template>
  <div v-if="permissionStore.state.loading">loading...</div>
  <template v-else-if="permissionStore.state.inited">
    <BlankLayout v-if="$route.meta.layout === 'blank'" />
    <DefaultLayout v-else />
  </template>
</template>
