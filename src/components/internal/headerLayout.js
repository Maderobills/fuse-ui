export const HEADER_SECTIONS = ['logo', 'brand', 'nav', 'spacer', 'actions', 'profile']
export const DEFAULT_LAYOUT = [...HEADER_SECTIONS]

export const HEADER_LABELS = {
  logo: 'Logo',
  brand: 'Brand name',
  nav: 'Menu',
  actions: 'Quick actions',
  profile: 'Profile',
  spacer: 'Right side starts below',
}

// Keep only known keys, no duplicates, and make sure every section appears once
export const normalizeLayout = (order) => {
  const out = []
  for (const k of Array.isArray(order) ? order : []) {
    if (HEADER_SECTIONS.includes(k) && !out.includes(k)) out.push(k)
  }
  for (const k of HEADER_SECTIONS) if (!out.includes(k)) out.push(k)
  return out
}