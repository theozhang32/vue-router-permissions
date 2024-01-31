/*
 * @Author: 张天昊
 * @Date: 2024-01-31 10:26:21
 * @LastEditTime: 2024-01-31 11:18:43
 * @LastEditors: 张天昊
 * @Description: 
 * @FilePath: /vue-router-permissions/src/types/index.ts
 */
export interface IMenu {
  label: string
  key: string
  routeName?: string[]
  children?: IMenu[]
  iconName?: string
  permissions?: string[]
  [key: string]: any
}