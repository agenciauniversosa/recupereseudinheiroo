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
  name: "update_lead_status",
  title: "Atualizar status do lead",
  description: "Muda o status de um lead (novo, em_contato, ganho, perdido). Dispara automaticamente o follow-up configurado.",
  inputSchema: {
    id: z.string().uuid().describe("UUID do lead."),
    status: z.enum(["novo", "em_contato", "ganho", "perdido"]).describe("Novo status do lead."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const { data, error } = await clientFor(ctx)
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Status atualizado para ${status}.` }],
      structuredContent: { lead: data },
    };
  },
});