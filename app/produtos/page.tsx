
import Image from "next/image";
import Link from "next/link";
import products from "../../data/products.json";
export default function Produtos(){
 const cats=Array.from(new Set(products.map(p=>p.category)));
 return <main className="catalogPage"><div className="catalogHeader"><Link href="/" className="miniBrand">Um mimo para você</Link><h1>Todos os produtos</h1><p>Escolha por categoria e encontre o mimo ideal.</p></div>
 {cats.map(c=><section className="catalogSection" key={c}><div className="sectionHead"><h2>{c}</h2></div><div className="productGrid productGridV3">{products.filter(p=>p.category===c).map(p=><Link className="productCard productCardV3" key={p.slug} href={`/produto/${p.slug}`}><div className="productImage"><Image src={p.image} alt={p.name} fill style={{objectFit:"cover"}}/></div><div className="productMeta">{p.category}</div><h3>{p.name}</h3><div className="productCta">Ver opções</div></Link>)}</div></section>)}
 </main>;
}
