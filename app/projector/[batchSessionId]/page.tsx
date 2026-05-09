'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { db } from '@/lib/db'
import { formatTime, getTimerRingColor } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'
import type { Session, Block } from '@/lib/types'

// ─── Projector content renderer ───────────────────────────────────────────────
function ProjectorContent({ block, fontSize }: { block: Block; fontSize: string }) {
  const bodySize = fontSize === 'massive' ? '28px' : fontSize === 'xlarge' ? '26px' : '22px'

  if (block.block_type === 'quiz' && block.quiz_data) {
    return (
      <div className="space-y-6">
        <p style={{ fontSize: bodySize }} className="text-white leading-relaxed font-medium">
          {block.quiz_data.question}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {block.quiz_data.options.map((opt, i) => (
            <div key={opt.id} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <span className="text-[#6c63ff] font-bold text-xl shrink-0">{String.fromCharCode(65 + i)}.</span>
              <span style={{ fontSize: Math.max(18, parseInt(bodySize) - 4) + 'px' }} className="text-white/90">{opt.text}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (block.block_type === 'activity' && block.activity_data) {
    return (
      <div className="space-y-6">
        <p style={{ fontSize: bodySize }} className="text-white/90 leading-relaxed whitespace-pre-line">
          {block.activity_data.instructions}
        </p>
        {block.activity_data.expected_outcome && (
          <div className="border-l-4 border-[#f59e0b] pl-6">
            <p className="text-[#f59e0b] text-lg">
              <span className="font-medium">Expected: </span>
              {block.activity_data.expected_outcome}
            </p>
          </div>
        )}
      </div>
    )
  }

  if (block.block_type === 'faq' && block.faq_items) {
    return (
      <div className="space-y-4">
        {block.faq_items.slice(0, 3).map((faq) => (
          <div key={faq.id} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <p className="text-[#6c63ff] font-medium mb-2" style={{ fontSize: '20px' }}>Q: {faq.question}</p>
            <p className="text-white/80" style={{ fontSize: '18px' }}>A: {faq.answer}</p>
          </div>
        ))}
      </div>
    )
  }

  // Rich content blocks
  return (
    <div className="space-y-4">
      {block.content.map((node, i) => {
        switch (node.type) {
          case 'heading':
            return <h3 key={i} className="font-sora font-bold text-white" style={{ fontSize: Math.max(24, parseInt(bodySize)) + 'px' }}>{node.text}</h3>
          case 'paragraph':
            return <p key={i} className="text-white/90 leading-relaxed" style={{ fontSize: bodySize }}>{node.text}</p>
          case 'bullet_list':
            return (
              <ul key={i} className="space-y-2">
                {node.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/90" style={{ fontSize: bodySize }}>
                    <span className="text-[#6c63ff] shrink-0 mt-1">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'numbered_list':
            return (
              <ol key={i} className="space-y-2">
                {node.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/90" style={{ fontSize: bodySize }}>
                    <span className="text-[#6c63ff] font-bold shrink-0">{j + 1}.</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            )
          case 'code_block':
            return (
              <pre key={i} className="bg-black/50 border border-white/10 rounded-xl p-6 overflow-x-auto">
                <code className="font-mono text-[#22c55e]" style={{ fontSize: '20px' }}>{node.text}</code>
              </pre>
            )
          case 'callout':
            const colors = { tip: '#6c63ff', info: '#3b82f6', warning: '#f59e0b', important: '#ef4444' }
            const color = colors[node.calloutType ?? 'tip']
            return (
              <div key={i} className="border-l-4 pl-6 py-2" style={{ borderColor: color }}>
                <p className="leading-relaxed" style={{ color, fontSize: bodySize }}>{node.text}</p>
              </div>
            )
          case 'divider':
            return <hr key={i} className="border-white/10" />
          default:
            return null
        }
      })}
    </div>
  )
}

// ─── Main projector page ──────────────────────────────────────────────────────
export default function ProjectorPage() {
  const { batchSessionId } = useParams<{ batchSessionId: string }>()
  const { projectorFontSize } = useUIStore()

  const [session, setSession] = useState<Session | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [sessionComplete, setSessionComplete] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const channelRef = useRef<BroadcastChannel | null>(null)

  const titleSize = projectorFontSize === 'massive' ? '56px' : projectorFontSize === 'xlarge' ? '48px' : '36px'

  useEffect(() => {
    async function load() {
      const bs = await db.batch_sessions.get(batchSessionId)
      if (!bs) return
      const sess = await db.sessions.get(bs.session_id)
      if (!sess) return
      const blks = await db.blocks.where('session_id').equals(bs.session_id).sortBy('order_index')
      setSession(sess)
      setBlocks(blks)
      if (blks.length > 0) setSecondsLeft(blks[0].duration_minutes * 60)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchSessionId])

  // BroadcastChannel — receive block changes from trainer
  useEffect(() => {
    try {
      const channel = new BroadcastChannel('codeshala-session')
      channelRef.current = channel
      channel.onmessage = (event) => {
        if (event.data.type === 'BLOCK_CHANGE' && event.data.batchSessionId === batchSessionId) {
          setCurrentIndex(event.data.blockIndex as number)
        }
        if (event.data.type === 'SESSION_COMPLETE') {
          setSessionComplete(true)
        }
      }
      return () => channel.close()
    } catch { /* BroadcastChannel not supported */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchSessionId])

  // Reset timer when block changes
  useEffect(() => {
    if (blocks[currentIndex]) {
      setSecondsLeft(blocks[currentIndex].duration_minutes * 60)
    }
  }, [currentIndex, blocks])

  // Countdown timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [currentIndex])

  const currentBlock = blocks[currentIndex]
  const timerColor = getTimerRingColor(secondsLeft)

  if (sessionComplete) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="font-sora font-bold text-4xl mb-3">Session Complete!</h1>
        <p className="text-xl text-[#888]">Great work today, everyone.</p>
      </div>
    )
  }

  if (!session || !currentBlock) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#6c63ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const blockTypeLabels: Record<string, string> = {
    intro: 'INTRO', concept: 'CONCEPT', demo: 'DEMO',
    activity: 'ACTIVITY', quiz: 'QUIZ', faq: 'FAQ', wrapup: 'WRAP-UP'
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] text-white flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[#888] text-lg">
            Day {session.session_number} · Block {currentIndex + 1} of {blocks.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#6c63ff]/20 text-[#6c63ff] text-sm font-medium border border-[#6c63ff]/30">
            {blockTypeLabels[currentBlock.block_type] ?? currentBlock.block_type.toUpperCase()}
          </span>
        </div>
        {/* Dot progress */}
        <div className="flex items-center gap-2">
          {blocks.map((_, i) => (
            <span key={i} className={`inline-block rounded-full transition-all ${
              i < currentIndex ? 'w-2 h-2 bg-[#6c63ff]' :
              i === currentIndex ? 'w-3 h-3 bg-white' : 'w-2 h-2 bg-[#333]'
            }`} />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-12 py-8 overflow-y-auto">
        <h1 className="font-sora font-bold uppercase tracking-wide mb-8 leading-tight" style={{ fontSize: titleSize }}>
          {currentBlock.title}
        </h1>
        <ProjectorContent block={currentBlock} fontSize={projectorFontSize} />
      </div>

      {/* Footer: timer + controls */}
      <div className="flex items-center justify-between px-8 pb-6 pt-4 border-t border-[#1a1a1a]">
        <div className="font-mono text-3xl font-bold" style={{ color: timerColor }}>
          [{formatTime(secondsLeft)}]
        </div>
        <div className="flex items-center gap-6 text-[#555]">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-lg hover:text-white disabled:opacity-20 transition-colors min-h-[48px] px-3"
          >
            <ArrowLeft className="w-5 h-5" /> Prev
          </button>
          <span className="text-[#333] text-lg">{currentIndex + 1}/{blocks.length}</span>
          <button
            onClick={() => setCurrentIndex(Math.min(blocks.length - 1, currentIndex + 1))}
            disabled={currentIndex === blocks.length - 1}
            className="flex items-center gap-2 text-lg hover:text-white disabled:opacity-20 transition-colors min-h-[48px] px-3"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
