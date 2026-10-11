"use client";
import toast from "react-hot-toast"; import { signIn } from "@/lib/auth-client";
export default function Social() {
  const go = async (provider) => { const r = await signIn.social({ provider, callbackURL: "/" }); if (r?.error) toast.error(r.error.message || "সোশ্যাল লগইন ব্যর্থ"); };
  return (<div className="mt-4 grid gap-2"><div className="text-center text-xs text-gray-400">অথবা</div>
    <button onClick={() => go("google")} className="btn btn-ghost">Google দিয়ে চালিয়ে যান</button><button onClick={() => go("github")} className="btn btn-ghost">GitHub দিয়ে চালিয়ে যান</button></div>);
}
