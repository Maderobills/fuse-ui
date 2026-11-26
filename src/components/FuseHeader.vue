<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ChevronDown, Menu as MenuIcon, X as LucideX, LogOut, SlidersHorizontal } from '@lucide/vue'
import HeaderPopover from './internal/HeaderPopover.vue'
import HeaderCustomizer from './internal/HeaderCustomizer.vue'
import { DEFAULT_LAYOUT, HEADER_SECTIONS, normalizeLayout } from './internal/headerLayout.js'

const props = defineProps({
  // Brand
  brandName: { type: String, default: '' },
  brandTagline: { type: String, default: '' },
  logoLight: { type: String, default: '' },
  logoDark: { type: String, default: '' },
  homeRoute: { type: String, default: '/' },

  /** [{ label, route, icon, children?: [{ label, route, icon }] }] */
  navItems: { type: Array, default: () => [] },
  /** Quick actions: [{ key, label, icon, route?, badge? }] */
  actions: { type: Array, default: () => [] },

  /** { name, email, role, avatar } — null shows a "Sign in" button */
  user: { type: Object, default: null },
  /** [{ key, label, icon, route?, tone?: 'error' }] */
  profileMenu: { type: Array, default: () => [] },
  showLogout: { type: Boolean, default: true },

  sticky: { type: Boolean, default: false },
  /** Show the button that lets users toggle and reorder sections */
  customizable: { type: Boolean, default: false },
  /** localStorage key to remember the user's layout ('' = don't persist) */
  storageKey: { type: String, default: '' },
})

const emit = defineEmits(['action', 'profile-select', 'logout', 'login'])

// Order of every section (the 'spacer' pushes what follows to the right)
const layout = defineModel('layout', { type: Array, default: () => [...DEFAULT_LAYOUT] })
// Sections that are switched off
const hidden = defineModel('hidden', { type: Array, default: () => [] })

const route = useRoute()
const isMobileDrawerOpen = ref(false)
const openMobileSubmenus = ref([])

const toggleMobileSubmenu = (key) => {
  const idx = openMobileSubmenus.value.indexOf(key)
  if (idx > -1) {
    openMobileSubmenus.value.splice(idx, 1)
  } else {
    openMobileSubmenus.value.push(key)
  }
}

// Auto-close mobile drawer on route navigation
watch(
  () => route?.path,
  () => {
    isMobileDrawerOpen.value = false
  },
)

// Lock background scroll when mobile drawer is open
watch(isMobileDrawerOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

const onKeyDown = (e) => {
  if (e.key === 'Escape' && isMobileDrawerOpen.value) {
    isMobileDrawerOpen.value = false
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', onKeyDown)
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeyDown)
  }
})

const order = computed(() => normalizeLayout(layout.value))
const visible = computed(() => order.value.filter((k) => k === 'spacer' || !hidden.value.includes(k)))

/* ── Persistence ── */
const load = () => {
  try {
    const raw = localStorage.getItem(props.storageKey)
    if (!raw) return
    const saved = JSON.parse(raw)
    layout.value = normalizeLayout(saved.layout)
    hidden.value = (saved.hidden ?? []).filter((k) => HEADER_SECTIONS.includes(k) && k !== 'spacer')
  } catch {
    /* ignore corrupt or blocked storage */
  }
}
const save = () => {
  if (!props.storageKey) return
  try {
    localStorage.setItem(props.storageKey, JSON.stringify({ layout: order.value, hidden: hidden.value }))
  } catch {
    /* storage blocked */
  }
}
onMounted(() => props.storageKey && load())
watch([layout, hidden], save, { deep: true })

const reset = () => {
  layout.value = [...DEFAULT_LAYOUT]
  hidden.value = []
}

/* ── Nav helpers ── */
const itemPath = (item) => item.route || item.path || '#'
const itemKey = (item, i) => item.route || item.path || item.label || String(i)
const pathActive = (p) => (route?.path ? route.path === p || (p !== '/' && route.path.startsWith(p + '/')) : false)
const itemActive = (item) =>
  item.children?.length ? item.children.some((c) => pathActive(itemPath(c))) : pathActive(itemPath(item))

/* ── Profile helpers ── */
const displayName = computed(() => props.user?.name || props.user?.email?.split('@')[0] || 'Account')
const initials = computed(() =>
  displayName.value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)

/* ── Shared classes ── */
const LINK_BASE =
  'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap active:scale-95'
const LINK_ACTIVE = 'bg-primary/10 text-primary dark:bg-dark-secondary/10 dark:text-dark-secondary'
const LINK_IDLE =
  'text-foreground/60 dark:text-dark-foreground/60 hover:bg-muted dark:hover:bg-dark-muted hover:text-foreground dark:hover:text-dark-foreground'
const ICON_BTN =
  'relative flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline text-foreground/70 dark:text-dark-foreground/70 hover:bg-muted dark:hover:bg-dark-muted active:scale-95 transition-all shrink-0'
const MENU_ITEM =
  'flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors active:scale-98'
const MENU_IDLE =
  'text-foreground/80 dark:text-dark-foreground/80 hover:bg-muted dark:hover:bg-dark-muted'
const MENU_ERROR = 'text-error dark:text-dark-error hover:bg-error/10 dark:hover:bg-dark-error/10'
</script>

<template>
  <header
    class="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 py-2 border-b border-outline dark:border-dark-outline bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-md transition-colors"
    :class="sticky ? 'sticky top-0 z-40' : ''"
  >
    <template v-for="key in visible" :key="key">
      <!-- ───── Logo ───── -->
      <RouterLink v-if="key === 'logo'" :to="homeRoute" class="shrink-0 flex items-center active:scale-95 transition-transform">
        <slot name="logo">
          <template v-if="logoLight">
            <img :src="logoLight" :alt="brandName || 'Logo'" class="h-7 sm:h-8 w-auto object-contain" :class="logoDark ? 'dark:hidden' : ''" />
            <img v-if="logoDark" :src="logoDark" :alt="brandName || 'Logo'" class="hidden dark:block h-7 sm:h-8 w-auto object-contain" />
          </template>
        </slot>
      </RouterLink>

      <!-- ───── Brand name ───── -->
      <RouterLink v-else-if="key === 'brand'" :to="homeRoute" class="shrink-0 leading-tight min-w-0">
        <slot name="brand">
          <span class="block text-sm font-semibold tracking-tight text-foreground dark:text-dark-foreground truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
            {{ brandName }}
          </span>
          <span
            v-if="brandTagline"
            class="hidden sm:block text-[11px] tracking-wide text-secondary dark:text-dark-secondary truncate"
          >
            {{ brandTagline }}
          </span>
        </slot>
      </RouterLink>

      <!-- ───── Menu / nav ───── -->
      <nav v-else-if="key === 'nav' && navItems.length" class="flex items-center" aria-label="Main">
        <!-- Desktop Horizontal Bar -->
        <ul class="hidden md:flex items-center gap-1">
          <li v-for="(item, i) in navItems" :key="itemKey(item, i)">
            <HeaderPopover v-if="item.children?.length" align="left" panel-class="min-w-52 p-1.5">
              <template #trigger="{ open, toggle }">
                <button
                  type="button"
                  aria-haspopup="menu"
                  :aria-expanded="open"
                  :class="[LINK_BASE, itemActive(item) ? LINK_ACTIVE : LINK_IDLE]"
                  @click="toggle"
                >
                  <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0" />
                  {{ item.label }}
                  <ChevronDown class="w-3.5 h-3.5 transition-transform" :class="open ? 'rotate-180' : ''" />
                </button>
              </template>
              <template #default="{ close }">
                <RouterLink
                  v-for="(child, ci) in item.children"
                  :key="itemKey(child, ci)"
                  :to="itemPath(child)"
                  :class="[LINK_BASE, 'w-full', pathActive(itemPath(child)) ? LINK_ACTIVE : LINK_IDLE]"
                  @click="close"
                >
                  <component :is="child.icon" v-if="child.icon" class="w-4 h-4 shrink-0" />
                  {{ child.label }}
                </RouterLink>
              </template>
            </HeaderPopover>

            <RouterLink v-else :to="itemPath(item)" :class="[LINK_BASE, itemActive(item) ? LINK_ACTIVE : LINK_IDLE]">
              <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0" />
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Mobile Drawer Trigger Button -->
        <button
          type="button"
          :class="ICON_BTN"
          aria-label="Open navigation menu"
          :aria-expanded="isMobileDrawerOpen"
          class="md:hidden"
          @click="isMobileDrawerOpen = true"
        >
          <MenuIcon class="w-4 h-4" />
        </button>
      </nav>

      <!-- ───── Spacer ───── -->
      <div v-else-if="key === 'spacer'" class="flex-1" />

      <!-- ───── Quick actions ───── -->
      <div v-else-if="key === 'actions'" class="flex items-center gap-1.5 sm:gap-2">
        <template v-for="a in actions" :key="a.key">
          <RouterLink v-if="a.route" :to="a.route" :class="ICON_BTN" :title="a.label" :aria-label="a.label">
            <component :is="a.icon" v-if="a.icon" class="w-4 h-4" />
            <span
              v-if="a.badge"
              class="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-[10px] font-semibold flex items-center justify-center bg-error text-white dark:bg-dark-error"
            >
              {{ a.badge }}
            </span>
          </RouterLink>
          <button v-else type="button" :class="ICON_BTN" :title="a.label" :aria-label="a.label" @click="emit('action', a.key)">
            <component :is="a.icon" v-if="a.icon" class="w-4 h-4" />
            <span
              v-if="a.badge"
              class="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-[10px] font-semibold flex items-center justify-center bg-error text-white dark:bg-dark-error"
            >
              {{ a.badge }}
            </span>
          </button>
        </template>
        <!-- e.g. <FuseThemeToggler /> -->
        <slot name="actions" />
      </div>

      <!-- ───── Profile dropdown ───── -->
      <HeaderPopover v-else-if="key === 'profile' && user" align="right" panel-class="w-64 max-w-[calc(100vw-1.5rem)] p-1.5">
        <template #trigger="{ open, toggle }">
          <button
            type="button"
            aria-haspopup="menu"
            :aria-expanded="open"
            aria-label="Open profile menu"
            class="flex items-center gap-1.5 sm:gap-2 p-1 sm:pl-1 sm:pr-2 sm:py-1 rounded-xl border border-outline/40 dark:border-dark-outline/40 hover:bg-muted dark:hover:bg-dark-muted active:scale-95 transition-all shrink-0"
            @click="toggle"
          >
            <img v-if="user.avatar" :src="user.avatar" alt="" class="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0" />
            <span
              v-else
              class="w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] sm:text-[11px] font-semibold bg-primary/10 text-primary dark:bg-dark-secondary/15 dark:text-dark-secondary"
            >
              {{ initials }}
            </span>
            <span class="hidden sm:block text-xs font-semibold text-foreground dark:text-dark-foreground max-w-28 sm:max-w-36 truncate">
              {{ displayName }}
            </span>
            <ChevronDown class="w-3.5 h-3.5 text-foreground/50 dark:text-dark-foreground/50 transition-transform" :class="open ? 'rotate-180' : ''" />
          </button>
        </template>

        <template #default="{ close }">
          <div class="px-3 py-2 mb-1 border-b border-outline dark:border-dark-outline">
            <p class="text-xs font-semibold text-foreground dark:text-dark-foreground truncate">{{ displayName }}</p>
            <p v-if="user.email" class="text-[11px] text-foreground/50 dark:text-dark-foreground/50 truncate">{{ user.email }}</p>
            <p v-if="user.role" class="text-[11px] mt-0.5 font-medium text-secondary dark:text-dark-secondary capitalize">{{ user.role }}</p>
          </div>

          <div role="menu">
            <template v-for="item in profileMenu" :key="item.key">
              <RouterLink
                v-if="item.route"
                :to="item.route"
                role="menuitem"
                :class="[MENU_ITEM, item.tone === 'error' ? MENU_ERROR : MENU_IDLE]"
                @click="close"
              >
                <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0" />
                {{ item.label }}
              </RouterLink>
              <button
                v-else
                type="button"
                role="menuitem"
                :class="[MENU_ITEM, item.tone === 'error' ? MENU_ERROR : MENU_IDLE]"
                @click="() => { emit('profile-select', item.key); close() }"
              >
                <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0" />
                {{ item.label }}
              </button>
            </template>

            <button
              v-if="showLogout"
              type="button"
              role="menuitem"
              :class="[MENU_ITEM, MENU_ERROR, profileMenu.length ? 'mt-1 border-t border-outline dark:border-dark-outline rounded-t-none' : '']"
              @click="() => { emit('logout'); close() }"
            >
              <LogOut class="w-4 h-4 shrink-0" />
              Logout
            </button>
          </div>
        </template>
      </HeaderPopover>

      <!-- Guest -->
      <button
        v-else-if="key === 'profile'"
        type="button"
        class="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium border border-outline dark:border-dark-outline text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted active:scale-95 transition-all shrink-0"
        @click="emit('login')"
      >
        Sign in
      </button>
    </template>

    <!-- Customize (outside the sections, so it can never be switched off by accident) -->
    <HeaderPopover v-if="customizable" align="right" panel-class="w-72 max-w-[calc(100vw-1.5rem)] p-3">
      <template #trigger="{ toggle }">
        <button type="button" :class="[ICON_BTN, 'shrink-0']" aria-label="Customize header" title="Customize header" @click="toggle">
          <SlidersHorizontal class="w-4 h-4" />
        </button>
      </template>
      <HeaderCustomizer
        :order="order"
        :hidden="hidden"
        @update:order="layout = $event"
        @update:hidden="hidden = $event"
        @reset="reset"
      />
    </HeaderPopover>
  </header>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- MOBILE NAVIGATION DRAWER (Full Smooth Mobile Experience)       -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <Teleport to="body">
    <!-- Mobile Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileDrawerOpen"
        class="fixed inset-0 bg-foreground/20 dark:bg-dark-foreground/20 backdrop-blur-xs z-50 md:hidden"
        aria-hidden="true"
        @click="isMobileDrawerOpen = false"
      />
    </Transition>

    <!-- Mobile Slide-out Drawer Aside -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="isMobileDrawerOpen"
        class="fixed top-0 left-0 bottom-0 w-[84vw] max-w-xs bg-surface dark:bg-dark-surface border-r border-outline dark:border-dark-outline z-50 flex flex-col shadow-2xl md:hidden overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <!-- Drawer Header -->
        <div class="flex items-center justify-between p-3.5 border-b border-outline dark:border-dark-outline shrink-0">
          <RouterLink :to="homeRoute" class="flex items-center gap-2.5 min-w-0" @click="isMobileDrawerOpen = false">
            <slot name="logo">
              <template v-if="logoLight">
                <img :src="logoLight" :alt="brandName || 'Logo'" class="h-7 w-auto object-contain" :class="logoDark ? 'dark:hidden' : ''" />
                <img v-if="logoDark" :src="logoDark" :alt="brandName || 'Logo'" class="hidden dark:block h-7 w-auto object-contain" />
              </template>
            </slot>
            <div class="min-w-0">
              <span class="block text-sm font-semibold tracking-tight text-foreground dark:text-dark-foreground truncate">
                {{ brandName }}
              </span>
              <span v-if="brandTagline" class="block text-[11px] text-secondary dark:text-dark-secondary truncate">
                {{ brandTagline }}
              </span>
            </div>
          </RouterLink>

          <button
            type="button"
            :class="ICON_BTN"
            aria-label="Close navigation"
            @click="isMobileDrawerOpen = false"
          >
            <LucideX class="w-4 h-4" />
          </button>
        </div>

        <!-- Drawer Body / Nav items -->
        <div class="flex-1 overflow-y-auto p-3 space-y-1">
          <template v-for="(item, i) in navItems" :key="itemKey(item, i)">
            <!-- Single Link -->
            <RouterLink
              v-if="!item.children?.length"
              :to="itemPath(item)"
              :class="[
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors w-full active:scale-98',
                itemActive(item) ? LINK_ACTIVE : LINK_IDLE,
              ]"
              @click="isMobileDrawerOpen = false"
            >
              <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ item.label }}</span>
            </RouterLink>

            <!-- Collapsible Accordion Group -->
            <div v-else class="space-y-1">
              <button
                type="button"
                :class="[
                  'flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors active:scale-98',
                  itemActive(item) ? 'bg-primary/5 text-primary dark:bg-dark-secondary/5 dark:text-dark-secondary' : LINK_IDLE,
                ]"
                @click="toggleMobileSubmenu(itemKey(item, i))"
              >
                <span class="flex items-center gap-3 truncate">
                  <component :is="item.icon" v-if="item.icon" class="w-4 h-4 shrink-0" />
                  <span class="truncate">{{ item.label }}</span>
                </span>
                <ChevronDown
                  class="w-3.5 h-3.5 shrink-0 transition-transform duration-200"
                  :class="openMobileSubmenus.includes(itemKey(item, i)) ? 'rotate-180' : ''"
                />
              </button>

              <!-- Submenu child links -->
              <div
                v-show="openMobileSubmenus.includes(itemKey(item, i))"
                class="pl-4 pr-1 py-1 space-y-1 border-l-2 border-outline/40 dark:border-dark-outline/40 ml-4"
              >
                <RouterLink
                  v-for="(child, ci) in item.children"
                  :key="itemKey(child, ci)"
                  :to="itemPath(child)"
                  :class="[
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors w-full active:scale-98',
                    pathActive(itemPath(child)) ? LINK_ACTIVE : LINK_IDLE,
                  ]"
                  @click="isMobileDrawerOpen = false"
                >
                  <component :is="child.icon" v-if="child.icon" class="w-3.5 h-3.5 shrink-0" />
                  <span class="truncate">{{ child.label }}</span>
                </RouterLink>
              </div>
            </div>
          </template>
        </div>

        <!-- Drawer Footer: User Profile summary or Guest Sign-in -->
        <div class="p-3 border-t border-outline dark:border-dark-outline bg-muted/20 dark:bg-dark-muted/20 space-y-2 shrink-0">
          <template v-if="user">
            <div class="flex items-center gap-2.5 px-2 py-1">
              <img v-if="user.avatar" :src="user.avatar" alt="" class="w-8 h-8 rounded-full object-cover shrink-0" />
              <div
                v-else
                class="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold bg-primary/10 text-primary dark:bg-dark-secondary/15 dark:text-dark-secondary"
              >
                {{ initials }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold text-foreground dark:text-dark-foreground truncate">{{ displayName }}</p>
                <p v-if="user.email" class="text-[11px] text-foreground/50 dark:text-dark-foreground/50 truncate">{{ user.email }}</p>
              </div>
              <span v-if="user.role" class="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-secondary/10 text-secondary dark:bg-dark-secondary/15 dark:text-dark-secondary">
                {{ user.role }}
              </span>
            </div>

            <!-- Profile Menu links -->
            <div v-if="profileMenu.length" class="space-y-0.5 pt-1">
              <template v-for="pItem in profileMenu" :key="pItem.key">
                <RouterLink
                  v-if="pItem.route"
                  :to="pItem.route"
                  :class="[MENU_ITEM, pItem.tone === 'error' ? MENU_ERROR : MENU_IDLE]"
                  @click="isMobileDrawerOpen = false"
                >
                  <component :is="pItem.icon" v-if="pItem.icon" class="w-4 h-4 shrink-0" />
                  {{ pItem.label }}
                </RouterLink>
                <button
                  v-else
                  type="button"
                  :class="[MENU_ITEM, pItem.tone === 'error' ? MENU_ERROR : MENU_IDLE]"
                  @click="() => { emit('profile-select', pItem.key); isMobileDrawerOpen = false }"
                >
                  <component :is="pItem.icon" v-if="pItem.icon" class="w-4 h-4 shrink-0" />
                  {{ pItem.label }}
                </button>
              </template>
            </div>

            <!-- Logout -->
            <button
              v-if="showLogout"
              type="button"
              :class="[MENU_ITEM, MENU_ERROR]"
              @click="() => { emit('logout'); isMobileDrawerOpen = false }"
            >
              <LogOut class="w-4 h-4 shrink-0" />
              Logout
            </button>
          </template>

          <template v-else>
            <button
              type="button"
              class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90 active:scale-98 transition-all shadow-xs"
              @click="() => { emit('login'); isMobileDrawerOpen = false }"
            >
              Sign in to Account
            </button>
          </template>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
