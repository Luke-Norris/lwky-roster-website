import DiscordIcon from './DiscordIcon.tsx'
import TikTokIcon from './TikTokIcon.tsx'
import { SITE_CONFIG } from '../data/config.ts'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <img src="/images/logo.png" alt="LWKY" />
          <span>LWKY</span>
        </div>
        <div className="footer-socials">
          <a href={SITE_CONFIG.discordLink} target="_blank" rel="noopener noreferrer" title="Discord">
            <DiscordIcon size={18} />
          </a>
          <a href={SITE_CONFIG.tiktokLink} target="_blank" rel="noopener noreferrer" title="TikTok">
            <TikTokIcon size={18} />
          </a>
        </div>
        <div className="footer-right">
          &copy; {new Date().getFullYear()} LWKY. All rights reserved.
        </div>
      </div>
      <div className="footer-developed">
        Developed by kz
      </div>
      <div className="footer-attribution">
        Icons from <a href="https://www.onlinewebfonts.com/icon" target="_blank" rel="noopener noreferrer">svg icons</a> — CC BY 4.0
      </div>
    </footer>
  )
}
