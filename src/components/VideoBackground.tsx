import { useRef, useEffect, useCallback } from 'react'

interface VideoBackgroundProps {
  videos: string[]
}

export default function VideoBackground({ videos }: VideoBackgroundProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Cap at 4 videos to keep GPU decoding manageable (8 elements total with duplication)
  const limitedVideos = videos.slice(0, 4)
  const allVideos = [...limitedVideos, ...limitedVideos]

  const measureStrip = useCallback(() => {
    if (!stripRef.current) return
    const children = stripRef.current.children
    const half = children.length / 2
    let singleSetWidth = 0
    for (let i = 0; i < half; i++) {
      singleSetWidth += (children[i] as HTMLElement).offsetWidth
    }
    // Account for gap between items (1rem = 16px)
    singleSetWidth += half * 16
    stripRef.current.style.setProperty('--strip-width', `${singleSetWidth}px`)
  }, [])

  // Measure strip width after videos have loaded their dimensions
  useEffect(() => {
    if (!stripRef.current) return
    const timer = setTimeout(measureStrip, 800)
    const ro = new ResizeObserver(measureStrip)
    ro.observe(stripRef.current)
    return () => {
      clearTimeout(timer)
      ro.disconnect()
    }
  }, [measureStrip])

  // Pause/resume videos based on hero visibility
  useEffect(() => {
    if (!heroRef.current) return
    const videoEls = heroRef.current.querySelectorAll('video')

    const observer = new IntersectionObserver(
      ([entry]) => {
        videoEls.forEach((v) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {})
          } else {
            v.pause()
          }
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="video-bg" ref={heroRef}>
      <div className="video-bg-strip" ref={stripRef}>
        {allVideos.map((src, i) => (
          <video
            key={`${src}-${i}`}
            className="video-bg-item"
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload={i < 3 ? 'auto' : 'none'}
          />
        ))}
      </div>
      <div className="video-bg-overlay" />
    </div>
  )
}
