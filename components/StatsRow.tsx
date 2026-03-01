'use client'

import { useEffect, useState } from 'react'

type Stats = {
  good: number | null
  goingBad: number | null
  bad: number | null
}

export default function StatsRow() {
  const [stats, setStats] = useState<Stats>({
    good: null,
    goingBad: null,
    bad: null,
  })

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch('/api/stats')
      const data = await res.json()

      setStats({
        good: data.good ?? 0,
        goingBad: data.goingBad ?? 0,
        bad: data.bad ?? 0,
      })
    }

    fetchStats()

    const handleNewScan = () => fetchStats()
    window.addEventListener('scanCreated', handleNewScan)

    return () =>
      window.removeEventListener('scanCreated', handleNewScan)
  }, [])

  const DISPLAY_STATS = [
    {
      icon: '🍏',
      bg: 'stat-icon-green',
      value: stats.good ?? '-',
      label: 'Items confirmed fresh',
    },
    {
      icon: '♻️',
      bg: 'stat-icon-butter',
      value: stats.goingBad ?? '-',
      label: 'Items prevented from waste',
    },
    {
      icon: '🌱',
      bg: 'stat-icon-pink',
      value: stats.bad ?? '-',
      label: 'Items used for compost',
    },
  ]

  return (
    <div className="stats-section">
      {DISPLAY_STATS.map(s => (
        <div key={s.label} className="stat-card">
          <div className={`stat-icon-wrap ${s.bg}`}>
            {s.icon}
          </div>
          <p className="stat-value">{s.value}</p>
          <p className="stat-label">{s.label}</p>
        </div>
      ))}
    </div>
  )
}