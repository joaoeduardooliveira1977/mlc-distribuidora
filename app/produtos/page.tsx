import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import CartLink from "../../components/CartLink";
import ProductCard from "../../components/ProductCard";
import { categoryAnchor, getCategories, products } from "../../lib/catalog";

export const metadata: Metadata = {
  title: "Todos os produtos | Um mimo para você",
  description: "Tags com brincos de pérola para Natal, profissionais da beleza e datas especiais. Kits a partir de 50 unidades.",
};

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

type Props = { searchParams: { q?: string; categoria?: string } };

export default function Produtos({ searchParams }: Props) {
  const query = (searchParams.q ?? "").trim();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const categories = getCategories();
  const activeCategory = categories.find((c) => categoryAnchor(c) === searchParams.categoria);

  const visible = products.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (!terms.length) return true;
    const haystack = normalize(`${p.name} ${p.category} ${p.short} ${p.description}`);
    return terms.every((t) => haystack.includes(t));
  });

  const title = query
    ? `Resultados para “${query}”`
    : activeCategory ?? "Todos os produtos";

  return (
    <main className="catalogPage">
      <div className="catalogHeader">
        <div className="catalogTopRow">
          <Link href="/" className="miniBrand catalogBrand">Um mimo para você</Link>
          <CartLink className="miniCart" label="Carrinho" size={18} />
        </div>
        <div className="catalogIntro">
          <h1>{title}</h1>
          <p>Escolha por categoria e encontre o mimo ideal.</p>
          <form className="searchBox catalogSearch" action="/produtos" role="search">
            <label htmlFor="busca" className="srOnly">Buscar produtos</label>
            <input id="busca" name="q" type="search" defaultValue={query} placeholder="O que você está procurando?" />
            <button type="submit" className="searchButton" aria-label="Buscar"><Search size={20} /></button>
          </form>
        </div>
      </div>

      <div className="catalogBody">
        <nav className="filterChips" aria-label="Categorias">
          <Link href="/produtos" className={!activeCategory && !query ? "chip active" : "chip"}>
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/produtos?categoria=${categoryAnchor(c)}`}
              className={activeCategory === c ? "chip active" : "chip"}
              aria-current={activeCategory === c ? "page" : undefined}
            >
              {c}
            </Link>
          ))}
        </nav>

        <p className="resultCount">
          {visible.length} {visible.length === 1 ? "produto" : "produtos"}
        </p>

        {visible.length === 0 ? (
          <div className="emptySearch">
            <p>Nenhum produto encontrado.</p>
            <Link href="/produtos" className="primaryLink">Ver todos os produtos</Link>
          </div>
        ) : (
          <div className="productGrid productGridV3">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
