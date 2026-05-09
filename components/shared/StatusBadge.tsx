import { cn } from '@/lib/utils'

type Status = 'active' | 'completed' | 'paused' | 'pending' | 'in_progress' | 'dropped' | 'skipped'

const statusConfig: Record<Status, { label: string; className: string }> = {
  active:      { label: 'Active',      className: 'bg-success/20 text-success border-success/30' },
  completed:   { label: 'Completed',   className: 'bg-info/20 text-info border-info/30' },
  paused:      { label: 'Paused',      className: 'bg-warning/20 text-warning border-warning/30' },
  pending:     { label: 'Pending',     className: 'bg-[#2a2a2a] text-[#888] border-[#3a3a3a]' },
  in_progress: { label: 'In Progress', className: 'bg-accent/20 text-accent border-accent/30' },
  dropped:     { label: 'Dropped',     className: 'bg-danger/20 text-danger border-danger/30' },
  skipped:     { label: 'Skipped',     className: 'bg-warning/20 text-warning border-warning/30' },
}

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.pending
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
