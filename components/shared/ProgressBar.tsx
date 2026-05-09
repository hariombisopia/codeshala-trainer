import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number        // 0–100
  label?: string
  showPercent?: boolean
  className?: string
  barClassName?: string
}

export function ProgressBar({ value, label, showPercent = false, className, barClassName }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-[#888]">{label}</span>}
          {showPercent && <span className="text-xs text-[#888]">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barClassName ?? 'bg-accent')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
