export default function DonateBanner() {
  return (
    <section className="donate-banner">
      <span className="donate-banner-icon">🍏</span>

      <div className="donate-banner-text">
        <h3 className="donate-banner-title">
          MAKE A DONATION
        </h3>
        <p className="donate-banner-sub">
         Make a donation and help feed your community and prevent food waste.
        </p>
      </div>

      <a
        href="https://flowercitypickers.org/donate"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-dark"
      >
        Flower City Pickers 
      </a>
    </section>
  )
}