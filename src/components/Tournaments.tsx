import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EVENTS, type TournamentEvent } from '../data/events.ts'
import TournamentCalendar from './TournamentCalendar.tsx'
import { SITE_CONFIG } from '../data/config.ts'
import DiscordIcon from './DiscordIcon.tsx'

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

export default function Tournaments() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<TournamentEvent | null>(null)
  const upcomingEvents = EVENTS.filter((e) => e.status === 'upcoming').slice(0, 3)

  return (
    <section className="section tournaments" id="tournaments">
      <div className="section-header-center">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Compete
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Tournaments
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Weekly competitions with real prizes. Join Discord to register.
        </motion.p>
      </div>

      <div className="tournament-timeline">
        {upcomingEvents.map((event, i) => (
          <motion.div
            key={event.id}
            className="tournament-card tournament-card--clickable"
            custom={i}
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
    </section>
  )
}
