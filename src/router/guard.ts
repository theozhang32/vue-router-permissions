import { Router } from 'vue-router'
import { usePermissionStore } from '../store/permission'

export const installGuard = (router: Router) => {
  // 判断permission请求结果
  router.beforeEach((to) => {
    const store = usePermissionStore()
    if (store.userInfo.permissions.length === 0) {
      if (store.userInfo.uid) {
        // 有用户，但权限都没有
        if (to.name !== 'Forbidden') {
          return { name: 'Forbidden' }
        }
      }
      if (to.name !== 'Login') {
        // 用户查询失败
        return { name: 'Login' }
      }
    }
    return
  })
  // router.beforeEach((to) => {
  //   const store = usePermissionStore()
  //   if (to.path === '/') {
  //     // 根路径重定向至第一个可用菜单指向的路由
  //     const firstValidRoute = store.findFirstValidRoute()
  //     if (firstValidRoute) {
  //       return firstValidRoute
  //     } else {
  //       return { name: '403' }
  //     }
  //   }
  //   return
  // })
  // 决策其他权限路由
  router.beforeEach((to) => {
    const store = usePermissionStore()
    if (store.validatePermission(to.meta?.permissions)) {
      // 路由的权限守卫
      // 有该页面，并且通过权限校验
      return true
    } else if (to.matched.length === 0) {
      return { name: 'NotFound' }
    } else {
      return { name: 'Forbidden' }
    }
  })

}
