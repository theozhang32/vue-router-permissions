import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { installPinia } from './store'
import { installRouter } from './router'

const app = createApp(App)
installPinia(app)
installRouter(app)

app.mount('#app')
