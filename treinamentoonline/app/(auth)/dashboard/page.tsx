import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Área do Aluno</h1>
      <Link href="/aulas" className="text-red-400 hover:underline">
        Acessar vídeos dos módulos
      </Link>
    </div>
  );
}
