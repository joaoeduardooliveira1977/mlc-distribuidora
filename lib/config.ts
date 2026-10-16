/**
 * Configurações da loja — altere aqui e o site inteiro se ajusta.
 */

/** WhatsApp que recebe os pedidos: só números, com 55 + DDD. Ex.: "5511912345678" */
export const WHATSAPP_NUMBER = "5511953505384";

/**
 * Último dia para pedir e receber antes do Natal (AAAA-MM-DD).
 * A faixa no topo do site some sozinha depois dessa data.
 */
export const NATAL_DEADLINE = "2026-12-18";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** "2026-12-05" → "05/12" */
export function formatDeadline(iso: string = NATAL_DEADLINE): string {
  const [, month, day] = iso.split("-");
  return `${day}/${month}`;
}
