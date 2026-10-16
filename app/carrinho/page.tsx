"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2, X } from "lucide-react";
import { brl } from "../../lib/catalog";
import {
  type CartLine,
  clearCart,
  getCartLines,
  onCartChange,
  removeFromCart,
  setQuantity,
} from "../../lib/cart";

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => setLines(getCartLines());
    refresh();
    setLoaded(true);
    return onCartChange(refresh);
  }, []);

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  return (
    <main className="cartPage">
      <div className="cartShell">
        <Link href="/produtos" className="backLink"><ArrowLeft size={18} /> Continuar comprando</Link>
        <h1>Meu carrinho</h1>

        {!loaded ? null : lines.length === 0 ? (
          <div className="emptyCart">
            <p>Seu carrinho ainda está vazio.</p>
            <Link className="primaryLink" href="/produtos">Ver produtos</Link>
          </div>
        ) : (
          <>
            <div className="cartList">
              {lines.map((line) => (
                <div className="cartItem" key={`${line.slug}-${line.pack}`}>
                  <Link href={`/produto/${line.slug}`} className="cartImg">
                    <Image src={line.image} alt="" fill sizes="92px" style={{ objectFit: "cover" }} />
                  </Link>
                  <div className="cartText">
                    <strong>{line.name}</strong>
                    <span>Kit com {line.pack} tags • {brl(line.unitPrice)} cada kit</span>
                    <div className="cartQty">
                      <div className="stepper stepperSmall">
                        <button
                          type="button"
                          aria-label="Diminuir quantidade de kits"
                          onClick={() => setQuantity(line.slug, line.pack, line.quantity - 1)}
                        >
                          <Minus size={15} />
                        </button>
                        <span>{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Aumentar quantidade de kits"
                          onClick={() => setQuantity(line.slug, line.pack, line.quantity + 1)}
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="removeButton"
                        onClick={() => removeFromCart(line.slug, line.pack)}
                      >
                        <X size={14} /> Remover
                      </button>
                    </div>
                  </div>
                  <b>{brl(line.lineTotal)}</b>
                </div>
              ))}
            </div>
            <div className="cartSummary">
              <span>Total (sem frete)</span>
              <strong>{brl(total)}</strong>
            </div>
            <div className="cartActions">
              <button type="button" className="clearButton" onClick={clearCart}>
                <Trash2 size={17} /> Esvaziar carrinho
              </button>
              <button
                type="button"
                className="checkoutButton"
                disabled
                title="Pagamento online em breve"
              >
                Checkout em breve
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
