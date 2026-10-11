"use client";
import { useEffect, useState } from "react";
import { useProducts } from "@/lib/hooks";
export default function LiveBar() {
  const { error, at } = useProducts();
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const ago = at ? Math.floor((now - at.getTime()) / 1000) : 0;
  return (
    <div className="bg-green-50 py-1 text-center text-xs text-green-800">
      <span className={`mr-1 inline-block h-2 w-2 rounded-full ${error ? "bg-red-500" : "animate-pulse bg-green-500"}`} />
      {error ? "সংযোগ সমস্যা" : "লাইভ"} ·{" "}
      {at ? `সর্বশেষ আপডেট: ${at.toLocaleTimeString("bn-BD")} (${ago.toLocaleString("bn-BD")} সেকেন্ড আগে)` : "লোড হচ্ছে…"}
    </div>
  );
}