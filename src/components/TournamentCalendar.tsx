import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TournamentEvent } from '../data/events.ts'

interface TournamentCalendarProps {
  events: TournamentEvent[]
  isOpen: boolean
  onClose: () => void
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function TournamentCalendar({ events, isOpen, onClose }: TournamentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const eventsByDay = useMemo(() => {
    const map = new Map<number, TournamentEvent[]>()
    events.forEach((event) => {
      const d = new Date(event.date + 'T00:00:00')
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate()
        if (!map.has(day)) map.set(day, [])
        map.get(day)!.push(event)
      }
    })
    return map
  }, [events, year, month])

  const selectedEvents = selectedDay ? eventsByDay.get(selectedDay) ?? [] : []

  const prevMonth = () => {
    setSelectedDay(null)
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setSelectedDay(null)
    setCurrentDate(new Date(year, month + 1, 1))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="calendar-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="calendar-header">
              <button className="calendar-nav-btn" onClick={prevMonth}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h3 className="calendar-month">{MONTH_NAMES[month]} {year}</h3>
              <button className="calendar-nav-btn" onClick={nextMonth}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="calendar-grid">
              {DAY_NAMES.map((d) => (
                <div key={d} className="calendar-day-name">{d}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="calendar-day calendar-day--empty" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const hasEvents = eventsByDay.has(day)
                const isSelected = selectedDay === day
                return (
                  <button
                    key={day}
                    className={`calendar-day ${hasEvents ? 'calendar-day--has-event' : ''} ${isSelected ? 'calendar-day--selected' : ''}`}
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                  >
                    {day}
                    {hasEvents && <span className="calendar-day-dot" />}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {selectedEvents.length > 0 && (
                <motion.div
                  className="calendar-events"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selectedEvents.map((event) => (
                    <div key={event.id} className="calendar-event-card">
                      <div className="calendar-event-header">
                        <h4>{event.name}</h4>
                        {event.prizepool && (
                          <span className="calendar-event-prize">{event.prizepool}</span>
                        )}
                      </div>
                      <p className="calendar-event-time">{event.time}</p>
                      <p className="calendar-event-desc">{event.description}</p>
                      <span className={`calendar-event-status calendar-event-status--${event.status}`}>
                        {event.status}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button className="calendar-close" onClick={onClose}>Close</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
