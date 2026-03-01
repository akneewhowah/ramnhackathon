// pull from supabase
// show values as - until real data put in

const STATS = [
  { icon: '🍏', value: '—', label: 'Items confirmed fresh' },
  { icon: '♻️', value: '—', label: 'Items prevented from waste' },
  { icon: '🌱', value: '—', label: 'lbs food waste avoided' },
]

export default function StatsRow() {
  return (
    <div className="stats-section">
      {STATS.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-icon">{s.icon}</div>
          <p className="stat-value">{s.value}</p>
          <p className="stat-label">{s.label}</p>
        </div>
      ))}
    </div>
  )
}