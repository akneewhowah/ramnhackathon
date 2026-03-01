import type { MockScan, Verdict } from './types'

export const PRODUCE_TYPES = [
  { emoji: '🥕', label: 'Carrot' },
  { emoji: '🍊', label: 'Orange' },
  { emoji: '🥔', label: 'Potato' },
  { emoji: '🍅', label: 'Tomato' },
  { emoji: '🥒', label: 'Cucumber' },
  { emoji: '🌽', label: 'Other' },
]

export const MOCK_SCANS: MockScan[] = [
  { uuid: 1, emoji: '🥕', name: 'Carrot',    verdict: 'GOOD',   confidence: 0.99, date: '2 hours ago' },
  {  uuid: 2, emoji: '🍊', name: 'Orange', verdict: 'UNSURE', confidence: 0.71, date: 'Yesterday' },
  { uuid: 3, emoji: '🍅', name: 'Tomato',      verdict: 'BAD',    confidence: 0.88, date: '3 days ago' },
  {  uuid: 4, emoji: '🥕', name: 'Carrot',      verdict: 'GOOD',   confidence: 0.91, date: 'Feb 20' },
]

export const VERDICT_STYLES: Record<Verdict, { bg: string; text: string; pill: string }> = {
  GOOD:   { bg: 'verdict-bg-good',   text: 'verdict-text-good',   pill: 'verdict-pill-good'   },
  BAD:    { bg: 'verdict-bg-bad',    text: 'verdict-text-bad',    pill: 'verdict-pill-bad'    },
  UNSURE: { bg: 'verdict-bg-unsure', text: 'verdict-text-unsure', pill: 'verdict-pill-unsure' },
}