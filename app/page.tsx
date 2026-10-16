"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag, UserRound, Truck, CreditCard, Gift, Gem, Scissors, Sparkles, Flower2 } from "lucide-react";

const products = [
  {name:"Tag Natal + Brincos de Pérola 6mm",price:"R$ 29,90",image:"/products/natal-vermelho.png"},
  {name:"Tag Natal Verde + Brincos de Pérola",price:"R$ 29,90",image:"/products/natal-verde.png"},
  {name:"Kit para Cabeleireira com Pérolas",price:"R$ 39,90",image:"/products/cabeleireira-kit.png"},
  {name:"Tag Natal Clássica com Pérolas",price:"R$ 29,90",image:"/products/natal-classico.png"}
];
const categories = [
  {label:"Natal",icon:Gift},{label:"Cabeleireira",icon:Scissors},{label:"Manicure",icon:Sparkles},
  {label:"Lash Designer",icon:Heart},{label:"Esteticista",icon:Flower2},{label:"Kits e Atacado",icon:Gem}
];

export default function Home(){return <main>
<header className="topbar"><div className="brand"><div className="heartMark">♥</div><div><div className="brandName">Um mimo para você</div><div className="brandSub">MIMOS QUE ENCANTAM</div></div></div><div className="searchBox"><input placeholder="O que você está procurando?"/><Search size={20}/></div><div className="actions"><button><UserRound size={21}/><span>Minha conta</span></button><button><Heart size={21}/><span>Favoritos</span></button><button><ShoppingBag size={21}/><span>Meu carrinho</span></button></div></header>
<nav className="nav"><a>Início</a><a>Tags com Brincos</a><a>Mimos para Profissionais</a><a>Datas Comemorativas</a><a>Kits e Atacado</a><a>Embalagens</a><a>Mais Produtos</a></nav>
<section className="hero"><div className="heroContent"><span className="eyebrow">MIMOS ESPECIAIS PARA UM</span><h1>Natal <em>inesquecível</em></h1><p>Tags com brincos de pérola, lembrancinhas e kits para encantar seus clientes, colaboradores e pessoas especiais.</p><button className="primary">VER COLEÇÃO DE NATAL →</button></div></section>
<section className="trust"><div><Gem/><span><strong>Produtos de qualidade</strong><small>Acabamento caprichado</small></span></div><div><Truck/><span><strong>Envio para todo o Brasil</strong><small>Entrega rápida e segura</small></span></div><div><CreditCard/><span><strong>Pagamento seguro</strong><small>Pix, cartão e boleto</small></span></div><div><Gift/><span><strong>Ideal para brindes</strong><small>Lembranças e eventos</small></span></div></section>
<section className="section"><div className="sectionHead"><h2>Compre por categoria</h2><a>Ver todas as categorias →</a></div><div className="categoryGrid">{categories.map(({label,icon:Icon})=><div className="categoryCard" key={label}><div className="categoryIcon"><Icon size={34}/></div><strong>{label}</strong><span>Ver produtos</span></div>)}</div></section>
<section className="section"><div className="sectionHead"><h2>Mais vendidos</h2><a>Ver todos os produtos →</a></div><div className="productGrid">{products.map(p=><article className="productCard" key={p.name}><div className="productImage"><Image src={p.image} alt={p.name} fill style={{objectFit:"cover"}}/><button className="fav"><Heart size={18}/></button></div><h3>{p.name}</h3><div className="stars">★★★★★ <span>(87)</span></div><div className="price">{p.price}</div><div className="installments">em 3x sem juros</div></article>)}</div></section>
<section className="promo"><div className="promoText"><h2>Kits com<br/>desconto especial</h2><p>Perfeito para brindes, clientes e eventos.</p><button className="primary">APROVEITAR OFERTAS →</button></div><div className="promoBadge">KITS A PARTIR DE<br/><strong>50</strong><br/>UNIDADES</div></section>
<footer className="footer"><div><Gift/><strong>Lembrancinhas que encantam</strong><span>Ideal para empresas e eventos especiais.</span></div><div><Heart/><strong>Diversos modelos e temas</strong><span>Natal, profissões e datas especiais.</span></div><div><Gem/><strong>Qualidade e acabamento</strong><span>Tags elegantes com brincos de pérola.</span></div><div><Truck/><strong>Entrega para todo o Brasil</strong><span>Compra online com praticidade.</span></div></footer>
</main>}
