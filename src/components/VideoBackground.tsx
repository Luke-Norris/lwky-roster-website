import { useRef, useEffect, useState, useCallback } from 'react'

interface VideoBackgroundProps {
  videos: string[]
}

export default function VideoBackground({ videos }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const activeVideoRef = useRef<HTMLVideoElement>(null)
  const nextVideoRef = useRef<HTMLVideoElement>(null)
  const isVisibleRef = useRef(true)

  const limitedVideos = videos.slice(0, 6)

  const startTransition = useCallback(() => {
    if (transitioning || limitedVideos.length <= 1) return
    const next = (activeIndex + 1) % limitedVideos.length
    setNextIndex(next)
    setTransitioning(true)
  }, [activeIndex, transitioning, limitedVideos.length])

  // When next video is ready, begin the crossfade
  const handleNextCanPlay = useCallback(() => {
    if (!transitioning || nextIndex === null) return
    if (nextVideoRef.current) {
      nextVideoRef.current.play().catch(() => {})
    }
  }, [transitioning, nextIndex])

  // After transition animation completes, swap active
  useEffect(() => {
    if (!transitioning) return
    const timer = setTimeout(() => {
      setActiveIndex(nextIndex!)
      setNextIndex(null)
      setTransitioning(false)
    }, 1200) // match CSS transition duration
    return () => clearTimeout(timer)
  }, [transitioning, nextIndex])

  // Listen for video ending to trigger transition
  useEffect(() => {
    const video = activeVideoRef.current
    if (!video) return

    const handleEnded = () => {
      if (isVisibleRef.current) {
        startTransition()
      }
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [activeIndex, startTransition])

  // Fallback: if video doesn't fire ended (some browsers loop), use timeupdate
  useEffect(() => {
    const video = activeVideoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      // Trigger transition when within 0.3s of the end
      if (video.duration && video.currentTime >= video.duration - 0.3) {
        if (isVisibleRef.current && !transitioning) {
          startTransition()
        }
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [activeIndex, startTransition, transitioning])

  // Pause/resume based on hero visibility
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        const videos = containerRef.current?.querySelectorAll('video')
        videos?.forEach((v) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {})
          } else {
            v.pause()
          }
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="video-bg" ref={containerRef}>
      {/* Active video */}
      <video
        ref={activeVideoRef}
        key={`active-${activeIndex}`}
        className={`video-bg-fullscreen ${transitioning ? 'video-exit' : ''}`}
        src={limitedVideos[activeIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      {/* Next video (fades in during transition) */}
      {nextIndex !== null && (
        <video
          ref={nextVideoRef}
          key={`next-${nextIndex}`}
          className={`video-bg-fullscreen video-enter ${transitioning ? 'video-enter-active' : ''}`}
          src={limitedVideos[nextIndex]}
          muted
          playsInline
          preload="auto"
          onCanPlay={handleNextCanPlay}
        />
      )}

      {/* Flicker overlay during transition */}
      {transitioning && <div className="video-flicker" />}

      <div className="video-bg-overlay" />
    </div>
  )
}
