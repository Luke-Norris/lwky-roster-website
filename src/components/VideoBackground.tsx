import { useRef, useEffect } from 'react'

interface VideoBackgroundProps {
  videos: string[]
}

export default function VideoBackground({ videos }: VideoBackgroundProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const allVideos = [...videos, ...videos]

  useEffect(() => {
    if (!stripRef.current) return
    const observer = new ResizeObserver(() => {
      if (stripRef.current) {
        const singleSetWidth = stripRef.current.scrollWidth / 2
        stripRef.current.style.setProperty('--strip-width', `${singleSetWidth}px`)
      }
    })
    observer.observe(stripRef.current)
    return () => observer.disconnect()
  }, [videos])

  useEffect(() => {
    if (!heroRef.current) return
    const videos = heroRef.current.querySelectorAll('video')
    const observer = new IntersectionObserver(
      ([entry]) => {
        videos.forEach((v) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {})
          } else {
            v.pause()
          }
        })
      },
      { threshold: 0.1 }
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
            preload={i < 4 ? 'auto' : 'metadata'}
          />
        ))}
      </div>
      <div className="video-bg-overlay" />
    </div>
  )
}
