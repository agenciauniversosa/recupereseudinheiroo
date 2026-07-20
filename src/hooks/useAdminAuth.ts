import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export const useAdminAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async (s: Session | null) => {
      setSession(s);
      if (!s?.user) { setIsAdmin(false); setLoading(false); return; }
      const { data } = await supabase
        .from("user_roles").select("role").eq("user_id", s.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
      setLoading(false);
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { check(s); });
    supabase.auth.getSession().then(({ data }) => check(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, isAdmin, loading };
};