import Link from 'next/link'

const NEEDED_ITEMS = [
  'Cereal', 'Pasta', 'Pasta sauce', 'Peanut butter',
  'Jelly', 'Tuna fish', 'Rice', 'Vegan foods', 'Gluten-free foods',
]

const SUPPORT_LINKS = [
  { label: 'Donation Form',             href: 'https://campusgroups.rit.edu/FoodShare/survey?survey_uid=b6d59c63-3388-11ed-9b31-0e3e5d452619' },
  { label: 'Donation Manual',           href: 'https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:2b777ed2-ca0b-4b78-b56e-898ad610e95c' },
  { label: 'Amazon Wishlist',           href: 'https://www.amazon.com/hz/wishlist/ls/3LHAYNJURIR6S/ref=cm_go_nav_hz' },
  { label: 'Give a Monetary Donation',  href: 'https://tigers.rit.edu/site/Donation2?df_id=1960&mfc_pref=T&1960.donation=form1&set.SingleDesignee=2124' },
  { label: 'Sponsor a Shelf',           href: 'https://campusgroups.rit.edu/FoodShare/survey?survey_uid=92a9063b-5c99-11ee-ad5f-0e3e5d452619' },
  { label: 'Volunteer',                 href: 'https://campusgroups.rit.edu/FoodShare/survey?survey_uid=4322a4bf-43fe-11ed-bceb-0e3e5d452619' },
]

export default function ResourcesPage() {
  return (
    <div className="app-shell">

      {/* nav */}
      <nav className="nav">
        <div className="nav-left">
          <div className="nav-logo-icon">🌿</div>
          <span className="nav-logo-text">freshfind</span>
        </div>
        <div className="nav-links">
          <Link href="/"           className="nav-link">Home</Link>
          <Link href="/resources"  className="nav-link nav-link-active">Resources</Link>
          <Link href="/about"      className="nav-link">About</Link>
          <a
            href="https://flowercitypickers.org"
            target="_blank" rel="noopener noreferrer"
            className="nav-link"
          >
            Flower City Pickers ↗
          </a>
        </div>
      </nav>

      <main className="about-main">

        {/* meow */}
        <section className="about-hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Rochester, NY · Food Resources
          </div>
          <h1 className="about-hero-title">Food &amp; Community Resources</h1>
          <p className="about-hero-sub">
            Get support or give back! Explore local resources
            for the Rochester and RIT community.
          </p>
        </section>

        {/* fodo share */}
        <section className="about-section">
          <div className="resource-section-head">
            <div>
              <h2 className="about-section-title">RIT FoodShare &amp; Bern&apos;s Closet</h2>
              <p className="about-section-sub">
                FoodShare is made possible by generous support from the RIT and greater
                Rochester communities. There are many ways to get involved.
              </p>
            </div>
          </div>

          {/*  links */}
          <div className="resource-link-grid">
            {SUPPORT_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank" rel="noopener noreferrer"
                className="resource-link-card"
              >
                <span>{l.label}</span>
                <span className="resource-link-arrow">↗</span>
              </a>
            ))}
          </div>

          {/* e*/}
          <div className="about-how-card">
         
            <div>
              <p className="resource-sub-title">Most Needed Donations</p>
              <div className="needed-grid">
                {NEEDED_ITEMS.map(item => (
                  <span key={item} className="needed-pill">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="https://www.rit.edu/lead/rit-foodshare#how-to-support"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit RIT FoodShare ↗
          </a>
        </section>

        {/* food link */}
        <section className="about-section">
          <div className="resource-section-head">
            <div>
              <h2 className="about-section-title">Foodlink — Find Food Near You</h2>
              <p className="about-section-sub">
                Foodlink is the regional food bank serving a nine-county area in western
                New York. Use their finder to locate food pantries, hot meal sites, and
                mobile distributions near you.
              </p>
            </div>
          </div>
          <a
            href="https://foodlinkny.org/find-food/"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            Find Food Near Me ↗
          </a>
        </section>

        {/* Case Management */}
        <section className="about-section">
          <div className="resource-section-head">
            <div>
              <h2 className="about-section-title">RIT Case Management</h2>
              <p className="about-section-sub">
                Case Management assists students in connecting to resources on and off
                campus, as well as helping students navigate complex personal problems —
                including health insurance, food and housing insecurity, financial
                concerns, and more.
              </p>
            </div>
          </div>

          <div className="resource-card-grid">
            {[
              { icon: '', label: 'Health Insurance',    desc: 'Navigating coverage options and enrollment.' },
              { icon: '', label: 'Food Insecurity',     desc: 'Connecting to on and off campus food resources.' },
              { icon: '', label: 'Housing Insecurity',  desc: 'Support finding stable housing situations.' },
              { icon: '', label: 'Financial Concerns',  desc: 'Emergency funds and financial planning support.' },
            ].map(c => (
              <div key={c.label} className="resource-support-card">
                <div className="resource-support-icon">{c.icon}</div>
                <p className="resource-support-label">{c.label}</p>
                <p className="resource-support-desc">{c.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="https://www.rit.edu/studentlife/case-management"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            Contact Case Management ↗
          </a>
        </section>

        {/* CTA */}
        <section className="donate-banner">
          <span className="donate-banner-icon">🌿</span>
          <div className="donate-banner-text">
            <h3 className="donate-banner-title">Reduce waste, feed the community</h3>
            <p className="donate-banner-sub">
              Scan your produce with freshfind and donate your borderline items to Flower City Pickers!
            </p>
          </div>
          <Link href="/" className="btn-dark">Start Scanning</Link>
        </section>

      </main>

      <footer className="footer">
        <span>© 2026 freshfind</span>
        <div className="footer-links">
          <Link href="/" className="footer-link">Home</Link>
          <a href="https://flowercitypickers.org" className="footer-link" target="_blank" rel="noopener noreferrer">
            Flower City Pickers
          </a>
        </div>
      </footer>

    </div>
  )
}