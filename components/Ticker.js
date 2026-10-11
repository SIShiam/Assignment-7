"use client";
import { useProducts } from "@/lib/hooks"; import { bn } from "@/lib/api";
export default function Ticker() {
  const { data } = useProducts(); if (!data?.length) return <div className="h-8 bg-green-700" />;
  const items = [...data, ...data];
  return (<div className="overflow-hidden bg-green-700 py-1.5 text-sm text-white"><div className="marquee">
    {items.map((p, i) => <span key={i} className="mx-4 whitespace-nowrap">{p.emoji} {p.name} {bn(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}{" "}
      <b className={p.change > 0 ? "text-red-200" : p.change < 0 ? "text-green-200" : "text-gray-200"}>{p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {bn(Math.abs(p.change), 1)}%</b></span>)}</div></div>);
}
