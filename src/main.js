import './style.css'
import FuseSideBar from './components/FuseSideBar.vue'

export { FuseSideBar }
export { cn } from './utils/cn.js'

export default {
  install(app) {
    app.component('FuseSideBar', FuseSideBar)
  },
}