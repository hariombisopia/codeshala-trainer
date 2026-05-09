import Dexie, { type Table } from 'dexie'
import type {
  Batch,
  Student,
  CurriculumLevel,
  Session,
  Block,
  BatchSession,
  BlockProgress,
  Attendance,
  SessionNote,
} from './types'

export class CodeShalaDB extends Dexie {
  batches!: Table<Batch>
  students!: Table<Student>
  curriculum_levels!: Table<CurriculumLevel>
  sessions!: Table<Session>
  blocks!: Table<Block>
  batch_sessions!: Table<BatchSession>
  block_progress!: Table<BlockProgress>
  attendance!: Table<Attendance>
  session_notes!: Table<SessionNote>

  constructor() {
    super('CodeShalaDB')

    this.version(1).stores({
      batches: 'id, status, created_at',
      students: 'id, batch_id, status',
      curriculum_levels: 'id, code, order_index',
      sessions: 'id, level_id, order_index, session_number',
      steps: 'id, session_id, order_index',
      batch_sessions: 'id, batch_id, session_id, status, scheduled_date',
      step_progress: 'id, batch_session_id, step_id, status',
      attendance: 'id, batch_session_id, student_id',
      session_notes: 'id, batch_session_id, created_at',
    })

    this.version(2).stores({
      batches: 'id, status, created_at',
      students: 'id, batch_id, status',
      curriculum_levels: 'id, code, order_index',
      sessions: 'id, level_id, order_index, session_number',
      blocks: 'id, session_id, order_index, block_type',
      batch_sessions: 'id, batch_id, session_id, status, scheduled_date',
      block_progress: 'id, batch_session_id, block_id, status',
      attendance: 'id, batch_session_id, student_id',
      session_notes: 'id, batch_session_id, created_at',
    })
  }
}

export const db = new CodeShalaDB()
