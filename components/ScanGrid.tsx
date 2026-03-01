import { MOCK_SCANS, VERDICT_STYLES } from '@/lib/constants'

export default function ScanGrid() {
  return (
    <section id="recent" className="section">
      <div className="section-head">
        <h2 className="section-title">Recent Scans</h2>
        <a href="/history" className="section-link">View all</a>
      </div>

      <div className="scan-grid">
        {MOCK_SCANS.map(s => {
          const styles = VERDICT_STYLES[s.verdict]
          return (
            <div key={s.uuid} className="scan-card">
              <div className={`scan-card-thumb ${styles.bg}`}>
                {s.emoji}
              </div>
              <div className="scan-card-body">
                <div className="scan-card-name">
                  {s.name}
                  <span className="scan-card-conf">
                    {Math.round(s.confidence * 100)}%
                  </span>
                </div>
                <p className="scan-card-date">{s.date}</p>
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