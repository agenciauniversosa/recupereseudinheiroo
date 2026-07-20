import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function clientFor(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_leads",
  title: "Listar leads",
  description: "Lista leads capturados no site, com filtros opcionais por status, cidade e limite.",
  inputSchema: {
    status: z.enum(["novo", "em_contato", "ganho", "perdido"]).optional().describe("Filtra por status do lead."),
    city: z.string().optional().describe("Filtra por cidade (correspondência parcial)."),
    limit: z.number().int().min(1).max(200).optional().describe("Número máximo de leads a retornar (padrão 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, city, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const supabase = clientFor(ctx);
    let q = supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(limit ?? 50);
    if (status) q = q.eq("status", status);
    if (city) q = q.ilike("city", `%${city}%`);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { leads: data ?? [] },
    };
  },
});