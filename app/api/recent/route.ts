export const runtime = "nodejs";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("scans")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}