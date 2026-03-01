export type Verdict = 'GOOD' | 'GOING BAD' | 'BAD' | 'UNSURE'

export interface ScanResult {
  verdict:     Verdict
  confidence:  number   // 0.0 – 1.0
  explanation: string   // Gemini-generated text
  suggestion:  string   // Gemini-generated text
}

export interface Scan {
  uuid:       number
  emoji:      string
  name:       string
  verdict:    Verdict
  confidence: number
  date:       string
}

export const SCAN_FORM_FIELDS = {
  image: "image",
  produce_type: "produce_type",
} as const;