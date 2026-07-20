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
  name: "add_lead_note",
  title: "Adicionar nota ao lead",
  description: "Anexa uma anotação ao campo de notas do lead (concatena com as anotações existentes).",
  inputSchema: {
    id: z.string().uuid().describe("UUID do lead."),
    note: z.string().min(1).describe("Texto da nota a adicionar."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ id, note }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const supabase = clientFor(ctx);
    const { data: current, error: readErr } = await supabase
      .from("leads").select("notes").eq("id", id).maybeSingle();
    if (readErr) return { content: [{ type: "text", text: readErr.message }], isError: true };
    if (!current) return { content: [{ type: "text", text: "Lead não encontrado." }], isError: true };
    const stamp = new Date().toISOString();
    const nextNotes = [current.notes, `[${stamp}] ${note}`].filter(Boolean).join("\n");
    const { error } = await supabase.from("leads").update({ notes: nextNotes }).eq("id", id);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: "Nota adicionada." }] };
  },
});