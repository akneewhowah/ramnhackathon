import { GoogleGenerativeAI } from "@google/generative-ai";
import { Verdict } from "@/lib/types";

export const runtime = "nodejs";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export type GeminiClassifierOutput = {
    verdict: Verdict;
    confidence: number; // 0..1
    explanation: string;
    suggestion: string;
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
    - GOING BAD: Some signs of spoilage like bruising, soft spots, or slight discoloration, but still usable, borderline condition
    - BAD: Mold, slime, severe rot, unsafe
    - UNSURE: Image unclear or insufficient detail

    Return ONLY valid JSON in this format:
    {
        "verdict": "GOOD | GOING_BAD | BAD | UNSURE",
        "confidence": float number between 0 and 1,
        "explanation": short sentence explaining visible cues
        "suggestion": short sentence on how to use or salvage
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
            suggestion: parsed.suggestion
        };
    } catch (e) {
        return {
            verdict: "UNSURE",
            confidence: 0.5,
            explanation: "Unable to confidently assess from this image.",
            suggestion: "Please inspect manually or provide a clearer image."
        };
    }
}
export function verdictFromLabel(
    rawLabel: Verdict, 
    confidence: number
): { verdict: Verdict, confidence: number } {
    const goodThreshold = 0.5;
    const goingBadThreshold = 0.5;
    const badThreshold = 0.5;

    if (rawLabel === "GOOD" && confidence >= goodThreshold) {
        return { verdict: "GOOD", confidence };
    } else if (rawLabel === "BAD" && confidence >= badThreshold) {
        return { verdict: "BAD", confidence };
    } else if (rawLabel === "GOING_BAD" && confidence >= goingBadThreshold) {
        return { verdict: "GOING_BAD", confidence };
    } else {
        return { verdict: "UNSURE", confidence };
    }
}