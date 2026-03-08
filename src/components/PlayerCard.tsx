import { motion } from 'framer-motion'
import type { Player } from '../data/players.ts'
import DiscordIcon from './DiscordIcon.tsx'
import TikTokIcon from './TikTokIcon.tsx'
import YouTubeIcon from './YouTubeIcon.tsx'
import TwitchIcon from './TwitchIcon.tsx'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

interface PlayerCardProps {
  player: Player
  index: number
}

export default function PlayerCard({ player, index }: PlayerCardProps) {
  return (
    <motion.div
      className="player-card"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="player-card-avatar">
        {player.avatar ? (
          <img src={player.avatar} alt={player.name} />
        ) : (
          <div className="player-card-avatar-placeholder">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div className="player-card-glow" />
      </div>
      <div className="player-card-body">
        <h3 className="player-card-name">{player.name}</h3>
        <div className="player-card-badges">
          <span className="player-card-role">{player.role}</span>
          {player.badges?.map((badge) => (
            <span
              key={badge.label}
              className={`player-card-role player-card-badge-${badge.variant ?? 'default'}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
        <div className="player-card-socials">
          {player.socials.discord && (
            <span className="player-social-link" title={`Discord: ${player.socials.discord}`}>
              <DiscordIcon size={18} />
            </span>
          )}
          {player.socials.tiktok && (
            <a href={player.socials.tiktok} target="_blank" rel="noopener noreferrer" className="player-social-link" title="TikTok">
              <TikTokIcon size={18} />
            </a>
          )}
          {player.socials.youtube && (
            <a href={player.socials.youtube} target="_blank" rel="noopener noreferrer" className="player-social-link" title="YouTube">
              <YouTubeIcon size={18} />
            </a>
          )}
          {player.socials.twitch && (
            <a href={player.socials.twitch} target="_blank" rel="noopener noreferrer" className="player-social-link" title="Twitch">
              <TwitchIcon size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
