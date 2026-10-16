import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";
import PurchaseBox from "../../../components/PurchaseBox";
import CartLink from "../../../components/CartLink";
import { getProduct, products } from "../../../lib/catalog";

type Props = { params: { slug: string } };

// Gera todas as páginas de produto no build (HTML pronto para o Google).
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | Um mimo para você`,
    description: `${product.short} ${product.description}`,
    openGraph: {
      title: product.name,
      description: product.short,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="productPage">
      <div className="miniHeader">
        <Link href="/produtos" className="backLink">
          <ChevronLeft size={18} /> Voltar para a loja
        </Link>
        <Link href="/" className="miniBrand">Um mimo para você</Link>
        <CartLink className="miniCart" label="Carrinho" size={18} />
      </div>

      <section className="productLayout">
        <div className="productGallery">
          <div className="mainProductImage">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 850px) 100vw, 600px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="productInfo">
          <span className="productBadge">{product.category.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <p className="productIntro">{product.short}</p>
          <p className="productDescription">{product.description}</p>

          <PurchaseBox slug={product.slug} packs={product.packs} />

          <div className="deliveryCard">
            <div><Truck /><span><strong>Entrega para todo o Brasil</strong><small>Frete calculado no checkout</small></span></div>
            <div><CreditCard /><span><strong>Pagamento seguro</strong><small>Pix e cartão</small></span></div>
            <div><ShieldCheck /><span><strong>Compra protegida</strong><small>Atendimento antes e depois da compra</small></span></div>
          </div>

          <div className="productDetails">
            <h2>Detalhes do produto</h2>
            <ul>
              <li>Cada tag acompanha 1 par de brincos de pérola.</li>
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
          seu presente em uma experiência mais especial.
        </p>
      </section>
    </main>
  );
}
