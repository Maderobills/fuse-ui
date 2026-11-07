import FuseSideBar from './components/FuseSideBar.vue'
import FuseGreetBar from './components/internal/FuseGreetBar.vue'
export { FuseSideBar, FuseGreetBar }

export default {
  install(app) {
    app.component('FuseSideBar', FuseSideBar)
    app.component('FuseGreetBar', FuseGreetBar)
  },
}