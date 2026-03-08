export interface Player {
  id: string
  name: string
  role: string
  avatar?: string
  socials: {
    discord?: string
    tiktok?: string
    youtube?: string
    twitch?: string
  }
}

export const PLAYERS: Player[] = [
  {
    id: 'assass1n',
    name: 'LWKY assass1n',
    role: 'Founding Member',
    avatar: '/images/assass1n.png',
    socials: {
      tiktok: 'https://www.tiktok.com/@assass1nzb',
      twitch: 'https://www.twitch.tv/lwkyassass1n',
      youtube: 'https://www.youtube.com/@PTO_assass1n',
    },
  },
  {
    id: 'rosa',
    name: 'LWKY rosa',
    role: 'Founding Member',
    avatar: '/images/rosa.jpg',
    socials: {},
  },
  {
    id: 'cade',
    name: 'LWKY cade',
    role: 'Founding Member',
    avatar: '/images/cade.jpg',
    socials: {
      tiktok: 'https://www.tiktok.com/@followcadeontop1?is_from_webapp=1&sender_device=pc',
    },
  },
  {
    id: 'drizi',
    name: 'LWKY drizi',
    role: 'Founding Member',
    avatar: '/images/drizi.webp',
    socials: {
      tiktok: 'https://www.tiktok.com/@lwky_drizi?_r=1&_t=ZP-94UXaB3LgNy',
    },
  },
  {
    id: 'kz',
    name: 'LWKY kz',
    role: 'Founding Member',
    avatar: '/images/kz.jpg',
    socials: {
      tiktok: 'https://www.tiktok.com/@kzownsu',
    },
  },
]
