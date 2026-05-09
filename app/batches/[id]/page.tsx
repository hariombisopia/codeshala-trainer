'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Play, UserPlus, Users, BarChart3, BookOpen } from 'lucide-react'
import { db } from '@/lib/db'
import { SessionCard } from '@/components/session/SessionCard'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatDate } from '@/lib/utils'
import type { Batch, BatchSession, Session, Student } from '@/lib/types'

type Tab = 'sessions' | 'students' | 'progress'

export default function BatchDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [batch, setBatch] = useState<Batch | null>(null)
  const [batchSessions, setBatchSessions] = useState<BatchSession[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [stepCounts, setStepCounts] = useState<Record<string, { total: number; completed: number }>>({})
  const [tab, setTab] = useState<Tab>('sessions')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const b = await db.batches.get(id)
      if (!b) { router.push('/batches'); return }
      setBatch(b)

      const bs = await db.batch_sessions.where('batch_id').equals(id).sortBy('scheduled_date')
      setBatchSessions(bs)

      const sessionIds = bs.map((s) => s.session_id)
      const sess = await db.sessions.where('id').anyOf(sessionIds).toArray()
      // Sort by order_index
      sess.sort((a, b) => a.order_index - b.order_index)
      setSessions(sess)

      const studs = await db.students.where('batch_id').equals(id).toArray()
      setStudents(studs)

      const counts: Record<string, { total: number; completed: number }> = {}
      for (const bsItem of bs) {
        const blocks = await db.blocks.where('session_id').equals(bsItem.session_id).toArray()
        const progress = await db.block_progress.where('batch_session_id').equals(bsItem.id).toArray()
        counts[bsItem.id] = {
          total: blocks.length,
          completed: progress.filter((p) => p.status === 'completed').length,
        }
      }
      setStepCounts(counts)
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const nextPendingSession = batchSessions.find((bs) => bs.status === 'pending' || bs.status === 'in_progress')
  const completedCount = batchSessions.filter((bs) => bs.status === 'completed').length
  const progress = batchSessions.length > 0 ? (completedCount / batchSessions.length) * 100 : 0

  if (loading) {
    return (
      <div className="px-4 pt-6">
        <div className="h-8 w-48 bg-[#f8f8f8] rounded animate-pulse mb-4" />
        <div className="h-24 bg-[#f8f8f8] rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!batch) return null

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f8f8f8] border border-[#e5e5e5] shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-[#111111]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-sora font-bold text-lg text-[#111111] truncate">{batch.name}</h1>
          <p className="text-xs text-[#666]">{batch.level}</p>
        </div>
        <StatusBadge status={batch.status} />
      </div>

      {/* Progress summary */}
      <div className="bg-[#f8f8f8] border border-[#e5e5e5] rounded-2xl p-4 mb-4">
        <ProgressBar
          value={progress}
          label={`${completedCount} of ${batchSessions.length} sessions completed`}
          showPercent
          className="mb-3"
        />
        <div className="flex gap-4 text-xs text-[#666]">
          <span>{students.filter((s) => s.status === 'active').length} students</span>
          {batch.start_date && <span>Started {formatDate(batch.start_date)}</span>}
        </div>
      </div>

      {/* Start Today's Session CTA */}
      {nextPendingSession && (
        <Link href={`/session/${nextPendingSession.id}`}>
          <div className="bg-accent text-white rounded-2xl p-4 mb-4 flex items-center gap-3 min-h-[56px]">
            <Play className="w-5 h-5 fill-white shrink-0" />
            <span className="font-sora font-bold">
              {nextPendingSession.status === 'in_progress' ? 'Resume Session' : "Start Today's Session"}
            </span>
          </div>
        </Link>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl p-1 mb-4">
        {([
          { key: 'sessions', label: 'Sessions', icon: BookOpen },
          { key: 'students', label: 'Students', icon: Users },
          { key: 'progress', label: 'Progress', icon: BarChart3 },
        ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors min-h-[40px] ${
              tab === key ? 'bg-accent text-white' : 'text-[#666] hover:text-[#111111]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'sessions' && (
        <div className="space-y-3">
          {batchSessions.map((bs) => {
            const session = sessions.find((s) => s.id === bs.session_id)
            if (!session) return null
            return (
              <SessionCard
                key={bs.id}
                batchSession={bs}
                session={session}
                stepCount={stepCounts[bs.id]?.total ?? 0}
                completedSteps={stepCounts[bs.id]?.completed ?? 0}
              />
            )
          })}
        </div>
      )}

      {tab === 'students' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#666]">{students.length} enrolled</span>
            <Link
              href={`/batches/${id}/students/new`}
              className="flex items-center gap-1.5 text-accent text-sm font-medium"
            >
              <UserPlus className="w-4 h-4" /> Add Student
            </Link>
          </div>
          {students.length === 0 ? (
            <div className="text-center py-10">
              <Users className="w-10 h-10 text-[#e5e5e5] mx-auto mb-2" />
              <p className="text-[#666] text-sm">No students yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-sm">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#f5f5f5] truncate">{student.name}</p>
                    {student.phone && <p className="text-xs text-[#888]">{student.phone}</p>}
                  </div>
                  <StatusBadge status={student.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'progress' && (
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4">
            <h3 className="font-sora font-semibold text-[#f5f5f5] mb-3">Overall Progress</h3>
            <ProgressBar value={progress} showPercent className="mb-2" />
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div>
                <div className="text-xl font-bold text-success">{completedCount}</div>
                <div className="text-xs text-[#888]">Completed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-accent">
                  {batchSessions.filter((bs) => bs.status === 'in_progress').length}
                </div>
                <div className="text-xs text-[#888]">In Progress</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#888]">
                  {batchSessions.filter((bs) => bs.status === 'pending').length}
                </div>
                <div className="text-xs text-[#888]">Pending</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
