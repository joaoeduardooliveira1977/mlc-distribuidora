import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PACK_PRICES, brl, getMinPackPrice, type Product } from "../lib/catalog";

/** Card de produto usado na home e no catálogo, com preço "a partir de". */
export default function ProductCard({ product }: { product: Product }) {
  // kit com o menor preço por tag (normalmente o maior)
  const bestPack = product.packs.reduce((best, q) =>
    PACK_PRICES[q] / q < PACK_PRICES[best] / best ? q : best
  );
  return (
    <Link className="productCard productCardV3" href={`/produto/${product.slug}`}>
      <div className="productImage">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 17vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="productMeta">{product.category}</div>
      <h3>{product.name}</h3>
      <div className="cardPrice">
        <small>Kits a partir de</small>
        <strong>{brl(getMinPackPrice(product))}</strong>
        <span>{brl(PACK_PRICES[bestPack] / bestPack)} por tag no kit de {bestPack}</span>
      </div>
      <div className="productCta">Ver opções <ChevronRight size={14} /></div>
    </Link>
  );
}
