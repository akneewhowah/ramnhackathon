interface HeroProps {
  onUploadClick: () => void
}

export default function Hero({ onUploadClick }: HeroProps) {
  return (
    <div className="hero-left">

      <h1 className="hero-title">
        Keep<br />
        or <em className="hero-title-em">toss?</em>
      </h1>

      <p className="hero-sub">
        Upload a photo of your produce learn instantly
        whether it&apos;s good, borderline, or needs to be tossed! Help us
        reduce food waste one scan at a time!
      </p>

      <div className="hero-actions">
        <button className="btn-primary" onClick={onUploadClick}>
          Upload Photo
        </button>
        <a href="#recent" className="btn-ghost">
          Test it out:
        </a>
      </div>
    </div>
  )
}