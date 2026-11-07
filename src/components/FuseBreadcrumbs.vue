<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronRight } from '@lucide/vue'
import { useFuseBreadcrumbs } from '../composables/useFuseBreadcrumbs.js'

const props = defineProps({
  /** [{ label, route | to, icon }] (route can be a string or a vue-router location object) */
  items: { type: Array, default: undefined },
  /** Lets items use string icon names, e.g. { home: Home, users: Users } */
  icons: { type: Object, default: () => ({}) },
  /** Make the last crumb a link too (default: plain text for the current page) */
  linkLast: { type: Boolean, default: false },
})

const { breadcrumbs: globalBreadcrumbs } = useFuseBreadcrumbs()
const effectiveItems = computed(() => (props.items !== undefined ? props.items : globalBreadcrumbs.value))

const navRef = ref(null)

const normalizeRoute = (route) => {
  if (!route) return '/'
  if (typeof route === 'string') return route
  if (route.path || route.name) return route
  return '/'
}

const resolveIcon = (icon) => {
  if (!icon) return null
  return typeof icon === 'string' ? props.icons[icon] || null : icon
}

const crumbs = computed(() => {
  const list = effectiveItems.value || []
  return list.map((item, i) => {
    const isLast = i === list.length - 1
    return {
      key: `${i}-${item.label}`,
      label: item.label,
      to: normalizeRoute(item.to ?? item.route),
      icon: resolveIcon(item.icon),
      isLast,
      clickable: !isLast || props.linkLast,
    }
  })
})

// On narrow screens the trail scrolls sideways (scrollbar hidden),
// so keep the current page in view
const scrollToEnd = () =>
  nextTick(() => {
    if (navRef.value) navRef.value.scrollLeft = navRef.value.scrollWidth
  })

onMounted(scrollToEnd)
watch(() => (effectiveItems.value || []).map((i) => i.label).join('|'), scrollToEnd)
</script>

<template>
  <nav
    v-if="crumbs.length > 0"
    ref="navRef"
    class="w-full py-2 overflow-x-auto scrollbar-hide"
    aria-label="Breadcrumb"
  >
    <ol class="flex items-center gap-2 whitespace-nowrap min-w-fit text-xs">
      <li v-for="crumb in crumbs" :key="crumb.key" class="flex items-center gap-2">
        <!-- Link -->
        <RouterLink
          v-if="crumb.clickable"
          :to="crumb.to"
          class="group flex items-center gap-2 transition-colors"
        >
          <component
            :is="crumb.icon"
            v-if="crumb.icon"
            class="w-4 h-4 transition-colors text-info dark:text-dark-info group-hover:text-primary dark:group-hover:text-dark-primary"
          />
          <span
            class="transition-colors text-info dark:text-dark-info group-hover:text-primary dark:group-hover:text-dark-primary"
          >
            {{ crumb.label }}
          </span>
        </RouterLink>

        <!-- Current page -->
        <span
          v-else
          class="flex items-center gap-2"
          :aria-current="crumb.isLast ? 'page' : undefined"
        >
          <component
            :is="crumb.icon"
            v-if="crumb.icon"
            class="w-4 h-4 text-foreground/60 dark:text-dark-foreground/60"
          />
          <span class="text-foreground/80 dark:text-dark-foreground/80 font-medium">{{ crumb.label }}</span>
        </span>

        <!-- Separator -->
        <span v-if="!crumb.isLast" aria-hidden="true" class="shrink-0">
          <slot name="separator">
            <ChevronRight class="w-3.5 h-3.5 text-outline dark:text-dark-outline" />
          </slot>
        </span>
      </li>
    </ol>
  </nav>
</template>
