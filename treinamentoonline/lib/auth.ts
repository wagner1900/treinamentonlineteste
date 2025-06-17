import { supabaseServer } from "./supabase";

export async function getSession(headers: Headers, cookies: any) {
  const supabase = supabaseServer(headers, cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
