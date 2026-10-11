"use client";
import { useState } from "react"; import Link from "next/link"; import { useRouter } from "next/navigation"; import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client"; import Social from "@/components/SocialButtons";
export default function SignIn() {
  const r = useRouter(); const [busy, setBusy] = useState(false);
  const submit = async (e) => { e.preventDefault(); const f = new FormData(e.target); if (!f.get("email") || !f.get("password")) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    setBusy(true); const { error } = await signIn.email({ email: f.get("email"), password: f.get("password") }); setBusy(false);
    if (error) return toast.error(error.message || "লগইন ব্যর্থ হয়েছে"); toast.success("সফলভাবে লগইন হয়েছে"); r.push("/"); r.refresh(); };
  return (<div className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-sm"><h1 className="mb-4 text-2xl font-bold">সাইন ইন</h1>
    <form onSubmit={submit} className="grid gap-3"><input name="email" type="email" placeholder="ইমেইল" className="input" /><input name="password" type="password" placeholder="পাসওয়ার্ড" className="input" />
      <button disabled={busy} className="btn btn-primary">{busy ? "অপেক্ষা করুন…" : "লগইন"}</button></form><Social />
    <p className="mt-4 text-center text-sm">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-green-700 underline">সাইন আপ</Link></p></div>);
}
