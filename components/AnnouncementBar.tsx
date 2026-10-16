"use client";

import { useEffect, useState } from "react";
import { NATAL_DEADLINE, formatDeadline } from "../lib/config";

/**
 * Faixa no topo com o prazo de Natal.
 * Aparece até o fim do dia NATAL_DEADLINE (horário de Brasília) e some sozinha depois.
 * A checagem roda no navegador, então não depende de publicar o site de novo.
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const end = new Date(`${NATAL_DEADLINE}T23:59:59-03:00`).getTime();
    setVisible(Date.now() <= end);
  }, []);

  if (!visible) return null;

  return (
    <div className="announcementBar" role="note">
      🎄 Peça até <strong>{formatDeadline()}</strong> para receber antes do Natal
    </div>
  );
}
