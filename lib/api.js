const BASES = ["https://api.api-store.workers.dev/api/bazardor", "https://api.abcz.workers.dev/api/bazardor"];
export async function getJSON(path) {
  for (const b of BASES) {
    try { const r = await fetch(b + path, { cache: "no-store" }); if (r.ok) return await r.json(); } catch {}
  }
  throw new Error("API unavailable");
}
const EN = "০১২৩৪৫৬৭৮৯";
export const num = (v) => { if (typeof v === "number") return v;
  const s = String(v ?? "").replace(/[০-৯]/g, (d) => EN.indexOf(d)).replace(/[^\d.\-]/g, ""); return parseFloat(s) || 0; };
export const bn = (n, d = 0) => Number(n).toLocaleString("bn-BD", { maximumFractionDigits: d });
const list = (d) => Array.isArray(d) ? d : d?.data || d?.products || d?.categories || [];

const UNITS = { kg: "প্রতি কেজি", litre: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস" };

export function normalize(p) {
  const markets = Array.isArray(p.markets) ? p.markets : [];
  const mins = markets.map((m) => num(m.min)).filter(Boolean);
  const maxs = markets.map((m) => num(m.max)).filter(Boolean);
  const mids = markets.map((m) => (num(m.min) + num(m.max)) / 2).filter(Boolean);
  const price = num(p.today);
  const pct = Math.abs(num(p.change?.pct));
  const change = p.change?.dir === "down" ? -pct : p.change?.dir === "up" ? pct : 0;
  return {
    id: p.id, slug: p.slug ?? String(p.id), name: p.nameBn, emoji: p.image || p.categoryIcon || "🛒",
    unit: UNITS[p.unit] ?? p.unit, price, change,
    yesterday: num(p.yesterday), lastWeek: num(p.lastWeek), lastMonth: num(p.lastMonth),
    category: p.category, categoryName: p.categoryNameBn, categoryIcon: p.categoryIcon, markets,
    min: mins.length ? Math.min(...mins) : price,
    max: maxs.length ? Math.max(...maxs) : price,
    avg: mids.length ? Math.round(mids.reduce((a, b) => a + b, 0) / mids.length) : price,
  };
}
export const toProducts = (d) => list(d).map(normalize);