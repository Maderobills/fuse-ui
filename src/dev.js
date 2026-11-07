import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import FuseUI from './main.js'
import './assets/theme.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: App }],
})

const app = createApp(App)
app.use(router)
app.use(FuseUI)
app.mount('#app')
