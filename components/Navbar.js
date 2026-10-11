"use client";
import Link from "next/link"; import Image from "next/image"; import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client"; import { useCategories, useProducts } from "@/lib/hooks";
import Ticker from "./Ticker";
export default function Navbar() {
  const path = usePathname(); const router = useRouter(); const { data: s } = useSession(); const { data: cats } = useCategories();
  const date = new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const out = async () => { await signOut(); toast.success("সাইন আউট হয়েছে"); router.push("/"); };
  return (<header className="sticky top-0 z-30 bg-white shadow-sm">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
      <Link href="/" className="flex items-center gap-2"><Image src="/logo.png" alt="logo" width={32} height={32} />
        <div><div className="text-lg font-bold text-green-700">🛒 বাজার দর</div><div className="text-xs text-gray-500">{date}</div></div></Link>
      <div className="flex items-center gap-2">{s?.user ? (<>
        <Link href="/profile" className="btn btn-ghost">{s.user.name?.split(" ")[0] || "প্রোফাইল"}</Link>
        <button onClick={out} className="btn btn-primary">সাইন আউট</button></>) : (<>
        <Link href="/signin" className="btn btn-ghost">সাইন ইন</Link><Link href="/signup" className="btn btn-primary">সাইন আপ</Link></>)}</div>
      <nav className="flex w-full gap-2 overflow-x-auto pb-1 md:order-none">
        <Link href="/" className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${path === "/" ? "bg-green-600 text-white" : "bg-gray-100"}`}>হোম</Link>
        {cats?.map((c) => <Link key={c.slug} href={`/category/${c.slug}`} className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${path === `/category/${c.slug}` ? "bg-green-600 text-white" : "bg-gray-100"}`}>{c.icon} {c.name}</Link>)}
      </nav></div><Ticker /></header>);
}
