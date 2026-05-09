'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  trainer_notes: z.string().optional(),
  duration_minutes: z.coerce.number().min(1).max(180),
})

type FormData = z.infer<typeof schema>

export default function EditBlockPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    db.blocks.get(id).then((block) => {
      if (!block) { router.push('/curriculum'); return }
      reset({
        title: block.title,
        trainer_notes: block.trainer_notes ?? '',
        duration_minutes: block.duration_minutes,
      })
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onSubmit = async (data: FormData) => {
    await db.blocks.update(id, {
      title: data.title,
      trainer_notes: data.trainer_notes ?? '',
      duration_minutes: data.duration_minutes,
    })
    router.push('/curriculum')
  }

  if (loading) {
    return (
      <div className="px-4 pt-6 space-y-4">
        {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-[#1a1a1a] rounded-xl animate-pulse" />)}
      </div>
    )
  }

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]"
        >
          <ArrowLeft className="w-5 h-5 text-[#f5f5f5]" />
        </button>
        <h1 className="font-sora text-xl font-bold text-[#f5f5f5]">Edit Block</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-1.5">Block Title</label>
          <input
            {...register('title')}
            placeholder="Short title shown on projector"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f5f5f5] placeholder-[#888] focus:border-accent focus:outline-none min-h-[48px]"
          />
          {errors.title && <p className="text-danger text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-1.5">
            Trainer Notes <span className="text-[#888]">(private — not shown on projector)</span>
          </label>
          <textarea
            {...register('trainer_notes')}
            rows={3}
            placeholder="Private coaching notes for this block..."
            className="w-full bg-warning/10 border border-warning/30 rounded-xl px-4 py-3 text-warning/90 placeholder-warning/40 focus:border-warning focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-1.5">Duration (minutes)</label>
          <input
            {...register('duration_minutes')}
            type="number"
            min={1}
            max={180}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f5f5f5] focus:border-accent focus:outline-none min-h-[48px]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white py-4 rounded-xl font-sora font-bold text-base min-h-[56px] disabled:opacity-50 hover:bg-accent/90 transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
