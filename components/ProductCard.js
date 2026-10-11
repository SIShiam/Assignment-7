"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bn } from "@/lib/api";

export function Badge({ v }) {
  const c = v > 0 ? "bg-green-100 text-green-700" : v < 0 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c}`}>{v > 0 ? "▲" : v < 0 ? "▼" : "—"} {bn(Math.abs(v), 1)}%</span>;
}

export default function ProductCard({ p }) {
  const prev = useRef(p.price); const [flash, setFlash] = useState("");
  useEffect(() => {
    if (prev.current !== p.price) {
      setFlash(p.price > prev.current ? "ring-2 ring-red-400" : "ring-2 ring-green-400");
      prev.current = p.price; const t = setTimeout(() => setFlash(""), 2500); return () => clearTimeout(t);
    }
  }, [p.price]);
  return (<Link href={`/product/${p.id}`} className={`block rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${flash}`}>
    <div className="text-4xl">{p.emoji}</div><h3 className="mt-2 font-bold">{p.name}</h3><p className="text-sm text-gray-500">{p.unit}</p>
    <div className="mt-3 flex items-center justify-between"><div><div className="text-xs text-gray-500">আজকের দাম</div><div className="font-bold">{bn(p.price)} টাকা</div></div><Badge v={p.change} /></div></Link>);
}

export const Grid = ({ children }) => <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>;
export const Skeletons = ({ n = 8 }) => <Grid>{Array.from({ length: n }).map((_, i) => <div key={i} className="h-36 animate-pulse rounded-xl bg-gray-200" />)}</Grid>;