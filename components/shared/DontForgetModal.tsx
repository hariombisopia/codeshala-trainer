'use client'

import { useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

const CHECKLIST = [
  { id: 'attendance', label: 'Collect attendance' },
  { id: 'homework', label: 'Assign homework / practice task' },
  { id: 'next_date', label: 'Share next session date with students' },
  { id: 'photo', label: 'Take a class photo' },
  { id: 'feedback', label: 'Ask for feedback' },
]

interface DontForgetModalProps {
  open: boolean
  onEndSession: () => void
}

export function DontForgetModal({ open, onEndSession }: DontForgetModalProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  if (!open) return null

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const allChecked = checked.size === CHECKLIST.length

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#1a1a1a] border border-[#2a2a2a] rounded-t-2xl p-6 pb-8">
        <h2 className="font-sora text-xl font-bold text-[#f5f5f5] mb-1">Before You End</h2>
        <p className="text-sm text-[#888] mb-6">Tap each item to confirm you&apos;ve done it.</p>

        <div className="space-y-3 mb-8">
          {CHECKLIST.map((item) => {
            const done = checked.has(item.id)
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all min-h-[48px]',
                  done
                    ? 'bg-success/10 border-success/30 text-success'
                    : 'bg-[#2a2a2a] border-[#3a3a3a] text-[#f5f5f5]'
                )}
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 shrink-0 text-[#888]" />
                )}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>

        <button
          onClick={onEndSession}
          className={cn(
            'w-full py-4 rounded-xl font-sora font-bold text-base transition-all min-h-[48px]',
            allChecked
              ? 'bg-accent text-white hover:bg-accent/90'
              : 'bg-[#2a2a2a] text-[#888] cursor-not-allowed'
          )}
          disabled={!allChecked}
        >
          End Session
        </button>
      </div>
    </div>
  )
}
