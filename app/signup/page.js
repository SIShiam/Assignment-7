"use client";
import { useState } from "react"; import Link from "next/link"; import { useRouter } from "next/navigation"; import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client"; import Social from "@/components/SocialButtons";
export default function SignUp() {
  const r = useRouter(); const [busy, setBusy] = useState(false);
  const submit = async (e) => { e.preventDefault(); const f = new FormData(e.target);
    if (!f.get("name") || !f.get("email")) return toast.error("সব ঘর পূরণ করুন"); if (f.get("password").length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setBusy(true); const { error } = await signUp.email({ name: f.get("name"), email: f.get("email"), password: f.get("password") }); setBusy(false);
    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে"); toast.success("রেজিস্ট্রেশন সফল! এখন লগইন করুন"); r.push("/signin"); };
  return (<div className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-sm"><h1 className="mb-4 text-2xl font-bold">সাইন আপ</h1>
    <form onSubmit={submit} className="grid gap-3"><input name="name" placeholder="নাম" className="input" /><input name="email" type="email" placeholder="ইমেইল" className="input" /><input name="password" type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input" />
      <button disabled={busy} className="btn btn-primary">{busy ? "অপেক্ষা করুন…" : "রেজিস্টার"}</button></form><Social />
    <p className="mt-4 text-center text-sm">আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="text-green-700 underline">সাইন ইন</Link></p></div>);
}
