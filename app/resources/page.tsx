import Link from "next/link";

export default function ResourcePage() {
  return (
    <div className="app-shell">
        {/* nav */}
        <nav className="nav">
            <div className="nav-left">
            <div className="nav-logo-icon">🌿</div>
            <span className="nav-logo-text">freshfind</span>
            </div>
            <div className="nav-links">
            <Link href="/"         className="nav-link">Home</Link>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="https://flowercitypickers.org/" target="_blank" rel="noopener noreferrer" className="nav-link">flowercitypickers</Link>
            </div>
        </nav>

      <main className="resources-main">
        
      </main>

    </div>
  )
}