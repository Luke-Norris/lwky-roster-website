export interface TournamentEvent {
  id: string
  name: string
  date: string
  time: string
  description: string
  prizepool?: string
  status: 'upcoming' | 'live' | 'completed'
}

export const EVENTS: TournamentEvent[] = [
  {
    id: 'event-1',
    name: '2v2 Double Movement',
    date: '2026-03-08',
    time: '6:00 PM EST',
    description: 'Pump and Hammer. Best of 3. Any cover. Double movement. Hosted by Male Pepe and Female Pepe.',
    status: 'completed',
  },
]
