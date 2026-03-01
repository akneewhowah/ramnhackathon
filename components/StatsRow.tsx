// pull from supabase
// show values as - until real data put in

const STATS = [
  { icon: '🍏', bg: 'stat-icon-green', value: '67', unit: '', label: 'Items confirmed fresh' },
  { icon: '♻️', bg: 'stat-icon-butter', value: '12', unit: '', label: 'Items prevented from waste' },
  { icon: '🌱', bg: 'stat-icon-pink', value: '5.3', unit: 'lbs', label: 'lbs food waste avoided' },
]

export default function StatsRow() {
  return (
    <div className="stats-section">
      {STATS.map(s => (
        <div key={s.label} className="stat-card">
          <div className={`stat-icon-wrap ${s.bg}`}>{s.icon}</div>
          <p className="stat-value">
            {s.value}
            {s.unit && <span className="stat-unit">{s.unit}</span>}
          </p>
          <p className="stat-label">{s.label}</p>
        </div>
      ))}
    </div>
  )
}