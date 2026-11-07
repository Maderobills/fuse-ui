let n = 0
export const nextId = (prefix = 'fuse') => `${prefix}-${++n}`