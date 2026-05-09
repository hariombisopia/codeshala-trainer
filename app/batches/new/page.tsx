'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { generateId, scheduleDates } from '@/lib/utils'
import type { CurriculumLevel } from '@/lib/types'

const schema = z.object({
  name: z.string().min(1, 'Batch name is required'),
  level_id: z.string().min(1, 'Please select a curriculum level'),
  start_date: z.string().min(1, 'Start date is required'),
  max_students: z.coerce.number().min(1).max(100),
  description: z.string().optional(),
})

type FormData = {
  name: string
  level_id: string
  start_date: string
  max_students: number
  description?: string
}

export default function NewBatchPage() {
  const router = useRouter()
  const [levels, setLevels] = useState<CurriculumLevel[]>([])
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { max_students: 10 },
  })

  useEffect(() => {
    db.curriculum_levels.orderBy('order_index').toArray().then(setLevels)
  }, [])

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const level = levels.find((l) => l.id === data.level_id)
      const batchId = generateId()

      // Create batch
      await db.batches.add({
        id: batchId,
        name: data.name,
        description: data.description,
        level: level?.title ?? '',
        start_date: data.start_date,
        status: 'active',
        max_students: data.max_students,
        created_at: new Date().toISOString(),
      })

      // Get sessions for this level
      const sessions = await db.sessions
        .where('level_id')
        .equals(data.level_id)
        .sortBy('order_index')

      // Schedule batch sessions Mon–Sat
      const dates = scheduleDates(data.start_date, sessions.length)

      const batchSessions = sessions.map((session, i) => ({
        id: generateId(),
        batch_id: batchId,
        session_id: session.id,
        scheduled_date: dates[i],
        status: 'pending' as const,
        created_at: new Date().toISOString(),
      }))

      await db.batch_sessions.bulkAdd(batchSessions)

      router.push(`/batches/${batchId}`)
    } catch (err) {
      console.error(err)
      setSubmitting(false)
    }
  }

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f8f8f8] border border-[#e5e5e5]"
        >
          <ArrowLeft className="w-5 h-5 text-[#111111]" />
        </button>
        <h1 className="font-sora text-xl font-bold text-[#111111]">Create Batch</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Batch Name */}
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-1.5">Batch Name</label>
          <input
            {...register('name')}
            placeholder="e.g. Summer Crash Course — June 2025"
            className="w-full bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#111111] placeholder-[#999] focus:border-accent focus:outline-none min-h-[48px]"
          />
          {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Curriculum Level */}
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-1.5">Curriculum Level</label>
          <select
            {...register('level_id')}
            className="w-full bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#111111] focus:border-accent focus:outline-none min-h-[48px] appearance-none"
          >
            <option value="">Select a curriculum...</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.code} — {level.title} ({level.total_sessions} sessions)
              </option>
            ))}
          </select>
          {errors.level_id && <p className="text-danger text-xs mt-1">{errors.level_id.message}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-1.5">Start Date</label>
          <input
            {...register('start_date')}
            type="date"
            className="w-full bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#111111] focus:border-accent focus:outline-none min-h-[48px]"
          />
          {errors.start_date && <p className="text-danger text-xs mt-1">{errors.start_date.message}</p>}
        </div>

        {/* Max Students */}
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-1.5">Max Students</label>
          <input
            {...register('max_students')}
            type="number"
            min={1}
            max={100}
            className="w-full bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#111111] focus:border-accent focus:outline-none min-h-[48px]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-1.5">
            Description <span className="text-[#666]">(optional)</span>
          </label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Any notes about this batch..."
            className="w-full bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#111111] placeholder-[#999] focus:border-accent focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-accent text-white py-4 rounded-xl font-sora font-bold text-base min-h-[56px] disabled:opacity-50 hover:bg-accent/90 transition-colors"
        >
          {submitting ? 'Creating...' : 'Create Batch'}
        </button>
      </form>
    </div>
  )
}
