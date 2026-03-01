'use client'

import { useEffect, useState } from 'react'
import { PRODUCE_TYPES, VERDICT_LABEL, VERDICT_STYLES } from '@/lib/constants'
import type { Verdict } from '@/lib/types'

type Scan = {
  uuid: number
  name: string
  verdict: Verdict
  confidence: number
  date: string
  explanation: string
}

export default function ScanGrid() {
  const [SCANS, setSCANS] = useState<Scan[]>([])
  const [selected, setSelected] = useState<Scan | null>(null)

  useEffect(() => {
    async function fetchRecent() {
      const res = await fetch('/api/recent')
      const data = await res.json()

      const mapped: Scan[] = data.map((row: any, index: number) => ({
        uuid: row.id ?? index,
        name: row.produce_type,
        verdict: row.verdict as Verdict,
        confidence: row.confidence,
        date: new Date(row.created_at).toLocaleDateString(),
        explanation: row.explanation || '',
      }))

      setSCANS(mapped)
    }

    fetchRecent()

    function handleNewScan() {
      fetchRecent()
    }

    window.addEventListener('scanCreated', handleNewScan)

    return () => {
      window.removeEventListener('scanCreated', handleNewScan)
    }
  }, [])

  function getEmoji(name: string) {
    return (
      PRODUCE_TYPES.find(
        p => p.label.toLowerCase() === name.toLowerCase()
      )?.emoji ?? '🌽'
    )
  }

  return (
    <>
      <section id="recent" className="section">
        <div className="section-head">
          <h2 className="section-title">Recent Scans</h2>
        </div>

<<<<<<< HEAD

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
=======
        <div className="scan-grid">
          {SCANS.slice(0, 3).map((s) => {
            const styles =
              VERDICT_STYLES[s.verdict] ?? VERDICT_STYLES.UNSURE

            return (
              <div
                key={s.uuid}
                className="scan-card"
                onClick={() => setSelected(s)}
              >
                <div className={`scan-card-thumb ${styles.bg}`}>
                  <span className="scan-card-emoji">
                    {getEmoji(s.name)}
                  </span>
                </div>
>>>>>>> 3e7dd9aaf04d346d7dedb4c5684e19863bcf4aaf

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

      {/* 🔥 Popup Styled Exactly Like HistoryModal */}
      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selected.name}</h2>
                <p className="modal-sub">
                  Scan #{String(selected.uuid).padStart(4, '0')} · {selected.date}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-inner">

              <div className="detail-panel">

                <div className="detail-panel-header">
                  <div
                    className={`detail-thumb-lg ${
                      VERDICT_STYLES[selected.verdict].bg
                    }`}
                  >
                    {getEmoji(selected.name)}
                  </div>
                </div>

                <div className="detail-row">
                  <span
                    className={`verdict-pill ${
                      VERDICT_STYLES[selected.verdict].pill
                    }`}
                  >
                    <span className="verdict-pill-dot" />
                    {VERDICT_LABEL[selected.verdict]}
                  </span>

                  <span
                    className={`detail-conf ${
                      VERDICT_STYLES[selected.verdict].text
                    }`}
                  >
                    {Math.round(selected.confidence * 100)}%
                  </span>
                </div>

                <div className="detail-divider" />

                <div className="detail-section">
                  <p className="detail-section-label">
                    ✦ Gemini Analysis
                  </p>
                  <p className="detail-section-body">
                    {selected.explanation ||
                      'No Gemini analysis available yet.'}
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}