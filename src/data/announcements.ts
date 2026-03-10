export interface Announcement {
  id: string
  title: string
  summary: string
  detail: string
  date: string
  type: 'roster' | 'event' | 'general'
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'new-members-march-2026',
    title: 'Welcome Fearz & xTyreq',
    summary: 'Two new players have officially joined the LWKY roster.',
    detail: 'We\'re excited to announce that Fearz and xTyreq have officially joined LWKY. Both players bring serious talent and energy to the squad — watch out for them in upcoming tournaments. Welcome to the family.',
    date: '2026-03-10',
    type: 'roster',
  },
  {
    id: '2v2-double-movement-results',
    title: '2v2 Double Movement Wrap-Up',
    summary: 'Our first tournament is in the books — Pump & Hammer, best of 3.',
    detail: 'The 2v2 Double Movement tournament took place on March 8th. Format was Pump and Hammer, Best of 3, any cover, double movement. Hosted by Male Pepe and Female Pepe. Big thanks to everyone who competed and repped LWKY. More events coming soon.',
    date: '2026-03-08',
    type: 'event',
  },
]
