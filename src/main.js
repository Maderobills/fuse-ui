import FuseSideBar from './components/FuseSideBar.vue'
import FuseGreetBar from './components/FuseGreetBar.vue/index.js'
import FuseThemeToggler from './components/FuseThemeToggler.vue'
export { FuseSideBar, FuseGreetBar, FuseThemeToggler }

export default {
  install(app) {
    app.component('FuseSideBar', FuseSideBar)
    app.component('FuseGreetBar', FuseGreetBar)
    app.component('FuseThemeToggler', FuseThemeToggler)
  },
}