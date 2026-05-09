'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, BookOpen } from 'lucide-react'
import { db } from '@/lib/db'
import { BatchCard } from '@/components/batch/BatchCard'
import type { BatchWithProgress } from '@/lib/types'

type FilterTab = 'all' | 'active' | 'completed' | 'paused'

export default function BatchesPage() {
  const [batches, setBatches] = useState<BatchWithProgress[]>([])
  const [filter, setFilter] = useState<FilterTab>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const allBatches = await db.batches.orderBy('created_at').reverse().toArray()
      const allStudents = await db.students.toArray()
      const allBatchSessions = await db.batch_sessions.toArray()

      const withProgress: BatchWithProgress[] = allBatches.map((batch) => {
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

      setBatches(withProgress)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = filter === 'all' ? batches : batches.filter((b) => b.status === filter)

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'paused', label: 'Paused' },
  ]

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-sora text-2xl font-bold text-[#111111]">Batches</h1>
        <Link
          href="/batches/new"
          className="flex items-center gap-1.5 bg-accent text-white px-3 py-2 rounded-xl text-sm font-medium min-h-[40px]"
        >
          <Plus className="w-4 h-4" /> New
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[36px] ${
              filter === key
                ? 'bg-accent text-white'
                : 'bg-[#f8f8f8] text-[#666] border border-[#e5e5e5] hover:text-[#111111]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-[#f8f8f8] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-[#e5e5e5] mx-auto mb-3" />
          <p className="text-[#666] text-sm mb-4">
            {filter === 'all' ? 'No batches yet' : `No ${filter} batches`}
          </p>
          {filter === 'all' && (
            <Link
              href="/batches/new"
              className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Create your first batch
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      )}
    </div>
  )
}
