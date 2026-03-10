import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TOURNAMENTS } from '../data/tournaments.ts'
import Bracket from '../components/Bracket.tsx'
import '../styles/tournaments.css'

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

function TrophyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function DollarIcon() {
  return (
    <svg className="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function TournamentResults() {
  const sorted = [...TOURNAMENTS].reverse()

  return (
    <div className="tournaments-page">
      {/* Nav */}
      <nav className="tournaments-nav">
        <Link to="/" className="tournaments-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to LWKY
        </Link>
      </nav>

      {/* Header */}
      <header className="tournaments-header">
        <div className="tournaments-header-content">
          <motion.span
            className="tournaments-label"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Tournament History
          </motion.span>
          <motion.h1
            className="tournaments-title"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Results
          </motion.h1>
          <motion.p
            className="tournaments-subtitle"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Past tournament brackets and champions.
          </motion.p>
        </div>
      </header>

      {/* Tournament List */}
      <section className="tournaments-content">
        {sorted.map((tournament, tIdx) => (
          <motion.article
            key={tournament.id}
            className="tournament-event"
            custom={tIdx + 3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {/* Event Info Card */}
            <div className="tournament-event-header">
              <div className="tournament-event-top">
                <div className="tournament-event-info">
                  <h2 className="tournament-event-name">{tournament.name}</h2>
                  <div className="tournament-event-meta">
                    <span><CalendarIcon /> {formatDate(tournament.date)}</span>
                    <span><UserIcon /> Hosted by {tournament.host}</span>
                    <span><DollarIcon /> {tournament.prize} Prize</span>
                  </div>
                  <div className="tournament-event-format">{tournament.format}</div>
                </div>
                <div className="tournament-winner">
                  <div className="tournament-winner-icon">
                    <TrophyIcon size={28} />
                  </div>
                  <div className="tournament-winner-text">
                    <span className="tournament-winner-label">Champion</span>
                    <span className="tournament-winner-name">{tournament.winner}</span>
                    <span className="tournament-winner-prize">{tournament.prize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bracket */}
            <Bracket tournament={tournament} />
          </motion.article>
        ))}
      </section>
    </div>
  )
}
