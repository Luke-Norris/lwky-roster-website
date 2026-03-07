import { motion } from 'framer-motion'
import DiscordIcon from './DiscordIcon.tsx'
import VideoBackground from './VideoBackground.tsx'
import ParallaxBackground from './ParallaxBackground.tsx'
import { SITE_CONFIG } from '../data/config.ts'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function Hero() {
  const hasVideos = SITE_CONFIG.heroVideos.length > 0

  return (
    <section className="hero" id="home">
      {hasVideos ? (
        <VideoBackground videos={SITE_CONFIG.heroVideos} />
      ) : (
        <ParallaxBackground />
      )}

      <div className="hero-content">
        <motion.img
          src="/images/logo.png"
          alt="LWKY"
          className="hero-logo"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        />

        <motion.p
          className="hero-tagline"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.div
          className="hero-actions"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <a href={SITE_CONFIG.discordLink} className="btn-discord" target="_blank" rel="noopener noreferrer">
            <DiscordIcon />
            Join LWKY
          </a>
          <a href="#roster" className="btn-secondary">
            Meet the Squad
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a href="#roster" className="hero-scroll-indicator">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
