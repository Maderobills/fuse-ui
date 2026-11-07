<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  /** { name, email, avatar } — null hides the profile link */
  user: { type: Object, default: null },
  profileRoute: { type: String, default: '/profile' },
  /** Show "Good morning, Kwame" on the left when no #left slot is given */
  greeting: { type: Boolean, default: false },
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
  const h = new Date().getHours()
  const part = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  return `${part}, ${displayName.value.split(' ')[0]}`
})

const isProfileActive = computed(() => route.path === props.profileRoute)
</script>

<template>
  <header
    class="w-full flex justify-between items-center px-4 lg:px-6 py-2 border-b border-outline dark:border-dark-outline shrink-0 bg-surface/40 dark:bg-dark-surface/40"
  >
    <!-- Left: greeting, breadcrumbs, page title... -->
    <div class="min-w-0" :class="mobileMenuOffset ? 'pl-12 lg:pl-0' : ''">
      <slot name="left">
        <p
          v-if="greeting && user"
          class="text-sm font-medium text-foreground/80 dark:text-dark-foreground/80 truncate"
        >
          {{ greetingText }}
        </p>
      </slot>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-3">
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