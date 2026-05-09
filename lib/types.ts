// ─── Block Types ──────────────────────────────────────────────────────────────

export type BlockType =
  | 'intro'
  | 'concept'
  | 'demo'
  | 'activity'
  | 'quiz'
  | 'faq'
  | 'wrapup'

// Content node types for rich text blocks
export type ContentNodeType =
  | 'paragraph'
  | 'heading'
  | 'bullet_list'
  | 'numbered_list'
  | 'code_block'
  | 'callout'
  | 'divider'

export interface ContentNode {
  type: ContentNodeType
  text?: string
  items?: string[]        // for bullet_list / numbered_list
  language?: string       // for code_block
  calloutType?: 'info' | 'warning' | 'tip' | 'important'
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizData {
  question: string
  options: QuizOption[]
  explanation: string     // shown after answer is revealed
  type: 'mcq' | 'truefalse' | 'open'
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export interface ActivityData {
  title: string
  instructions: string    // shown on projector
  duration_minutes: number
  facilitator_notes: string  // trainer only
  expected_outcome: string
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id: string
  question: string
  answer: string
}

// ─── Block ────────────────────────────────────────────────────────────────────

export interface Block {
  id: string
  session_id: string
  block_type: BlockType
  order_index: number
  title: string                    // shown as heading on projector

  // Projector-facing content
  content: ContentNode[]           // rich content nodes (concept, demo, intro, wrapup)

  // Block-type-specific data (stored as JSON)
  quiz_data?: QuizData             // for quiz blocks
  activity_data?: ActivityData     // for activity blocks
  faq_items?: FAQItem[]            // for faq blocks

  // Trainer-only
  trainer_notes: string            // private coaching notes
  duration_minutes: number

  created_at: string
}

// ─── Core Domain Types ────────────────────────────────────────────────────────

export interface Batch {
  id: string
  name: string
  description?: string
  level: string
  start_date: string
  end_date?: string
  status: 'active' | 'completed' | 'paused'
  max_students: number
  created_at: string
}

export interface Student {
  id: string
  batch_id: string
  name: string
  phone?: string
  email?: string
  notes?: string
  status: 'active' | 'completed' | 'dropped'
  joined_at: string
}

export interface CurriculumLevel {
  id: string
  code: string
  title: string
  description?: string
  order_index: number
  badge_color: 'green' | 'amber' | 'blue'
  total_sessions: number
  created_at: string
}

export interface Session {
  id: string
  level_id: string
  title: string
  description?: string
  session_number: number
  duration_minutes: number
  objectives: string[]
  tools_used: string[]
  outcome?: string
  order_index: number
  created_at: string
}

export interface BatchSession {
  id: string
  batch_id: string
  session_id: string
  scheduled_date?: string
  status: 'pending' | 'in_progress' | 'completed'
  conducted_at?: string
  trainer_notes?: string
  created_at: string
}

export interface BlockProgress {
  id: string
  batch_session_id: string
  block_id: string
  status: 'pending' | 'completed' | 'skipped'
  completed_at?: string
}

export interface Attendance {
  id: string
  batch_session_id: string
  student_id: string
  present: boolean
  created_at: string
}

export interface SessionNote {
  id: string
  batch_session_id: string
  content: string
  created_at: string
}

// ─── UI / Composite Types ─────────────────────────────────────────────────────

export interface BatchWithProgress extends Batch {
  total_sessions: number
  completed_sessions: number
  student_count: number
}

export interface SessionWithBlocks extends Session {
  blocks: Block[]
}
