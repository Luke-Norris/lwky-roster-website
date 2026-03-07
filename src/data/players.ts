export interface Player {
  id: string
  name: string
  role: string
  avatar?: string
  socials: {
    discord?: string
    tiktok?: string
    youtube?: string
  }
}

export const PLAYERS: Player[] = [
  {
    id: 'player-1',
    name: 'Player One',
    role: 'IGL / Fragger',
    socials: {
      tiktok: 'https://tiktok.com/@player1',
    },
  },
  {
    id: 'player-2',
    name: 'Player Two',
    role: 'Support',
    socials: {
      tiktok: 'https://tiktok.com/@player2',
    },
  },
  {
    id: 'player-3',
    name: 'Player Three',
    role: 'Fragger',
    socials: {
      tiktok: 'https://tiktok.com/@player3',
    },
  },
  {
    id: 'player-4',
    name: 'Player Four',
    role: 'Flex',
    socials: {
      tiktok: 'https://tiktok.com/@player4',
    },
  },
  {
    id: 'player-5',
    name: 'Player Five',
    role: 'Fragger',
    socials: {
      tiktok: 'https://tiktok.com/@player5',
    },
  },
]
