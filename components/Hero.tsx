import type { ScanResult } from '@/lib/types'
import UploadCard from './UploadCard'


interface HeroProps {
  onUploadClick: () => void
}

export default function Hero({ onUploadClick }: HeroProps) {
  let images: string[] = ['IMG_8377.jpg', 'IMG_8378.jpg', 'IMG_8380.jpg','IMG_8381.jpg','IMG_8382.jpg','IMG_8383.jpg','IMG_8384.jpg'];
  const randomDecimal = Math.random(); 
  const min = 1;
  const max = images.length;
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min; 
  const chosen = 'public/' + images[randomInt];
  return (
    
    <div className="hero-left">
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Freshness Check with Gemini AI
      </div>

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