import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../styles/studios.css'

interface MapData {
  title: string
  genre: string
  description: string
}

const MAPS: MapData[] = [
  {
    title: 'Tilted Tussle',
    genre: 'Zone Wars',
    description: 'Fast-paced zone wars set in a reimagined Tilted Towers. Shrinking storms and competitive loadouts.',
  },
  {
    title: 'Storm Surge',
    genre: 'Box Fight',
    description: 'Competitive box fighting with dynamic storm mechanics. Designed for scrims and ranked practice.',
  },
]

const PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Competition-Grade',
    description: 'Every map built for competitive integrity. Balanced spawns, fair rotations, tournament-ready from day one.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'LWKY Exclusive',
    description: 'All LWKY tournaments will be hosted exclusively on our maps. Built by us, played by everyone.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      </svg>
    ),
    title: 'High Quality',
    description: 'No shortcuts. Every detail matters — from lighting to gameplay flow. Maps that feel like they belong in the game.',
  },
]

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

function MapPlaceholder() {
  return (
    <div className="studios-map-placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </div>
  )
}

export default function StudiosPage() {
  return (
    <div className="studios-page">
      <nav className="studios-nav">
        <Link to="/" className="studios-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to LWKY
        </Link>
      </nav>

      <header className="studios-header">
        <motion.div
          className="studios-header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="studios-label">Creative Development</span>
          <h1 className="studios-title">LWKY Studios</h1>
          <p className="studios-subtitle">
            Building the next generation of competitive Fortnite Creative maps.
          </p>
          <div className="studios-wip-badge">
            <span className="studios-wip-dot" />
            In Development
          </div>
        </motion.div>
      </header>

      {/* Pillars */}
      <section className="studios-pillars">
        <div className="studios-pillars-grid">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="studios-pillar-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="studios-pillar-icon">{pillar.icon}</div>
              <h3 className="studios-pillar-title">{pillar.title}</h3>
              <p className="studios-pillar-desc">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Maps — coming soon preview */}
      <section className="studios-maps-section studios-maps-section--preview">
        <div className="studios-maps-header">
          <motion.h2
            className="studios-maps-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Maps in the Pipeline
          </motion.h2>
          <motion.p
            className="studios-maps-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Currently in development. None released yet — but when they drop, they'll be worth the wait.
          </motion.p>
        </div>

        <div className="studios-coming-soon-overlay">
          <motion.div
            className="studios-coming-soon-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="studios-coming-soon-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h3 className="studios-coming-soon-title">Coming Soon</h3>
            <p className="studios-coming-soon-desc">
              Maps are actively being built and tested. Island codes will be posted here once released.
            </p>
          </motion.div>
        </div>

        <div className="studios-maps-grid studios-maps-grid--disabled">
          {MAPS.map((map, i) => (
            <motion.div
              key={map.title}
              className="studios-map-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <MapPlaceholder />
              <div className="studios-map-card-body">
                <span className="studios-map-genre">{map.genre}</span>
                <h3 className="studios-map-title">{map.title}</h3>
                <p className="studios-map-desc">{map.description}</p>
                <span className="studios-map-code-placeholder">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M10.5 1.5L13 4l-2.5 2.5M5.5 14.5L3 12l2.5-2.5M9.5 3.5l-3 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Code TBD
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
