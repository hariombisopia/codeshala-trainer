'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, Monitor,
  AlignLeft, X, Clock, HelpCircle, Zap, BookOpen,
  MessageSquare, Play, Star, ChevronRight
} from 'lucide-react'
import { db } from '@/lib/db'
import { useSessionStore } from '@/store/sessionStore'
import { TimerRing } from '@/components/shared/TimerRing'
import { DontForgetModal } from '@/components/shared/DontForgetModal'
import { cn, formatTime } from '@/lib/utils'
import type { Block, BlockProgress } from '@/lib/types'

// ─── Block type config ────────────────────────────────────────────────────────
const BLOCK_CONFIG = {
  intro:    { label: 'Intro',    icon: Star,          color: 'text-accent',   bg: 'bg-accent/10 border-accent/30' },
  concept:  { label: 'Concept',  icon: BookOpen,      color: 'text-info',     bg: 'bg-info/10 border-info/30' },
  demo:     { label: 'Demo',     icon: Play,          color: 'text-success',  bg: 'bg-success/10 border-success/30' },
  activity: { label: 'Activity', icon: Zap,           color: 'text-warning',  bg: 'bg-warning/10 border-warning/30' },
  quiz:     { label: 'Quiz',     icon: HelpCircle,    color: 'text-danger',   bg: 'bg-danger/10 border-danger/30' },
  faq:      { label: 'FAQ',      icon: MessageSquare, color: 'text-[#888]',   bg: 'bg-[#1a1a1a] border-[#2a2a2a]' },
  wrapup:   { label: 'Wrap-Up',  icon: ChevronRight,  color: 'text-accent',   bg: 'bg-accent/10 border-accent/30' },
}

// ─── Content renderer ─────────────────────────────────────────────────────────
function ContentRenderer({ block }: { block: Block }) {
  const [revealedQuizAnswer, setRevealedQuizAnswer] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  // Quiz block
  if (block.block_type === 'quiz' && block.quiz_data) {
    const q = block.quiz_data
    return (
      <div className="space-y-4">
        <div className="bg-[#1a1a1a] border border-danger/30 rounded-2xl p-4">
          <p className="text-xs text-danger font-medium mb-3 uppercase tracking-wide">Quiz Question</p>
          <p className="text-[#f5f5f5] font-medium text-base leading-relaxed">{q.question}</p>
        </div>
        <div className="space-y-2">
          {q.options.map((opt) => {
            const isSelected = selectedOption === opt.id
            const showResult = revealedQuizAnswer
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all min-h-[48px]',
                  showResult && opt.isCorrect ? 'bg-success/20 border-success text-success' :
                  showResult && isSelected && !opt.isCorrect ? 'bg-danger/20 border-danger text-danger' :
                  isSelected ? 'bg-accent/20 border-accent text-accent' :
                  'bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f5] hover:border-[#3a3a3a]'
                )}
              >
                {opt.text}
              </button>
            )
          })}
        </div>
        {!revealedQuizAnswer ? (
          <button
            onClick={() => setRevealedQuizAnswer(true)}
            className="w-full py-3 rounded-xl bg-danger text-white font-medium text-sm min-h-[48px]"
          >
            Reveal Answer
          </button>
        ) : (
          <div className="bg-success/10 border border-success/30 rounded-2xl p-4">
            <p className="text-xs text-success font-medium mb-1 uppercase tracking-wide">Explanation</p>
            <p className="text-[#f5f5f5] text-sm leading-relaxed">{q.explanation}</p>
          </div>
        )}
      </div>
    )
  }

  // Activity block
  if (block.block_type === 'activity' && block.activity_data) {
    const a = block.activity_data
    return (
      <div className="space-y-3">
        <div className="bg-warning/10 border border-warning/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-xs text-warning font-medium uppercase tracking-wide">{a.duration_minutes} min activity</span>
          </div>
          <p className="text-[#f5f5f5] text-sm leading-relaxed whitespace-pre-line">{a.instructions}</p>
        </div>
        {a.expected_outcome && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4">
            <p className="text-xs text-[#888] font-medium mb-1 uppercase tracking-wide">Expected Outcome</p>
            <p className="text-[#888] text-sm leading-relaxed">{a.expected_outcome}</p>
          </div>
        )}
      </div>
    )
  }

  // FAQ block
  if (block.block_type === 'faq' && block.faq_items) {
    return (
      <div className="space-y-2">
        {block.faq_items.map((faq) => (
          <div key={faq.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              className="w-full text-left px-4 py-3 flex items-center justify-between gap-2 min-h-[48px]"
            >
              <span className="text-sm font-medium text-[#f5f5f5]">{faq.question}</span>
              <ChevronRight className={cn('w-4 h-4 text-[#888] shrink-0 transition-transform', openFaq === faq.id && 'rotate-90')} />
            </button>
            {openFaq === faq.id && (
              <div className="px-4 pb-4">
                <p className="text-sm text-[#888] leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Rich content blocks (intro, concept, demo, wrapup)
  return (
    <div className="space-y-3">
      {block.content.map((node, i) => {
        switch (node.type) {
          case 'heading':
            return <h3 key={i} className="font-sora font-bold text-[#f5f5f5] text-base mt-2">{node.text}</h3>
          case 'paragraph':
            return <p key={i} className="text-[#f5f5f5] text-sm leading-relaxed">{node.text}</p>
          case 'bullet_list':
            return (
              <ul key={i} className="space-y-1.5">
                {node.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#f5f5f5]">
                    <span className="text-accent mt-1 shrink-0">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'numbered_list':
            return (
              <ol key={i} className="space-y-1.5">
                {node.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#f5f5f5]">
                    <span className="text-accent font-mono shrink-0 mt-0.5">{j + 1}.</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            )
          case 'code_block':
            return (
              <pre key={i} className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4 overflow-x-auto">
                <code className="text-xs font-mono text-[#22c55e] leading-relaxed">{node.text}</code>
              </pre>
            )
          case 'callout':
            const calloutColors = {
              tip:       'bg-accent/10 border-accent/30 text-accent',
              info:      'bg-info/10 border-info/30 text-info',
              warning:   'bg-warning/10 border-warning/30 text-warning',
              important: 'bg-danger/10 border-danger/30 text-danger',
            }
            return (
              <div key={i} className={cn('rounded-xl border p-4 text-sm leading-relaxed', calloutColors[node.calloutType ?? 'tip'])}>
                {node.text}
              </div>
            )
          case 'divider':
            return <hr key={i} className="border-[#2a2a2a]" />
          default:
            return null
        }
      })}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function TrainerSessionPage() {
  const { batchSessionId } = useParams<{ batchSessionId: string }>()
  const router = useRouter()

  const {
    session, blocks, blockProgress, currentBlockIndex,
    initSession, setCurrentBlockIndex, markBlockComplete,
  } = useSessionStore()

  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dontForgetOpen, setDontForgetOpen] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const elapsedRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    async function load() {
      const bs = await db.batch_sessions.get(batchSessionId)
      if (!bs) { router.push('/batches'); return }

      const sess = await db.sessions.get(bs.session_id)
      if (!sess) { router.push('/batches'); return }

      const blks = await db.blocks.where('session_id').equals(bs.session_id).sortBy('order_index')
      const progress = await db.block_progress.where('batch_session_id').equals(batchSessionId).toArray()

      if (bs.status === 'pending') {
        await db.batch_sessions.update(batchSessionId, { status: 'in_progress' })
      }

      initSession(batchSessionId, sess, blks, progress)
      setLoading(false)
      setTimerRunning(true)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchSessionId])

  useEffect(() => {
    if (!timerRunning) return
    elapsedRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => { if (elapsedRef.current) clearInterval(elapsedRef.current) }
  }, [timerRunning])

  const currentBlock: Block | undefined = blocks[currentBlockIndex]
  const currentProgress: BlockProgress | undefined = blockProgress.find(p => p.block_id === currentBlock?.id)
  const isCurrentDone = currentProgress?.status === 'completed'
  const isLastBlock = currentBlockIndex === blocks.length - 1

  const handleMarkComplete = async () => {
    if (!currentBlock) return
    markBlockComplete(currentBlock.id)
    await db.block_progress.put({
      id: crypto.randomUUID(),
      batch_session_id: batchSessionId,
      block_id: currentBlock.id,
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    if (isLastBlock) {
      setDontForgetOpen(true)
    } else {
      setCurrentBlockIndex(currentBlockIndex + 1)
    }
  }

  const handleEndSession = async () => {
    await db.batch_sessions.update(batchSessionId, {
      status: 'completed',
      conducted_at: new Date().toISOString(),
    })
    const bs = await db.batch_sessions.get(batchSessionId)
    router.push(`/batches/${bs?.batch_id}`)
  }

  const getBlockStatus = (block: Block) => {
    const p = blockProgress.find(pr => pr.block_id === block.id)
    return p?.status ?? 'pending'
  }

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session || !currentBlock) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] px-4">
        <p className="text-[#888] text-sm mb-4">No blocks found for this session.</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-accent text-white rounded-xl text-sm"
        >
          Go Back
        </button>
      </div>
    )
  }

  const config = BLOCK_CONFIG[currentBlock.block_type]
  const BlockIcon = config.icon

  return (
    <div
      className="min-h-screen bg-[#0f0f0f] flex flex-col"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 60) {
          if (diff > 0 && !isLastBlock) setCurrentBlockIndex(currentBlockIndex + 1)
          else if (diff < 0 && currentBlockIndex > 0) setCurrentBlockIndex(currentBlockIndex - 1)
        }
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#2a2a2a]">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-[#888]" />
        </button>
        <div className="text-center">
          <p className="text-xs text-[#888]">Day {session.session_number}</p>
          <p className="text-sm font-medium text-[#f5f5f5] max-w-[180px] truncate">{session.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#888]">{formatElapsed(elapsed)}</span>
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center">
            <AlignLeft className="w-5 h-5 text-[#888]" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {blocks.map((block, i) => {
            const status = getBlockStatus(block)
            return (
              <div key={block.id} className={cn(
                'h-1 flex-1 rounded-full transition-all',
                status === 'completed' ? 'bg-success' :
                i === currentBlockIndex ? 'bg-accent' : 'bg-[#2a2a2a]'
              )} />
            )
          })}
        </div>
        <span className="text-xs text-[#888] shrink-0">{currentBlockIndex + 1}/{blocks.length}</span>
      </div>

      {/* Block content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Block type badge + title */}
        <div className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium mb-3', config.bg, config.color)}>
          <BlockIcon className="w-3.5 h-3.5" />
          {config.label}
        </div>
        <h2 className="font-sora text-xl font-bold text-[#f5f5f5] mb-4">{currentBlock.title}</h2>

        {/* Content */}
        <ContentRenderer block={currentBlock} />

        {/* Trainer note — private */}
        {currentBlock.trainer_notes && (
          <div className="bg-warning/10 border border-warning/30 rounded-2xl p-4 mt-4">
            <p className="text-xs text-warning font-medium mb-2 uppercase tracking-wide">🔒 Trainer Note</p>
            <p className="text-warning/90 text-sm leading-relaxed">{currentBlock.trainer_notes}</p>
          </div>
        )}

        {/* Timer */}
        <div className="flex justify-center mt-6">
          <TimerRing
            durationSeconds={currentBlock.duration_minutes * 60}
            running={timerRunning && !isCurrentDone}
            size={100}
          />
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-4 pb-6 pt-3 border-t border-[#2a2a2a] space-y-3">
        <button
          onClick={handleMarkComplete}
          disabled={isCurrentDone}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-sora font-bold text-base min-h-[56px] transition-all',
            isCurrentDone
              ? 'bg-success/20 text-success border border-success/30'
              : 'bg-success text-white hover:bg-success/90'
          )}
        >
          {isCurrentDone
            ? <><CheckCircle2 className="w-5 h-5" /> Done</>
            : <><Circle className="w-5 h-5" /> Mark Complete</>
          }
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentBlockIndex(currentBlockIndex - 1)}
            disabled={currentBlockIndex === 0}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] disabled:opacity-30 min-h-[48px]"
          >
            <ArrowLeft className="w-4 h-4" /> Prev
          </button>

          <Link
            href={`/projector/${batchSessionId}`}
            target="_blank"
            className="flex items-center justify-center px-4 py-3 rounded-xl bg-[#1a1a1a] border border-accent/50 text-accent min-h-[48px]"
          >
            <Monitor className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setCurrentBlockIndex(currentBlockIndex + 1)}
            disabled={isLastBlock}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] disabled:opacity-30 min-h-[48px]"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="w-72 bg-[#1a1a1a] border-l border-[#2a2a2a] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
              <h3 className="font-sora font-semibold text-[#f5f5f5]">Session Blocks</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-[#888]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {blocks.map((block, i) => {
                const status = getBlockStatus(block)
                const isCurrent = i === currentBlockIndex
                const cfg = BLOCK_CONFIG[block.block_type]
                const Icon = cfg.icon
                return (
                  <button
                    key={block.id}
                    onClick={() => { setCurrentBlockIndex(i); setSidebarOpen(false) }}
                    className={cn(
                      'w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all min-h-[48px] flex items-center gap-2',
                      isCurrent ? 'bg-accent/20 text-accent border border-accent/30' :
                      status === 'completed' ? 'bg-success/10 text-success' :
                      'text-[#888] hover:bg-[#2a2a2a]'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{block.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <DontForgetModal open={dontForgetOpen} onEndSession={handleEndSession} />
    </div>
  )
}
