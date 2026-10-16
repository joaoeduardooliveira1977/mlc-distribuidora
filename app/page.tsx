import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Search,
  Truck,
  CreditCard,
  Gift,
  Gem,
  Scissors,
  Sparkles,
  Flower2,
  PackageCheck,
  ChevronRight,
} from "lucide-react";
import CartLink from "../components/CartLink";
import { categoryAnchor, getProduct, type Product } from "../lib/catalog";

const categories = [
  { label: "Natal", icon: Gift, subtitle: "Mimos de fim de ano", href: `/produtos#${categoryAnchor("Natal")}` },
  { label: "Cabeleireira", icon: Scissors, subtitle: "Tags para clientes", href: `/produtos#${categoryAnchor("Cabeleireira")}` },
  { label: "Manicure", icon: Sparkles, subtitle: "Mimos profissionais", href: `/produtos#${categoryAnchor("Manicure")}` },
  { label: "Lash Designer", icon: Heart, subtitle: "Delicadeza e brilho", href: `/produtos#${categoryAnchor("Lash Designer")}` },
  { label: "Estética", icon: Flower2, subtitle: "Autocuidado e carinho", href: `/produtos#${categoryAnchor("Estética")}` },
  { label: "Kits e Atacado", icon: Gem, subtitle: "A partir de 50 unidades", href: "/produtos" },
];

// Vitrine da home: só escolhe QUAIS produtos aparecem; os dados vêm do catálogo.
const featuredSlugs = [
  "tag-natal-perola-6mm",
  "tag-natal-verde-perola",
  "tag-natal-preto-dourado",
  "tag-manicure-brilho-renovado",
  "tag-cabeleireira-perola",
  "tag-outubro-rosa",
];
const featured = featuredSlugs
  .map((slug) => getProduct(slug))
  .filter((p): p is Product => Boolean(p));

const NATAL_PRODUCT = "/produto/tag-natal-perola-6mm";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <Link href="/" className="brand">
          <div className="heartMark" aria-hidden>♥</div>
          <div>
            <div className="brandName">Um mimo para você</div>
            <div className="brandSub">MIMOS QUE ENCANTAM</div>
          </div>
        </Link>

        <form className="searchBox" action="/produtos" role="search">
          <label htmlFor="busca" className="srOnly">Buscar produtos</label>
          <input id="busca" name="q" type="search" placeholder="O que você está procurando?" />
          <button type="submit" className="searchButton" aria-label="Buscar"><Search size={20} /></button>
        </form>

        <div className="actions">
          <CartLink className="actionLink" />
        </div>
      </header>

      <nav className="nav">
        <Link href="/">Início</Link>
        <Link href="/produtos">Tags com Brincos</Link>
        <Link href={`/produtos#${categoryAnchor("Natal")}`}>Natal</Link>
        <Link href={`/produtos#${categoryAnchor("Datas especiais")}`}>Datas Comemorativas</Link>
        <Link href="/produtos">Kits e Atacado</Link>
      </nav>

      <section className="hero heroV3">
        <div className="heroContent">
          <span className="eyebrow">MIMOS ESPECIAIS PARA UM</span>
          <h1>Natal <em>inesquecível</em></h1>
          <p>
            Tags com brincos de pérola e lembrancinhas delicadas para agradecer,
            presentear e encantar clientes, colaboradores e pessoas especiais.
          </p>
          <div className="heroButtons">
            <Link href={`/produtos#${categoryAnchor("Natal")}`} className="primary">VER COLEÇÃO DE NATAL →</Link>
            <Link href="/produtos" className="secondaryButton">VER TODOS OS MIMOS</Link>
          </div>
        </div>

        <div className="heroProduct">
          <Link href={NATAL_PRODUCT} className="heroImageFrame">
            <Image
              src="/products/natal-vermelho-real.png"
              alt="Tag Natal com brincos de pérola"
              fill
              priority
              sizes="(max-width: 900px) 88vw, 390px"
              style={{ objectFit: "cover" }}
            />
          </Link>
          <div className="heroMiniCard">
            <span>DESTAQUE</span>
            <strong>Tags + brincos de pérola 6mm</strong>
            <small>Kits para clientes, empresas e eventos</small>
          </div>
        </div>
      </section>

      <section className="trust">
        <div><Gem /><span><strong>Produtos delicados</strong><small>Acabamento pensado nos detalhes</small></span></div>
        <div><Truck /><span><strong>Envio para todo o Brasil</strong><small>Frete calculado no checkout</small></span></div>
        <div><CreditCard /><span><strong>Pagamento seguro</strong><small>Pix e cartão</small></span></div>
        <div><PackageCheck /><span><strong>Kits para diferentes demandas</strong><small>50, 100, 150, 200 e mais</small></span></div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="sectionEyebrow">ENCONTRE O MIMO IDEAL</span>
            <h2>Compre por categoria</h2>
          </div>
          <Link href="/produtos">Ver todas <ChevronRight size={15} /></Link>
        </div>

        <div className="categoryGrid">
          {categories.map(({ label, icon: Icon, subtitle, href }) => (
            <Link href={href} className="categoryCard categoryCardV3" key={label}>
              <div className="categoryIcon"><Icon size={34} /></div>
              <strong>{label}</strong>
              <span>{subtitle}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section productSection">
        <div className="sectionHead">
          <div>
            <span className="sectionEyebrow">SELEÇÃO DA LOJA</span>
            <h2>Produtos em destaque</h2>
          </div>
          <Link href="/produtos">Ver todos <ChevronRight size={15} /></Link>
        </div>

        <div className="productGrid productGridV3">
          {featured.map((p) => (
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
              <div className="productCta">Ver opções <ChevronRight size={14} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="promo promoV3">
        <div className="promoText">
          <span className="sectionEyebrow">PARA QUEM PRECISA DE QUANTIDADE</span>
          <h2>Kits para clientes,<br />eventos e empresas</h2>
          <p>
            Escolha a quantidade que melhor atende sua necessidade e deixe o presente
            de fim de ano ainda mais especial.
          </p>
          <Link href={NATAL_PRODUCT} className="primary">VER KITS DISPONÍVEIS →</Link>
        </div>
        <div className="promoVisual">
          <div className="promoPearl" aria-hidden>●</div>
          <div className="promoBadge">KITS A PARTIR DE<br /><strong>50</strong><br />UNIDADES</div>
        </div>
      </section>

      <section className="benefitStrip">
        <div><Gift /><strong>Lembrancinhas que encantam</strong><span>Para clientes, equipes e pessoas especiais.</span></div>
        <div><Heart /><strong>Vários modelos e temas</strong><span>Profissões, Natal e datas comemorativas.</span></div>
        <div><Gem /><strong>Pérolas delicadas</strong><span>Um mimo elegante e pronto para presentear.</span></div>
        <div><Truck /><strong>Compra online com praticidade</strong><span>Do pedido à entrega em um só lugar.</span></div>
      </section>

      <footer className="siteFooter">
        <div>
          <div className="footerBrand">Um mimo para você</div>
          <p>Mimos delicados para transformar pequenos gestos em lembranças especiais.</p>
          {/* TODO: razão social, CNPJ, endereço e contato (exigidos pelo Decreto 7.962/2013) */}
        </div>
        <div>
          <strong>Loja</strong>
          <Link href="/produtos">Tags com brincos</Link>
          <Link href={`/produtos#${categoryAnchor("Datas especiais")}`}>Datas especiais</Link>
          <Link href="/produtos">Kits e atacado</Link>
        </div>
        <div>
          <strong>Atendimento</strong>
          {/* TODO: criar as páginas de contato, trocas/arrependimento, envios e privacidade */}
          <span>Fale conosco</span>
          <span>Trocas e dúvidas</span>
          <span>Envios e prazos</span>
        </div>
      </footer>
    </main>
  );
}
