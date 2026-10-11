"use client";
import { useEffect } from "react"; import Link from "next/link"; import { useParams, useRouter } from "next/navigation"; import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client"; import { useProducts } from "@/lib/hooks"; import { bn } from "@/lib/api"; import NotFound from "@/components/NotFound";

const fmt = (a) => (Number.isInteger(a) ? bn(a) : a.toLocaleString("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

export default function Detail() {
  const { slug } = useParams(); const router = useRouter(); const { data: s, isPending } = useSession(); const { data, error } = useProducts();
  useEffect(() => { if (!isPending && !s?.user) { toast.error("পণ্যের বিস্তারিত দেখতে লগইন করুন"); router.replace("/signin"); } }, [isPending, s]);
  if (isPending || !s?.user || !data) return error ? <NotFound text="ডেটা লোড করা যায়নি" /> : <div className="h-64 animate-pulse rounded-xl bg-gray-200" />;
  const p = data.find((x) => x.slug === slug || String(x.id) === slug);
  if (!p) return <NotFound text="পণ্যটি খুঁজে পাওয়া যায়নি" />;

  const unit = p.unit.replace("প্রতি ", "");
  const diff = p.price - p.yesterday;
  const trend = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত আছে";
  const col = p.change > 0 ? "text-red-600" : p.change < 0 ? "text-green-600" : "text-gray-500";
  const rows = p.markets.map((m) => ({ ...m, avg: (m.min + m.max) / 2 })).sort((a, b) => a.avg - b.avg);
  const minM = [...p.markets].sort((a, b) => a.min - b.min)[0]; const maxM = [...p.markets].sort((a, b) => b.max - a.max)[0];

  return (<div className="mx-auto max-w-4xl">
    <nav className="mb-4 text-xs text-gray-500"><Link href="/" className="hover:underline">হোম</Link> › <Link href={`/category/${p.category}`} className="hover:underline">{p.categoryName}</Link> › <span className="text-gray-800">{p.name}</span></nav>

    <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-4xl">{p.emoji}</div>
        <div><h1 className="text-2xl font-bold">{p.name}</h1>
          <p className="text-xs text-gray-500">{p.unit} · {p.categoryName}</p>
          <p className="mt-1 text-sm">গতকালের তুলনায় আজ দাম <b>{trend}</b>{diff !== 0 && <> · {bn(Math.abs(diff))} টাকা</>}</p></div></div>
      <div className="rounded-xl bg-green-50 px-6 py-3 text-center">
        <div className="text-xs text-gray-500">আজকের দাম</div><div className="text-3xl font-bold">{bn(p.price)}</div>
        <div className="text-xs text-gray-500">টাকা / {unit}</div>
        <div className={`text-xs font-semibold ${col}`}>{p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {bn(Math.abs(p.change), 1)}%</div></div>
    </div>

    <section className="mt-6 rounded-2xl border bg-white p-5"><h2 className="mb-3 font-bold">দামের সারসংক্ষেপ</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-4"><div className="text-xs text-gray-500">সর্বনিম্ন দাম</div><div className="text-2xl font-bold text-green-600">{bn(p.min)} <span className="text-sm font-normal">টাকা</span></div><div className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার{minM && ` · ${minM.market}`}</div></div>
        <div className="rounded-xl border p-4"><div className="text-xs text-gray-500">সর্বোচ্চ দাম</div><div className="text-2xl font-bold text-red-600">{bn(p.max)} <span className="text-sm font-normal">টাকা</span></div><div className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার{maxM && ` · ${maxM.market}`}</div></div>
        <div className="rounded-xl border p-4"><div className="text-xs text-gray-500">গড় দাম</div><div className="text-2xl font-bold text-green-700">{bn(p.price)} <span className="text-sm font-normal">টাকা</span></div><div className="text-xs text-gray-500">{p.unit}-এর হিসাব</div></div>
      </div></section>

    <section className="mt-6 overflow-x-auto rounded-2xl border bg-white p-5"><h2 className="mb-3 font-bold">বাজারভিত্তিক আজকের দাম</h2>
      <table className="w-full min-w-[520px] text-sm"><thead><tr className="text-left text-gray-500"><th className="py-2">বাজার</th><th>বিভাগ</th><th className="text-right">সর্বনিম্ন</th><th className="text-right">সর্বোচ্চ</th><th className="text-right">গড়</th></tr></thead>
        <tbody>{rows.map((m, i) => <tr key={i} className={`border-t ${i % 2 ? "bg-gray-50" : ""}`}><td className="py-2.5">{m.market}</td><td>{m.division}</td><td className="text-right">{bn(m.min)} টাকা</td><td className="text-right">{bn(m.max)} টাকা</td><td className="text-right font-bold">{fmt(m.avg)} টাকা</td></tr>)}</tbody></table></section>
  </div>);
}