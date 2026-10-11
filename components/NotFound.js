import Link from "next/link";
export default function NotFound({ text = "পাতাটি খুঁজে পাওয়া যায়নি" }) {
  return (<div className="py-20 text-center"><div className="text-6xl">🧺</div><h1 className="mt-4 text-3xl font-bold">৪০৪</h1><p className="mt-2 text-gray-600">{text}</p>
    <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link></div>);
}
