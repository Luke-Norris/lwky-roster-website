import { useRef, useEffect, useState, useCallback } from 'react'
import type { Tournament, BracketNode } from '../data/tournaments.ts'

/* ── Flatten tree into rounds ── */

interface FlatMatch {
  id: string
  team1: string
  team2: string
  winner: string
  winnerIndex?: 1 | 2
  note?: string
  t1PQ?: boolean
  t2PQ?: boolean
  round: number
  pos: number
}

function getTeamName(node: BracketNode): string {
  if (node.team) return node.team
  return node.winner ?? 'TBD'
}

function collectMatches(
  node: BracketNode,
  depth: number,
  pos: number,
  matches: FlatMatch[]
): void {
  if (node.team) return

  const t1Name = node.team1 ? getTeamName(node.team1) : 'TBD'
  const t2Name = node.team2 ? getTeamName(node.team2) : 'TBD'

  matches.push({
    id: `r${depth}p${pos}`,
    team1: t1Name,
    team2: t2Name,
    winner: node.winner ?? '',
    winnerIndex: node.winnerIndex,
    note: node.note,
    t1PQ: node.team1?.preQualified,
    t2PQ: node.team2?.preQualified,
    round: depth,
    pos,
  })

  if (node.team1 && !node.team1.team)
    collectMatches(node.team1, depth + 1, pos * 2, matches)
  if (node.team2 && !node.team2.team)
    collectMatches(node.team2, depth + 1, pos * 2 + 1, matches)
}

function getRoundLabel(round: number, maxRound: number): string {
  if (round === 0) return 'Finals'
  if (round === 1) return 'Semifinals'
  if (round === 2) return 'Quarterfinals'
  return `Round ${maxRound - round + 1}`
}

/* ── Compute bracket Y positions ── */

function computeYPositions(
  allMatches: FlatMatch[],
  totalHeight: number
): Map<string, number> {
  const positions = new Map<string, number>()
  const matchSet = new Set(allMatches.map((m) => m.id))

  function assign(
    round: number,
    pos: number,
    baseY: number,
    slotHeight: number
  ): number {
    const id = `r${round}p${pos}`
    const child1Id = `r${round + 1}p${pos * 2}`
    const child2Id = `r${round + 1}p${pos * 2 + 1}`
    const hasChild1 = matchSet.has(child1Id)
    const hasChild2 = matchSet.has(child2Id)

    let y: number

    if (hasChild1 && hasChild2) {
      const y1 = assign(round + 1, pos * 2, baseY, slotHeight / 2)
      const y2 = assign(round + 1, pos * 2 + 1, baseY + slotHeight / 2, slotHeight / 2)
      y = (y1 + y2) / 2
    } else if (hasChild1) {
      y = assign(round + 1, pos * 2, baseY, slotHeight)
    } else if (hasChild2) {
      y = assign(round + 1, pos * 2 + 1, baseY, slotHeight)
    } else {
      y = baseY
    }

    if (matchSet.has(id)) {
      positions.set(id, y)
    }
    return y
  }

  assign(0, 0, 0, totalHeight)
  return positions
}

/* ── SVG Icons ── */

function CrownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.5 19h19v3h-19zM22.5 6l-5 5.5L12 4l-5.5 7.5L1.5 6l2.5 11h16z" />
    </svg>
  )
}

/* ── Line type ── */

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

/* ── Bracket component ── */

const BRACKET_HEIGHT = 350

export default function Bracket({ tournament }: { tournament: Tournament }) {
  const bracketRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Line[]>([])

  const allMatches: FlatMatch[] = []
  collectMatches(tournament.bracket, 0, 0, allMatches)
  const maxRound = allMatches.length ? Math.max(...allMatches.map((m) => m.round)) : 0

  // Compute Y positions based on bracket tree structure
  const yPositions = computeYPositions(allMatches, BRACKET_HEIGHT)

  // Group into rounds (deepest first = earliest rounds)
  const roundsMap = new Map<number, FlatMatch[]>()
  for (let r = maxRound; r >= 0; r--) {
    const rm = allMatches.filter((m) => m.round === r).sort((a, b) => a.pos - b.pos)
    if (rm.length) roundsMap.set(r, rm)
  }
  const roundKeys = Array.from(roundsMap.keys()).sort((a, b) => b - a)

  // Compute connector lines after render
  const computeLines = useCallback(() => {
    if (!bracketRef.current) return
    const container = bracketRef.current
    const rect = container.getBoundingClientRect()
    const newLines: Line[] = []

    allMatches.forEach((match) => {
      if (match.round === 0) return
      const parentPos = Math.floor(match.pos / 2)
      const childEl = container.querySelector(`[data-match="${match.id}"]`)
      const parentEl = container.querySelector(
        `[data-match="r${match.round - 1}p${parentPos}"]`
      )
      if (!childEl || !parentEl) return

      const childRect = childEl.getBoundingClientRect()
      const parentRect = parentEl.getBoundingClientRect()

      // Anchor to the .bk-vs divider between teams (not card center)
      // so notes/extra content below don't shift the line
      const childVs = childEl.querySelector('.bk-vs')
      const parentVs = parentEl.querySelector('.bk-vs')
      const cx = childRect.right - rect.left
      const cy = childVs
        ? childVs.getBoundingClientRect().top - rect.top
        : childRect.top + childRect.height / 2 - rect.top
      const px = parentRect.left - rect.left
      const py = parentVs
        ? parentVs.getBoundingClientRect().top - rect.top
        : parentRect.top + parentRect.height / 2 - rect.top
      const midX = (cx + px) / 2

      newLines.push({ x1: cx, y1: cy, x2: midX, y2: cy })
      newLines.push({ x1: midX, y1: cy, x2: midX, y2: py })
      newLines.push({ x1: midX, y1: py, x2: px, y2: py })
    })

    setLines(newLines)
  }, [allMatches.length])

  useEffect(() => {
    computeLines()
    window.addEventListener('resize', computeLines)
    return () => window.removeEventListener('resize', computeLines)
  }, [computeLines])

  return (
    <div className="bk-outer">
      <div className="bk-legend">
        <span className="bk-legend-item">
          <span className="bk-pq">PQ</span>
          <span className="bk-legend-text">= Pre-Qualified (seeded into later round)</span>
        </span>
      </div>

      <div className="bk-wrapper">
        <div className="bk-bracket" ref={bracketRef}>
          {/* SVG connector lines */}
          <svg className="bk-lines">
            {lines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="rgba(251, 191, 36, 0.25)"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Round columns */}
          {roundKeys.map((roundNum) => {
            const matchesInRound = roundsMap.get(roundNum)!
            const label = getRoundLabel(roundNum, maxRound)
            const isFinals = roundNum === 0

            return (
              <div className="bk-round" key={roundNum}>
                <div className="bk-round-label">{label}</div>
                <div className="bk-round-matches" style={{ height: BRACKET_HEIGHT }}>
                  {matchesInRound.map((match) => {
                    const t1Won =
                      match.winnerIndex === 1 ||
                      (!match.winnerIndex && match.winner === match.team1)
                    const t2Won =
                      match.winnerIndex === 2 ||
                      (!match.winnerIndex && match.winner === match.team2)
                    const y = yPositions.get(match.id) ?? 0

                    return (
                      <div
                        className={`bk-match ${isFinals ? 'bk-match--finals' : ''}`}
                        key={match.id}
                        data-match={match.id}
                        style={{ position: 'absolute', top: y, left: 0, right: 0 }}
                      >
                        {isFinals && (
                          <div className="bk-finals-tag">
                            <CrownIcon /> Championship
                          </div>
                        )}
                        <div className={`bk-team ${t1Won ? 'bk-team--w' : 'bk-team--l'}`}>
                          <span className="bk-team-name">
                            {match.team1}
                            {match.t1PQ && <span className="bk-pq">PQ</span>}
                          </span>
                          {t1Won && <CrownIcon />}
                        </div>
                        <div className="bk-vs" />
                        <div className={`bk-team ${t2Won ? 'bk-team--w' : 'bk-team--l'}`}>
                          <span className="bk-team-name">
                            {match.team2}
                            {match.t2PQ && <span className="bk-pq">PQ</span>}
                          </span>
                          {t2Won && <CrownIcon />}
                        </div>
                        {match.note && <div className="bk-note">{match.note}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
