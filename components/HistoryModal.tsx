'use client'
import { useEffect, useState } from 'react'
import { VERDICT_LABEL, VERDICT_STYLES } from '@/lib/constants'
import type { Verdict } from '@/lib/types'

type Scan = {
  emoji:       string
  name:        string
  verdict:     Verdict
  confidence:  number
  date:        string
  id:          string
  explanation: string
}

const TABLE_SCANS = [
  { emoji: '🥕', name: 'Carrot',      verdict: 'GOOD'   as const, confidence: 0.99, date: 'Feb 28, 2026', id: '0070', explanation: '' },
  { emoji: '🍊', name: 'Orange',      verdict: 'UNSURE' as const, confidence: 0.71, date: 'Feb 27, 2026', id: '0069', explanation: '' },
  { emoji: '🍅', name: 'Tomato',      verdict: 'BAD'    as const, confidence: 0.88, date: 'Feb 25, 2026', id: '0068', explanation: '' },
  { emoji: '🥕', name: 'Carrot',      verdict: 'GOOD'   as const, confidence: 0.97, date: 'Feb 24, 2026', id: '0067', explanation: '' },
  { emoji: '🥦', name: 'Broccoli',    verdict: 'GOOD'   as const, confidence: 0.94, date: 'Feb 23, 2026', id: '0066', explanation: '' },
  { emoji: '🍅', name: 'Tomato',      verdict: 'GOOD'   as const, confidence: 0.91, date: 'Feb 21, 2026', id: '0065', explanation: '' },
  { emoji: '🥕', name: 'Carrot',      verdict: 'GOOD'   as const, confidence: 0.90, date: 'Feb 21, 2026', id: '0064', explanation: '' },
  { emoji: '🥬', name: 'Lettuce',     verdict: 'BAD'    as const, confidence: 0.85, date: 'Feb 20, 2026', id: '0063', explanation: '' },
    { emoji: '🍊', name: 'Orange',      verdict: 'UNSURE' as const, confidence: 0.65, date: 'Feb 19, 2026', id: '0062', explanation: '' },
    { emoji: '🍅', name: 'Tomato',      verdict: 'BAD'    as const, confidence: 0.80, date: 'Feb 18, 2026', id: '0061', explanation: '' },

]


interface HistoryModalProps { onClose: () => void }

export default function HistoryModal({ onClose }: HistoryModalProps) {
  const [selected, setSelected] = useState<Scan | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') selected ? setSelected(null) : onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, selected])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="modal-backdrop" onClick={() => selected ? setSelected(null) : onClose()}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>

        {/* header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Produce History</h2>
            <p className="modal-sub">{TABLE_SCANS.length} scans recorded</p>
          </div>
          <div className="modal-header-right">
            <button className="btn-ghost-sm">Export CSV</button>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-inner">

          {/* table */}
          <div className="modal-body">
            <div className="modal-table-header">
              <span />
              <span>Item</span>
              <span>Date</span>
              <span>Verdict</span>
              <span>Confidence</span>
              <span />
            </div>

            {TABLE_SCANS.map((s) => {
              const styles = VERDICT_STYLES[s.verdict]
              const isSelected = selected?.id === s.id
              return (
                <div
                  key={s.id}
                  className={`modal-table-row ${isSelected ? 'modal-row-active' : ''}`}
                  onClick={() => setSelected(isSelected ? null : s)}
                >
                  <div className={`modal-thumb ${styles.bg}`}>{s.emoji}</div>

                  <div>
                    <p className="table-name">{s.name}</p>
                    <p className="table-sub">Scan #{s.id}</p>
                  </div>
                  <p className="table-date">{s.date}</p>
                  <span className={`verdict-pill ${styles.pill}`}>
                    <span className="verdict-pill-dot" />{VERDICT_LABEL[s.verdict]}
                  </span>
                  <p className={`table-conf ${styles.text}`}>
                    {Math.round(s.confidence * 100)}%
                  </p>
                  <button
                    className={`table-btn ${isSelected ? 'table-btn-active' : ''}`}
                    onClick={e => { e.stopPropagation(); setSelected(isSelected ? null : s) }}
                  >→</button>
                </div>
              )
            })}
          </div>

          {/* detail panel */}
          {selected && (
            <div className="detail-panel">
              <div className="detail-panel-header">
                <div className={`detail-thumb-lg ${VERDICT_STYLES[selected.verdict].bg}`}>
                  {selected.emoji}
                </div>
                <div>
                  <h3 className="detail-name">{selected.name}</h3>
                  <p className="detail-id">Scan #{selected.id} · {selected.date}</p>
                </div>
              </div>

              {/* verdict and confidence */}
              <div className="detail-row">
                <span className={`verdict-pill ${VERDICT_STYLES[selected.verdict].pill}`}>
                  <span className="verdict-pill-dot" />{selected.verdict}
                </span>
                <span className={`detail-conf ${VERDICT_STYLES[selected.verdict].text}`}>
                  {Math.round(selected.confidence * 100)}%
                </span>
              </div>

              <div className="detail-divider" />

              {/* gemini explanation */}
              <div className="detail-section">
                <p className="detail-section-label">✦ Gemini Analysis</p>
                <p className="detail-section-body">
                  {selected.explanation ||
                    'no gemini analysis yet *add gemini funcitionality'}
                </p>
              </div>

              <div className="detail-divider" />

              <div className="detail-section">
                <p className="detail-section-label">Storage Info</p>
                <p className="detail-section-body">
                  Storage recommendations (also add more info on how long they can usually last for) for {selected.name.toLowerCase()} added after produce database
                </p>
              </div>

              <div className="detail-divider" />

              {/* grade */}
              <div className="detail-section">
                <p className="detail-section-label"> Grade</p>
                <div className="detail-grade-row">
                  {selected.verdict === 'GOOD' && (
                    <div className="detail-grade grade-a">
                      <span className="detail-grade-letter">A</span>
                      <span className="detail-grade-desc">Suitable for consumption</span>
                    </div>
                  )}
                  {selected.verdict === 'UNSURE' && (
                    <div className="detail-grade grade-l">
                      <span className="detail-grade-letter">L</span>
                      <span className="detail-grade-desc">Livestock grade: check with coordinator</span>
                    </div>
                  )}
                  {selected.verdict === 'BAD' && (
                    <div className="detail-grade grade-c">
                      <span className="detail-grade-letter">C</span>
                      <span className="detail-grade-desc">Compost: not suitable for consumption</span>
                    </div>
                  )}
                </div>
              </div>

              {/* dono nudge */}
              {selected.verdict !== 'GOOD' && (
                <a
                  href="https://flowercitypickers.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-donate"
                >
                  🌿 Donate to Flower City Pickers →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}