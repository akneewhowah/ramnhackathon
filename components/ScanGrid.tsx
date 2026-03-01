'use client'

import { useEffect, useState } from 'react'
import { PRODUCE_TYPES, VERDICT_LABEL, VERDICT_STYLES } from '@/lib/constants'
import type { Scan } from '@/lib/types'
import HistoryModal from './HistoryModal'

export default function ScanGrid() {
  const [SCANS, setSCANS] = useState<Scan[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    async function fetchRecent() {
      const res = await fetch('/api/recent') // should return newest scans
      const data = await res.json()

      const mapped: Scan[] = data.map((row: any, index: number) => ({
        uuid: row.id ?? index,
        name: row.produce_type,
        verdict: row.verdict,
        confidence: row.confidence,
        date: new Date(row.created_at).toLocaleDateString(),
      }))

      setSCANS(mapped)
    }

    fetchRecent()

    // 🔥 auto-refresh after new scan
    function handleNewScan() {
      fetchRecent()
    }

    window.addEventListener('scanCreated', handleNewScan)

    return () => {
      window.removeEventListener('scanCreated', handleNewScan)
    }
  }, [])

  return (
    <>
      <section id="recent" className="section">
        <div className="section-head">
          <h2 className="section-title">Recent Scans</h2>
          <button
            className="section-link"
            onClick={() => setShowHistory(true)}
          >
            View all →
          </button>
        </div>


        <button
            className="section-link"
            onClick={() => setShowHistory(true)}
        >
          <div className="scan-grid">
            {SCANS.slice(0, 3).map((s, i) => {
              const styles =
              VERDICT_STYLES[s.verdict] ?? VERDICT_STYLES['UNSURE']

              const emoji =
                PRODUCE_TYPES.find(
                  p => p.label.toLowerCase() === s.name?.toLowerCase()
                )?.emoji ?? '🌽'

              return (
                <div key={s.uuid} className="scan-card">
                  <div className={`scan-card-thumb ${styles.bg}`}>
                    <span className="scan-card-emoji">{emoji}</span>
                  </div>

                  <div className="scan-card-body">
                    <div className="scan-card-row">
                      <span className="scan-card-name">{s.name}</span>
                      <span className="scan-card-conf">
                        {Math.round(s.confidence * 100)}%
                      </span>
                    </div>

                    <p className="scan-card-date">
                      Scanned {s.date}
                    </p>

                    <span className={`verdict-pill ${styles.pill}`}>
                      <span className="verdict-pill-dot" />
                      {VERDICT_LABEL[s.verdict]}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </button>
      </section>

      {showHistory && (
        <HistoryModal onClose={() => setShowHistory(false)} />
      )}
    </>
  )
}