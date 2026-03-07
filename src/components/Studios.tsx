import { motion } from 'framer-motion'
import { SITE_CONFIG } from '../data/config.ts'

export default function Studios() {
  return (
    <section className="section studios" id="studios">
      <div className="studios-content">
        <motion.div
          className="studios-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Creative Development</span>
          <h2 className="section-title">LWKY Studios</h2>
          <p className="section-subtitle">
            Our creative development arm — building worlds worth playing in Fortnite Creative. Maps, experiences, and game modes crafted by LWKY.
          </p>
          {SITE_CONFIG.studiosLink ? (
            <a
              href={SITE_CONFIG.studiosLink}
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit LWKY Studios
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : (
            <span className="studios-coming-soon">Coming Soon</span>
          )}
        </motion.div>

        <motion.div
          className="studios-preview"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="studios-preview-frame">
            <div className="studios-preview-bar">
              <span className="studios-preview-dot" />
              <span className="studios-preview-dot" />
              <span className="studios-preview-dot" />
            </div>
            <div className="studios-preview-content">
              <div className="studios-preview-placeholder">
                <span>LWKY Studios</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
