import Link from 'next/link'
import { Clock, Play, CheckCircle2 } from 'lucide-react'
import { ToolChip } from '@/components/shared/ToolChip'
import type { BatchSession, Session } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SessionCardProps {
  batchSession: BatchSession
  session: Session
  stepCount?: number
  completedSteps?: number
}

export function SessionCard({ batchSession, session, stepCount = 0, completedSteps = 0 }: SessionCardProps) {
  const isCompleted = batchSession.status === 'completed'
  const isInProgress = batchSession.status === 'in_progress'

  return (
    <Link href={`/session/${batchSession.id}`}>
      <div
        className={cn(
          'bg-[#1a1a1a] border rounded-xl p-4 transition-all active:scale-[0.98]',
          isInProgress ? 'border-accent/50' : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
        )}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[#888]">Day {session.session_number}</span>
              {isInProgress && (
                <span className="flex items-center gap-1 text-xs text-accent">
                  <Play className="w-3 h-3 fill-accent" /> In Progress
                </span>
              )}
              {isCompleted && (
                <span className="flex items-center gap-1 text-xs text-success">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </span>
              )}
            </div>
            <h3 className="font-medium text-[#f5f5f5] text-sm leading-snug">{session.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#888]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {session.duration_minutes} min
          </span>
          {stepCount > 0 && (
            <span>{completedSteps}/{stepCount} steps</span>
          )}
        </div>

        {session.tools_used && session.tools_used.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {session.tools_used.slice(0, 3).map((tool) => (
              <ToolChip key={tool} name={tool} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
