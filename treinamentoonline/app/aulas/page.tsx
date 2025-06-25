import Link from "next/link";
import { supabaseServer } from "@/lib/supabase";

export default async function AulasPage() {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <p className="text-center mt-20">Faça login para acessar as aulas.</p>;
  }

  const { data: sub } = await supabase
    .from("stripe_subscriptions")
    .select("status")
    .eq("user_id", session.user.id)
    .single();

  if (!sub || sub.status !== "active") {
    return <p className="text-center mt-20">Acesso restrito a assinantes ativos.</p>;
  }

  const lessons = [
    { title: "Módulo 1", slug: "modulo-1" },
    { title: "Módulo 2", slug: "modulo-2" },
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Aulas</h1>
      <ul className="space-y-2">
        {lessons.map((l) => (
          <li key={l.slug}>
            <Link href={`/aulas/${l.slug}`} className="text-red-400 hover:underline">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
