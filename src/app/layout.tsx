import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SquadBoosters - Agentes de IA para alavancar seus estudos",
  description: "Em apenas 3 passos simples você terá um plano de estudo prático para aprender com os melhores.",
  keywords: "Agentes de IA, Planos de estudo, Estudo com IA, Estudo com IA para alavancar seus estudos, Estudo com IA para alavancar seus estudos, Estudo com IA para alavancar seus estudos",
  authors: [{ name: "SquadBoosters" }],
  openGraph: {
    title: "SquadBoosters - Agentes de IA para alavancar seus estudos",
    description: "Em apenas 3 passos simples você terá um plano de estudo prático para aprender com os melhores.",
    url: "https://squadboosters.com.br",
    siteName: "SquadBoosters",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
