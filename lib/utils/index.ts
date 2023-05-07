import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatNumberCompact(input: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(Math.round(input))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${path}`
}
