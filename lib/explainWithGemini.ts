import { ProduceType, Verdict } from "@/types/scan";

function fallbackExplanation(produceType: ProduceType, verdict: Verdict, confidence: number) {
    if (verdict === "GOOD") return `This ${produceType} looks usable. Consider keeping it and using it soon.`;
    if (verdict === "BAD") return `This ${produceType} shows signs consistent with spoilage. For safety, it's best to discard it.`;
    return `Not confident from this photo. Try better lighting and a closer shot of any spots or soft areas.`;
}

// TODO: implement Gemini call once you have your Gemini API key set up
export async function explainWithGemini(args: {
    produceType: ProduceType;
    verdict: Verdict;
    confidence: number;
    }): Promise<string> {
    // For hackathon reliability: keep Gemini optional.
    // If you haven’t wired Gemini yet, return fallback.
    return fallbackExplanation(args.produceType, args.verdict, args.confidence);
}