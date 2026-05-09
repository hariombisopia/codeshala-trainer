import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, addDays, isSunday } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return crypto.randomUUID()
}

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'dd MMM yyyy')
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/**
 * Given a start date and a count of sessions, returns an array of
 * scheduled dates skipping Sundays (Mon–Sat schedule).
 */
export function scheduleDates(startDate: string, count: number): string[] {
  const dates: string[] = []
  let current = new Date(startDate)

  while (dates.length < count) {
    if (!isSunday(current)) {
      dates.push(format(current, 'yyyy-MM-dd'))
    }
    current = addDays(current, 1)
  }

  return dates
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function getTimerColor(secondsLeft: number): string {
  if (secondsLeft <= 30) return 'text-danger'
  if (secondsLeft <= 120) return 'text-warning'
  return 'text-success'
}

export function getTimerRingColor(secondsLeft: number): string {
  if (secondsLeft <= 30) return '#ef4444'
  if (secondsLeft <= 120) return '#f59e0b'
  return '#22c55e'
}
