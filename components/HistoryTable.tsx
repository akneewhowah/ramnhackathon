import { MOCK_SCANS, VERDICT_STYLES } from '@/lib/constants'

const TABLE_SCANS = [
  { emoji: '🥕', name: 'Carrot',    verdict: 'GOOD'   as const, confidence: 0.99, date: 'Feb 28, 2026', id: '0070' },
  { emoji: '🍊', name: 'Orange', verdict: 'UNSURE' as const, confidence: 0.71, date: 'Feb 27, 2026', id: '0069' },
  { emoji: '🍅', name: 'Tomato',      verdict: 'BAD'    as const, confidence: 0.88, date: 'Feb 25, 2026', id: '0068' },
  { emoji: '🥕', name: 'Carrot',      verdict: 'GOOD'   as const, confidence: 0.97, date: 'Feb 24, 2026', id: '0067' },
]

export default function HistoryTable() {
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">Produce History</h2>
        <button className="btn-ghost-sm">Export</button>
      </div>

      <div className="table-wrap">

        {/* header */}
        <div className="table-row table-header">
          <span />
          <span>Item</span>
          <span>Date</span>
          <span>Verdict</span>
          <span>Confidence</span>
          <span />
        </div>

        {/* rows */}
        {TABLE_SCANS.map((s) => {
          const styles = VERDICT_STYLES[s.verdict]
          return (
            <div key={s.id} className="table-row">
              <div className={`table-thumb ${styles.bg}`}>{s.emoji}</div>
              <div>
                <p className="table-name">{s.name}</p>
                <p className="table-sub">Scan #{s.id}</p>
              </div>
              <p className="table-date">{s.date}</p>
              <span className={`verdict-pill ${styles.pill}`}>
                <span className="verdict-pill-dot" />
                {s.verdict}
              </span>
              <p className={`table-conf ${styles.text}`}>
                {Math.round(s.confidence * 100)}%
              </p>
              <button className="table-btn">→</button>
            </div>
          )
        })}

      </div>
    </section>
  )
}