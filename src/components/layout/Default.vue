<script setup lang="ts">
import { h, type VNode } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IMenu } from '../../types';
import { usePermissionStore } from '../../store';

function Menu() {
  const route = useRoute()
  const router = useRouter()
  const permissionStore = usePermissionStore();
  const renderMenu = (menus?: IMenu[]): VNode[] => {
    if (!menus) {
      return [];
    }
    return menus.map((menu) => {
      if (menu.children?.length) {
        return h('details', [
          h('summary', menu.label),
          renderMenu(menu.children),
        ]);
      } else {
        return h('div', { onClick: () => {
          if (menu.routeName && route.name !== menu.routeName) {
            router.push({ name: menu.routeName })
          }
        } }, menu.label);
      }
    });
  };
  return renderMenu(permissionStore.userInfo.menus)
}
</script>

<template>
  <div class="container">
    <header class="header">Header</header>
    <main class="main">
      <div class="menu">
        <Menu />
      </div>
      <div class="content">
        <RouterView></RouterView>
      </div>
    </main>
    <footer class="footer">Footer</footer>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header,
.footer {
  height: 64px;
  flex-shrink: 0;
}
.main {
  flex: 1;
  display: flex;
}
.menu {
  min-width: 160px;
  .highlight {
    color: #535bf2;
  }
}
.content {
  flex: 1;
}
</style>
