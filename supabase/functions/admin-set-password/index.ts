import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const { email, password } = await req.json();
  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { data: list, error: le } = await admin.auth.admin.listUsers();
  if (le) return new Response(JSON.stringify({ error: le.message }), { status: 500 });
  const user = list.users.find((u) => u.email === email);
  if (!user) return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  const { error } = await admin.auth.admin.updateUserById(user.id, {
    password,
    email_confirm: true,
  });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ ok: true, id: user.id }), {
    headers: { "content-type": "application/json" },
  });
});
