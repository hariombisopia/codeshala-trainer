'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Clock, Edit2 } from 'lucide-react'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'
import type { CurriculumLevel, Session, Block } from '@/lib/types'

interface SessionWithSteps extends Session {
  steps: Block[]
}

interface LevelWithSessions extends CurriculumLevel {
  sessions: SessionWithSteps[]
}

export default function CurriculumPage() {
  const [levels, setLevels] = useState<LevelWithSessions[]>([])
  const [openLevels, setOpenLevels] = useState<Set<string>>(new Set())
  const [openSessions, setOpenSessions] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const lvls = await db.curriculum_levels.orderBy('order_index').toArray()
      const result: LevelWithSessions[] = await Promise.all(
        lvls.map(async (level) => {
          const sessions = await db.sessions.where('level_id').equals(level.id).sortBy('order_index')
          const sessionsWithSteps: SessionWithSteps[] = await Promise.all(
            sessions.map(async (session) => {
              const steps = await db.blocks.where('session_id').equals(session.id).sortBy('order_index')
              return { ...session, steps }
            })
          )
          return { ...level, sessions: sessionsWithSteps }
        })
      )
      setLevels(result)
      // Open first level by default
      if (result.length > 0) setOpenLevels(new Set([result[0].id]))
      setLoading(false)
    }
    load()
  }, [])

  const toggleLevel = (id: string) => {
    setOpenLevels((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const toggleSession = (id: string) => {
    setOpenSessions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const badgeColors: Record<string, string> = {
    green: 'bg-success/20 text-success border-success/30',
    amber: 'bg-warning/20 text-warning border-warning/30',
    blue: 'bg-info/20 text-info border-info/30',
  }

  if (loading) {
    return (
      <div className="px-4 pt-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-[#1a1a1a] rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="font-sora text-2xl font-bold text-[#f5f5f5] mb-6">Curriculum</h1>

      <div className="space-y-2">
        {levels.map((level) => {
          const isLevelOpen = openLevels.has(level.id)
          return (
            <div key={level.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
              {/* Level header */}
              <button
                onClick={() => toggleLevel(level.id)}
                className="w-full flex items-center gap-3 p-4 text-left min-h-[56px]"
              >
                {isLevelOpen ? (
                  <ChevronDown className="w-5 h-5 text-[#888] shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#888] shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full border font-mono',
                        badgeColors[level.badge_color] ?? badgeColors.green
                      )}
                    >
                      {level.code}
                    </span>
                    <span className="font-sora font-semibold text-[#f5f5f5] text-sm">{level.title}</span>
                  </div>
                </div>
                <span className="text-xs text-[#888] shrink-0">{level.sessions.length} sessions</span>
              </button>

              {/* Sessions */}
              {isLevelOpen && (
                <div className="border-t border-[#2a2a2a]">
                  {level.sessions.map((session) => {
                    const isSessionOpen = openSessions.has(session.id)
                    return (
                      <div key={session.id} className="border-b border-[#2a2a2a] last:border-b-0">
                        {/* Session header */}
                        <button
                          onClick={() => toggleSession(session.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left min-h-[48px]"
                        >
                          <div className="w-4 shrink-0">
                            {isSessionOpen ? (
                              <ChevronDown className="w-4 h-4 text-[#888]" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-[#888]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-[#888] mr-2">Day {session.session_number}</span>
                            <span className="text-sm text-[#f5f5f5]">{session.title}</span>
                          </div>
                          <span className="text-xs text-[#888] shrink-0">{session.steps.length} steps</span>
                        </button>

                        {/* Steps */}
                        {isSessionOpen && (
                          <div className="bg-[#0f0f0f] px-4 pb-2">
                            {session.steps.map((block, i) => (
                              <div
                                key={block.id}
                                className="flex items-center gap-3 py-2.5 border-b border-[#1a1a1a] last:border-b-0"
                              >
                                <span className="text-xs font-mono text-[#888] w-5 shrink-0">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-[#f5f5f5] truncate">{block.title}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-accent capitalize">{block.block_type}</span>
                                    <Clock className="w-3 h-3 text-[#888]" />
                                    <span className="text-xs text-[#888]">{block.duration_minutes} min</span>
                                  </div>
                                </div>
                                <Link
                                  href={`/curriculum/step/${block.id}/edit`}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#2a2a2a] transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5 text-[#888]" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
