import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import FuseUI from './main.js'
import './assets/theme.css'

const app = createApp(App)
app.use(router)
app.use(FuseUI)
app.mount('#app')
