'use client'

import { useRef, useState } from 'react'
import { PRODUCE_TYPES } from '@/lib/constants'

interface UploadCardProps {
  onResult:  (result: { verdict: string; confidence: number; explanation: string }) => void
  onLoading: (loading: boolean) => void
  fileRef: React.RefObject<HTMLInputElement | null>
}

export default function UploadCard({ onResult, onLoading, fileRef }: UploadCardProps) {
  const [preview,     setPreview]     = useState<string | null>(null)
  const [image,       setImage]       = useState<File | null>(null)
  const [produceType, setProduceType] = useState('Carrot')
  const [loading,     setLoading]     = useState(false)
  const [isDragging,  setIsDragging]  = useState(false)

  function handleFile(file: File) {
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function clearPreview() {
    setPreview(null)
    setImage(null)
  }

  async function handleScan() {
    if (!image) return
    setLoading(true)
    onLoading(true)

    // Sends to /api/scan:
    //   image        → File (the uploaded image)
    //   produce_type → string (e.g. 'Carrot')
    //
    // Expects back:
    //   verdict      → 'GOOD' | 'BAD' | 'UNSURE'
    //   confidence   → number 0.0–1.0
    //   explanation  → string (Gemini-generated)
    const formData = new FormData()
    formData.append('image', image)
    formData.append('produce_type', produceType)

    try {
      const res  = await fetch('/api/scan', { method: 'POST', body: formData })
      const data = await res.json()
      onResult(data)
    } catch (err) {
      console.error(err)
      alert('Something went wrong — check your API connection.')
    } finally {
      setLoading(false)
      onLoading(false)
    }
  }

  return (
    <div className="upload-card">

      {/* header */}
      <div className="upload-card-header">
        <span className="upload-card-title">Scan Produce</span>
        <span className="ai-chip">✦ Gemini Ready</span>
      </div>

      {/* dropbox */}
      {!preview ? (
        <div
          className={`drop-zone ${isDragging ? 'drop-zone-active' : ''}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="drop-icon">🥦</div>
          <p className="drop-main">Drop your photo here</p>
          <p className="drop-sub">
            or <span className="drop-sub-link">click to browse</span> · JPG, PNG, WEBP, HEIC
          </p>
        </div>
      ) : (
        <div className="preview-wrap">
          <img src={preview} alt="Preview" className="preview-img" />
          <button className="preview-clear" onClick={clearPreview}>✕</button>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden-input"
        onChange={handleFileChange}
      />

      {/* produce */}
      <div className="type-section">
        <p className="type-label">select produce type</p>
        <div className="type-pills">
          {PRODUCE_TYPES.map(p => (
            <button
              key={p.label}
              onClick={() => setProduceType(p.label)}
              className={`type-pill ${produceType === p.label ? 'type-pill-active' : ''}`}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scan button */}
      <button
        onClick={handleScan}
        disabled={!image || loading}
        className="scan-btn"
      >
        {loading ? ' Analyzing...' : '🌿 Analyze Freshness'}
      </button>

    </div>
  )
}