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
  name: "get_lead",
  title: "Detalhar lead",
  description: "Retorna os dados completos de um lead pelo id, incluindo follow-ups registrados.",
  inputSchema: { id: z.string().uuid().describe("UUID do lead.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const supabase = clientFor(ctx);
    const [lead, followups] = await Promise.all([
      supabase.from("leads").select("*").eq("id", id).maybeSingle(),
      supabase.from("lead_followups").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
    ]);
    if (lead.error) return { content: [{ type: "text", text: lead.error.message }], isError: true };
    if (!lead.data) return { content: [{ type: "text", text: "Lead não encontrado." }], isError: true };
    const payload = { lead: lead.data, followups: followups.data ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(payload) }],
      structuredContent: payload,
    };
  },
});