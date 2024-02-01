/*
 * @Author: 张天昊
 * @Date: 2024-01-31 10:26:21
 * @LastEditTime: 2024-02-01 16:25:04
 * @LastEditors: 张天昊
 * @Description: 
 * @FilePath: /vue-router-permissions/src/types/index.ts
 */

/**
 * 菜单key的规则：path路径使用.分割 [例]: nest.list.sublist
 */
export interface IMenu {
  label: string
  key: string
  routeName?: string | symbol // 菜单指向的路由
  children?: IMenu[]
  iconName?: string
  permissions?: string[]
  includePathOrName?: string[] // 除了自身指向的路由，还有访问哪些路由时，高亮这个菜单
  [key: string]: any
}