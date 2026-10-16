import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import CartLink from "../../components/CartLink";
import { categoryAnchor, getCategories, products } from "../../lib/catalog";

export const metadata: Metadata = {
  title: "Todos os produtos | Um mimo para você",
  description: "Tags com brincos de pérola para Natal, profissionais da beleza e datas especiais. Kits a partir de 50 unidades.",
};

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function Produtos({ searchParams }: { searchParams: { q?: string } }) {
  const query = (searchParams.q ?? "").trim();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const visible = terms.length
    ? products.filter((p) => {
        const haystack = normalize(`${p.name} ${p.category} ${p.short} ${p.description}`);
        return terms.every((t) => haystack.includes(t));
      })
    : products;
  const categories = getCategories().filter((c) => visible.some((p) => p.category === c));

  return (
    <main className="catalogPage">
      <div className="catalogHeader">
        <div className="catalogTopRow">
          <Link href="/" className="miniBrand">Um mimo para você</Link>
          <CartLink className="miniCart" label="Carrinho" size={18} />
        </div>
        <h1>{query ? `Resultados para “${query}”` : "Todos os produtos"}</h1>
        <p>Escolha por categoria e encontre o mimo ideal.</p>
        <form className="searchBox catalogSearch" action="/produtos" role="search">
          <label htmlFor="busca" className="srOnly">Buscar produtos</label>
          <input id="busca" name="q" type="search" defaultValue={query} placeholder="O que você está procurando?" />
          <button type="submit" className="searchButton" aria-label="Buscar"><Search size={20} /></button>
        </form>
      </div>

      {visible.length === 0 && (
        <section className="catalogSection emptySearch">
          <p>Nenhum produto encontrado.</p>
          <Link href="/produtos" className="primaryLink">Ver todos os produtos</Link>
        </section>
      )}

      {categories.map((c) => (
        <section className="catalogSection" key={c} id={categoryAnchor(c)}>
          <div className="sectionHead"><h2>{c}</h2></div>
          <div className="productGrid productGridV3">
            {visible
              .filter((p) => p.category === c)
              .map((p) => (
                <Link className="productCard productCardV3" key={p.slug} href={`/produto/${p.slug}`}>
                  <div className="productImage">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="productMeta">{p.category}</div>
                  <h3>{p.name}</h3>
                  <div className="productCta">Ver opções</div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
