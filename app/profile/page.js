"use client";
import { useEffect } from "react"; import Link from "next/link"; import { useRouter } from "next/navigation"; import { useSession } from "@/lib/auth-client";
export default function Profile() {
  const r = useRouter(); const { data: s, isPending } = useSession();
  useEffect(() => { if (!isPending && !s?.user) r.replace("/signin"); }, [isPending, s]);
  if (!s?.user) return <div className="h-48 animate-pulse rounded-xl bg-gray-200" />;
  const u = s.user;
  return (<div className="mx-auto max-w-sm rounded-xl bg-white p-6 text-center shadow-sm">
    {u.image ? <img src={u.image} alt="" className="mx-auto h-20 w-20 rounded-full" /> : <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl">{u.name?.[0]}</div>}
    <h1 className="mt-3 text-xl font-bold">{u.name}</h1><p className="text-gray-600">{u.email}</p><Link href="/profile/update" className="btn btn-primary mt-4">তথ্য আপডেট করুন</Link></div>);
}
