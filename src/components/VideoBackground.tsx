import { useRef, useEffect, useState, useCallback } from 'react'

function pickRandomNext(current: number, total: number): number {
  if (total <= 1) return 0
  let next: number
  do {
    next = Math.floor(Math.random() * total)
  } while (next === current)
  return next
}

interface VideoBackgroundProps {
  videos: string[]
}

interface SlotState {
  videoIndex: number
  transitioning: boolean
  nextVideoIndex: number | null
}

export default function VideoBackground({ videos }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  // Show 4 slots, each initially assigned a video
  const slotCount = Math.min(4, videos.length)
  const initialSlots: SlotState[] = Array.from({ length: slotCount }, (_, i) => ({
    videoIndex: i % videos.length,
    transitioning: false,
    nextVideoIndex: null,
  }))
  // Duplicate for seamless scroll
  const [slots, setSlots] = useState<SlotState[]>([...initialSlots, ...initialSlots])

  const measureStrip = useCallback(() => {
    if (!stripRef.current) return
    const children = stripRef.current.children
    const half = children.length / 2
    let singleSetWidth = 0
    for (let i = 0; i < half; i++) {
      singleSetWidth += (children[i] as HTMLElement).offsetWidth
    }
    singleSetWidth += half * 16 // gap
    stripRef.current.style.setProperty('--strip-width', `${singleSetWidth}px`)
  }, [])

  useEffect(() => {
    if (!stripRef.current) return
    const timer = setTimeout(measureStrip, 800)
    const ro = new ResizeObserver(measureStrip)
    ro.observe(stripRef.current)
    return () => { clearTimeout(timer); ro.disconnect() }
  }, [measureStrip])

  // Pause/resume based on visibility
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        containerRef.current?.querySelectorAll('video').forEach((v) => {
          if (entry.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // When a slot's video nears its end, trigger a transition for that slot
  const handleTimeUpdate = (slotIndex: number, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (!video.duration || video.currentTime < video.duration - 0.3) return

    setSlots((prev) => {
      // Only trigger if not already transitioning
      if (prev[slotIndex].transitioning) return prev
      const updated = [...prev]
      const nextVid = pickRandomNext(prev[slotIndex].videoIndex, videos.length)
      // Update this slot and its mirror (slotIndex + slotCount or - slotCount)
      const mirrorIndex = slotIndex < slotCount ? slotIndex + slotCount : slotIndex - slotCount
      updated[slotIndex] = { ...updated[slotIndex], transitioning: true, nextVideoIndex: nextVid }
      updated[mirrorIndex] = { ...updated[mirrorIndex], transitioning: true, nextVideoIndex: nextVid }
      return updated
    })
  }

  const handleEnded = (slotIndex: number) => {
    setSlots((prev) => {
      if (prev[slotIndex].transitioning) return prev
      const updated = [...prev]
      const nextVid = pickRandomNext(prev[slotIndex].videoIndex, videos.length)
      const mirrorIndex = slotIndex < slotCount ? slotIndex + slotCount : slotIndex - slotCount
      updated[slotIndex] = { ...updated[slotIndex], transitioning: true, nextVideoIndex: nextVid }
      updated[mirrorIndex] = { ...updated[mirrorIndex], transitioning: true, nextVideoIndex: nextVid }
      return updated
    })
  }

  // After transition, swap the video source
  useEffect(() => {
    const transitioningSlot = slots.findIndex((s) => s.transitioning)
    if (transitioningSlot === -1) return

    const timer = setTimeout(() => {
      setSlots((prev) => {
        const updated = prev.map((slot) => {
          if (slot.transitioning && slot.nextVideoIndex !== null) {
            return { videoIndex: slot.nextVideoIndex, transitioning: false, nextVideoIndex: null }
          }
          return slot
        })
        return updated
      })
    }, 900)
    return () => clearTimeout(timer)
  }, [slots])

  return (
    <div className="video-bg" ref={containerRef}>
      <div className="video-bg-strip" ref={stripRef}>
        {slots.map((slot, i) => (
          <div className="video-bg-slot" key={i}>
            <video
              className={`video-bg-item ${slot.transitioning ? 'video-slot-exit' : ''}`}
              src={videos[slot.videoIndex]}
              autoPlay
              muted
              playsInline
              preload={i < 3 ? 'auto' : 'none'}
              onTimeUpdate={(e) => handleTimeUpdate(i, e)}
              onEnded={() => handleEnded(i)}
            />
            {slot.transitioning && <div className="video-slot-flicker" />}
          </div>
        ))}
      </div>
      <div className="video-bg-overlay" />
    </div>
  )
}
