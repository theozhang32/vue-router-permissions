import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { type RouteRecordRaw, type RouteMeta } from 'vue-router';
import { IMenu } from '../types';
import { permissionRoutes, router } from '../router';

export const usePermissionStore = defineStore('permission', () => {
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
        const res = await fetch('/api/getUserInfo').then(response => response.json())
        if (res && res.ret === 0 && res.data) {
          userInfo.uid = res.data.id;
          userInfo.permissions = res.data.permissions ?? []
          // 将权限信息同步到路由
          await addPermissionsToRoutes();
          // 动态添加权限路由
          addRoutes();
          // 根据权限路由生成菜单
          userInfo.menus = generateMenusByRoutes(permissionRoutes);
          console.log(userInfo.menus)
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

  async function addPermissionsToRoutes() {
    let firstValidRoute: RouteRecordRaw | null = null;
    try {
      const res = await fetch('/api/permission').then(response => response.json()); // 请求路由权限（适用于）
      if (res && res.ret === 0 && res.data) {
        // 遍历两个树，将permissions赋值到
        const stackToBeUpdate = [...permissionRoutes];
        const stackTemplate: RouteRecordRaw[] = res.data;
  
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
  
            if (!firstValidRoute && validatePermission(itemToUpdate.meta?.permissions) && !itemToUpdate.children) {
              firstValidRoute = { ...itemToUpdate };
            }
          }
  
          if (itemToUpdate.children && itemToUpdate.children.length > 0) {
            stackToBeUpdate.push(...itemToUpdate.children);
            stackTemplate.push(...(itemTemplate.children ?? []));
          }
        }
      }
    } catch (e) {}

    // 处理根路径重定向
    permissionRoutes.unshift({
      path: '/',
      redirect: firstValidRoute ?? { name: 'Forbidden' },
    });

    console.log(permissionRoutes)
  }

  function addRoutes() {
    permissionRoutes.forEach((route) => {
      router.addRoute(route);
    });
  }

  function generateMenusByRoutes(routes: RouteRecordRaw[]) {
    return routes.reduce<IMenu[]>((prev, curr) => {
      if (curr.meta?.menu) {
        const item: IMenu = { ...curr.meta.menu as IMenu };
        if (curr.meta.permissions?.length) {
          item.permissions = [...curr.meta.permissions];
        }
        if (validatePermission(item.permissions)) {
          if (curr.name) {
            item.routeName = curr.name;
          }
          if (curr.children?.length) {
            item.children = generateMenusByRoutes(curr.children);
            if (item.children.length === 0) {
              Reflect.deleteProperty(item, 'children');
            }
          }
          prev.push(item);
        }
      }
      return prev;
    }, []);
  }

  function validatePermission(p?: string[]) {
    if (!p || p.length === 0) {
      return true;
    }
    return p.some((_p) => userInfo.permissions.includes(_p));
  }

  return {
    userInfo,
    state,
    bootstrap,
    reboot,
    validatePermission
  };
});
