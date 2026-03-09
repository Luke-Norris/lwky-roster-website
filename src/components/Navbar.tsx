import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DiscordIcon from './DiscordIcon.tsx'
import TikTokIcon from './TikTokIcon.tsx'
import YouTubeIcon from './YouTubeIcon.tsx'
import { SITE_CONFIG } from '../data/config.ts'

interface NavItem {
  label: string
  href: string
  isRoute?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Roster', href: '#roster' },
  { label: 'Community', href: '#community' },
  { label: 'Events', href: '/events', isRoute: true },
  { label: 'LWKY Studios', href: '/studios', isRoute: true },
  { label: 'The Graveyard', href: '/graveyard', isRoute: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false)
    if (item.isRoute) return

    if (isHome) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + item.href)
    }
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/" className="navbar-logo">
        <img src="/images/logo.png" alt="LWKY" />
      </Link>

      <ul className="navbar-links">
        {NAV_ITEMS.map((item) =>
          item.isRoute ? (
            <li key={item.label}>
              <Link
                to={item.href}
                className={item.href === '/graveyard' ? 'navbar-graveyard-link' : ''}
              >
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item)
                }}
              >
                {item.label}
              </a>
            </li>
          )
        )}
      </ul>

      <div className="navbar-right">
        <div className="navbar-social">
          <a href={SITE_CONFIG.discordLink} target="_blank" rel="noopener noreferrer" title="Discord">
            <DiscordIcon size={24} />
          </a>
          <a href={SITE_CONFIG.tiktokLink} target="_blank" rel="noopener noreferrer" title="TikTok">
            <TikTokIcon size={24} />
          </a>
          {SITE_CONFIG.youtubeLink && (
            <a href={SITE_CONFIG.youtubeLink} target="_blank" rel="noopener noreferrer" title="YouTube">
              <YouTubeIcon size={24} />
            </a>
          )}
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_ITEMS.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`navbar-mobile-link ${item.href === '/graveyard' ? 'navbar-graveyard-link' : ''} ${item.href === '/studios' ? 'navbar-studios-link' : ''} ${item.href === '/events' ? 'navbar-tournaments-link' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                  {item.href === '/studios' && (
                    <span className="navbar-mobile-badge">Coming Soon</span>
                  )}
                  {item.href === '/graveyard' && (
                    <span className="navbar-mobile-badge navbar-mobile-badge--graveyard">Highlight Clips</span>
                  )}
                  {item.href === '/events' && (
                    <span className="navbar-mobile-badge navbar-mobile-badge--tournaments">Brackets</span>
                  )}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="navbar-mobile-link"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item)
                  }}
                >
                  {item.label}
                </a>
              )
            )}
            <div className="navbar-mobile-socials">
              <a href={SITE_CONFIG.discordLink} target="_blank" rel="noopener noreferrer">
                <DiscordIcon size={22} />
              </a>
              <a href={SITE_CONFIG.tiktokLink} target="_blank" rel="noopener noreferrer">
                <TikTokIcon size={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
