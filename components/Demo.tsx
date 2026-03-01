'use client'

import { useState } from 'react'

interface DemoProps {
  fileRef: React.RefObject<HTMLInputElement | null>
}

const DEMO_IMAGES = [
  '/demo/banana.jpg',
  '/demo/carrot.jpg',
  '/demo/cucumber.jpg',
  '/demo/kiwi.jpg',
  '/demo/orange.jpg',
  '/demo/potato.jpg',
  '/demo/tomato.jpg',
]

export default function Demo({ fileRef }: DemoProps) {
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(0)

  async function runDemo() {
    if (!fileRef?.current) return

    setLoading(true)

    const imagePath = DEMO_IMAGES[index]

    const res = await fetch(imagePath)
    const blob = await res.blob()

    const file = new File([blob], 'demo.jpg', {
      type: blob.type,
    })

    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)

    // inject file into UploadCard input
    fileRef.current.files = dataTransfer.files

    // trigger UploadCard's onChange
    fileRef.current.dispatchEvent(
      new Event('change', { bubbles: true })
    )

    setIndex((prev) => (prev + 1) % DEMO_IMAGES.length)
    setLoading(false)
  }

  return (
    <button
      className="btn-ghost"
      onClick={runDemo}
      disabled={loading}
    >
      {loading ? 'Loading demo…' : 'Test it out'}
    </button>
  )
}