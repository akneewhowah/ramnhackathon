import { GoogleGenerativeAI } from "@google/generative-ai";
import { Verdict } from "@/lib/types";

export const runtime = "nodejs";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export type GeminiClassifierOutput = {
    verdict: Verdict;
    confidence: number; // 0..1
    explanation: string;
};

export async function classifyProduceWithGemini(
    imageUrl: string,
    produceType: string
): Promise<GeminiClassifierOutput> {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });

    const prompt = 
    `You are helping sort donated produce for food rescue.

    Given an image of a ${produceType}, classify its condition.

    Rules:
    - GOOD: Fresh, safe to eat, minimal blemishes
    - BAD: Mold, slime, severe rot, unsafe
    - UNSURE: Image unclear, borderline condition, or insufficient detail

    Return ONLY valid JSON in this format:
    {
        "verdict": "GOOD | BAD | UNSURE",
        "confidence": float number between 0 and 1,
        "explanation": short sentence explaining visible cues
    }`;

    const result = await model.generateContent([
        { text: prompt },
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: await fetch(imageUrl)
                .then(res => res.arrayBuffer())
                .then(buf => Buffer.from(buf).toString("base64")),
            },
        },
    ]);

    const text = result.response.text();

    try {
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");
        const parsed = JSON.parse(text.slice(start, end + 1));

        return {
            verdict: parsed.verdict,
            confidence: Number(parsed.confidence),
            explanation: parsed.explanation,
        };
    } catch (e) {
        return {
            verdict: "UNSURE",
            confidence: 0.5,
            explanation: "Unable to confidently assess from this image.",
        };
    }
}
export function verdictFromLabel(
    rawLabel: Verdict, 
    confidence: number
): { verdict: Verdict, confidence: number } {
    const goodThreshold = 0.7;
    const badThreshold = 0.7;

    if (rawLabel === "GOOD" && confidence >= goodThreshold) {
        return { verdict: "GOOD", confidence };
    } else if (rawLabel === "BAD" && confidence >= badThreshold) {
        return { verdict: "BAD", confidence };
    } else {
        return { verdict: "UNSURE", confidence };
    }
}