import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PlayerCard from './PlayerCard.tsx'
import { PLAYERS } from '../data/players.ts'
import { SITE_CONFIG } from '../data/config.ts'

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Roster() {
  const shuffledPlayers = useMemo(() => shuffleArray(PLAYERS), [])

  return (
    <section className="section roster-section" id="roster">
      <div className="section-header-center">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Squad
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Meet the Roster
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          The players who rep LWKY in competition.
        </motion.p>
      </div>
      <div className="roster-grid">
        {shuffledPlayers.map((player, i) => (
          <PlayerCard key={player.id} player={player} index={i} />
        ))}
      </div>
      <motion.p
        className="roster-discord-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Want to see the full crew?{' '}
        <a href={SITE_CONFIG.discordLink} target="_blank" rel="noopener noreferrer">
          Join our Discord
        </a>
      </motion.p>
    </section>
  )
}
