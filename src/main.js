import FuseSideBar from './components/FuseSideBar.vue'
import FuseGreetBar from './components/FuseGreetBar.vue'
import FuseThemeToggler from './components/FuseThemeToggler.vue'
import FuseStatCard from './components/FuseStatCard.vue'
import { useFuseTheme, FUSE_THEME_KEY } from './composables/useFuseTheme.js'

export { FuseSideBar, FuseGreetBar, FuseThemeToggler, FuseStatCard, useFuseTheme, FUSE_THEME_KEY }

export default {
  install(app) {
    app.component('FuseSideBar', FuseSideBar)
    app.component('FuseGreetBar', FuseGreetBar)
    app.component('FuseThemeToggler', FuseThemeToggler)
    app.component('FuseStatCard', FuseStatCard)
  },
}