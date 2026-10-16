"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Search,
  ShoppingBag,
  UserRound,
  Truck,
  CreditCard,
  Gift,
  Gem,
  Scissors,
  Sparkles,
  Flower2,
  PackageCheck,
  ChevronRight
} from "lucide-react";

const categories = [
  { label: "Natal", icon: Gift, subtitle: "Mimos de fim de ano" },
  { label: "Cabeleireira", icon: Scissors, subtitle: "Tags para clientes" },
  { label: "Manicure", icon: Sparkles, subtitle: "Mimos profissionais" },
  { label: "Lash Designer", icon: Heart, subtitle: "Delicadeza e brilho" },
  { label: "Estética", icon: Flower2, subtitle: "Autocuidado e carinho" },
  { label: "Kits e Atacado", icon: Gem, subtitle: "A partir de 50 unidades" },
];

const products = [
  {
    name: "Tag Natal com Brincos de Pérola 6mm",
    category: "Natal",
    image: "/products/natal-vermelho-real.png",
  },
  {
    name: "Tag Feliz Natal Verde com Brincos de Pérola",
    category: "Natal",
    image: "/products/natal-verde-real.png",
  },
  {
    name: "Tag Natal Preto e Dourado com Pérolas",
    category: "Natal",
    image: "/products/natal-preto-dourado.png",
  },
  {
    name: "Tag Natal Vermelha Elegante com Pérolas",
    category: "Natal",
    image: "/products/natal-vermelho-elegante.png",
  },
  {
    name: "Tag Outubro Rosa com Brincos de Pérola",
    category: "Datas especiais",
    image: "/products/outubro-rosa.png",
  },
  {
    name: "Tag Floral com Brincos de Pérola",
    category: "Mimos",
    image: "/products/floral-perolas.png",
  },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <Link href="/" className="brand">
          <div className="heartMark">♥</div>
          <div>
            <div className="brandName">Um mimo para você</div>
            <div className="brandSub">MIMOS QUE ENCANTAM</div>
          </div>
        </Link>

        <div className="searchBox">
          <input placeholder="O que você está procurando?" />
          <Search size={20} />
        </div>

        <div className="actions">
          <button><UserRound size={21}/><span>Minha conta</span></button>
          <button><Heart size={21}/><span>Favoritos</span></button>
          <Link href="/carrinho" className="actionLink"><ShoppingBag size={21}/><span>Meu carrinho</span></Link>
        </div>
      </header>

      <nav className="nav">
        <Link href="/">Início</Link>
        <a>Tags com Brincos</a>
        <a>Mimos para Profissionais</a>
        <a>Datas Comemorativas</a>
        <a>Kits e Atacado</a>
        <a>Embalagens</a>
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
            <Link href="/produto/tag-natal" className="primary">VER COLEÇÃO DE NATAL →</Link>
            <a className="secondaryButton">VER TODOS OS MIMOS</a>
          </div>
        </div>

        <div className="heroProduct">
          <div className="heroImageFrame">
            <Image
              src="/products/natal-vermelho-real.png"
              alt="Tag Natal com brincos de pérola"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="heroMiniCard">
            <span>DESTAQUE</span>
            <strong>Tags + brincos de pérola 6mm</strong>
            <small>Kits para clientes, empresas e eventos</small>
          </div>
        </div>
      </section>

      <section className="trust">
        <div><Gem/><span><strong>Produtos delicados</strong><small>Acabamento pensado nos detalhes</small></span></div>
        <div><Truck/><span><strong>Envio para todo o Brasil</strong><small>Frete calculado no checkout</small></span></div>
        <div><CreditCard/><span><strong>Pagamento seguro</strong><small>Pix e cartão</small></span></div>
        <div><PackageCheck/><span><strong>Kits para diferentes demandas</strong><small>50, 100, 150, 200 e mais</small></span></div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="sectionEyebrow">ENCONTRE O MIMO IDEAL</span>
            <h2>Compre por categoria</h2>
          </div>
          <a>Ver todas <ChevronRight size={15}/></a>
        </div>

        <div className="categoryGrid">
          {categories.map(({label, icon: Icon, subtitle}) => (
            <div className="categoryCard categoryCardV3" key={label}>
              <div className="categoryIcon"><Icon size={34}/></div>
              <strong>{label}</strong>
              <span>{subtitle}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section productSection">
        <div className="sectionHead">
          <div>
            <span className="sectionEyebrow">SELEÇÃO DA LOJA</span>
            <h2>Produtos em destaque</h2>
          </div>
          <a>Ver todos <ChevronRight size={15}/></a>
        </div>

        <div className="productGrid productGridV3">
          {products.map((p, i) => (
            <Link
              className="productCard productCardV3"
              key={p.name}
              href={i < 4 ? "/produto/tag-natal" : "#"}
            >
              <div className="productImage">
                <Image src={p.image} alt={p.name} fill style={{objectFit:"cover"}} />
                <button className="fav" aria-label="Favoritar"><Heart size={18}/></button>
              </div>
              <div className="productMeta">{p.category}</div>
              <h3>{p.name}</h3>
              <div className="productCta">Ver opções <ChevronRight size={14}/></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="promo promoV3">
        <div className="promoText">
          <span className="sectionEyebrow">PARA QUEM PRECISA DE QUANTIDADE</span>
          <h2>Kits para clientes,<br/>eventos e empresas</h2>
          <p>
            Escolha a quantidade que melhor atende sua necessidade e deixe o presente
            de fim de ano ainda mais especial.
          </p>
          <Link href="/produto/tag-natal" className="primary">VER KITS DISPONÍVEIS →</Link>
        </div>
        <div className="promoVisual">
          <div className="promoPearl">●</div>
          <div className="promoBadge">KITS A PARTIR DE<br/><strong>50</strong><br/>UNIDADES</div>
        </div>
      </section>

      <section className="benefitStrip">
        <div><Gift/><strong>Lembrancinhas que encantam</strong><span>Para clientes, equipes e pessoas especiais.</span></div>
        <div><Heart/><strong>Vários modelos e temas</strong><span>Profissões, Natal e datas comemorativas.</span></div>
        <div><Gem/><strong>Pérolas delicadas</strong><span>Um mimo elegante e pronto para presentear.</span></div>
        <div><Truck/><strong>Compra online com praticidade</strong><span>Do pedido à entrega em um só lugar.</span></div>
      </section>

      <footer className="siteFooter">
        <div>
          <div className="footerBrand">Um mimo para você</div>
          <p>Mimos delicados para transformar pequenos gestos em lembranças especiais.</p>
        </div>
        <div>
          <strong>Loja</strong>
          <a>Tags com brincos</a>
          <a>Datas especiais</a>
          <a>Kits e atacado</a>
        </div>
        <div>
          <strong>Atendimento</strong>
          <a>Fale conosco</a>
          <a>Trocas e dúvidas</a>
          <a>Envios e prazos</a>
        </div>
      </footer>
    </main>
  );
}