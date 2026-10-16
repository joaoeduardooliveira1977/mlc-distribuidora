"use client";

import { getPackPrice, getProduct } from "./catalog";

/**
 * Carrinho salvo no navegador.
 * Guardamos apenas slug, kit e quantidade — o preço é SEMPRE recalculado a
 * partir do catálogo, para que um valor alterado no navegador não tenha efeito.
 * O checkout no servidor deve fazer o mesmo recálculo.
 */

const STORAGE_KEY = "um-mimo-para-voce-cart";
const CHANGE_EVENT = "cart-change";

export type CartItem = { slug: string; pack: number; quantity: number };

export type CartLine = CartItem & {
  name: string;
  image: string;
  unitPrice: number;
  lineTotal: number;
};

function read(): CartItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw
      .filter(
        (x) =>
          x &&
          typeof x.slug === "string" &&
          Number.isInteger(x.pack) &&
          Number.isInteger(x.quantity) &&
          x.quantity > 0 &&
          getPackPrice(x.slug, x.pack) !== undefined
      )
      .map((x) => ({ slug: x.slug, pack: x.pack, quantity: x.quantity }));
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // armazenamento indisponível (aba anônima, cota cheia): ignora
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getCartItems(): CartItem[] {
  return read();
}

/** Adiciona kits ao carrinho, somando com o que já existe do mesmo kit. */
export function addToCart(slug: string, pack: number, quantity: number) {
  const items = read();
  const existing = items.find((i) => i.slug === slug && i.pack === pack);
  if (existing) existing.quantity += quantity;
  else items.push({ slug, pack, quantity });
  write(items);
}

export function setQuantity(slug: string, pack: number, quantity: number) {
  const items = read()
    .map((i) => (i.slug === slug && i.pack === pack ? { ...i, quantity } : i))
    .filter((i) => i.quantity > 0);
  write(items);
}

export function removeFromCart(slug: string, pack: number) {
  write(read().filter((i) => !(i.slug === slug && i.pack === pack)));
}

export function clearCart() {
  write([]);
}

/** Itens com nome, imagem e preços vindos do catálogo. */
export function getCartLines(): CartLine[] {
  return read().flatMap((item) => {
    const product = getProduct(item.slug);
    const unitPrice = getPackPrice(item.slug, item.pack);
    if (!product || unitPrice === undefined) return [];
    return [
      {
        ...item,
        name: product.name,
        image: product.image,
        unitPrice,
        lineTotal: unitPrice * item.quantity,
      },
    ];
  });
}

export function getCartCount(): number {
  return read().reduce((sum, i) => sum + i.quantity, 0);
}

export function onCartChange(callback: () => void): () => void {
  const handler = (e: Event) => {
    if (e instanceof StorageEvent && e.key !== STORAGE_KEY) return;
    callback();
  };
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
