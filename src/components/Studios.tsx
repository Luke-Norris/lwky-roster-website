import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Studios() {
  return (
    <section className="section" id="studios">
      <motion.div
        className="studios-teaser"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="studios-teaser-inner">
          <div className="studios-teaser-badge">
            <span className="studios-teaser-dot" />
            In Development
          </div>
          <h2 className="studios-teaser-title">LWKY Studios</h2>
          <p className="studios-teaser-desc">
            We're building high-quality, competition-grade Fortnite Creative maps.
            All LWKY tournaments will be hosted exclusively on our maps.
          </p>
          <Link to="/studios" className="btn-secondary">
            Learn More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
