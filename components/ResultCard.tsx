import type { ScanResult, Verdict } from '@/lib/types'
import { VERDICT_STYLES } from '@/lib/constants'


interface ResultCardProps {
  result:      ScanResult
  produceType: string
}

const VERDICT_EMOJI: Record<Verdict, string> = {
  GOOD:   '✓',
  BAD:    '✕',
  UNSURE: '?',
}

const VERDICT_LABEL: Record<Verdict, string> = {
  GOOD:   'Good to Keep',
  BAD:    'Should Be Tossed',
  UNSURE: 'Unclear, Use Your Judgment',
}

export default function ResultCard({ result, produceType }: ResultCardProps) {
  const verdict = result.verdict?.toUpperCase() as Verdict
    const styles = VERDICT_STYLES[verdict] ?? VERDICT_STYLES['UNSURE']

  return (
    <div className="result-card">

      {/* top */}
      <div className="result-top">

        <div className={`verdict-circle ${styles.bg}`}>
          <span className="verdict-circle-emoji">
            {VERDICT_EMOJI[verdict]}
          </span>
          <span className={`verdict-circle-label ${styles.text}`}>
            {verdict}
          </span>
        </div>

        <div className="result-info">
          <h2 className="result-title">
            {produceType} — {VERDICT_LABEL[verdict]}
          </h2>
          <p className="result-desc">
            {result.explanation || 'No explanation available.'}
          </p>
        </div>

        <div className="conf-block">
          <p className="conf-label">Confidence</p>
          <p className={`conf-value ${styles.text}`}>
            {Math.round(result.confidence * 100)}%
          </p>
          <div className="conf-track">
            <div
              className="conf-fill"
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* Gemini explanation row */}
      <div className="gemini-row">
        <div className="gemini-icon">✦</div>
        <p className="gemini-text">
          <strong>Gemini says: </strong>
          {/* fill from gemini API */}
          {result.explanation || '—'}
        </p>
      </div>

      {/* donation nudge for bad or unsure */}
      {verdict !== 'GOOD' && (
        <div className="donate-nudge">
          <p className="donate-nudge-text">
            Don&apos;t waste it!{' '}
            <a
              href="https://flowercitypickers.org"
              target="_blank"
              rel="noopener noreferrer"
              className="donate-nudge-link"
            >
              Flower City Pickers
            </a>{' '}
            may still be able to use it.
          </p>
        </div>
      )}

    </div>
  )
}