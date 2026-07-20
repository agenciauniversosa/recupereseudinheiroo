import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import { Download, LogOut, Loader2, TrendingUp, Users, Trophy, Clock, ShieldAlert, RefreshCw, MessageCircle, Send, Settings2 } from "lucide-react";
import { toast } from "sonner";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  property_value: string | null;
  details: string | null;
  source: string | null;
  status: "novo" | "em_contato" | "ganho" | "perdido";
  base_score: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Followup = {
  id: string;
  lead_id: string;
  event: "novo_lead" | "em_contato" | "ganho" | "perdido";
  channel: string;
  message: string;
  wa_link: string | null;
  status: "pendente" | "enviado" | "cancelado";
  sent_at: string | null;
  created_at: string;
};

type Template = {
  id: string;
  event: "novo_lead" | "em_contato" | "ganho" | "perdido";
  channel: string;
  message: string;
  active: boolean;
};

const EVENT_LABEL: Record<Followup["event"], string> = {
  novo_lead: "Novo lead", em_contato: "Em contato", ganho: "Ganho", perdido: "Perdido",
};

const STATUS_LABEL: Record<Lead["status"], string> = {
  novo: "Novo", em_contato: "Em contato", ganho: "Ganho", perdido: "Perdido",
};
const STATUS_COLOR: Record<Lead["status"], string> = {
  novo: "bg-blue-500", em_contato: "bg-amber-500", ganho: "bg-emerald-500", perdido: "bg-rose-500",
};

const recencyBoost = (createdAt: string) => {
  const hours = (Date.now() - new Date(createdAt).getTime()) / 36e5;
  if (hours <= 24) return 30;
  if (hours <= 24 * 7) return 20;
  if (hours <= 24 * 30) return 10;
  return 0;
};

const parseValue = (v: string | null) => {
  if (!v) return 0;
  const n = Number(v.replace(/[^0-9]/g, ""));
  return isFinite(n) ? n : 0;
};

const valueBand = (n: number) => {
  if (n === 0) return "Não informado";
  if (n >= 1_000_000) return "≥ R$ 1M";
  if (n >= 500_000) return "R$ 500k – 1M";
  if (n >= 200_000) return "R$ 200k – 500k";
  return "< R$ 200k";
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

const Admin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [days, setDays] = useState<string>("30");
  const [minScore, setMinScore] = useState<string>("0");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [loadingFollowups, setLoadingFollowups] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    document.title = "Painel de Leads | Admin";
    if (!loading && !session) navigate("/auth", { replace: true });
  }, [loading, session, navigate]);

  const load = async () => {
    setLoadingLeads(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setLeads((data ?? []) as Lead[]);
    setLoadingLeads(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const loadFollowups = async (leadId: string) => {
    setLoadingFollowups(true);
    const { data, error } = await supabase.from("lead_followups")
      .select("*").eq("lead_id", leadId).order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setFollowups((data ?? []) as Followup[]);
    setLoadingFollowups(false);
  };

  useEffect(() => {
    if (selected) loadFollowups(selected.id); else setFollowups([]);
  }, [selected]);

  const markFollowupSent = async (f: Followup) => {
    const { error } = await supabase.from("lead_followups")
      .update({ status: "enviado", sent_at: new Date().toISOString(), sent_by: session?.user.id })
      .eq("id", f.id);
    if (error) return toast.error(error.message);
    if (f.wa_link) window.open(f.wa_link, "_blank", "noopener");
    setFollowups((prev) => prev.map((x) => x.id === f.id ? { ...x, status: "enviado", sent_at: new Date().toISOString() } : x));
    toast.success("Registrado como enviado");
  };

  const cancelFollowup = async (f: Followup) => {
    const { error } = await supabase.from("lead_followups").update({ status: "cancelado" }).eq("id", f.id);
    if (error) return toast.error(error.message);
    setFollowups((prev) => prev.map((x) => x.id === f.id ? { ...x, status: "cancelado" } : x));
  };

  const openTemplates = async () => {
    const { data, error } = await supabase.from("followup_templates").select("*").order("event");
    if (error) return toast.error(error.message);
    setTemplates((data ?? []) as Template[]);
    setTemplatesOpen(true);
  };

  const saveTemplate = async (t: Template) => {
    const { error } = await supabase.from("followup_templates")
      .update({ message: t.message, active: t.active }).eq("id", t.id);
    if (error) return toast.error(error.message);
    toast.success("Template salvo");
  };

  const enriched = useMemo(() =>
    leads.map((l) => {
      const score = Math.min(100, (l.base_score ?? 0) + recencyBoost(l.created_at));
      return { ...l, score, value_num: parseValue(l.property_value) };
    }), [leads]);

  const cities = useMemo(() => {
    const s = new Set<string>();
    enriched.forEach((l) => l.city && s.add(l.city));
    return Array.from(s).sort();
  }, [enriched]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cutoff = days === "all" ? 0 : Date.now() - Number(days) * 24 * 36e5;
    const min = Number(minScore) || 0;
    return enriched.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (cityFilter !== "all" && l.city !== cityFilter) return false;
      if (cutoff && new Date(l.created_at).getTime() < cutoff) return false;
      if (l.score < min) return false;
      if (q && !(
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.city ?? "").toLowerCase().includes(q) ||
        (l.details ?? "").toLowerCase().includes(q)
      )) return false;
      return true;
    });
  }, [enriched, search, statusFilter, cityFilter, days, minScore]);

  const stats = useMemo(() => {
    const now = Date.now();
    const last24 = filtered.filter((l) => now - new Date(l.created_at).getTime() <= 24 * 36e5).length;
    const won = filtered.filter((l) => l.status === "ganho").length;
    const avgScore = filtered.length ? Math.round(filtered.reduce((s, l) => s + l.score, 0) / filtered.length) : 0;
    return { total: filtered.length, last24, won, avgScore };
  }, [filtered]);

  const perDay = useMemo(() => {
    const map = new Map<string, number>();
    const N = 30;
    for (let i = N - 1; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
      map.set(d.toISOString().slice(0, 10), 0);
    }
    filtered.forEach((l) => {
      const k = l.created_at.slice(0, 10);
      if (map.has(k)) map.set(k, (map.get(k) ?? 0) + 1);
    });
    return Array.from(map, ([date, count]) => ({ date: date.slice(5), count }));
  }, [filtered]);

  const byCity = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((l) => { const c = l.city || "Sem cidade"; map.set(c, (map.get(c) ?? 0) + 1); });
    return Array.from(map, ([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count).slice(0, 8);
  }, [filtered]);

  const byBand = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((l) => { const b = valueBand(l.value_num); map.set(b, (map.get(b) ?? 0) + 1); });
    return Array.from(map, ([band, count]) => ({ band, count }));
  }, [filtered]);

  const byScore = useMemo(() => {
    const buckets = [
      { name: "0–39 (Frio)", min: 0, max: 39, count: 0 },
      { name: "40–59 (Morno)", min: 40, max: 59, count: 0 },
      { name: "60–79 (Quente)", min: 60, max: 79, count: 0 },
      { name: "80–100 (Hot)", min: 80, max: 100, count: 0 },
    ];
    filtered.forEach((l) => { const b = buckets.find((x) => l.score >= x.min && l.score <= x.max); if (b) b.count++; });
    return buckets;
  }, [filtered]);

  const scoreColors = ["#94a3b8", "#fca412", "#f97316", "#dc2626"];

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    const { error } = await supabase.from("leads").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Atualizado");
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } as Lead : l)));
    if (selected?.id === id) setSelected((s) => (s ? ({ ...s, ...patch } as Lead) : s));
  };

  const exportCSV = () => {
    const rows = [
      ["Data", "Nome", "E-mail", "Telefone", "Cidade", "Valor", "Detalhes", "Status", "Score", "Observações"],
      ...filtered.map((l) => [
        fmtDate(l.created_at), l.name, l.email, l.phone, l.city ?? "", l.property_value ?? "",
        (l.details ?? "").replace(/\n/g, " "), STATUS_LABEL[l.status], String(l.score), (l.notes ?? "").replace(/\n/g, " "),
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/auth", { replace: true }); };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  if (!session) return null;
  if (isAdmin === false) return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="max-w-md p-8 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-bold text-navy">Acesso restrito</h2>
        <p className="text-muted-foreground">Sua conta ({session.user.email}) não tem permissão de administrador.</p>
        <p className="text-xs text-muted-foreground">Peça a um administrador para conceder o papel <code>admin</code> na tabela <code>user_roles</code>.</p>
        <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sair</Button>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Painel de Leads</h1>
            <p className="text-xs text-white/60">{session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={load} disabled={loadingLeads}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingLeads ? "animate-spin" : ""}`} />Atualizar
            </Button>
            <Button variant="secondary" size="sm" onClick={exportCSV}><Download className="w-4 h-4 mr-2" />CSV</Button>
            <Button variant="secondary" size="sm" onClick={openTemplates}><Settings2 className="w-4 h-4 mr-2" />Templates</Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sair</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI icon={<Users className="w-5 h-5" />} label="Total (filtro)" value={stats.total} />
          <KPI icon={<Clock className="w-5 h-5" />} label="Últimas 24h" value={stats.last24} />
          <KPI icon={<Trophy className="w-5 h-5" />} label="Ganhos" value={stats.won} />
          <KPI icon={<TrendingUp className="w-5 h-5" />} label="Score médio" value={stats.avgScore} />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-4 text-navy">Leads por dia (30d)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={perDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#fca412" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-4 text-navy">Top cidades</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byCity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="city" fontSize={11} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f2942" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-4 text-navy">Por faixa de valor</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byBand}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="band" fontSize={11} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#fca412" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-4 text-navy">Distribuição de score</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byScore} dataKey="count" nameKey="name" outerRadius={80} label={(e) => e.count > 0 ? e.count : ""}>
                  {byScore.map((_, i) => <Cell key={i} fill={scoreColors[i]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid md:grid-cols-6 gap-3">
            <Input placeholder="Buscar nome, e-mail, telefone…" value={search} onChange={(e) => setSearch(e.target.value)} className="md:col-span-2" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="em_contato">Em contato</SelectItem>
                <SelectItem value="ganho">Ganho</SelectItem>
                <SelectItem value="perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger><SelectValue placeholder="Cidade" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas cidades</SelectItem>
                {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={days} onValueChange={setDays}>
              <SelectTrigger><SelectValue placeholder="Período" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Últimas 24h</SelectItem>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
                <SelectItem value="all">Todo período</SelectItem>
              </SelectContent>
            </Select>
            <Select value={minScore} onValueChange={setMinScore}>
              <SelectTrigger><SelectValue placeholder="Score mínimo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Score ≥ 0</SelectItem>
                <SelectItem value="40">Score ≥ 40</SelectItem>
                <SelectItem value="60">Score ≥ 60</SelectItem>
                <SelectItem value="80">Score ≥ 80</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingLeads ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-10"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-10 text-muted-foreground">Nenhum lead encontrado.</TableCell></TableRow>
                ) : filtered.map((l) => (
                  <TableRow key={l.id} className="cursor-pointer" onClick={() => setSelected(l)}>
                    <TableCell className="text-xs whitespace-nowrap">{fmtDate(l.created_at)}</TableCell>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell className="text-xs">
                      <div>{l.email}</div>
                      <div className="text-muted-foreground">{l.phone}</div>
                    </TableCell>
                    <TableCell className="text-xs">{l.city ?? "—"}</TableCell>
                    <TableCell className="text-xs">{l.property_value ?? "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gold-dark" style={{ width: `${l.score}%` }} />
                        </div>
                        <span className="text-xs font-bold w-8">{l.score}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${STATUS_COLOR[l.status]} text-white`}>{STATUS_LABEL[l.status]}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{selected?.name}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <Info label="E-mail" value={selected.email} />
                <Info label="Telefone" value={selected.phone} />
                <Info label="Cidade" value={selected.city ?? "—"} />
                <Info label="Valor" value={selected.property_value ?? "—"} />
                <Info label="Recebido em" value={fmtDate(selected.created_at)} />
                <Info label="Score" value={String(Math.min(100, selected.base_score + recencyBoost(selected.created_at)))} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Detalhes</div>
                <div className="bg-muted rounded p-3 whitespace-pre-wrap text-sm">{selected.details || "—"}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <Select value={selected.status} onValueChange={(v) => updateLead(selected.id, { status: v as Lead["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="em_contato">Em contato</SelectItem>
                    <SelectItem value="ganho">Ganho</SelectItem>
                    <SelectItem value="perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Observações internas</div>
                <textarea
                  className="w-full border rounded p-2 text-sm min-h-[80px]"
                  defaultValue={selected.notes ?? ""}
                  onBlur={(e) => e.target.value !== (selected.notes ?? "") && updateLead(selected.id, { notes: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <a href={`https://wa.me/${selected.phone.replace(/\D/g, "").replace(/^0+/, "").replace(/^(?!55)/, "55")}`} target="_blank" rel="noreferrer" className="flex-1">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">WhatsApp</Button>
                </a>
                <a href={`mailto:${selected.email}`} className="flex-1">
                  <Button variant="outline" className="w-full">E-mail</Button>
                </a>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-navy flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Follow-ups automáticos</h4>
                  <span className="text-xs text-muted-foreground">{followups.length} registro(s)</span>
                </div>
                {loadingFollowups ? (
                  <div className="py-4 text-center"><Loader2 className="w-4 h-4 animate-spin inline" /></div>
                ) : followups.length === 0 ? (
                  <div className="text-xs text-muted-foreground py-2">Nenhum disparo registrado ainda.</div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {followups.map((f) => (
                      <div key={f.id} className="border rounded p-3 text-xs space-y-2 bg-background">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{EVENT_LABEL[f.event]}</Badge>
                            <Badge className={
                              f.status === "enviado" ? "bg-emerald-500 text-white" :
                              f.status === "cancelado" ? "bg-slate-400 text-white" :
                              "bg-amber-500 text-white"
                            }>{f.status}</Badge>
                          </div>
                          <span className="text-muted-foreground">{fmtDate(f.created_at)}</span>
                        </div>
                        <div className="whitespace-pre-wrap text-foreground">{f.message}</div>
                        {f.sent_at && (
                          <div className="text-muted-foreground">Enviado em {fmtDate(f.sent_at)}</div>
                        )}
                        {f.status === "pendente" && (
                          <div className="flex gap-2 pt-1">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-8"
                              onClick={() => markFollowupSent(f)} disabled={!f.wa_link}>
                              <Send className="w-3.5 h-3.5 mr-1" /> Abrir WhatsApp e registrar
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8" onClick={() => cancelFollowup(f)}>Cancelar</Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={templatesOpen} onOpenChange={setTemplatesOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Templates de follow-up</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground">
            Variáveis disponíveis: <code>{"{{name}}"}</code>, <code>{"{{city}}"}</code>, <code>{"{{property_value}}"}</code>, <code>{"{{email}}"}</code>.
            Alterações valem para os próximos disparos.
          </p>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {templates.map((t, idx) => (
              <div key={t.id} className="border rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-navy text-sm">{EVENT_LABEL[t.event]}</div>
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={t.active}
                      onChange={(e) => setTemplates((prev) => prev.map((x, i) => i === idx ? { ...x, active: e.target.checked } : x))} />
                    Ativo
                  </label>
                </div>
                <textarea
                  className="w-full border rounded p-2 text-sm min-h-[100px]"
                  value={t.message}
                  onChange={(e) => setTemplates((prev) => prev.map((x, i) => i === idx ? { ...x, message: e.target.value } : x))}
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={() => saveTemplate(t)}>Salvar</Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const KPI = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <Card className="p-5 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-gold/15 text-gold-dark flex items-center justify-center">{icon}</div>
    <div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-navy">{value}</div>
    </div>
  </Card>
);
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

export default Admin;