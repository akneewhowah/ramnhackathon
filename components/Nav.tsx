interface NavProps {
  onNewScan: () => void
}

export default function Nav({ onNewScan }: NavProps) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="nav-logo-icon">🌿</div>
        <span className="nav-logo-text">freshfind</span>
      </div>

      <div className="nav-links">
        <a href="/dashboard" className="nav-link">Dashboard</a>
        <a href="/about"   className="nav-link">About</a>
        <a
          href="https://flowercitypickers.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          Flower City Pickers
        </a>
        <button className="nav-btn" onClick={onNewScan}>
          New Scan 
        </button>
      </div>
    </nav>
  )
}