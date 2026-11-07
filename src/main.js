import FuseSideBar from './components/FuseSideBar.vue'
import FuseGreetBar from './components/FuseGreetBar.vue'
import FuseThemeToggler from './components/FuseThemeToggler.vue'
import FuseStatCard from './components/FuseStatCard.vue'
import FuseInput from './components/FuseInput.vue'
import FuseFilters from './components/FuseFilters.vue'
import FuseBreadcrumbs from './components/FuseBreadcrumbs.vue'

import { useFuseTheme, FUSE_THEME_KEY } from './composables/useFuseTheme.js'
import { useFuseBreadcrumbs } from './composables/useFuseBreadcrumbs.js'

export {
  FuseSideBar,
  FuseGreetBar,
  FuseThemeToggler,
  FuseStatCard,
  FuseInput,
  FuseFilters,
  FuseBreadcrumbs,
  useFuseTheme,
  useFuseBreadcrumbs,
  FUSE_THEME_KEY,
}

export default {
  install(app) {
    app.component('FuseSideBar', FuseSideBar)
    app.component('FuseGreetBar', FuseGreetBar)
    app.component('FuseThemeToggler', FuseThemeToggler)
    app.component('FuseStatCard', FuseStatCard)
    app.component('FuseInput', FuseInput)
    app.component('FuseFilters', FuseFilters)
    app.component('FuseBreadcrumbs', FuseBreadcrumbs)
  },
}
