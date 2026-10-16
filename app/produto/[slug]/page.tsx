
"use client";
import Image from "next/image";
import Link from "next/link";
import {useMemo,useState} from "react";
import {useParams} from "next/navigation";
import {ChevronLeft,ShoppingBag,Minus,Plus,Truck,CreditCard,ShieldCheck} from "lucide-react";
import products from "../../../data/products.json";
const prices:Record<number,number>={50:69.9,100:119.9,150:169.9,200:219.9,300:309.9,500:479.9};
const brl=(v:number)=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
export default function Product(){
 const params=useParams(); const product=products.find(p=>p.slug===String(params.slug));
 const [pack,setPack]=useState(100); const [units,setUnits]=useState(1); const [added,setAdded]=useState(false);
 if(!product) return <main className="cartPage"><div className="cartShell"><Link href="/">Voltar</Link><h1>Produto não encontrado</h1></div></main>;
 const price=prices[pack], total=useMemo(()=>price*units,[price,units]);
 function add(){const item={id:`${product.slug}-${pack}`,name:`${product.name} — ${pack} unidades`,pack,quantity:units,unitPrice:price,image:product.image};
 const cur=JSON.parse(localStorage.getItem("um-mimo-para-voce-cart")||"[]"); localStorage.setItem("um-mimo-para-voce-cart",JSON.stringify([...cur.filter((x:any)=>x.id!==item.id),item])); setAdded(true); setTimeout(()=>setAdded(false),1800);}
 return <main className="productPage"><div className="miniHeader"><Link href="/" className="backLink"><ChevronLeft size={18}/>Voltar</Link><Link href="/" className="miniBrand">Um mimo para você</Link><Link href="/carrinho" className="miniCart"><ShoppingBag size={18}/>Carrinho</Link></div>
 <section className="productLayout"><div className="productGallery"><div className="mainProductImage"><Image src={product.image} alt={product.name} fill style={{objectFit:"cover"}}/></div></div>
 <div className="productInfo"><span className="productBadge">{product.category.toUpperCase()}</span><h1>{product.name}</h1><p className="productIntro">{product.short}</p><p className="productDescription">{product.description}</p><div className="priceBig">{brl(price)}</div>
 <div className="selectorBlock"><div className="selectorTitle"><strong>Escolha a quantidade</strong><span>{pack} tags + {pack} pares</span></div><div className="packGrid">{product.packs.map(q=><button key={q} className={pack===q?"packOption active":"packOption"} onClick={()=>setPack(q)}><strong>{q}</strong><span>unidades</span><small>{brl(prices[q])}</small></button>)}</div></div>
 <div className="purchaseRow"><div className="stepper"><button onClick={()=>setUnits(Math.max(1,units-1))}><Minus size={17}/></button><span>{units}</span><button onClick={()=>setUnits(units+1)}><Plus size={17}/></button></div><button className="buyButton" onClick={add}>{added?"Adicionado!":`Adicionar • ${brl(total)}`}</button></div>
 <div className="deliveryCard"><div><Truck/><span><strong>Entrega para todo o Brasil</strong><small>Frete no checkout</small></span></div><div><CreditCard/><span><strong>Pagamento seguro</strong><small>Pix e cartão</small></span></div><div><ShieldCheck/><span><strong>Compra protegida</strong><small>Atendimento antes e depois</small></span></div></div>
 </div></section></main>;
}
