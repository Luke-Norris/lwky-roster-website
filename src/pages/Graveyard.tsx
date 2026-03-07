import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GRAVEYARD_CLIPS, type GraveyardClip } from '../data/graveyard.ts'
import { Link } from 'react-router-dom'
import '../styles/graveyard.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

function VideoModal({ clip, onClose }: { clip: GraveyardClip; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <motion.div
      className="graveyard-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="graveyard-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="graveyard-modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <video
          ref={videoRef}
          src={clip.videoUrl}
          controls
          autoPlay
          className="graveyard-modal-video"
        />
        <div className="graveyard-modal-info">
          <div className="graveyard-modal-matchup">
            <span className="graveyard-modal-player">{clip.lwkyPlayer}</span>
            <span className="graveyard-modal-vs">vs</span>
            <span className="graveyard-modal-opponent">{clip.opponentName}</span>
          </div>
          {clip.description && <p className="graveyard-modal-desc">{clip.description}</p>}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Graveyard() {
  const [selectedClip, setSelectedClip] = useState<GraveyardClip | null>(null)

  return (
    <div className="graveyard-page">
      <nav className="graveyard-nav">
        <Link to="/" className="graveyard-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to LWKY
        </Link>
      </nav>

      <header className="graveyard-header">
        <motion.div
          className="graveyard-header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="graveyard-label">Hall of Defeats</span>
          <h1 className="graveyard-title">The Graveyard</h1>
          <p className="graveyard-subtitle">Where reputations come to rest.</p>
        </motion.div>
      </header>

      <section className="graveyard-gallery">
        <div className="graveyard-grid">
          {GRAVEYARD_CLIPS.map((clip, i) => (
            <motion.div
              key={clip.id}
              className="tombstone-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              onClick={() => setSelectedClip(clip)}
            >
              <div className="tombstone-top">
                <svg className="tombstone-cross" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="5" y1="8" x2="19" y2="8" />
                </svg>
              </div>
              <div className="tombstone-body">
                <div className="tombstone-preview">
                  {clip.thumbnailUrl ? (
                    <img src={clip.thumbnailUrl} alt={clip.opponentName} />
                  ) : (
                    <div className="tombstone-preview-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                  <div className="tombstone-play-overlay">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <div className="tombstone-info">
                  <h3 className="tombstone-opponent">{clip.opponentName}</h3>
                  <p className="tombstone-rip">Eliminated by <strong>{clip.lwkyPlayer}</strong></p>
                  {clip.description && <p className="tombstone-desc">{clip.description}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedClip && (
          <VideoModal clip={selectedClip} onClose={() => setSelectedClip(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
