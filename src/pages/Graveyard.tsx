import { motion } from 'framer-motion'
import { GRAVEYARD_CLIPS } from '../data/graveyard.ts'
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

export default function Graveyard() {
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

      {/* Coming Soon overlay with preview cards behind it */}
      <section className="graveyard-gallery graveyard-gallery--preview">
        <div className="graveyard-coming-soon-overlay">
          <motion.div
            className="graveyard-coming-soon-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="graveyard-coming-soon-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="5" y1="8" x2="19" y2="8" />
              </svg>
            </div>
            <h2 className="graveyard-coming-soon-title">Coming Soon</h2>
            <p className="graveyard-coming-soon-desc">
              The bodies are piling up. Check back soon.
            </p>
          </motion.div>
        </div>

        <div className="graveyard-grid graveyard-grid--disabled">
          {GRAVEYARD_CLIPS.map((clip, i) => (
            <motion.div
              key={clip.id}
              className="tombstone-card tombstone-card--disabled"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <div className="tombstone-top">
                <svg className="tombstone-cross" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="5" y1="8" x2="19" y2="8" />
                </svg>
              </div>
              <div className="tombstone-body">
                <div className="tombstone-preview">
                  <div className="tombstone-preview-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    </div>
  )
}
