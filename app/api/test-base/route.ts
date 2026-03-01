import { supabaseServer } from "@/lib/supabaseServer";




export async function GET() {
  const { data, error } = await supabaseServer
    .from("scans")
    .insert([
      {
        produce_type: "carrot",
        image_url: "https://static.wikia.nocookie.net/my-first-encyclopedia/images/9/9a/Carrot-PNG-Clipart.png/revision/latest/scale-to-width-down/340?cb=20220711193537",
        verdict: "GOOD",
        confidence: 0.9,
        session_id: "test-session",
      },
    ])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true, data });
}

