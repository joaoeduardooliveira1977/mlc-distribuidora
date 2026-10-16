"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Trash2 } from "lucide-react";

function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("um-mimo-para-voce-cart") || "[]"));
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  function clearCart() {
    localStorage.removeItem("um-mimo-para-voce-cart");
    setItems([]);
  }

  return (
    <main className="cartPage">
      <div className="cartShell">
        <Link href="/" className="backLink"><ArrowLeft size={18}/> Continuar comprando</Link>
        <h1>Meu carrinho</h1>

        {items.length === 0 ? (
          <div className="emptyCart">
            <p>Seu carrinho ainda está vazio.</p>
            <Link className="primaryLink" href="/">Ver produtos</Link>
          </div>
        ) : (
          <>
            <div className="cartList">
              {items.map(item => (
                <div className="cartItem" key={item.id}>
                  <div className="cartImg">
                    <Image src={item.image} alt="" fill style={{objectFit:"cover"}}/>
                  </div>
                  <div className="cartText">
                    <strong>{item.name}</strong>
                    <span>Quantidade de kits: {item.quantity}</span>
                  </div>
                  <b>{brl(item.unitPrice * item.quantity)}</b>
                </div>
              ))}
            </div>
            <div className="cartSummary">
              <span>Total</span>
              <strong>{brl(total)}</strong>
            </div>
            <div className="cartActions">
              <button className="clearButton" onClick={clearCart}><Trash2 size={17}/> Limpar</button>
              <button className="checkoutButton">Ir para checkout</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}