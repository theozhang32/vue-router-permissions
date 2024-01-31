import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { type RouteRecordRaw, type RouteMeta } from 'vue-router';
import { IMenu } from '../types';
import { permissionRoutes } from '../router';

export const usePermission = defineStore('permission', () => {
  const userInfo = reactive<{
    uid: string;
    permissions: string[];
    menus: IMenu[];
  }>({
    uid: '',
    permissions: [],
    menus: [],
  });

  const state = reactive({
    inited: false,
    loading: true,
  });

  async function bootstrap() {
    if (!state.inited) {
      try {
        // if (!storage.get(import.meta.env.VITE_APP_TOKEN_KEY)) {
        //   throw new Error('没有登录信息')
        // }
        const res = await Promise.resolve({ data: { id: '123' } });
        if (res) {
          userInfo.uid = res.data.id;
          // 将权限信息同步到路由和菜单
          // await syncRoutesAndMenus()
          // 过滤菜单仅留下有权限的
          // menus.value = filterMenusByPermissions(defaultMenus)
        } else {
          userInfo.permissions = [];
        }
      } catch (e) {
        userInfo.permissions = [];
        console.error(e);
      } finally {
        state.inited = true;
        state.loading = false;
      }
    } else {
      state.loading = false;
    }
  }

  async function reboot() {
    state.inited = false;
    bootstrap();
  }

  async function addPermissionsToRoutesAndMenus() {
    let firstValidRoute: RouteRecordRaw | null = null;
    try {
      const res = Promise.resolve(); // 请求路由权限（适用于）
      // 遍历两个树，将permissions赋值到
      const _menus: IMenu[] = [];
      const stackToBeUpdate = [...permissionRoutes];
      const stackTemplate: RouteRecordRaw[] = [];

      while (stackToBeUpdate.length) {
        const itemToUpdate = stackToBeUpdate.shift() as RouteRecordRaw;
        const itemTemplate = stackTemplate.shift() as RouteRecordRaw;

        // 赋值
        if (
          !itemToUpdate.redirect &&
          (itemToUpdate.name === itemTemplate.name ||
            itemToUpdate.path === itemTemplate.path)
        ) {
          // 两个节点key相同的树，这个if应该永远都进入
          if (itemTemplate.meta?.permissions?.length) {
            itemToUpdate.meta = {
              ...itemToUpdate.meta,
              permissions: [...itemTemplate.meta.permissions],
            } as RouteMeta;
          }

          if (!firstValidRoute && validateRoute(itemToUpdate)) {
            firstValidRoute = { ...itemToUpdate };
          }

          if (itemToUpdate.meta?.menu) {
            // TODO 菜单拾取
          }
        }

        if (itemToUpdate.children && itemToUpdate.children.length > 0) {
          stackToBeUpdate.push(...itemToUpdate.children);
          stackTemplate.push(...(itemTemplate.children ?? []));
        }
      }
    } catch (e) {}

    // 处理根路径重定向
    permissionRoutes.unshift({
      path: '/',
      redirect: firstValidRoute ?? { name: 'Forbidden' }
    })
  }

  function validateRoute(to: RouteRecordRaw) {
    if (!to.meta?.permissions) {
      return true;
    }
    const p = to.meta.permissions;
    return p.some((_p) => userInfo.permissions.includes(_p));
  }

  return {
    userInfo,
    state,
    bootstrap,
    reboot,
  };
});
