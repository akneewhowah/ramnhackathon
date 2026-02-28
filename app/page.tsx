'use client'

import { useState } from 'react'

type Verdict = 'GOOD' | 'BAD' | 'UNSURE'

interface ScanResult {
  verdict:     Verdict
  confidence:  number
  explanation: string
}

export default function Home() {
  const [image, setImage]             = useState<File | null>(null)
  const [preview, setPreview]         = useState<string | null>(null)
  const [produceType, setProduceType] = useState('Carrot')
  const [result, setResult]           = useState<ScanResult | null>(null)
  const [loading, setLoading]         = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleScan() {
    if (!image) return
    setLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append('image', image)
    formData.append('produce_type', produceType)

    try {
      const res  = await fetch('/api/scan', { method: 'POST', body: formData })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-wrapper">
      <h1 className="page-title">VeggieCheck</h1>
      <p className="page-subtitle">Upload a photo to check if your produce is still good.</p>

      <div className="card">

        {/* File upload */}
        <div>
          <label className="form-label">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        {/* Preview */}
        {preview && (
          <img src={preview} alt="Preview" className="preview-img" />
        )}

        {/* Produce type */}
        <div>
          <label className="form-label">Produce Type</label>
          <select
            value={produceType}
            onChange={e => setProduceType(e.target.value)}
            className="form-select"
          >
            {['Carrot', 'Pepper', 'Broccoli', 'Lettuce', 'Tomato', 'Other'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          onClick={handleScan}
          disabled={!image || loading}
          className="btn-primary"
        >
          {loading ? 'Analyzing...' : 'Analyze Freshness'}
        </button>

      </div>

      {/* Result */}
      {result && (
        <div className="result-card">
          <p className="result-eyebrow">Result</p>
          <p className={`result-verdict verdict-${result.verdict}`}>{result.verdict}</p>
          <p className="result-confidence">Confidence: {result.confidence}%</p>
          {result.explanation && (
            <p className="result-explanation">{result.explanation}</p>
          )}
        </div>
      )}
    </main>
  )
}