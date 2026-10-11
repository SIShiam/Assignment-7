"use client";
import Image from "next/image"; import { useProducts } from "@/lib/hooks"; import ProductCard, { Grid, Skeletons } from "@/components/ProductCard";
export default function Home() {
  const { data, error, at } = useProducts();
  const up = data?.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const down = data?.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);
  const Sec = ({ t, list }) => <section className="mt-10"><h2 className="mb-4 text-xl font-bold">{t}</h2>{list ? <Grid>{list.map((p) => <ProductCard key={p.id} p={p} />)}</Grid> : <Skeletons n={3} />}</section>;
  return (<>
    <section className="grid items-center gap-6 md:grid-cols-2"><div>
      <p className="text-sm font-semibold text-green-700">প্রতিদিনের বাজারদর</p>
      <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">আজকের বাজারদর, এক নজরে</h1>
      <p className="mt-3 text-gray-600">চাল, ডাল, সবজি, মাছ-মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম জানুন লাইভ আপডেটে।</p>
      <a href="#সব-পণ্য" className="btn btn-primary mt-5">সব পণ্য দেখুন ↓</a></div>
      <Image src="/hero.png" alt="hero" width={420} height={300} priority className="mx-auto h-auto w-full max-w-sm" /></section>
    {error && !data && <p className="mt-6 rounded bg-red-50 p-3 text-red-700">ডেটা লোড করা যায়নি। আবার চেষ্টা করা হচ্ছে…</p>}
    <Sec t="আজ দাম বেড়েছে ▲" list={up} /><Sec t="আজ দাম কমেছে ▼" list={down} />
    <section id="সব-পণ্য" className="mt-10 scroll-mt-32"><h2 className="text-xl font-bold">সব পণ্য</h2>
      <p className="mb-4 text-sm text-gray-500">প্রতি ১৫ সেকেন্ডে লাইভ আপডেট{at && ` · সর্বশেষ: ${at.toLocaleTimeString("bn-BD")}`}</p>
      {data ? <Grid>{data.map((p) => <ProductCard key={p.id} p={p} />)}</Grid> : <Skeletons />}</section></>);
}
