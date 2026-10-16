"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { getCartCount, onCartChange } from "../lib/cart";

/** Link do carrinho com contador de kits. */
export default function CartLink({
  className,
  label = "Meu carrinho",
  size = 21,
}: {
  className?: string;
  label?: string;
  size?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCartCount());
    return onCartChange(() => setCount(getCartCount()));
  }, []);

  return (
    <Link
      href="/carrinho"
      className={className}
      aria-label={count > 0 ? `${label}: ${count} ${count === 1 ? "kit" : "kits"}` : label}
    >
      <span className="cartIconWrap">
        <ShoppingBag size={size} />
        {count > 0 && <span className="cartCount">{count}</span>}
      </span>
      <span>{label}</span>
    </Link>
  );
}
