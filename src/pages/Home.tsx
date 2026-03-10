import Hero from '../components/Hero.tsx'
import Announcements from '../components/Announcements.tsx'
import Roster from '../components/Roster.tsx'
import Community from '../components/Community.tsx'
import Studios from '../components/Studios.tsx'
import Footer from '../components/Footer.tsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Announcements />
      <Roster />
      <Community />
      <Studios />
      <Footer />
    </>
  )
}
