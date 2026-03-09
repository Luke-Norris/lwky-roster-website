import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EVENTS, type TournamentEvent } from '../data/events.ts'
import { TOURNAMENTS } from '../data/tournaments.ts'
import TournamentCalendar from '../components/TournamentCalendar.tsx'
import Bracket from '../components/Bracket.tsx'
import DiscordIcon from '../components/DiscordIcon.tsx'
import { SITE_CONFIG } from '../data/config.ts'
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

function TournamentPopup({
  event,
  onClose,
}: {
  event: TournamentEvent
  onClose: () => void
}) {
  const eventDate = new Date(event.date + 'T00:00:00')
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="tournament-popup"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tournament-popup-badge">
          <span className={`calendar-event-status calendar-event-status--${event.status}`}>
            {event.status}
          </span>
        </div>
        <h3 className="tournament-popup-title">{event.name}</h3>
        <div className="tournament-popup-details">
          <div className="tournament-popup-detail">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>{formattedDate}</span>
          </div>
          <div className="tournament-popup-detail">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{event.time}</span>
          </div>
          {event.prizepool && (
            <div className="tournament-popup-detail tournament-popup-detail--prize">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 2h8v4a4 4 0 01-8 0V2zM6 10v2M10 10v2M4 14h8M1 2h3M12 2h3M1 5h2M13 5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{event.prizepool} Prize Pool</span>
            </div>
          )}
        </div>
        <p className="tournament-popup-desc">{event.description}</p>
        <div className="tournament-popup-cta">
          <p>Sign up for this tournament in our Discord server</p>
          <a
            href={SITE_CONFIG.discordLink}
            className="btn-discord tournament-popup-discord"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordIcon size={18} />
            Join Discord to Register
          </a>
        </div>
        <button className="calendar-close" onClick={onClose}>Close</button>
      </motion.div>
    </motion.div>
  )
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function Events() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<TournamentEvent | null>(null)
  const upcomingEvents = EVENTS.filter((e) => e.status === 'upcoming').slice(0, 3)
  const sortedTournaments = [...TOURNAMENTS].reverse()

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
            Compete & Celebrate
          </motion.span>
          <motion.h1
            className="tournaments-title"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Events
          </motion.h1>
          <motion.p
            className="tournaments-subtitle"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Upcoming tournaments, past brackets, and champions.
          </motion.p>
        </div>
      </header>

      <section className="tournaments-content">
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="events-upcoming-section">
            <motion.h2
              className="events-section-heading"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Upcoming
            </motion.h2>
            <div className="tournament-timeline">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  className="tournament-card tournament-card--clickable"
                  custom={i + 4}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="tournament-card-date">
                    <span className="tournament-card-month">
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="tournament-card-day">
                      {new Date(event.date + 'T00:00:00').getDate()}
                    </span>
                  </div>
                  <div className="tournament-card-body">
                    <h3>{event.name}</h3>
                    <p className="tournament-card-time">{event.time}</p>
                    <p className="tournament-card-desc">{event.description}</p>
                  </div>
                  {event.prizepool && (
                    <div className="tournament-card-prize">
                      <span>{event.prizepool}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="tournament-actions"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="btn-secondary" onClick={() => setCalendarOpen(true)}>
                View Calendar
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <a href={SITE_CONFIG.discordLink} className="btn-discord" target="_blank" rel="noopener noreferrer">
                <DiscordIcon size={18} />
                Register on Discord
              </a>
            </motion.div>
          </div>
        )}

        {/* Past Results */}
        {sortedTournaments.length > 0 && (
          <div className="events-results-section">
            <motion.h2
              className="events-section-heading"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Past Results
            </motion.h2>

            {sortedTournaments.map((tournament, tIdx) => (
              <motion.article
                key={tournament.id}
                className="tournament-event"
                custom={tIdx + 4}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <div className="tournament-event-header">
                  <div className="tournament-event-top">
                    <div className="tournament-event-info">
                      <h3 className="tournament-event-name">{tournament.name}</h3>
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
                <Bracket tournament={tournament} />
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <TournamentCalendar
        events={EVENTS}
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <AnimatePresence>
        {selectedEvent && (
          <TournamentPopup
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
