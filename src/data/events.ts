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
    name: 'LWKY Weekly Wager',
    date: '2026-03-14',
    time: '7:00 PM EST',
    description: 'Weekly competitive wager tournament. Duos format, arena rules.',
    prizepool: '$250',
    status: 'upcoming',
  },
  {
    id: 'event-2',
    name: 'Friday Night Fights',
    date: '2026-03-20',
    time: '8:00 PM EST',
    description: 'Open bracket 1v1 tournament. All skill levels welcome.',
    prizepool: '$100',
    status: 'upcoming',
  },
  {
    id: 'event-3',
    name: 'LWKY Invitational',
    date: '2026-03-28',
    time: '6:00 PM EST',
    description: 'Invite-only trios tournament featuring top comp players.',
    prizepool: '$1,000',
    status: 'upcoming',
  },
]
