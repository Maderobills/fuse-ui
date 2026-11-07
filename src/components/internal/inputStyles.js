export const inputBase = [
  'w-full px-4 py-3 bg-surface dark:bg-dark-surface text-sm text-foreground dark:text-dark-foreground',
  'border border-outline dark:border-dark-outline rounded-sm',
  'focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary',
  'transition-all duration-200 placeholder:text-foreground/50 dark:placeholder:text-dark-foreground/50',
  'disabled:bg-muted dark:disabled:bg-dark-muted disabled:cursor-not-allowed disabled:text-foreground/50 dark:disabled:text-dark-foreground/50',
  'read-only:bg-muted dark:read-only:bg-dark-muted read-only:cursor-default',
].join(' ')

export const inputError =
  'border-error dark:border-dark-error focus:ring-error dark:focus:ring-dark-error focus:border-error dark:focus:border-dark-error'