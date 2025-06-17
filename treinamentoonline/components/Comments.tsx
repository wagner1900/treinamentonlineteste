"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

export function Comments({ lessonSlug, userId }: { lessonSlug: string; userId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const supabase = supabaseBrowser();

  useEffect(() => {
    loadComments();
    const sub = supabase
      .channel("public:comments")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments" }, (payload) => {
        setComments((prev) => [payload.new as Comment, ...prev]);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(sub);
    };
  }, []);

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("lesson_slug", lessonSlug)
      .order("created_at", { ascending: false });
    setComments(data || []);
  }

  async function send() {
    if (!text.trim()) return;
    await supabase.from("comments").insert({ content: text.trim(), lesson_slug: lessonSlug, user_id: userId });
    setText("");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Comentários</h2>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dúvida ou comentário..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
        />
        <button onClick={send} className="bg-red-600 hover:bg-red-700 px-4 rounded-lg text-white">
          Enviar
        </button>
      </div>
      <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
        {comments.map((c) => (
          <li key={c.id} className="bg-black/30 rounded-lg p-3">
            <p className="text-sm opacity-80">{new Date(c.created_at).toLocaleString("pt-BR")}</p>
            <p>{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
