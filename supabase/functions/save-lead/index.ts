import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SPREADSHEET_ID = "1ga1kQH39-8DYjvouguLz1Fjp28Mv4xtqjLO3chKeoJo";
const SHEET_NAME = "LEADS";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY not configured");

    const body = await req.json();
    const {
      name = "",
      email = "",
      phone = "",
      city = "",
      propertyValue = "",
      details = "",
    } = body ?? {};

    if (
      typeof name !== "string" || name.trim().length < 2 ||
      typeof email !== "string" || !email.includes("@") ||
      typeof phone !== "string" || phone.replace(/\D/g, "").length < 10
    ) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const row = [
      now,
      name.trim(),
      email.trim(),
      phone,
      String(city).trim(),
      String(propertyValue).trim(),
      String(details).trim(),
    ];

    // Persist to DB (service role bypasses RLS)
    try {
      const admin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      const { error: dbErr } = await admin.from("leads").insert({
        name: name.trim(),
        email: email.trim(),
        phone,
        city: String(city).trim() || null,
        property_value: String(propertyValue).trim() || null,
        details: String(details).trim() || null,
        source: "site_form",
      });
      if (dbErr) console.error("DB insert error:", dbErr);
    } catch (e) {
      console.error("DB insert threw:", e);
    }

    const range = `${SHEET_NAME}!A:G`;
    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(`Sheets append failed [${resp.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("save-lead error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});