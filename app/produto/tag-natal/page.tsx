"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  CreditCard,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

const packs = [
  { qty: 50, price: 69.90 },
  { qty: 100, price: 119.90 },
  { qty: 150, price: 169.90 },
  { qty: 200, price: 219.90 },
  { qty: 300, price: 309.90 },
  { qty: 500, price: 479.90 },
];

function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductPage() {
  const [pack, setPack] = useState(packs[1]);
  const [units, setUnits] = useState(1);
  const [added, setAdded] = useState(false);

  const total = useMemo(() => pack.price * units, [pack, units]);

  function addToCart() {
    const item = {
      id: `tag-natal-${pack.qty}`,
      name: `Kit Tag Natal + Brincos de Pérola — ${pack.qty} unidades`,
      pack: pack.qty,
      quantity: units,
      unitPrice: pack.price,
      image: "/products/natal-vermelho.png",
    };

    const current = JSON.parse(localStorage.getItem("um-mimo-para-voce-cart") || "[]");
    const next = [...current.filter((x: any) => x.id !== item.id), item];
    localStorage.setItem("um-mimo-para-voce-cart", JSON.stringify(next));

    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <main className="productPage">
      <div className="miniHeader">
        <Link href="/" className="backLink">
          <ChevronLeft size={18} /> Voltar para a loja
        </Link>
        <Link href="/" className="miniBrand">Um mimo para você</Link>
        <Link href="/carrinho" className="miniCart">
          <ShoppingBag size={19} /> Carrinho
        </Link>
      </div>

      <section className="productLayout">
        <div className="productGallery">
          <div className="mainProductImage">
            <Image
              src="/products/natal-vermelho.png"
              alt="Tag Natal com brincos de pérola"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="thumbRow">
            {["natal-vermelho.png", "natal-verde.png", "natal-classico.png"].map((img) => (
              <div className="thumb" key={img}>
                <Image src={`/products/${img}`} alt="" fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        <div className="productInfo">
          <span className="productBadge">MAIS VENDIDO</span>
          <h1>Kit Tag Natal + Brincos de Pérola 6mm</h1>

          <div className="productRating">
            <span>★★★★★</span>
            <b>4,9</b>
            <small>87 avaliações</small>
          </div>

          <p className="productIntro">
            Um mimo elegante para clientes, colaboradores e pessoas especiais.
            Cada tag acompanha 1 par de brincos de pérola sintética de 6 mm.
          </p>

          <div className="priceBig">{brl(pack.price)}</div>
          <div className="pixNote">ou pagamento via Pix • preço por kit selecionado</div>

          <div className="selectorBlock">
            <div className="selectorTitle">
              <strong>Escolha a quantidade</strong>
              <span>{pack.qty} tags + {pack.qty} pares de brincos</span>
            </div>
            <div className="packGrid">
              {packs.map((p) => (
                <button
                  key={p.qty}
                  className={pack.qty === p.qty ? "packOption active" : "packOption"}
                  onClick={() => setPack(p)}
                >
                  <strong>{p.qty}</strong>
                  <span>unidades</span>
                  <small>{brl(p.price)}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="purchaseRow">
            <div className="stepper">
              <button onClick={() => setUnits(Math.max(1, units - 1))}><Minus size={17}/></button>
              <span>{units}</span>
              <button onClick={() => setUnits(units + 1)}><Plus size={17}/></button>
            </div>
            <button className="buyButton" onClick={addToCart}>
              <ShoppingBag size={19}/>
              {added ? "Adicionado ao carrinho!" : `Adicionar • ${brl(total)}`}
            </button>
            <button className="heartButton" aria-label="Favoritar"><Heart size={21}/></button>
          </div>

          <div className="deliveryCard">
            <div><Truck/><span><strong>Entrega para todo o Brasil</strong><small>Frete calculado no checkout</small></span></div>
            <div><CreditCard/><span><strong>Pagamento seguro</strong><small>Pix e cartão</small></span></div>
            <div><ShieldCheck/><span><strong>Compra protegida</strong><small>Atendimento antes e depois da compra</small></span></div>
          </div>

          <div className="productDetails">
            <h2>Detalhes do produto</h2>
            <ul>
              <li>Tag temática de Natal.</li>
              <li>1 par de brincos de pérola sintética 6 mm por tag.</li>
              <li>Ideal para brindes, clientes, confraternizações e eventos.</li>
              <li>Não realizamos personalização.</li>
              <li>O modelo é enviado conforme as imagens do anúncio.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="productBottom">
        <h2>Uma lembrança simples, bonita e pronta para encantar</h2>
        <p>
          Escolha o tamanho do kit que melhor atende sua necessidade e transforme
          seu presente de fim de ano em uma experiência mais especial.
        </p>
      </section>
    </main>
  );
}