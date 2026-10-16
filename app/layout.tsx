import "./globals.css";
import type { Metadata } from "next";
import AnnouncementBar from "../components/AnnouncementBar";

export const metadata: Metadata = {
  title: "Um mimo para você | Mimos que encantam",
  description: "Tags com brincos de pérola, lembrancinhas e kits para clientes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AnnouncementBar />
        {children}
      </body>
    </html>
  );
}
