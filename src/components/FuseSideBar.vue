<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  LogOut,
  Menu as LucideMenu,
  X as LucideX,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User as UserIcon,
} from '@lucide/vue'
import SideBarTooltip from './internal/SidebarTooltip.vue'
import SideBarLink from './internal/SideBarLink.vue'

const props = defineProps({
  /** [{ label, icon, route|path|id, children?: [...] }] */
  navigationItems: { type: Array, required: true },
  brandName: { type: String, default: '' },
  brandTagline: { type: String, default: '' },
  logoLight: { type: String, default: '' },
  logoDark: { type: String, default: '' },
  homeRoute: { type: String, default: '/' },
  /** { name, role, avatar } — null shows the guest state */
  user: { type: Object, default: null },
  profileRoute: { type: String, default: '/profile' },
  guestLabel: { type: String, default: 'Welcome, Guest' },
  roleClasses: {
    type: Object,
    default: () => ({
      admin: 'text-success dark:text-dark-success',
      manager: 'text-info dark:text-dark-info',
      staff: 'text-warning dark:text-dark-warning',
    }),
  },
})

const emit = defineEmits(['logout'])

// Works with or without v-model:expanded
const isExpanded = defineModel('expanded', { type: Boolean, default: true })

const route = useRoute()
const isDrawerOpen = ref(false)
const openSubmenus = ref([])

/* ── helpers ── */
const getItemPath = (item) => item.route || item.path || (item.id ? `/${item.id}` : '#')
const getItemKey = (item, idx) => item.route || item.path || item.id || item.label || String(idx)
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '')
const isPathActive = (p) => (route?.path ? route.path === p || (p !== '/' && route.path.startsWith(p + '/')) : false)
const isMenuItemActive = (item) =>
  item.children?.length ? item.children.some((c) => isPathActive(getItemPath(c))) : isPathActive(getItemPath(item))

const initials = computed(() =>
  (props.user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)
const roleClass = computed(
  () => props.roleClasses[props.user?.role] || 'text-foreground/40 dark:text-dark-foreground/40',
)

/* ── state ── */
const toggleDrawer = () => (isDrawerOpen.value = !isDrawerOpen.value)
const closeDrawer = () => (isDrawerOpen.value = false)
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
  if (!isExpanded.value) openSubmenus.value = []
}
const toggleSubmenu = (key) => {
  const i = openSubmenus.value.indexOf(key)
  if (i > -1) openSubmenus.value.splice(i, 1)
  else openSubmenus.value.push(key)
}
const initializeSubmenus = () => {
  props.navigationItems.forEach((item, idx) => {
    const key = getItemKey(item, idx)
    if (item.children?.length && isMenuItemActive(item) && !openSubmenus.value.includes(key)) {
      openSubmenus.value.push(key)
    }
  })
}
const handleLogout = () => {
  emit('logout')
  closeDrawer()
}
const handleResize = () => {
  if (window.innerWidth < 1024) isExpanded.value = true
}

watch(() => route?.path, initializeSubmenus)
onMounted(() => {
  handleResize()
  initializeSubmenus()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<template>
  <div class="h-full md:p-5 w-fit">
    <!-- Mobile toggle -->
    <button
      type="button"
      @click="toggleDrawer"
      class="fixed top-4 left-4 z-50 lg:hidden p-2.5 bg-surface dark:bg-dark-surface shadow-md transition-all hover:bg-muted dark:hover:bg-dark-muted border border-outline dark:border-dark-outline rounded-xl"
    >
      <LucideMenu v-if="!isDrawerOpen" class="w-4 h-4 text-foreground/70 dark:text-dark-foreground/70" />
      <LucideX v-else class="w-4 h-4 text-foreground/70 dark:text-dark-foreground/70" />
    </button>

    <!-- Backdrop -->
    <transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDrawerOpen"
        @click="closeDrawer"
        class="fixed inset-0 bg-foreground/10 dark:bg-dark-foreground/10 backdrop-blur-sm z-40 lg:hidden"
      />
    </transition>

    <aside
      class="fixed bg-surface dark:bg-dark-surface lg:static top-0 left-0 h-full transform transition-all duration-300 ease-in-out z-50 flex flex-col border-r border-outline dark:border-dark-outline lg:translate-x-0"
      :class="[
        isDrawerOpen ? 'translate-x-0 w-64' : '-translate-x-full',
        isExpanded ? 'lg:w-60' : 'lg:w-[72px]',
      ]"
    >
      <!-- Desktop collapse toggle -->
      <button
        type="button"
        @click="toggleSidebar"
        class="hidden lg:flex items-center justify-center absolute -right-3.5 top-20 w-7 h-7 bg-surface dark:bg-dark-surface border border-outline dark:border-dark-outline rounded-full shadow-sm hover:shadow-md transition-all hover:bg-muted dark:hover:bg-dark-muted z-10"
      >
        <ChevronLeft v-if="isExpanded" class="w-3.5 h-3.5 text-foreground/50 dark:text-dark-foreground/50" />
        <ChevronRight v-else class="w-3.5 h-3.5 text-foreground/50 dark:text-dark-foreground/50" />
      </button>

      <div class="h-full flex flex-col overflow-hidden">
        <!-- ── Logo ── -->
        <div class="px-4 pt-5 pb-4 border-b border-outline dark:border-dark-outline shrink-0">
          <RouterLink :to="homeRoute" class="block">
            <slot name="logo" :expanded="isExpanded">
              <div
                class="flex items-center transition-all duration-300"
                :class="isExpanded ? 'lg:justify-start gap-3' : 'lg:justify-center'"
              >
                <div
                  v-if="logoLight"
                  :class="isExpanded ? '' : 'w-8 h-8 rounded-sm flex items-center justify-center shrink-0 bg-primary/5 border border-primary/10 dark:bg-dark-secondary/10 dark:border-dark-secondary/15'"
                >
                  <img
                    :src="logoLight"
                    :alt="brandName"
                    class="w-auto object-contain shrink-0"
                    :class="[isExpanded ? 'h-9' : 'h-6', logoDark ? 'dark:hidden' : '']"
                  />
                  <img
                    v-if="logoDark"
                    :src="logoDark"
                    :alt="brandName"
                    class="hidden dark:block w-auto object-contain shrink-0"
                    :class="isExpanded ? 'h-9' : 'h-6'"
                  />
                </div>

                <span
                  v-show="isExpanded && brandName"
                  class="font-semibold tracking-tight text-foreground dark:text-dark-foreground text-sm leading-tight whitespace-nowrap"
                >
                  {{ brandName }}
                  <template v-if="brandTagline">
                    <br />
                    <span class="font-normal text-xs tracking-wide text-secondary dark:text-dark-secondary">{{ brandTagline }}</span>
                  </template>
                </span>
              </div>
            </slot>
          </RouterLink>
        </div>

        <!-- ── User card ── -->
        <div class="px-3 py-3 border-b border-outline dark:border-dark-outline shrink-0">
          <RouterLink
            v-if="user"
            :to="profileRoute"
            title="View Profile"
            class="flex items-center gap-3 px-2 py-2.5 rounded-xl transition-all duration-200 hover:bg-muted dark:hover:bg-dark-muted group relative"
            :class="[
              isExpanded ? '' : 'lg:justify-center lg:px-0',
              route?.path === profileRoute ? 'bg-primary/10 dark:bg-dark-primary/10 border border-primary/20 dark:border-dark-primary/20' : '',
            ]"
          >
            <img
              v-if="user.avatar"
              :src="user.avatar"
              alt="User avatar"
              class="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-secondary/30 dark:ring-dark-secondary/30 group-hover:ring-primary/40 transition-all"
            />
            <div
              v-else
              class="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold bg-primary/10 text-primary dark:bg-dark-secondary/15 dark:text-dark-secondary ring-2 ring-secondary/30 dark:ring-dark-secondary/30"
            >
              {{ initials }}
            </div>

            <div class="flex-1 min-w-0" :class="isExpanded ? 'lg:block' : 'lg:hidden'">
              <p class="text-xs font-semibold text-foreground dark:text-dark-foreground truncate leading-tight group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                {{ user.name || 'User' }}
              </p>
              <p class="text-[11px] mt-0.5 font-medium" :class="roleClass">
                {{ user.role ? capitalize(user.role) : 'Member' }}
              </p>
            </div>

            <SideBarTooltip v-if="!isExpanded">
              <span class="text-xs font-medium text-foreground/80 dark:text-dark-foreground/80">{{ user.name || 'Profile' }}</span>
            </SideBarTooltip>
          </RouterLink>

          <div
            v-else
            class="flex items-center gap-3 px-2 py-2.5 rounded-xl"
            :class="isExpanded ? '' : 'lg:justify-center'"
          >
            <div class="w-8 h-8 rounded-full bg-muted dark:bg-dark-muted flex items-center justify-center shrink-0 border border-outline dark:border-dark-outline">
              <UserIcon class="w-4 h-4 text-foreground/30 dark:text-dark-foreground/30" />
            </div>
            <p v-show="isExpanded" class="text-xs text-foreground/50 dark:text-dark-foreground/50">{{ guestLabel }}</p>
          </div>
        </div>

        <!-- ── Navigation ── -->
        <nav class="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-0.5">
          <template v-for="(item, idx) in navigationItems" :key="getItemKey(item, idx)">
            <!-- Parent with children -->
            <div v-if="item.children?.length">
              <div class="relative group">
                <button
                  type="button"
                  @click="toggleSubmenu(getItemKey(item, idx))"
                  class="flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-left"
                  :class="[
                    isMenuItemActive(item)
                      ? 'bg-primary/10 text-primary dark:bg-dark-secondary/10 dark:text-dark-secondary'
                      : 'text-foreground/60 dark:text-dark-foreground/60 hover:bg-muted dark:hover:bg-dark-muted hover:text-foreground dark:hover:text-dark-foreground',
                    isExpanded ? '' : 'lg:justify-center lg:px-2',
                  ]"
                >
                  <div class="flex items-center gap-3" :class="isExpanded ? '' : 'lg:gap-0'">
                    <component
                      :is="item.icon"
                      v-if="item.icon"
                      class="w-4.5 h-4.5 shrink-0 transition-colors"
                      :class="isMenuItemActive(item) ? 'text-primary dark:text-dark-secondary' : 'text-foreground/40 dark:text-dark-foreground/40 group-hover:text-foreground/70 dark:group-hover:text-dark-foreground/70'"
                    />
                    <span v-show="isExpanded" class="text-xs font-medium tracking-wide">{{ item.label }}</span>
                  </div>
                  <ChevronDown
                    v-show="isExpanded"
                    class="w-3.5 h-3.5 transition-transform duration-200 shrink-0"
                    :class="[
                      openSubmenus.includes(getItemKey(item, idx)) ? 'rotate-180' : '',
                      isMenuItemActive(item) ? 'text-primary dark:text-dark-secondary' : 'text-foreground/30 dark:text-dark-foreground/30',
                    ]"
                  />
                </button>

                <!-- Collapsed flyout -->
                <SideBarTooltip
                  v-if="!isExpanded"
                  align="top"
                  interactive
                  content-class="min-w-48 py-2 px-2 rounded-xl shadow-lg"
                >
                  <p class="text-[11px] font-semibold text-foreground/50 dark:text-dark-foreground/50 px-2 pb-1.5 uppercase tracking-wider">
                    {{ item.label }}
                  </p>
                  <div class="space-y-0.5">
                    <RouterLink
                      v-for="(child, cIdx) in item.children"
                      :key="getItemKey(child, cIdx)"
                      :to="getItemPath(child)"
                      custom
                      v-slot="{ navigate, isActive: isChildActive }"
                    >
                      <button
                        type="button"
                        @click="navigate"
                        class="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-muted dark:hover:bg-dark-muted transition-colors text-left"
                        :class="isChildActive ? 'bg-primary/10 text-primary dark:bg-dark-secondary/10 dark:text-dark-secondary' : 'text-foreground/70 dark:text-dark-foreground/70'"
                      >
                        <component :is="child.icon" v-if="child.icon" class="w-3.5 h-3.5 shrink-0" />
                        <span class="text-xs" :class="isChildActive ? 'font-medium' : ''">{{ child.label }}</span>
                      </button>
                    </RouterLink>
                  </div>
                </SideBarTooltip>
              </div>

              <!-- Expanded submenu -->
              <transition
                enter-active-class="transition-all duration-200 overflow-hidden"
                leave-active-class="transition-all duration-200 overflow-hidden"
                enter-from-class="opacity-0 max-h-0 -translate-y-1"
                enter-to-class="opacity-100 max-h-96 translate-y-0"
                leave-from-class="opacity-100 max-h-96 translate-y-0"
                leave-to-class="opacity-0 max-h-0 -translate-y-1"
              >
                <div
                  v-show="openSubmenus.includes(getItemKey(item, idx)) && isExpanded"
                  class="ml-3 mt-0.5 mb-0.5 pl-3 border-l border-outline dark:border-dark-outline space-y-0.5"
                >
                  <RouterLink
                    v-for="(child, cIdx) in item.children"
                    :key="getItemKey(child, cIdx)"
                    :to="getItemPath(child)"
                    custom
                    v-slot="{ navigate, isActive: isChildActive }"
                  >
                    <button
                      type="button"
                      @click="() => { navigate(); closeDrawer() }"
                      class="flex items-center w-full gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 text-left"
                      :class="isChildActive
                        ? 'bg-primary/10 text-primary dark:bg-dark-secondary/10 dark:text-dark-secondary'
                        : 'text-foreground/55 dark:text-dark-foreground/55 hover:bg-muted dark:hover:bg-dark-muted hover:text-foreground dark:hover:text-dark-foreground'"
                    >
                      <component
                        :is="child.icon"
                        v-if="child.icon"
                        class="w-3.5 h-3.5 shrink-0"
                        :class="isChildActive ? 'text-primary dark:text-dark-secondary' : 'text-foreground/35 dark:text-dark-foreground/35'"
                      />
                      <span class="text-xs font-medium">{{ child.label }}</span>
                    </button>
                  </RouterLink>
                </div>
              </transition>
            </div>

            <!-- Regular item -->
            <SideBarLink
              v-else
              :to="getItemPath(item)"
              :label="item.label"
              :icon="item.icon"
              :expanded="isExpanded"
              @navigate="closeDrawer"
            />
          </template>
        </nav>

        <!-- ── Bottom actions ── -->
        <div class="px-3 py-3 border-t border-outline dark:border-dark-outline space-y-0.5 shrink-0">
          <SideBarLink
            v-if="user"
            :to="profileRoute"
            label="My Profile"
            :icon="UserIcon"
            :expanded="isExpanded"
            @navigate="closeDrawer"
          />

          <!-- Theme toggle (app supplies its own) -->
          <div
            v-if="$slots['theme-toggle']"
            class="flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-muted dark:hover:bg-dark-muted cursor-pointer"
            :class="isExpanded ? 'gap-3' : 'lg:justify-center lg:px-2'"
          >
            <slot name="theme-toggle" />
            <span v-show="isExpanded" class="text-xs font-medium text-foreground/55 dark:text-dark-foreground/55">Theme</span>
          </div>

          <!-- Logout -->
          <div class="relative group">
            <button
              type="button"
              @click="handleLogout"
              class="flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-error/10 dark:hover:bg-dark-error/10"
              :class="isExpanded ? 'gap-3' : 'lg:justify-center lg:px-2'"
            >
              <LogOut class="w-4.5 h-4.5 shrink-0 text-foreground/40 dark:text-dark-foreground/40 group-hover:text-error dark:group-hover:text-dark-error transition-colors" />
              <span v-show="isExpanded" class="text-xs font-medium text-foreground/55 dark:text-dark-foreground/55 group-hover:text-error dark:group-hover:text-dark-error transition-colors">
                Logout
              </span>
            </button>
            <SideBarTooltip v-if="!isExpanded">
              <span class="text-xs font-medium text-error">Logout</span>
            </SideBarTooltip>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>