import { MOCK_SCANS, VERDICT_STYLES } from '@/lib/constants'

export default function HistoryTable() {
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">Past Produce</h2>
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

        {/* replace mock w real data */}
        {MOCK_SCANS.map((s, i) => {
          const styles = VERDICT_STYLES[s.verdict]
          return (
            <div key={i} className="table-row">
              <div className={`table-thumb ${styles.bg}`}>{s.emoji}</div>
              <div>
                <p className="table-name">{s.name}</p>
                <p className="table-sub">Scan #{String(i + 1).padStart(4, '0')}</p>
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