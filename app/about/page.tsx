import Link from 'next/link'

const GRADES = [
  {
    letter: 'A',
    name: 'Astonishing',
    color: 'grade-a',
    desc: 'Distributed to homeless shelters and organizations who need produce with a longer shelf life.',
  },
  {
    letter: 'L',
    name: 'Livestock',
    color: 'grade-l',
    desc: 'Picked up by local farmers to help feed their livestock.',
  },
  {
    letter: 'C',
    name: 'Compost',
    color: 'grade-c',
    desc: 'Composted to return nutrients back to the earth.',
  },
]

const VERDICTS = [
  {
    label: 'GOOD',
    verdict: 'GOOD',
    pill: 'verdict-pill-good',
    desc: 'This produce meets required quality and safety standards. It is considered safe for consumption and suitable for redistribution.',
  },
  {
    label: 'Going Bad',
    verdict: 'GOING_BAD',
    pill: 'verdict-pill-going-bad',
    desc: 'This produce does not completely meet required standards. It is up to individual discretion whether it is safe for consumption.',
  },
  {
    label: 'BAD',
    verdict: 'BAD',
    pill: 'verdict-pill-bad',
    desc: 'This produce does not meet quality and safety standards. It is NOT considered safe for consumption and is unsuitable for redistribution.',
  },
  {
    label: 'Unsure',
    verdict: 'UNSURE',
    pill: 'verdict-pill-unsure',
    desc: 'The condition of this produce is uncertain based on the image. It may require further inspection to determine safety and quality.',
  },
]
const TEAM = [
  { name: 'Renny',   photo: '/renny.jpg' },
  { name: 'Anny',    photo: '/anny.jpeg' },
  { name: 'Niamh',   photo: '/niamh.jpg' },
  { name: 'Michele', photo: '/michele.jpeg' },
]

export default function AboutPage() {
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

          <Link href="/resources"  className="nav-link nav-link-active">Resources</Link>
          <a
          href="https://flowercitypickers.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          Flower City Pickers
        </a>
        </div>
      </nav>

      <main className="about-main">

        {/* domer */}
        <section className="about-hero">
          <div className="about-hero-badge">
            <span className="hero-badge-dot" />  Mission
          </div>
          <h1 className="about-hero-title">About Flower City Pickers</h1>
          <p className="about-hero-sub">
            Flower City Pickers is an organization dedicated to supporting the Rochester community 
            by providing safe and edible food through the recovery and redistribution. Flower 
            City Pickers strives to establish and grow a platform for waste prevention and civic engagement. 

          </p>
          <a
            href="https://flowercitypickers.org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit flowercitypickers.org ↗
          </a>
        </section>

        {/* how it works */}
        <section className="about-section">
          <h2 className="about-section-title">How does it work?</h2>
          <div className="about-how-card">
            
            <p className="about-how-text">
             Hard working volunteers attend the City of Rochester Public Market to collect 
              tons of produce donated by generous vendors and recover food that might otherwise end up landfilled. 
              
            Doing so contributes to the waste prevention that is ultimately the Flower City Pickers cause. 

            </p>
          </div>

          {/* grades  */}
          <div className="grade-grid">
            {GRADES.map(g => (
              <div key={g.letter} className={`grade-card ${g.color}`}>
                <div className="grade-letter">{g.letter}</div>
                <div className="grade-name">{g.name}</div>
                <p className="grade-desc">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* fresh scoring */}
        <section className="about-section">
          <h2 className="about-section-title">Freshness Scoring</h2>
          <p className="about-section-sub">
            Upload an image to determine a produce item’s freshness score, which is based on the following criteria:
          </p>
          <div className="verdict-explainer">
            {VERDICTS.map(v => (
              <div key={v.verdict} className="verdict-explain-card">
                <div className="verdict-explain-top">
                  <span className={`verdict-pill ${v.pill}`}>
                    <span className="verdict-pill-dot" />
                    {v.label}
                  </span>
                </div>
                <p className="verdict-explain-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* our team!!!!! */}
        <section className="about-section">
          <h2 className="about-section-title">Team</h2>
          <div className="team-grid">
            {TEAM.map(member => (
              <div key={member.name} className="team-card">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="team-photo" />
                ) : (
                  <div className="team-avatar">{member.name[0]}</div>
                )}
                <p className="team-name">{member.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* blah */}
        <section className="donate-banner">
          <span className="donate-banner-icon">🌿</span>
          <div className="donate-banner-text">
            <h3 className="donate-banner-title">Want to help reduce food waste?</h3>
            <p className="donate-banner-sub">
              Scan your produce with freshfind :3
            </p>
          </div>
          <Link href="/page.tsx" className="btn-dark">Start Scan →</Link>
        </section>

      </main>

      <footer className="footer">
        <span>© 2026 findfresh </span>
        <div className="footer-links">
          <Link href="/" className="footer-link">Return Home</Link>
          <a href="https://flowercitypickers.org" className="footer-link" target="_blank" rel="noopener noreferrer">Flower City Pickers</a>
        </div>
      </footer>

    </div>
  )
}