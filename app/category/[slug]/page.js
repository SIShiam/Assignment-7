"use client";
import { useState } from "react"; import { useParams } from "next/navigation";
import { useProducts, useCategories } from "@/lib/hooks"; import ProductCard, { Grid, Skeletons } from "@/components/ProductCard"; import NotFound from "@/components/NotFound";
export default function Category() {
  const { slug } = useParams(); const { data } = useProducts(); const { data: cats } = useCategories(); const [sort, setSort] = useState("default");
  if (!data || !cats) return <Skeletons />;
  const cat = cats.find((c) => String(c.slug) === slug); let list = data.filter((p) => String(p.category) === slug);
  if (!cat && !list.length) return <NotFound text="এই ক্যাটাগরিতে কোনো পণ্য নেই" />;
  if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price); if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
  return (<><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">{cat?.icon} {cat?.name || slug}</h1>
    <label className="flex items-center gap-2 text-sm">সাজান:<select value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto">
      <option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select></label></div>
    {list.length ? <Grid>{list.map((p) => <ProductCard key={p.id} p={p} />)}</Grid> : <NotFound text="কোনো পণ্য পাওয়া যায়নি" />}</>);
}
