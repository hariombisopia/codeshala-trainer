import { create } from 'zustand'
import type { Block, BlockProgress, Session } from '@/lib/types'

interface SessionState {
  batchSessionId: string | null
  session: Session | null
  blocks: Block[]
  blockProgress: BlockProgress[]
  currentBlockIndex: number
  quizRevealed: boolean

  initSession: (
    batchSessionId: string,
    session: Session,
    blocks: Block[],
    progress: BlockProgress[]
  ) => void
  setCurrentBlockIndex: (index: number) => void
  markBlockComplete: (blockId: string) => void
  setQuizRevealed: (revealed: boolean) => void
  resetSession: () => void
  broadcastBlockChange: (blockIndex: number) => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
  batchSessionId: null,
  session: null,
  blocks: [],
  blockProgress: [],
  currentBlockIndex: 0,
  quizRevealed: false,

  initSession: (batchSessionId, session, blocks, progress) => {
    const firstPendingIndex = blocks.findIndex((block) => {
      const p = progress.find((pr) => pr.block_id === block.id)
      return !p || p.status === 'pending'
    })
    set({
      batchSessionId,
      session,
      blocks,
      blockProgress: progress,
      currentBlockIndex: firstPendingIndex >= 0 ? firstPendingIndex : 0,
      quizRevealed: false,
    })
  },

  setCurrentBlockIndex: (index) => {
    set({ currentBlockIndex: index, quizRevealed: false })
    get().broadcastBlockChange(index)
  },

  markBlockComplete: (blockId) => {
    set((state) => {
      const existing = state.blockProgress.find((p) => p.block_id === blockId)
      if (existing) {
        return {
          blockProgress: state.blockProgress.map((p) =>
            p.block_id === blockId
              ? { ...p, status: 'completed', completed_at: new Date().toISOString() }
              : p
          ),
        }
      }
      return {
        blockProgress: [
          ...state.blockProgress,
          {
            id: crypto.randomUUID(),
            batch_session_id: state.batchSessionId!,
            block_id: blockId,
            status: 'completed' as const,
            completed_at: new Date().toISOString(),
          },
        ],
      }
    })
  },

  setQuizRevealed: (revealed) => set({ quizRevealed: revealed }),

  resetSession: () =>
    set({
      batchSessionId: null,
      session: null,
      blocks: [],
      blockProgress: [],
      currentBlockIndex: 0,
      quizRevealed: false,
    }),

  broadcastBlockChange: (blockIndex) => {
    if (typeof window === 'undefined') return
    try {
      const channel = new BroadcastChannel('codeshala-session')
      channel.postMessage({
        type: 'BLOCK_CHANGE',
        blockIndex,
        batchSessionId: get().batchSessionId,
      })
      channel.close()
    } catch {
      // BroadcastChannel not supported
    }
  },
}))
