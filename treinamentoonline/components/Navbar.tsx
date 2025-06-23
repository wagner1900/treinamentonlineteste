"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";
import thumbSrc from "../Images/WhatsApp Image 2025-06-22 at 08.38.00.jpeg";

export function Navbar() {
  const pathname = usePathname();
  const supabase = supabaseBrowser();
  async function signOut() {
    await supabase.auth.signOut();
  }
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Image src={thumbSrc} alt="Logo" width={40} height={40} className="rounded-full" />
        <Link href="/" className="text-3xl font-extrabold tracking-widest text-yellow-400">
          Treinamento<span className="text-red-500">Online</span>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {pathname !== "/(auth)/login" && (
          <Link href="/(auth)/login" className="hover:underline">
            <User className="inline mr-1" size={18} /> Área do Aluno
          </Link>
        )}
        <button onClick={signOut} className="text-sm">
          <LogOut size={16} className="mr-1" /> Sair
        </button>
      </div>
    </nav>
  );
}
