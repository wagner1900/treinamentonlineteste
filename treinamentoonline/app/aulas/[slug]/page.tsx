import { supabaseServer } from "@/lib/supabase";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Comments } from "@/components/Comments";

export default async function AulaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: sub } = await supabase
    .from("stripe_subscriptions")
    .select("status,current_period_end")
    .eq("user_id", session?.user.id)
    .single();

  if (!sub || sub.status !== "active") {
    return <p className="text-center mt-20">Acesso restrito a assinantes ativos.</p>;
  }

  return (
    <section className="space-y-8">
      <VideoPlayer lessonSlug={slug} />
      <Comments lessonSlug={slug} userId={session!.user.id} />
    </section>
  );
}
