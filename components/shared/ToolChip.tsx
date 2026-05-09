import { cn } from '@/lib/utils'

interface ToolChipProps {
  name: string
  className?: string
}

export function ToolChip({ name, className }: ToolChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-[#2a2a2a] text-[#f5f5f5] border border-[#3a3a3a]',
        className
      )}
    >
      {name}
    </span>
  )
}
