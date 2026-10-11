"use client";
import { useEffect, useState } from "react"; import { useRouter } from "next/navigation"; import toast from "react-hot-toast"; import { useSession, updateUser } from "@/lib/auth-client";
export default function Update() {
  const r = useRouter(); const { data: s, isPending } = useSession(); const [name, setName] = useState("");
  useEffect(() => { if (!isPending && !s?.user) r.replace("/signin"); else if (s?.user) setName(s.user.name || ""); }, [isPending, s?.user?.id]);
  const submit = async (e) => { e.preventDefault(); if (!name.trim()) return toast.error("নাম দিন");
    const { error } = await updateUser({ name }); if (error) return toast.error(error.message || "আপডেট ব্যর্থ"); toast.success("তথ্য আপডেট হয়েছে"); r.push("/profile"); };
  return (<form onSubmit={submit} className="mx-auto grid max-w-sm gap-3 rounded-xl bg-white p-6 shadow-sm"><h1 className="text-xl font-bold">তথ্য আপডেট</h1>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="নাম" className="input" /><button className="btn btn-primary">Update Information</button></form>);
}
