export const runtime = "nodejs";
import { supabaseServer } from "@/lib/supabaseServer";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File;
    const produceType = formData.get("produce_type") as string;

    if (!file) {
      return Response.json({ error: "No image uploaded" }, { status: 400 });
    }

    if (!produceType) {
      return Response.json({ error: "No produce type provided" }, { status: 400 });
    }

    // Convert image to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Unique filename
    const fileName = `${randomUUID()}.${file.type.split("/")[1]}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseServer.storage
      .from("produce-images")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      return Response.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseServer.storage
      .from("produce-images")
      .getPublicUrl(fileName);

    // 🔹 TEMP classification logic
    // Replace this later with real ML
    const verdict = Math.random() > 0.5 ? "GOOD" : "BAD";
    const confidence = Number((0.7 + Math.random() * 0.3).toFixed(2));

    // Save to database
    const { data, error } = await supabaseServer
      .from("scans")
      .insert([
        {
          produce_type: produceType,
          image_url: publicUrl,
          verdict,
          confidence,
          session_id: "demo-session",
        },
      ])
      .select();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      success: true,
      produce_type: produceType,
      verdict,
      confidence,
      image_url: publicUrl,
      id: data?.[0]?.id,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}