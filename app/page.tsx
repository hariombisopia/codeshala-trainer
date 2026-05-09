'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Play, Users, BookOpen, Calendar } from 'lucide-react'
import { db } from '@/lib/db'
import { getGreeting } from '@/lib/utils'
import { BatchCard } from '@/components/batch/BatchCard'
import { useUIStore } from '@/store/uiStore'
import type { BatchWithProgress, BatchSession } from '@/lib/types'
import { format } from 'date-fns'

export default function DashboardPage() {
  const { trainerName } = useUIStore()
  const [batches, setBatches] = useState<BatchWithProgress[]>([])
  const [stats, setStats] = useState({ totalStudents: 0, activeBatches: 0, sessionsThisWeek: 0 })
  const [lastSession, setLastSession] = useState<BatchSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const allBatches = await db.batches.toArray()
      const allStudents = await db.students.toArray()
      const allBatchSessions = await db.batch_sessions.toArray()

      const batchesWithProgress: BatchWithProgress[] = await Promise.all(
        allBatches.map(async (batch) => {
          const batchSessions = allBatchSessions.filter((bs) => bs.batch_id === batch.id)
          const completed = batchSessions.filter((bs) => bs.status === 'completed').length
          const students = allStudents.filter((s) => s.batch_id === batch.id && s.status === 'active')
          return {
            ...batch,
            total_sessions: batchSessions.length,
            completed_sessions: completed,
            student_count: students.length,
          }
        })
      )

      // Last in-progress session
      const inProgress = allBatchSessions.find((bs) => bs.status === 'in_progress')
      setLastSession(inProgress ?? null)

      // Stats
      const today = new Date()
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      const sessionsThisWeek = allBatchSessions.filter((bs) => {
        if (!bs.conducted_at) return false
        return new Date(bs.conducted_at) >= weekStart
      }).length

      setStats({
        totalStudents: allStudents.filter((s) => s.status === 'active').length,
        activeBatches: allBatches.filter((b) => b.status === 'active').length,
        sessionsThisWeek,
      })

      setBatches(batchesWithProgress.filter((b) => b.status === 'active'))
      setLoading(false)
    }
    load()
  }, [])

  const today = format(new Date(), 'EEEE, d MMMM yyyy')

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-[#666]">{today}</p>
        <h1 className="font-sora text-2xl font-bold text-[#111111] mt-1">
          {getGreeting()}, {trainerName}! 👋
        </h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Students', value: stats.totalStudents, icon: Users },
          { label: 'Batches', value: stats.activeBatches, icon: BookOpen },
          { label: 'This Week', value: stats.sessionsThisWeek, icon: Calendar },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl p-3 text-center">
            <Icon className="w-4 h-4 text-accent mx-auto mb-1" />
            <div className="font-sora font-bold text-xl text-[#111111]">{value}</div>
            <div className="text-[10px] text-[#666]">{label}</div>
          </div>
        ))}
      </div>

      {/* Continue Last Session */}
      {lastSession && (
        <Link href={`/session/${lastSession.id}`}>
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <Play className="w-5 h-5 text-accent fill-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-accent font-medium">Continue Last Session</p>
              <p className="text-sm text-[#111111] font-medium truncate">Resume where you left off</p>
            </div>
          </div>
        </Link>
      )}

      {/* Active Batches */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sora font-semibold text-[#111111]">Active Batches</h2>
        <Link href="/batches" className="text-xs text-accent">View all</Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 bg-[#f8f8f8] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : batches.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-[#e5e5e5] mx-auto mb-3" />
          <p className="text-[#666] text-sm mb-4">No active batches yet</p>
          <Link
            href="/batches/new"
            className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Create your first batch
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      )}

      {/* FAB */}
      <Link
        href="/batches/new"
        className="fixed bottom-20 right-4 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30 hover:bg-accent/90 transition-colors z-30"
        aria-label="Create new batch"
      >
        <Plus className="w-6 h-6 text-white" />
      </Link>
    </div>
  )
}
