'use client'

import { useRef, useState } from 'react'

import Nav           from '@/components/Nav'
import Hero          from '@/components/Hero'
import UploadCard    from '@/components/UploadCard'
import ResultCard    from '@/components/ResultCard'
import StatsRow      from '@/components/StatsRow'
import ScanGrid      from '@/components/ScanGrid'
import HistoryTable  from '@/components/HistoryTable'
import DonateBanner  from '@/components/DonateBanner'

import type { ScanResult } from '@/lib/types'

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null)

  const [result,      setResult]      = useState<ScanResult | null>(null)
  const [produceType, setProduceType] = useState('Carrot')
  const [loading,     setLoading]     = useState(false)

  function handleNewScan() {
    setResult(null)
    fileRef.current?.click()
  }

  return (
    <div className="app-shell">

      <Nav onNewScan={handleNewScan} />

      <main className="main-content">

        {/* upload card + left side */}
        <section className="hero-section">
          <Hero onUploadClick={() => fileRef.current?.click()} />
          <UploadCard
            fileRef={fileRef}
            onResult={(data) => {
              setResult(data as ScanResult)
              setProduceType(produceType)
            }}
            onLoading={setLoading}
          />
        </section>

        {/* result shows after scan*/}
        {loading && (
          <div className="result-loading">
            <p>Produce Analyzing...</p>
          </div>
        )}
        {result && !loading && (
          <ResultCard result={result} produceType={produceType} />
        )}

        <StatsRow />
        <ScanGrid />
        <HistoryTable />
        <DonateBanner />

      </main>

      <footer className="footer">
        <span>© 2026 freshfind </span>
        <div className="footer-links">
          <a href="https://github.com/akneewhowah/ramnhackathon" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>

    </div>
  )
}