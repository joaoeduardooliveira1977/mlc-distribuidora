"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { DEFAULT_PACK, PACK_PRICES, brl } from "../lib/catalog";
import { addToCart } from "../lib/cart";

/** Seletor de kit, quantidade de kits e botão de compra. */
export default function PurchaseBox({ slug, packs }: { slug: string; packs: number[] }) {
  const [pack, setPack] = useState(packs.includes(DEFAULT_PACK) ? DEFAULT_PACK : packs[0]);
  const [kits, setKits] = useState(1);
  const [added, setAdded] = useState(false);

  const price = PACK_PRICES[pack];
  const total = price * kits;

  function handleAdd() {
    addToCart(slug, pack, kits);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <div className="priceBig">{brl(price)}</div>
      <div className="pixNote">
        Preço do kit com {pack} tags • {brl(price / pack)} por tag
      </div>

      <div className="selectorBlock">
        <div className="selectorTitle">
          <strong>Escolha o tamanho do kit</strong>
          <span>
            {pack} tags + {pack} pares de brincos
          </span>
        </div>
        <div className="packGrid" role="radiogroup" aria-label="Tamanho do kit">
          {packs.map((q) => (
            <button
              key={q}
              type="button"
              role="radio"
              aria-checked={pack === q}
              className={pack === q ? "packOption active" : "packOption"}
              onClick={() => setPack(q)}
            >
              <span>Kit com</span>
              <strong>{q}</strong>
              <span>tags</span>
              <small>{brl(PACK_PRICES[q])}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="purchaseRow">
        <div className="stepperWrap">
          <span className="stepperLabel">Quantidade de kits</span>
          <div className="stepper">
            <button
              type="button"
              aria-label="Diminuir quantidade de kits"
              onClick={() => setKits(Math.max(1, kits - 1))}
            >
              <Minus size={17} />
            </button>
            <span aria-live="polite">{kits}</span>
            <button type="button" aria-label="Aumentar quantidade de kits" onClick={() => setKits(kits + 1)}>
              <Plus size={17} />
            </button>
          </div>
        </div>
        <button type="button" className="buyButton" onClick={handleAdd}>
          <ShoppingBag size={19} />
          {added ? "Adicionado ao carrinho!" : `Adicionar • ${brl(total)}`}
        </button>
      </div>
    </>
  );
}
