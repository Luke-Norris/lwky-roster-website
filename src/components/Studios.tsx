import { motion } from 'framer-motion'
import { SITE_CONFIG } from '../data/config.ts'

interface MapData {
  title: string
  genre: string
  description: string
  code: string
  image?: string
}

const MAPS: MapData[] = [
  {
    title: 'Tilted Tussle',
    genre: 'Zone Wars',
    description: 'Fast-paced zone wars set in a reimagined Tilted Towers. Shrinking storms and competitive loadouts.',
    code: '1234-5678-9012',
  },
  {
    title: 'Neon Drift',
    genre: 'Racing',
    description: 'High-speed drift racing through neon-lit cityscapes. Boost pads, shortcuts, and tight corners.',
    code: '2345-6789-0123',
  },
  {
    title: 'Skyline FFA',
    genre: 'Free For All',
    description: 'Rooftop free-for-all combat above the clouds. Verticality meets precision in this aerial arena.',
    code: '3456-7890-1234',
  },
  {
    title: 'The Vault',
    genre: 'Escape Room',
    description: 'A multi-stage puzzle escape set deep underground. Solve, survive, and escape before time runs out.',
    code: '4567-8901-2345',
  },
  {
    title: 'Storm Surge',
    genre: 'Box Fight',
    description: 'Competitive box fighting with dynamic storm mechanics. Designed for scrims and ranked practice.',
    code: '5678-9012-3456',
  },
  {
    title: 'Paradise Lost',
    genre: 'Adventure',
    description: 'Explore an abandoned tropical island with hidden secrets, boss fights, and a branching storyline.',
    code: '6789-0123-4567',
  },
]

const STATS = [
  { value: '6+', label: 'Maps Released' },
  { value: '50K+', label: 'Players' },
  { value: '2024', label: 'Founded' },
  { value: '10+', label: 'Creators' },
]

function MapPlaceholder() {
  return (
    <div className="map-card-image-placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
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

export default function Studios() {
  return (
    <section className="section studios-section" id="studios">
      <div className="section-header-center">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Creative Development
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          LWKY Studios
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Our creative development arm — building worlds worth playing in Fortnite Creative.
        </motion.p>
      </div>

      <motion.div
        className="studios-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="maps-grid">
        {MAPS.map((map, i) => (
          <motion.div
            key={map.code}
            className="map-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {map.image ? (
              <img src={map.image} alt={map.title} className="map-card-image" />
            ) : (
              <MapPlaceholder />
            )}
            <div className="map-card-body">
              <span className="map-card-genre">{map.genre}</span>
              <h3 className="map-card-title">{map.title}</h3>
              <p className="map-card-desc">{map.description}</p>
              <span className="map-card-code">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10.5 1.5L13 4l-2.5 2.5M5.5 14.5L3 12l2.5-2.5M9.5 3.5l-3 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {map.code}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {SITE_CONFIG.studiosLink && (
        <motion.div
          className="studios-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={SITE_CONFIG.studiosLink}
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit LWKY Studios
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      )}
    </section>
  )
}
