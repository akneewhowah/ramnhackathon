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
  scanNumber: number
  explanation: string
  suggestion: string
  imageUrl: string
}

export default function ScanGrid() {
  const [scans, setScans] = useState<Scan[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const selectedScan =
    selectedIndex !== null ? scans[selectedIndex] : null

  const fetchRecent = useCallback(async () => {
    try {
      const res = await fetch('/api/recent')
      const data = await res.json()

      const mapped: Scan[] = data.map((row: any, index: number) => ({
        uuid: row.id ?? index,
        name: row.produce_type,
        scanNumber: row.scan_number,
        verdict: row.verdict as Verdict,
        confidence: row.confidence,
        date: new Date(row.created_at).toLocaleDateString(),
        explanation: row.explanation || '',
        suggestion: row.suggestion || '',
        imageUrl: row.image_url,
      }))

      setScans(mapped)
    } catch (err) {
      console.error('Failed to fetch recent scans', err)
    }
  }, [])

  useEffect(() => {
    fetchRecent()
    window.addEventListener('scanCreated', fetchRecent)
    return () =>
      window.removeEventListener('scanCreated', fetchRecent)
  }, [fetchRecent])

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

        <div className="scan-grid">
          {scans.slice(0, 3).map((scan, index) => (
            <ScanCard
              key={scan.uuid}
              scan={scan}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </section>

      {selectedScan && (
        <ScanDetailModal
          scan={selectedScan}
          onClose={() => setSelectedIndex(null)}
          onNext={() =>
            setSelectedIndex((prev) =>
              prev !== null ? (prev + 1) % scans.length : null
            )
          }
          onPrev={() =>
            setSelectedIndex((prev) =>
              prev !== null
                ? (prev - 1 + scans.length) % scans.length
                : null
            )
          }
        />
      )}

      {showHistory && (
        <HistoryModal onClose={() => setShowHistory(false)} />
      )}
    </>
  )
}

/* ===========================
   Scan Card (Emoji Version)
=========================== */

function ScanCard({
  scan,
  onClick,
}: {
  scan: Scan
  onClick: () => void
}) {
  const styles =
    VERDICT_STYLES[scan.verdict] ?? VERDICT_STYLES.UNSURE

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

/* ===========================
   Modal (Image Here Only)
=========================== */

function ScanDetailModal({
  scan,
  onClose,
  onNext,
  onPrev,
}: {
  scan: Scan
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  const styles =
    VERDICT_STYLES[scan.verdict] ?? VERDICT_STYLES.UNSURE

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-arrow modal-arrow-left"
          onClick={onPrev}
        >
          ←
        </button>

        <button
          className="modal-arrow modal-arrow-right"
          onClick={onNext}
        >
          →
        </button>

        <div className="modal-header">
          <div>
            <h2 className="modal-title">{scan.name}</h2>
            <p className="modal-sub">
              Scan #{String(scan.scanNumber).padStart(4, '0')} · {scan.date}
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">

          {/* IMAGE ONLY HERE */}
          <div className="modal-image-wrap">
            <img
              src={scan.imageUrl}
              alt={scan.name}
              className="modal-image"
            />
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
              {scan.explanation}
            </p>
          </div>

          <div className="analysis-block">
            <p className="analysis-title">✦ Gemini Suggestion</p>
            <p className="analysis-body">
              {scan.suggestion}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

/* Emoji helper */
function getEmoji(name: string) {
  return (
    PRODUCE_TYPES.find(
      (p) => p.label.toLowerCase() === name.toLowerCase()
    )?.emoji ?? '🌽'
  )
}