<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ChevronRight } from '@lucide/vue'

const props = defineProps({
  /** Custom page title or header text */
  title: { type: String, default: '' },
  /** Page description, subtitle, or contextual message */
  description: { type: String, default: '' },
  /** Show contextual greeting on the left (e.g. "Good morning, School Administrator" or with greetingPrefix) */
  greeting: { type: Boolean, default: false },
  /** Custom greeting prefix (e.g. "Welcome back"); defaults to time-based (Good morning/afternoon/evening) */
  greetingPrefix: { type: String, default: '' },
  /** Array of { label, route } OR true to auto-generate breadcrumbs from current route */
  breadcrumbs: { type: [Array, Boolean], default: false },
  /** Auto-derive title and description from route.meta (or route.name) if not explicitly set */
  autoRoute: { type: Boolean, default: true },
  /** { name, email, avatar } — null hides user avatar pill */
  user: { type: Object, default: null },
  profileRoute: { type: String, default: '/profile' },
  /** Leave room for FuseSideBar's fixed mobile menu button */
  mobileMenuOffset: { type: Boolean, default: true },
})

const route = useRoute()

const displayName = computed(() => {
  const raw = props.user?.name || props.user?.email || ''
  if (!raw) return 'Profile'
  return raw.includes('@') ? raw.split('@')[0] : raw
})

const initials = computed(() =>
  displayName.value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)

const greetingText = computed(() => {
  const name = displayName.value
  if (props.greetingPrefix) {
    return `${props.greetingPrefix}, ${name}!`
  }
  const h = new Date().getHours()
  const part = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  return `${part}, ${name}!`
})

const computedTitle = computed(() => {
  if (props.title) return props.title
  if (props.greeting && props.user) return greetingText.value
  if (props.autoRoute && route) {
    if (route.meta?.title) return route.meta.title
    if (route.name) {
      const name = String(route.name)
      return name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_]/g, ' ')
    }
    const path = route.path?.split('/').filter(Boolean).pop()
    if (path) return path.charAt(0).toUpperCase() + path.slice(1).replace(/[-_]/g, ' ')
  }
  return ''
})

const computedDescription = computed(() => {
  if (props.description) return props.description
  if (props.autoRoute && route?.meta?.description) return route.meta.description
  return ''
})

const breadcrumbItems = computed(() => {
  if (Array.isArray(props.breadcrumbs)) return props.breadcrumbs
  if (!props.breadcrumbs || !route) return []

  const matched = route.matched?.filter((m) => m.meta?.title || m.name)
  if (matched?.length > 1) {
    return matched.map((m, idx) => ({
      label: m.meta?.title || String(m.name),
      route: idx === matched.length - 1 ? undefined : m.path,
    }))
  }

  const parts = route.path?.split('/').filter(Boolean) || []
  if (parts.length > 1) {
    return [
      { label: 'Home', route: '/' },
      ...parts.map((p, idx) => ({
        label: p.charAt(0).toUpperCase() + p.slice(1).replace(/[-_]/g, ' '),
        route: idx === parts.length - 1 ? undefined : '/' + parts.slice(0, idx + 1).join('/'),
      })),
    ]
  }

  return []
})

const isProfileActive = computed(() => route?.path === props.profileRoute)
</script>

<template>
  <header
    class="w-full flex justify-between items-center px-4 lg:px-6 py-2.5 border-b border-outline dark:border-dark-outline shrink-0 bg-surface/40 dark:bg-dark-surface/40 backdrop-blur-sm min-h-[56px]"
  >
    <!-- Left: page title, greeting, description, breadcrumbs -->
    <div class="min-w-0 flex-1 pr-4" :class="mobileMenuOffset ? 'pl-12 lg:pl-0' : ''">
      <slot
        name="left"
        :title="computedTitle"
        :description="computedDescription"
        :breadcrumbs="breadcrumbItems"
      >
        <div class="flex flex-col justify-center min-w-0">
          <!-- Breadcrumbs navigation -->
          <nav
            v-if="breadcrumbItems.length > 0"
            class="flex items-center gap-1 text-[11px] text-foreground/50 dark:text-dark-foreground/50 mb-0.5"
            aria-label="Breadcrumb"
          >
            <template v-for="(item, idx) in breadcrumbItems" :key="idx">
              <ChevronRight v-if="idx > 0" class="w-3 h-3 shrink-0 opacity-60" />
              <RouterLink
                v-if="item.route"
                :to="item.route"
                class="hover:text-foreground dark:hover:text-dark-foreground transition-colors truncate"
              >
                {{ item.label }}
              </RouterLink>
              <span v-else class="text-foreground/80 dark:text-dark-foreground/80 font-medium truncate">
                {{ item.label }}
              </span>
            </template>
          </nav>

          <!-- Title / Page Name / Greeting -->
          <div class="flex items-center gap-2 min-w-0">
            <h1
              v-if="computedTitle"
              class="text-sm lg:text-base font-semibold text-foreground dark:text-dark-foreground tracking-tight truncate leading-tight"
            >
              {{ computedTitle }}
            </h1>
            <slot name="title-badge" />
          </div>

          <!-- Description / Subtitle -->
          <p
            v-if="computedDescription"
            class="text-xs text-foreground/60 dark:text-dark-foreground/60 truncate mt-0.5 leading-normal"
          >
            {{ computedDescription }}
          </p>
        </div>
      </slot>
    </div>

    <!-- Right: Actions, theme toggle, profile pill -->
    <div class="flex items-center gap-3 shrink-0">
      <slot />
      <slot name="actions" />
      <slot name="theme-toggle" />

      <div
        v-if="($slots['theme-toggle'] || $slots.default || $slots.actions) && user"
        class="h-4 w-px bg-outline dark:bg-dark-outline opacity-60"
      />

      <RouterLink
        v-if="user"
        :to="profileRoute"
        title="My Profile"
        class="flex items-center gap-2 px-2.5 py-1 rounded-xl border transition-all duration-200 hover:bg-muted dark:hover:bg-dark-muted group"
        :class="
          isProfileActive
            ? 'bg-primary/10 dark:bg-dark-primary/10 border-primary/30 dark:border-dark-primary/30'
            : 'border-outline/30 dark:border-dark-outline/30'
        "
      >
        <img
          v-if="user.avatar"
          :src="user.avatar"
          alt="Avatar"
          class="w-6 h-6 rounded-full object-cover shrink-0"
        />
        <div
          v-else
          class="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold bg-primary/10 text-primary dark:bg-dark-secondary/15 dark:text-dark-secondary"
        >
          {{ initials }}
        </div>
        <span
          class="hidden sm:inline text-xs font-semibold text-foreground dark:text-dark-foreground group-hover:text-primary dark:group-hover:text-dark-primary transition-colors"
        >
          {{ displayName }}
        </span>
      </RouterLink>
    </div>
  </header>
</template>
