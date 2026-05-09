'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { generateId } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function AddStudentPage() {
  const { id: batchId } = useParams<{ id: string }>()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await db.students.add({
      id: generateId(),
      batch_id: batchId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      notes: data.notes,
      status: 'active',
      joined_at: new Date().toISOString(),
    })
    router.push(`/batches/${batchId}`)
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
        <h1 className="font-sora text-xl font-bold text-[#f5f5f5]">Add Student</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-1.5">Full Name</label>
          <input
            {...register('name')}
            placeholder="Student's full name"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f5f5f5] placeholder-[#888] focus:border-accent focus:outline-none min-h-[48px]"
          />
          {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-1.5">
            Phone Number <span className="text-[#888]">(optional)</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f5f5f5] placeholder-[#888] focus:border-accent focus:outline-none min-h-[48px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-1.5">
            Email <span className="text-[#888]">(optional)</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="student@email.com"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f5f5f5] placeholder-[#888] focus:border-accent focus:outline-none min-h-[48px]"
          />
          {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f5f5f5] mb-1.5">
            Notes <span className="text-[#888]">(optional)</span>
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            placeholder="Any notes about this student..."
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f5f5f5] placeholder-[#888] focus:border-accent focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white py-4 rounded-xl font-sora font-bold text-base min-h-[56px] disabled:opacity-50 hover:bg-accent/90 transition-colors"
        >
          {isSubmitting ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </div>
  )
}
