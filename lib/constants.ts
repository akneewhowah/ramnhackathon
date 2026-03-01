import type {Verdict } from './types'

export const PRODUCE_TYPES = [
  { emoji: '🥕', label: 'Carrot' },
  { emoji: '🍊', label: 'Orange' },
  { emoji: '🥔', label: 'Potato' },
  { emoji: '🍅', label: 'Tomato' },
  { emoji: '🥒', label: 'Cucumber' },
  { emoji: '🌽', label: 'Other' },
]

export const VERDICT_STYLES: Record<Verdict, { bg: string; text: string; pill: string }> = {
  GOOD:   { bg: 'verdict-bg-good',   text: 'verdict-text-good',   pill: 'verdict-pill-good'   },
  BAD:    { bg: 'verdict-bg-bad',    text: 'verdict-text-bad',    pill: 'verdict-pill-bad'    },
  UNSURE: { bg: 'verdict-bg-unsure', text: 'verdict-text-unsure', pill: 'verdict-pill-unsure' },
}