'use client'

import React from 'react'
import { useUIStore } from '@/store/uiStore'
import { User, Building2, Palette, Monitor, Bell, Volume2, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { db } from '@/lib/db'

export default function SettingsPage() {
  const {
    trainerName, setTrainerName,
    instituteName, setInstituteName,
    theme, setTheme,
    projectorFontSize, setProjectorFontSize,
    timerAlertsEnabled, setTimerAlertsEnabled,
    soundEnabled, setSoundEnabled,
  } = useUIStore()

  const handleExport = async () => {
    const students = await db.students.toArray()
    const batches = await db.batches.toArray()
    const batchSessions = await db.batch_sessions.toArray()

    const rows = students.map((s) => {
      const batch = batches.find((b) => b.id === s.batch_id)
      const sessions = batchSessions.filter((bs) => bs.batch_id === s.batch_id)
      const completed = sessions.filter((bs) => bs.status === 'completed').length
      return [s.name, s.phone ?? '', s.email ?? '', batch?.name ?? '', s.status, completed]
    })

    const csv = [
      ['Name', 'Phone', 'Email', 'Batch', 'Status', 'Sessions Completed'],
      ...rows,
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `codeshala-students-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="font-sora text-2xl font-bold text-[#f5f5f5] mb-6">Settings</h1>

      <div className="space-y-4">
        {/* Trainer Name */}
        <SettingRow icon={User} label="Trainer Name">
          <input
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#f5f5f5] text-sm focus:border-accent focus:outline-none w-40 text-right"
          />
        </SettingRow>

        {/* Institute Name */}
        <SettingRow icon={Building2} label="Institute Name">
          <input
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#f5f5f5] text-sm focus:border-accent focus:outline-none w-40 text-right"
          />
        </SettingRow>

        {/* Theme */}
        <SettingRow icon={Palette} label="Theme">
          <div className="flex gap-1">
            {(['dark', 'light', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors',
                  theme === t ? 'bg-accent text-white' : 'bg-[#2a2a2a] text-[#888]'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </SettingRow>

        {/* Projector Font Size */}
        <SettingRow icon={Monitor} label="Projector Font">
          <div className="flex gap-1">
            {([
              { key: 'large', label: 'L' },
              { key: 'xlarge', label: 'XL' },
              { key: 'massive', label: 'XXL' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setProjectorFontSize(key)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  projectorFontSize === key ? 'bg-accent text-white' : 'bg-[#2a2a2a] text-[#888]'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </SettingRow>

        {/* Timer Alerts */}
        <SettingRow icon={Bell} label="Timer Alerts">
          <Toggle value={timerAlertsEnabled} onChange={setTimerAlertsEnabled} />
        </SettingRow>

        {/* Sound */}
        <SettingRow icon={Volume2} label="Notification Sounds">
          <Toggle value={soundEnabled} onChange={setSoundEnabled} />
        </SettingRow>

        {/* Export */}
        <button
          onClick={handleExport}
          className="w-full flex items-center gap-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 text-left hover:border-accent/50 transition-colors min-h-[56px]"
        >
          <Download className="w-5 h-5 text-info shrink-0" />
          <div>
            <p className="text-sm font-medium text-[#f5f5f5]">Export Data</p>
            <p className="text-xs text-[#888]">Download students & progress as CSV</p>
          </div>
        </button>

        {/* App Info */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 text-center">
          <p className="font-sora font-bold text-[#f5f5f5]">CodeShala Trainer</p>
          <p className="text-xs text-[#888] mt-1">v1.0.0 · Offline-First PWA</p>
          <p className="text-xs text-[#888]">CodeShala Coaching Institute, Indore</p>
        </div>
      </div>
    </div>
  )
}

function SettingRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-3 min-h-[56px]">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#888]" />
        <span className="text-sm font-medium text-[#f5f5f5]">{label}</span>
      </div>
      {children}
    </div>
  )
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        'relative w-12 h-6 rounded-full transition-colors',
        value ? 'bg-accent' : 'bg-[#2a2a2a]'
      )}
    >
      <span
        className={cn(
          'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
          value ? 'translate-x-7' : 'translate-x-1'
        )}
      />
    </button>
  )
}
