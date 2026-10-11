import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import LiveBar from "@/components/LiveBar";
import Footer from "@/components/Footer";
import { ProductsProvider } from "@/lib/hooks";

export const metadata = { title: "বাজার দর", description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।", icons: { icon: "/logo.png" } };

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap" rel="stylesheet" /></head>
      <body>
        <Toaster position="top-center" />
        <ProductsProvider>
          <Navbar />
          <LiveBar />
          <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-6">{children}</main>
        </ProductsProvider>
        <Footer />
      </body>
    </html>
  );
}