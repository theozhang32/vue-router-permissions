import { type App } from 'vue'
import { createPinia } from 'pinia'

export const installPinia = (app: App) => {
  const pinia = createPinia()
  app.use(pinia)
}

export * from './permission'