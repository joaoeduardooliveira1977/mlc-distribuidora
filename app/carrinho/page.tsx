"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import { brl } from "../../lib/catalog";
import { whatsappLink } from "../../lib/config";
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

  const [name, setName] = useState("");
  const [cep, setCep] = useState("");

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  function orderMessage(): string {
    const items = lines
      .map(
        (l) =>
          `• ${l.quantity}x ${l.name} — Kit com ${l.pack} tags (${brl(l.unitPrice)} cada) = ${brl(l.lineTotal)}`
      )
      .join("\n");
    const extras: string[] = [];
    if (name.trim()) extras.push(`Nome: ${name.trim()}`);
    if (cep.trim()) extras.push(`CEP para o frete: ${cep.trim()}`);

    const blocks = [
      "Olá! Quero fazer este pedido pelo site Um mimo para você:",
      items,
      `Total dos produtos: ${brl(total)} (sem frete)`,
    ];
    if (extras.length) blocks.push(extras.join("\n"));
    return blocks.join("\n\n");
  }

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
            <div className="whatsCheckout">
              <h2>Finalize seu pedido pelo WhatsApp</h2>
              <p>
                Enviamos o pedido pronto para a nossa conversa. Lá combinamos o frete e o
                pagamento por Pix ou cartão.
              </p>
              <div className="whatsFields">
                <label>
                  <span>Seu nome <small>(opcional)</small></span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Como podemos te chamar?"
                  />
                </label>
                <label>
                  <span>CEP <small>(opcional, para calcular o frete)</small></span>
                  <input
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/[^\d-]/g, "").slice(0, 9))}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                  />
                </label>
              </div>
            </div>
            <div className="cartActions">
              <button type="button" className="clearButton" onClick={clearCart}>
                <Trash2 size={17} /> Esvaziar carrinho
              </button>
              <a
                className="checkoutButton whatsButton"
                href={whatsappLink(orderMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} /> Finalizar pelo WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
