export type ProduceType = "tomato" | "potato" | "orange" | "carrot" | "cucumber" | "banana" | "kiwi";
export type Verdict = "GOOD" | "BAD" | "UNSURE";

export type ClassifiedVerdict = {
    verdict: Verdict;
    confidence: number; // 0..1
};

export type ScanResult = {
  verdict: Verdict;
  confidence: number; // 0..1
  explanation: string;
  image_url: string;
};

// One-step uses FormData, so we document fields instead of a JSON request type:
export const SCAN_FORM_FIELDS = {
  image: "image",
  produce_type: "produce_type",
} as const;
