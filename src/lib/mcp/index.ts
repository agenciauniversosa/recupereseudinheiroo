import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLeads from "./tools/list-leads";
import getLead from "./tools/get-lead";
import updateLeadStatus from "./tools/update-lead-status";
import addLeadNote from "./tools/add-lead-note";
import leadsStats from "./tools/leads-stats";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "seu-dinheiro-recuperado-mcp",
  title: "Seu Dinheiro Recuperado — Painel de Leads",
  version: "0.1.0",
  instructions:
    "Ferramentas para consultar e gerenciar leads do site Seu Dinheiro Recuperado. Use `list_leads` para buscar, `get_lead` para detalhes, `update_lead_status` para mover no funil, `add_lead_note` para anotações e `leads_stats` para métricas agregadas.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLeads, getLead, updateLeadStatus, addLeadNote, leadsStats],
});