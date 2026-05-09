'use client'

import { useEffect, useState } from 'react'
import { Search, Plus, Trash2, FileText } from 'lucide-react'
import { db } from '@/lib/db'
import { generateId } from '@/lib/utils'
import type { SessionNote } from '@/lib/types'
import { format } from 'date-fns'

interface NoteWithContext extends SessionNote {
  sessionTitle?: string
  batchName?: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteWithContext[]>([])
  const [search, setSearch] = useState('')
  const [newNote, setNewNote] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [loading, setLoading] = useState(true)

  async function loadNotes() {
    const allNotes = await db.session_notes.orderBy('created_at').reverse().toArray()
    const allBatchSessions = await db.batch_sessions.toArray()
    const allSessions = await db.sessions.toArray()
    const allBatches = await db.batches.toArray()

    const withContext: NoteWithContext[] = allNotes.map((note) => {
      const bs = allBatchSessions.find((b) => b.id === note.batch_session_id)
      const session = bs ? allSessions.find((s) => s.id === bs.session_id) : undefined
      const batch = bs ? allBatches.find((b) => b.id === bs.batch_id) : undefined
      return {
        ...note,
        sessionTitle: session?.title,
        batchName: batch?.name,
      }
    })

    setNotes(withContext)
    setLoading(false)
  }

  useEffect(() => { loadNotes() }, [])

  const filtered = notes.filter((n) =>
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.sessionTitle?.toLowerCase().includes(search.toLowerCase()) ||
    n.batchName?.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddNote = async () => {
    if (!newNote.trim()) return
    // Add as a standalone note (no batch session)
    await db.session_notes.add({
      id: generateId(),
      batch_session_id: 'standalone',
      content: newNote.trim(),
      created_at: new Date().toISOString(),
    })
    setNewNote('')
    setAddingNote(false)
    loadNotes()
  }

  const handleDelete = async (id: string) => {
    await db.session_notes.delete(id)
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-sora text-2xl font-bold text-[#f5f5f5]">Notes</h1>
        <button
          onClick={() => setAddingNote(true)}
          className="flex items-center gap-1.5 bg-accent text-white px-3 py-2 rounded-xl text-sm font-medium min-h-[40px]"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-9 pr-4 py-3 text-[#f5f5f5] placeholder-[#888] focus:border-accent focus:outline-none min-h-[48px]"
        />
      </div>

      {/* Add Note Inline */}
      {addingNote && (
        <div className="bg-[#1a1a1a] border border-accent/30 rounded-2xl p-4 mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note..."
            rows={3}
            autoFocus
            className="w-full bg-transparent text-[#f5f5f5] placeholder-[#888] focus:outline-none resize-none text-sm"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddNote}
              className="flex-1 bg-accent text-white py-2 rounded-xl text-sm font-medium min-h-[40px]"
            >
              Save
            </button>
            <button
              onClick={() => { setAddingNote(false); setNewNote('') }}
              className="flex-1 bg-[#2a2a2a] text-[#888] py-2 rounded-xl text-sm min-h-[40px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-[#1a1a1a] rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-[#2a2a2a] mx-auto mb-3" />
          <p className="text-[#888] text-sm">
            {search ? 'No notes match your search' : 'No notes yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((note) => (
            <div key={note.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  {note.sessionTitle && (
                    <p className="text-xs text-accent font-medium truncate">{note.sessionTitle}</p>
                  )}
                  {note.batchName && (
                    <p className="text-xs text-[#888] truncate">{note.batchName}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#888]">
                    {format(new Date(note.created_at), 'dd MMM')}
                  </span>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-danger/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[#888] hover:text-danger" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#f5f5f5] leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
