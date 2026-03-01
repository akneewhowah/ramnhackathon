import { ProduceType } from "@/types/scan";

export type ThresholdOptions = {
    good: number;
    bad: number;
};

export const DEFAULT_THRESHOLDS: ThresholdOptions = {
    good: 0.80,
    bad: 0.80
};

export const PRODUCE_THRESHOLDS: Record<ProduceType, ThresholdOptions> = {
    tomato: { good: 0.85, bad: 0.75 },
    potato: { good: 0.80, bad: 0.80 },
    orange: { good: 0.90, bad: 0.70 },
    carrot: { good: 0.80, bad: 0.80 },
    cucumber: { good: 0.85, bad: 0.75 },
    banana: { good: 0.90, bad: 0.70 },
    kiwi: { good: 0.85, bad: 0.75 }
};