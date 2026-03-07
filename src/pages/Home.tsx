import Hero from '../components/Hero.tsx'
import Roster from '../components/Roster.tsx'
import Tournaments from '../components/Tournaments.tsx'
import Community from '../components/Community.tsx'
import Studios from '../components/Studios.tsx'
import Footer from '../components/Footer.tsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Roster />
      <Tournaments />
      <Community />
      <Studios />
      <Footer />
    </>
  )
}
