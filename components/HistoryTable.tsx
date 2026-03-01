'use client'

import { useEffect, useState } from 'react'
import { PRODUCE_TYPES, VERDICT_STYLES } from '@/lib/constants'
import type { Scan } from '@/lib/types'

export default function HistoryTable() {
  const [TABLE_SCANS, setTABLE_SCANS] = useState<Scan[]>([])

  useEffect(() => {
    async function fetchScans() {
      const res = await fetch('/api/recent') // or /api/scans for full history
      const data = await res.json()

      const mapped: Scan[] = data.map((row: any, index: number) => ({
        uuid: row.id ?? index,
        name: row.produce_type,
        verdict: row.verdict,
        confidence: row.confidence,
        date: new Date(row.created_at).toLocaleDateString(),
      }))

      setTABLE_SCANS(mapped)
    }

    fetchScans()

    // 🔥 auto-refresh when new scan created
    function handleNewScan() {
      fetchScans()
    }

    window.addEventListener('scanCreated', handleNewScan)

    return () => {
      window.removeEventListener('scanCreated', handleNewScan)
    }
  }, [])

  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">Produce History</h2>
        <button className="btn-ghost-sm">Export</button>
      </div>

      <div className="table-wrap">

        {/* header */}
        <div className="table-row table-header">
          <span />
          <span>Item</span>
          <span>Date</span>
          <span>Verdict</span>
          <span>Confidence</span>
          <span />
        </div>

        {/* rows */}
        {TABLE_SCANS.map((s, i) => {
          const styles =
            VERDICT_STYLES[s.verdict] ?? VERDICT_STYLES.UNSURE

          const emoji =
            PRODUCE_TYPES.find(
              p => p.label.toLowerCase() === s.name?.toLowerCase()
            )?.emoji ?? '🌽'

          return (
            <div key={s.uuid} className="table-row">
              <div className={`table-thumb ${styles.bg}`}>
                {emoji}
              </div>

              <div>
                <p className="table-name">{s.name}</p>
                <p className="table-sub">
                  Scan #{String(i + 1).padStart(4, '0')}
                </p>
              </div>

              <p className="table-date">{s.date}</p>

              <span className={`verdict-pill ${styles.pill}`}>
                <span className="verdict-pill-dot" />
                {s.verdict}
              </span>

              <p className={`table-conf ${styles.text}`}>
                {Math.round(s.confidence * 100)}%
              </p>

              <button className="table-btn">→</button>
            </div>
          )
        })}

      </div>
    </section>
  )
}