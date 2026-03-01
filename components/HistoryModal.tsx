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
  scanNumber: number
  explanation: string
  suggestion: string
}

interface HistoryModalProps { onClose: () => void }

export default function HistoryModal({ onClose }: HistoryModalProps) {
  const [SCANS, setSCANS] = useState<Scan[]>([])
  const [selected, setSelected] = useState<Scan | null>(null)

  useEffect(() => {
    async function fetchAll() {
      const res = await fetch('/api/scanned')
      const data = await res.json()

      const mapped: Scan[] = data.map((row: any, index: number) => ({
        uuid: row.id ?? index,
        name: row.produce_type,
        verdict: row.verdict,
        scanNumber: row.scan_number,
        confidence: row.confidence,
        date: new Date(row.created_at).toLocaleDateString(),
        explanation: row.explanation || '',
        suggestion: row.suggestion || '',
      }))

      setSCANS(mapped)
    }

    fetchAll()
    function handleNewScan() {
      fetchAll()
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
    <div className="modal-backdrop" onClick={() => selected ? setSelected(null) : onClose()}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <h2 className="modal-title">Produce History</h2>
            <p className="modal-sub">{SCANS.length} scans recorded</p>
          </div>
          <div className="modal-header-right">
            <button className="btn-ghost-sm">Export CSV</button>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-inner">

          <div className="modal-body">
            <div className="modal-table-header">
              <span />
              <span>Item</span>
              <span>Date</span>
              <span>Verdict</span>
              <span>Confidence</span>
              <span />
            </div>

            {SCANS.map((s) => {
              const styles =
                VERDICT_STYLES[s.verdict] ?? VERDICT_STYLES.UNSURE

              const isSelected = selected?.uuid === s.uuid

              return (
                <div
                  key={s.uuid}
                  className={`modal-table-row ${isSelected ? 'modal-row-active' : ''}`}
                  onClick={() => setSelected(isSelected ? null : s)}
                >
                  <div className={`modal-thumb ${styles.bg}`}>
                    {getEmoji(s.name)}
                  </div>

                  <div>
                    <p className="table-name">{s.name}</p>
                    <p className="table-sub">
                      Scan #{String(s.scanNumber).padStart(4, '0')}
                    </p>
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
                    onClick={e => {
                      e.stopPropagation()
                      setSelected(isSelected ? null : s)
                    }}
                  >
                    →
                  </button>
                </div>
              )
            })}
          </div>

          {selected && (
            <div className="detail-panel">
              <div className="detail-panel-header">
                <div className={`detail-thumb-lg ${VERDICT_STYLES[selected.verdict].bg}`}>
                  {getEmoji(selected.name)}
                </div>
                <div>
                  <h3 className="detail-name">{selected.name}</h3>
                  <p className="detail-id">
                    Scan #{String(selected.scanNumber).padStart(4, '0')} · {selected.date}
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <span className={`verdict-pill ${VERDICT_STYLES[selected.verdict].pill}`}>
                  <span className="verdict-pill-dot" />
                  {selected.verdict}
                </span>

                <span className={`detail-conf ${VERDICT_STYLES[selected.verdict].text}`}>
                  {Math.round(selected.confidence * 100)}%
                </span>
              </div>

              <div className="detail-divider" />

              <div className="detail-section">
                <p className="detail-section-label">✦ Gemini Analysis</p>
                <p className="detail-section-body">
                  {selected.explanation || 'No Gemini analysis available yet.'}
                </p>
              </div>
              <div className="detail-section">
                <p className="detail-section-label">✦ Suggestion</p>
                <p className="detail-section-body">
                  {selected.suggestion || 'No suggestion available yet.'}
                </p>
              </div>              
            </div>
          )}

        </div>
      </div>
    </div>
  )
}