import { useRef, useEffect, useState } from 'react'

function pickRandomNext(current: number, length: number): number {
  if (length <= 1) return 0
  let next: number
  do {
    next = Math.floor(Math.random() * length)
  } while (next === current)
  return next
}

interface VideoBackgroundProps {
  videos: string[]
}

export default function VideoBackground({ videos }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const limitedVideos = videos.slice(0, 6)

  const [activeIndex, setActiveIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [phase, setPhase] = useState<'playing' | 'transitioning'>('playing')

  // Use refs so event handlers always read current values
  const activeIndexRef = useRef(activeIndex)
  const phaseRef = useRef(phase)
  activeIndexRef.current = activeIndex
  phaseRef.current = phase

  // When active video nears its end, kick off the transition
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (
      phaseRef.current === 'playing' &&
      video.duration &&
      video.currentTime >= video.duration - 0.3
    ) {
      const next = pickRandomNext(activeIndexRef.current, limitedVideos.length)
      setNextIndex(next)
      setPhase('transitioning')
    }
  }

  // Also handle the ended event as a backup
  const handleEnded = () => {
    if (phaseRef.current === 'playing') {
      const next = pickRandomNext(activeIndexRef.current, limitedVideos.length)
      setNextIndex(next)
      setPhase('transitioning')
    }
  }

  // When next video can play, start it
  const handleNextCanPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.play().catch(() => {})
  }

  // After transition duration, swap active ← next
  useEffect(() => {
    if (phase !== 'transitioning' || nextIndex === null) return
    const timer = setTimeout(() => {
      setActiveIndex(nextIndex)
      setNextIndex(null)
      setPhase('playing')
    }, 1200)
    return () => clearTimeout(timer)
  }, [phase, nextIndex])

  // Pause/resume based on hero section visibility
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const vids = containerRef.current?.querySelectorAll('video')
        vids?.forEach((v) => {
          if (entry.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const isTransitioning = phase === 'transitioning'

  return (
    <div className="video-bg" ref={containerRef}>
      <video
        key={`active-${activeIndex}`}
        className={`video-bg-fullscreen ${isTransitioning ? 'video-exit' : ''}`}
        src={limitedVideos[activeIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {nextIndex !== null && (
        <video
          key={`next-${nextIndex}`}
          className={`video-bg-fullscreen video-enter ${isTransitioning ? 'video-enter-active' : ''}`}
          src={limitedVideos[nextIndex]}
          muted
          playsInline
          preload="auto"
          onCanPlay={handleNextCanPlay}
        />
      )}

      {isTransitioning && <div className="video-flicker" />}

      <div className="video-bg-overlay" />
    </div>
  )
}
