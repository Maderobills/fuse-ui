import FuseSideBar from './components/FuseSideBar.vue'
import FuseGreetBar from './components/FuseGreetBar.vue'
import FuseThemeToggler from './components/FuseThemeToggler.vue'
import FuseStatCard from './components/FuseStatCard.vue'
import FuseInput from './components/FuseInput.vue'
import FuseFilters from './components/FuseFilters.vue'
import FuseBreadcrumbs from './components/FuseBreadcrumbs.vue'
import FuseTable from './components/FuseTable.vue'

import { useFuseTheme, FUSE_THEME_KEY } from './composables/useFuseTheme.js'
import { useFuseBreadcrumbs, FUSE_BREADCRUMBS_KEY } from './composables/useFuseBreadcrumbs.js'

export {
  FuseSideBar,
  FuseGreetBar,
  FuseThemeToggler,
  FuseStatCard,
  FuseInput,
  FuseFilters,
  FuseBreadcrumbs,
  FuseTable,
  useFuseTheme,
  useFuseBreadcrumbs,
  FUSE_THEME_KEY,
  FUSE_BREADCRUMBS_KEY,
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
    app.component('FuseTable', FuseTable)

    app.provide(FUSE_THEME_KEY, useFuseTheme())
    app.provide(FUSE_BREADCRUMBS_KEY, useFuseBreadcrumbs())
  },
}
