import type { DefineComponent, Plugin, Ref, DeepReadonly } from 'vue'

export interface NavigationItem {
  label: string
  icon?: any
  route?: string
  path?: string
  id?: string
  children?: NavigationItem[]
  badge?: string | number
}

export interface FuseUser {
  name?: string
  role?: string
  email?: string
  avatar?: string
  [key: string]: any
}

export interface FuseSideBarProps {
  navigationItems: NavigationItem[]
  brandName?: string
  brandTagline?: string
  logoLight?: string
  logoDark?: string
  homeRoute?: string
  user?: FuseUser | null
  profileRoute?: string
  guestLabel?: string
  roleClasses?: Record<string, string>
  expanded?: boolean
}

export interface FuseGreetBarProps {
  user?: FuseUser | null
  profileRoute?: string
  greeting?: boolean
  mobileMenuOffset?: boolean
}

export interface FuseThemeTogglerProps {
  isDark?: boolean
}

export interface UseFuseThemeReturn {
  isDark: DeepReadonly<Ref<boolean>>
  initTheme: () => void
  setTheme: (dark: boolean) => void
  toggleTheme: () => void
}

export declare const FuseSideBar: DefineComponent<FuseSideBarProps>
export declare const FuseGreetBar: DefineComponent<FuseGreetBarProps>
export declare const FuseThemeToggler: DefineComponent<FuseThemeTogglerProps>

export declare const FUSE_THEME_KEY: string
export declare function useFuseTheme(): UseFuseThemeReturn

declare const plugin: Plugin
export default plugin

