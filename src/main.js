import FuseSideBar from './components/FuseSideBar.vue'

export { FuseSideBar }

export default {
  install(app) {
    app.component('FuseSideBar', FuseSideBar)
  },
}