export interface BracketNode {
  team1?: BracketNode
  team2?: BracketNode
  winner?: string
  /** Which side won (1 or 2) — use when winner name differs from team name (e.g. substitutions) */
  winnerIndex?: 1 | 2
  note?: string
  score?: string
  // Leaf node
  team?: string
  preQualified?: boolean
}

export interface Tournament {
  id: string
  name: string
  host: string
  date: string
  prize: string
  format: string
  winner: string
  bracket: BracketNode
}

export const TOURNAMENTS: Tournament[] = [
  {
    id: 'lwky-2v2-dm-1',
    name: 'LWKY 2v2 Double Movement',
    host: 'Lwky Pepe',
    date: '2026-03-08',
    prize: '$100',
    format: '2v2 · Pump & Hammer · Best of 3',
    winner: 'cxlect / fears',
    bracket: {
      // Finals
      winner: 'cxlect / fears',
      team1: {
        // Upper Semi: cinnabuns/darlington vs tyreq/gold
        winner: 'cinnabuns / darlington',
        winnerIndex: 1,
        note: 'cinnabuns replaced r8dr',
        team1: {
          // QF: r8dr/darlington vs novex/liminal
          winner: 'r8dr / darlington',
          team1: { team: 'r8dr / darlington' },
          team2: { team: 'novex / liminal' },
        },
        team2: { team: 'tyreq / gold', preQualified: true },
      },
      team2: {
        // Lower Semi: H8 vexy/H8 Faith vs cxlect/fears
        winner: 'cxlect / fears',
        team1: { team: 'H8 vexy / H8 Faith', preQualified: true },
        team2: {
          // Lower QF: compton/brinv vs cxlect/fears
          winner: 'cxlect / fears',
          team1: {
            // R1: compton/brinv vs drizi/rosa
            winner: 'compton / brinv',
            team1: { team: 'compton / brinv' },
            team2: { team: 'drizi / rosa' },
          },
          team2: { team: 'cxlect / fears', preQualified: true },
        },
      },
    },
  },
]
