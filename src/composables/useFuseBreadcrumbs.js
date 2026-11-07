import { shallowRef, readonly } from 'vue'

export const FUSE_BREADCRUMBS_KEY = 'fuse-breadcrumbs'

// Module-level, so every page and the layout share one trail.
// shallowRef: icon components must not be made deeply reactive.
const breadcrumbs = shallowRef([])

export function useFuseBreadcrumbs() {
  const setBreadcrumbs = (items) => {
    breadcrumbs.value = Array.isArray(items) ? [...items] : []
  }
  const addBreadcrumb = (item) => {
    breadcrumbs.value = [...breadcrumbs.value, item]
  }
  const removeLastBreadcrumb = () => {
    breadcrumbs.value = breadcrumbs.value.slice(0, -1)
  }
  const clearBreadcrumbs = () => {
    breadcrumbs.value = []
  }

  return {
    breadcrumbs: readonly(breadcrumbs),
    setBreadcrumbs,
    addBreadcrumb,
    removeLastBreadcrumb,
    clearBreadcrumbs,
  }
}
