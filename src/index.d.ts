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

export interface BreadcrumbItem {
  label: string
  route?: string
}

export interface FuseGreetBarProps {
  title?: string
  description?: string
  greeting?: boolean
  greetingPrefix?: string
  breadcrumbs?: BreadcrumbItem[] | boolean
  autoRoute?: boolean
  user?: FuseUser | null
  profileRoute?: string
  mobileMenuOffset?: boolean
}

export interface FuseThemeTogglerProps {
  isDark?: boolean
}

export interface StatCardTrend {
  direction: 'up' | 'down'
  label: string
  good?: boolean
}

export interface FuseStatCardProps {
  title: string
  description?: string
  icon?: any
  image?: string
  imageAlt?: string
  type?: 'info' | 'number' | 'money'
  value?: string | number
  formatted?: string | null
  currency?: string
  currencySymbols?: Record<string, string>
  decimals?: number
  compact?: boolean
  suffix?: string
  locale?: string
  tone?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  trend?: StatCardTrend | null
  loading?: boolean
}

export interface InputOption {
  label: string
  value: any
  [key: string]: any
}

export interface FuseInputProps {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'search'
    | 'number'
    | 'tel'
    | 'url'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'range'
    | 'dropdown'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'radio'
    | 'checkbox'
    | 'file'
  label?: string
  placeholder?: string
  modelValue?: any
  options?: InputOption[]
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  rows?: number
  name?: string
  id?: string
  className?: string
  fileType?: string
  preview?: boolean
  icon?: any | boolean
}

export interface FilterConfig {
  key: string
  label: string
  options: InputOption[]
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  clearable?: boolean
}

export interface FuseFiltersProps {
  filters?: FilterConfig[]
  showSearch?: boolean
  searchPlaceholder?: string
  debounce?: number
  gridCols?: 1 | 2 | 3 | 4 | 5 | 6
  clearLabel?: string
  modelValue?: Record<string, any>
  search?: string
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
export declare const FuseStatCard: DefineComponent<FuseStatCardProps>
export declare const FuseInput: DefineComponent<FuseInputProps>
export declare const FuseFilters: DefineComponent<FuseFiltersProps>

export declare const FUSE_THEME_KEY: string
export declare function useFuseTheme(): UseFuseThemeReturn

declare const plugin: Plugin
export default plugin
