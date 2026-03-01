import { MOCK_SCANS, VERDICT_STYLES } from '@/lib/constants'

// Produce emoji mapped to a large display size for the card thumbnail
// When real Supabase image URLs are available, swap emoji for <img src={scan.image_url} />
export default function ScanGrid() {
  return (
    <section id="recent" className="section">
      <div className="section-head">
        <h2 className="section-title">Recent Scans</h2>
        <a href="/history" className="section-link">View all →</a>
      </div>

      <div className="scan-grid">
        {MOCK_SCANS.slice(0, 3).map(s => {
          const styles = VERDICT_STYLES[s.verdict]
          return (
            <div key={s.name} className="scan-card">

              {/* Thumbnail — colored bg + large emoji (swap for <img> when using real data) */}
              <div className={`scan-card-thumb ${styles.bg}`}>
                <span className="scan-card-emoji">{s.emoji}</span>
              </div>

              {/* Body */}
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
  )
}