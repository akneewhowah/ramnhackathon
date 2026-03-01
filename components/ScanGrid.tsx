'use client'

import { useState } from 'react'
import { MOCK_SCANS, VERDICT_STYLES } from '@/lib/constants'
import HistoryModal from './HistoryModal'

export default function ScanGrid() {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <>
      <section id="recent" className="section">
        <div className="section-head">
          <h2 className="section-title">Recent Scans</h2>
          <button className="section-link" onClick={() => setShowHistory(true)}>
            View all →
          </button>
        </div>

        <div className="scan-grid">
          {MOCK_SCANS.slice(0, 3).map(s => {
            const styles = VERDICT_STYLES[s.verdict]
            return (
              <div key={s.name} className="scan-card">
                <div className={`scan-card-thumb ${styles.bg}`}>
                  <span className="scan-card-emoji">{s.emoji}</span>
                </div>
                <div className="scan-card-body">
                  <div className="scan-card-row">
                    <span className="scan-card-name">{s.name}</span>
                    <span className="scan-card-conf">{Math.round(s.confidence * 100)}%</span>
                  </div>
                  <p className="scan-card-date">Scanned {s.date}</p>
                  <span className={`verdict-pill ${styles.pill}`}>
                    <span className="verdict-pill-dot" />
                    {s.verdict}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
    </>
  )
}