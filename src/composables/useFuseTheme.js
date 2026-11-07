import { ref, readonly } from 'vue'

export const FUSE_THEME_KEY = 'fuse-theme'

// Module-level state: every toggler on the page shares one source of truth
const isDark = ref(false)
let initialized = false

const apply = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
}

export function useFuseTheme() {
  const initTheme = () => {
    if (initialized || typeof window === 'undefined') return
    initialized = true

    let saved = null
    try {
      saved = localStorage.getItem(FUSE_THEME_KEY)
    } catch {
      /* storage blocked */
    }

    isDark.value = saved
      ? saved === 'dark'
      : document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches

    apply(isDark.value)
  }

  const setTheme = (dark) => {
    isDark.value = dark
    apply(dark)
    try {
      localStorage.setItem(FUSE_THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      /* storage blocked */
    }
  }

  const toggleTheme = () => setTheme(!isDark.value)

  return { isDark: readonly(isDark), initTheme, setTheme, toggleTheme }
}