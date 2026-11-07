import { createApp } from 'vue'
import App from './App.vue'
import FuseUI from './main.js'
import './assets/theme.css'

const app = createApp(App)
app.use(FuseUI)
app.mount('#app')

