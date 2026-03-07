import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBackground() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 300])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])

  return (
    <motion.div className="parallax-bg" style={{ y, opacity }}>
      <div className="parallax-layer parallax-layer--stars" />
      <div className="parallax-layer parallax-layer--glow" />
    </motion.div>
  )
}
