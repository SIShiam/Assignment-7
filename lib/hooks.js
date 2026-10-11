"use client";
import { createContext, createElement, useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import { getJSON, toProducts } from "./api";

export function usePolled(path, mapper, ms = 15000) {
  const [data, setData] = useState(null); const [error, setError] = useState(false); const [at, setAt] = useState(null);
  const load = useCallback(async () => { try { setData(mapper(await getJSON(path))); setAt(new Date()); setError(false); } catch (e) { console.error("LOAD ERROR:", path, e); setError(true); } }, [path, mapper]);
  useEffect(() => { load(); const t = setInterval(load, ms); const v = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", v); return () => { clearInterval(t); document.removeEventListener("visibilitychange", v); }; }, [load, ms]);
  return { data, error, at };
}

const Ctx = createContext(null);
export function ProductsProvider({ children }) {
  const drift = useRef({});
  const mapper = useCallback((d) => toProducts(d).map((p) => {
    if (process.env.NEXT_PUBLIC_SIMULATE !== "true") return p;
    const x = (drift.current[p.id] ?? 0) + (Math.random() - 0.5) * 2;
    drift.current[p.id] = Math.max(-8, Math.min(8, x));
    return { ...p, price: Math.max(1, Math.round(p.price * (1 + drift.current[p.id] / 100))), change: +(p.change + drift.current[p.id]).toFixed(1) };
  }), []);
  const v = usePolled("/products", mapper, 10000);
  return createElement(Ctx.Provider, { value: v }, children);
}
export const useProducts = () => useContext(Ctx) || { data: null, error: false, at: null };

export function useCategories() {
  const { data, error, at } = useProducts();
  const cats = useMemo(() => data ? [...new Map(data.map((p) => [p.category, { slug: p.category, name: p.categoryName, icon: p.categoryIcon }])).values()] : null, [data]);
  return { data: cats, error, at };
}