export interface GraveyardClip {
  id: string
  opponentName: string
  lwkyPlayer: string
  videoUrl: string
  thumbnailUrl?: string
  description?: string
}

export const GRAVEYARD_CLIPS: GraveyardClip[] = [
  {
    id: 'clip-1',
    opponentName: 'FamousPlayer',
    lwkyPlayer: 'Player One',
    videoUrl: '/videos/graveyard/clip1.mp4',
    description: 'Triple edit into headshot elimination.',
  },
  {
    id: 'clip-2',
    opponentName: 'ProBuilder99',
    lwkyPlayer: 'Player Two',
    videoUrl: '/videos/graveyard/clip2.mp4',
    description: 'Clean piece control into elimination.',
  },
  {
    id: 'clip-3',
    opponentName: 'TTV_Sweat',
    lwkyPlayer: 'Player Three',
    videoUrl: '/videos/graveyard/clip3.mp4',
    description: 'Zero ping retake into pump headshot.',
  },
]
