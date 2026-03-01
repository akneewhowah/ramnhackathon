import { ProduceType, Verdict } from "@/lib/types";
import { DEFAULT_THRESHOLDS, PRODUCE_THRESHOLDS } from "./thresholds";

export type ClassifierResult = {
    returnedLabel: "GOOD" | "BAD";
    confidence: number; // 0..1
}

export async function classifyProduce(
    imageURL: string,
    produceType: ProduceType
): Promise<ClassifierResult> {
    // stubbed until we have a real model
    return {
        returnedLabel: "GOOD",
        confidence: 0.99
    }
}

export function verdictFromLabel(label: ClassifierResult, type: ProduceType): { verdict: Verdict, confidence: number } {
    const thresholds = PRODUCE_THRESHOLDS[type] || DEFAULT_THRESHOLDS;

    if (label.returnedLabel === "GOOD" && label.confidence >= thresholds.good) {
        return { verdict: "GOOD", confidence: label.confidence };
    } else if (label.returnedLabel === "BAD" && label.confidence >= thresholds.bad) {
        return { verdict: "BAD", confidence: label.confidence };
    } else {
        return { verdict: "UNSURE", confidence: label.confidence };
    }
}