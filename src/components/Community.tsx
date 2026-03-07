import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DiscordIcon from './DiscordIcon.tsx'
import { SITE_CONFIG } from '../data/config.ts'

interface DiscordInviteData {
  guild?: {
    name: string
    icon?: string | null
    id: string
  }
  approximate_member_count?: number
  approximate_presence_count?: number
}

const highlights = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Weekly Tournaments',
    desc: 'Compete for prizes every week in organized brackets.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
      </svg>
    ),
    title: 'Giveaways',
    desc: 'Free V-Bucks, skins, and gear drops for members.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Community Events',
    desc: 'Custom games, scrims, and community hangouts.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function Community() {
  const [discordData, setDiscordData] = useState<DiscordInviteData | null>(null)

  useEffect(() => {
    if (!SITE_CONFIG.discordInviteCode) return
    fetch(`https://discord.com/api/v10/invites/${SITE_CONFIG.discordInviteCode}?with_counts=true`)
      .then((res) => res.json())
      .then((json) => setDiscordData(json))
      .catch(() => {})
  }, [])

  const serverName = discordData?.guild?.name ?? 'LWKY'
  const memberCount = discordData?.approximate_member_count
  const onlineCount = discordData?.approximate_presence_count
  const iconUrl = discordData?.guild?.icon && discordData?.guild?.id
    ? `https://cdn.discordapp.com/icons/${discordData.guild.id}/${discordData.guild.icon}.png?size=128`
    : null

  return (
    <section className="section community" id="community">
      <div className="section-header-center">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Join Us
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          The Community
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Everything happens in Discord. Tournaments, giveaways, and vibes.
        </motion.p>
      </div>

      <div className="community-highlights">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            className="community-card"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <div className="community-card-icon">{h.icon}</div>
            <h3>{h.title}</h3>
            <p>{h.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="cta-banner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cta-banner-inner">
          <div className="cta-banner-server">
            {iconUrl ? (
              <img src={iconUrl} alt={serverName} className="cta-banner-server-icon" />
            ) : (
              <div className="cta-banner-server-icon cta-banner-server-icon--placeholder">
                <DiscordIcon size={32} />
              </div>
            )}
            <div className="cta-banner-server-info">
              <h2 className="cta-banner-title">{serverName}</h2>
              {(onlineCount != null || memberCount != null) && (
                <div className="cta-banner-stats">
                  {onlineCount != null && (
                    <span className="cta-banner-stat">
                      <span className="cta-banner-dot cta-banner-dot--online" />
                      {onlineCount.toLocaleString()} Online
                    </span>
                  )}
                  {memberCount != null && (
                    <span className="cta-banner-stat">
                      <span className="cta-banner-dot cta-banner-dot--members" />
                      {memberCount.toLocaleString()} Members
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="cta-banner-desc">
            Tournaments, giveaways, LFG, and everything Fortnite.
          </p>
          <a href={SITE_CONFIG.discordLink} className="btn-discord btn-discord--large" target="_blank" rel="noopener noreferrer">
            <DiscordIcon size={24} />
            Join the Discord
          </a>
        </div>
      </motion.div>
    </section>
  )
}
