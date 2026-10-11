# 🛒 বাজার দর (BazarDor)
প্রয়োজনীয় পণ্যের দাম এক নজরে — a live grocery price tracker for Bangladesh.

## Technologies
Next.js 14 (App Router) · Tailwind CSS · BetterAuth (email/password, Google, GitHub) · PostgreSQL (`pg`) · react-hot-toast

## Features
1. Live price updates (auto-refresh every 15s) with an infinite price ticker
2. Top 6 risers / fallers and an all-products grid with Bengali numerals
3. Category pages with numeric price sorting and skeleton loaders
4. BetterAuth sign in / sign up with Google & GitHub, toast feedback
5. Protected product detail page with min / max / avg / market-wise prices
6. Profile page with update-name form; friendly 404 pages; fully responsive

## Setup
```bash
npm install
cp .env.example .env.local   # fill values
npm run migrate              # creates BetterAuth tables
npm run dev
```
OAuth callbacks: `{URL}/api/auth/callback/google` and `/github`. Deploy on Vercel and set the same env vars (`BETTER_AUTH_URL`/`NEXT_PUBLIC_APP_URL` = your live URL).
