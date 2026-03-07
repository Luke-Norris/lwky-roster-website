import { useState } from 'react'
import { motion } from 'framer-motion'
import { EVENTS } from '../data/events.ts'
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

export default function Tournaments() {
  const [calendarOpen, setCalendarOpen] = useState(false)
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
            className="tournament-card"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
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
    </section>
  )
}
