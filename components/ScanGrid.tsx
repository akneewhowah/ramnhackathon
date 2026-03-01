'use client'

import { useEffect, useState, useCallback } from 'react'
import { PRODUCE_TYPES, VERDICT_LABEL, VERDICT_STYLES } from '@/lib/constants'
import type { Verdict } from '@/lib/types'
import HistoryModal from './HistoryModal'


type Scan = {
  uuid: number
  name: string
  verdict: Verdict
  confidence: number
  date: string
  explanation: string
}

export default function ScanGrid() {
  const [scans, setScans] = useState<Scan[]>([])
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const fetchRecent = useCallback(async () => {
    try {
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

      setScans(mapped)
    } catch (err) {
      console.error('Failed to fetch recent scans', err)
    }
  }, [])

  useEffect(() => {
    fetchRecent()

    const handleNewScan = () => fetchRecent()

    window.addEventListener('scanCreated', handleNewScan)
    return () => window.removeEventListener('scanCreated', handleNewScan)
  }, [fetchRecent])

  return (
    <>
      <section id="recent" className="section">
        <SectionHeader onViewAll={() => setShowHistory(true)} />

        <div className="scan-grid">
          {scans.slice(0, 3).map((scan) => (
            <ScanCard
              key={scan.uuid}
              scan={scan}
              onClick={() => setSelectedScan(scan)}
            />
          ))}
        </div>
      </section>

      {selectedScan && (
        <ScanDetailModal
          scan={selectedScan}
          onClose={() => setSelectedScan(null)}
        />
      )}

      {showHistory && (
        <HistoryModal onClose={() => setShowHistory(false)} />
      )}
    </>
  )
}

function SectionHeader({ onViewAll }: { onViewAll: () => void }) {
  return (
    <div className="section-head">
      <h2 className="section-title">Recent Scans</h2>
      <button className="section-link" onClick={onViewAll}>
        View all →
      </button>
    </div>
  )
}

function ScanCard({
  scan,
  onClick,
}: {
  scan: Scan
  onClick: () => void
}) {
  const styles = VERDICT_STYLES[scan.verdict] ?? VERDICT_STYLES.UNSURE

  return (
    <div className="scan-card" onClick={onClick}>
      <div className={`scan-card-thumb ${styles.bg}`}>
        <span className="scan-card-emoji">
          {getEmoji(scan.name)}
        </span>
      </div>

      <div className="scan-card-body">
        <div className="scan-card-row">
          <span className="scan-card-name">{scan.name}</span>
          <span className="scan-card-conf">
            {Math.round(scan.confidence * 100)}%
          </span>
        </div>

        <p className="scan-card-date">
          Scanned {scan.date}
        </p>

        <span className={`verdict-pill ${styles.pill}`}>
          <span className="verdict-pill-dot" />
          {VERDICT_LABEL[scan.verdict]}
        </span>
      </div>
    </div>
  )
}

function ScanDetailModal({
  scan,
  onClose,
}: {
  scan: Scan
  onClose: () => void
}) {
  const styles = VERDICT_STYLES[scan.verdict] ?? VERDICT_STYLES.UNSURE

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel vertical-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{scan.name}</h2>
            <p className="modal-sub">
              Scan #{String(scan.uuid).padStart(4, '0')} · {scan.date}
            </p>
          </div>

          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Vertical Layout */}
        <div className="modal-body">
          <div className="emoji-wrapper">
            <div className={`emoji-circle ${styles.bg}`}>
              <span className="emoji-lg">
                {getEmoji(scan.name)}
              </span>
            </div>
          </div>

          <div className="verdict-section">
            <span className={`verdict-pill ${styles.pill}`}>
              <span className="verdict-pill-dot" />
              {VERDICT_LABEL[scan.verdict]}
            </span>

            <p className={`confidence-big ${styles.text}`}>
              {Math.round(scan.confidence * 100)}%
            </p>
          </div>

          <div className="analysis-block">
            <p className="analysis-title">✦ Gemini Analysis</p>
            <p className="analysis-body">
              {scan.explanation ||
                'No Gemini analysis available yet.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function getEmoji(name: string) {
  return (
    PRODUCE_TYPES.find(
      (p) => p.label.toLowerCase() === name.toLowerCase()
    )?.emoji ?? '🌽'
  )
}