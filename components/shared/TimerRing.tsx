'use client'

import { useEffect, useRef, useState } from 'react'
import { formatTime, getTimerRingColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface TimerRingProps {
  durationSeconds: number
  running?: boolean
  onComplete?: () => void
  size?: number
  className?: string
}

export function TimerRing({
  durationSeconds,
  running = false,
  onComplete,
  size = 80,
  className,
}: TimerRingProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setSecondsLeft(durationSeconds)
  }, [durationSeconds])

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, onComplete])

  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const progress = secondsLeft / durationSeconds
  const strokeDashoffset = circumference * (1 - progress)
  const color = getTimerRingColor(secondsLeft)

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth={4}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
      <span
        className="absolute text-xs font-mono font-bold"
        style={{ color }}
      >
        {formatTime(secondsLeft)}
      </span>
    </div>
  )
}
