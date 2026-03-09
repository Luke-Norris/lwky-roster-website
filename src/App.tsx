import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import AudioPlayer from './components/AudioPlayer.tsx'
import Home from './pages/Home.tsx'

const Graveyard = lazy(() => import('./pages/Graveyard.tsx'))
const StudiosPage = lazy(() => import('./pages/Studios.tsx'))
const EventsPage = lazy(() => import('./pages/Events.tsx'))

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/graveyard"
          element={
            <Suspense fallback={<div className="page-loading" />}>
              <Graveyard />
            </Suspense>
          }
        />
        <Route
          path="/studios"
          element={
            <Suspense fallback={<div className="page-loading" />}>
              <StudiosPage />
            </Suspense>
          }
        />
        <Route
          path="/events"
          element={
            <Suspense fallback={<div className="page-loading" />}>
              <EventsPage />
            </Suspense>
          }
        />
      </Routes>
      <AudioPlayer />
    </>
  )
}
