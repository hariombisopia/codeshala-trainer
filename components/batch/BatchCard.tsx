'use client'

import Link from 'next/link'
import { Users, Calendar } from 'lucide-react'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { formatDate } from '@/lib/utils'
import type { BatchWithProgress } from '@/lib/types'

interface BatchCardProps {
  batch: BatchWithProgress
}

export function BatchCard({ batch }: BatchCardProps) {
  const progress =
    batch.total_sessions > 0
      ? (batch.completed_sessions / batch.total_sessions) * 100
      : 0

  return (
    <Link href={`/batches/${batch.id}`}>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 hover:border-accent/50 transition-all active:scale-[0.98]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-sora font-semibold text-[#f5f5f5] text-base truncate">{batch.name}</h3>
            <p className="text-xs text-[#888] mt-0.5">{batch.level}</p>
          </div>
          <StatusBadge status={batch.status} className="ml-2 shrink-0" />
        </div>

        <ProgressBar
          value={progress}
          label={`${batch.completed_sessions} / ${batch.total_sessions} sessions`}
          showPercent
          className="mb-3"
        />

        <div className="flex items-center gap-4 text-xs text-[#888]">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {batch.student_count} students
          </span>
          {batch.start_date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(batch.start_date)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
