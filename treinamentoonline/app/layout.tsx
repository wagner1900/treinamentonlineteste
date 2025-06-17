import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "TreinamentoOnline – Artes Marciais",
  description: "Aulas orientais de artes marciais online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-950 text-gray-200">
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
