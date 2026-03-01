

import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { supabaseServer } from "@/lib/supabaseServer";
import { SCAN_FORM_FIELDS, ScanResult } from "@/lib/types";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { classifyProduceWithGemini, verdictFromLabel } from "@/lib/classifyProduceGemini";
//import { explainWithGemini } from "@/lib/explainWithGemini";

// make a post function

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        // request all form data for each field
        // make sure each field item is present and not an error
        const image = formData.get(SCAN_FORM_FIELDS.image)
        const produceType = formData.get(SCAN_FORM_FIELDS.produce_type)

        if (!image || typeof image === "string") {
            return Response.json({ error: "Image file is required." }, { status: 400 })
        }
        if (!produceType || typeof produceType !== "string") {
            return Response.json({ error: "Produce type is required." }, { status: 400 })
        }

        // 1. upload to supabase storage and check for error
        const fileExt = image.name.split(".").pop() || "jpg";
        const filePath = `scans/${crypto.randomUUID()}.${fileExt}`;

        const arrayBuffer = await image.arrayBuffer();
        const { error: uploadError } = await supabaseServer.storage
            .from("produce-images")
            .upload(filePath, arrayBuffer, {
            contentType: image.type || "image/jpeg",
            upsert: false,
        });

        if (uploadError) {
        return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
        }
        console.log("Upload result2:", { uploadError });
        const { data: publicUrlData } = supabaseServer.storage
            .from("produce-images")
            .getPublicUrl(filePath);

        const image_url = publicUrlData.publicUrl;

        const label = await classifyProduceWithGemini(image_url, produceType);
        const { verdict, confidence } = verdictFromLabel(label.verdict, label.confidence);
        console.log("Upload result1:", { uploadError });
        //const explanation = await explainWithGemini({ produceType: pt, verdict, confidence });
    
        const { error: insertError } = await supabaseServer.from("scans").insert({
            produce_type: produceType,
            image_url,
            verdict,
            confidence,
            // optional: session_id (add later if you generate one)
            session_id: null,
            explanation: label.explanation
        });

        if (insertError) {
            console.warn("DB insert failed:", insertError.message);
        }
        return NextResponse.json({
            verdict,
            confidence,
            explanation: label.explanation,
            image_url
        } as ScanResult);
    } catch (err: any) {
        return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
    }
}