'use client'

import { useEffect } from 'react'
import { seedCurriculum } from '@/lib/seed'

export function SeedProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    seedCurriculum().catch(console.error)
  }, [])

  return <>{children}</>
}
