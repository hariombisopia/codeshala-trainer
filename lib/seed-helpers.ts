import type { Block, ContentNode, QuizData, ActivityData, FAQItem, BlockType } from './types'

export function generateId(): string {
  return crypto.randomUUID()
}

// ─── Block builder helpers ────────────────────────────────────────────────────

export function makeBlock(
  sessionId: string,
  orderIndex: number,
  blockType: BlockType,
  title: string,
  content: ContentNode[],
  trainerNotes: string,
  durationMinutes: number,
  extra?: {
    quiz_data?: QuizData
    activity_data?: ActivityData
    faq_items?: FAQItem[]
  }
): Block {
  return {
    id: generateId(),
    session_id: sessionId,
    block_type: blockType,
    order_index: orderIndex,
    title,
    content,
    trainer_notes: trainerNotes,
    duration_minutes: durationMinutes,
    quiz_data: extra?.quiz_data,
    activity_data: extra?.activity_data,
    faq_items: extra?.faq_items,
    created_at: new Date().toISOString(),
  }
}

export function p(text: string): ContentNode {
  return { type: 'paragraph', text }
}

export function h(text: string): ContentNode {
  return { type: 'heading', text }
}

export function bullets(items: string[]): ContentNode {
  return { type: 'bullet_list', items }
}

export function numbered(items: string[]): ContentNode {
  return { type: 'numbered_list', items }
}

export function code(text: string, language = 'text'): ContentNode {
  return { type: 'code_block', text, language }
}

export function callout(text: string, calloutType: ContentNode['calloutType'] = 'tip'): ContentNode {
  return { type: 'callout', text, calloutType }
}

export function divider(): ContentNode {
  return { type: 'divider' }
}

export function mcq(
  question: string,
  options: { text: string; correct?: boolean }[],
  explanation: string
): QuizData {
  return {
    question,
    type: 'mcq',
    options: options.map((o) => ({ id: generateId(), text: o.text, isCorrect: !!o.correct })),
    explanation,
  }
}

export function trueFalse(question: string, answer: boolean, explanation: string): QuizData {
  return {
    question,
    type: 'truefalse',
    options: [
      { id: generateId(), text: 'True', isCorrect: answer },
      { id: generateId(), text: 'False', isCorrect: !answer },
    ],
    explanation,
  }
}

export function activity(
  title: string,
  instructions: string,
  duration: number,
  facilitatorNotes: string,
  expectedOutcome: string
): ActivityData {
  return {
    title,
    instructions,
    duration_minutes: duration,
    facilitator_notes: facilitatorNotes,
    expected_outcome: expectedOutcome,
  }
}

export function faqs(items: { q: string; a: string }[]): FAQItem[] {
  return items.map((item) => ({ id: generateId(), question: item.q, answer: item.a }))
}
