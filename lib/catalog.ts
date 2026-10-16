import productsData from "../data/products.json";

/**
 * Fonte única de produtos e preços do site.
 * Qualquer página (home, catálogo, produto, carrinho e, no futuro, o checkout
 * no servidor) deve ler daqui — nunca repetir preços em outros arquivos.
 */

export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  short: string;
  description: string;
  packs: number[];
};

/** Preço do kit (em reais) por quantidade de tags no kit. */
export const PACK_PRICES: Record<number, number> = {
  50: 69.9,
  100: 119.9,
  150: 169.9,
  200: 219.9,
  300: 309.9,
  500: 479.9,
};

export const DEFAULT_PACK = 100;

export const products: Product[] = productsData;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Retorna o preço do kit ou undefined se o produto não oferece esse kit. */
export function getPackPrice(slug: string, pack: number): number | undefined {
  const product = getProduct(slug);
  if (!product || !product.packs.includes(pack)) return undefined;
  return PACK_PRICES[pack];
}

/** Menor preço de kit do produto (o kit mais barato). */
export function getMinPackPrice(product: Product): number {
  return Math.min(...product.packs.map((q) => PACK_PRICES[q]));
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

export function categoryAnchor(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function brl(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
