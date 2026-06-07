# Wishlist storage on Vercel

## 1. Install (already in this repo)

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 2. Environment variables

In `.env.local` and on **Vercel → Settings → Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Settings → API → service_role (secret)
CLOTHING_ADMIN_PASSWORD=your-password
```

The **publishable** key is safe for the browser. The **service role** key must stay server-only — the wishlist API uses it to save and list emails.

## 3. Create the table (once)

Supabase dashboard → **SQL Editor** → run `supabase/wishlist-schema.sql`.

If join shows **permission denied for table clothing_wishlist_entries**, run `supabase/wishlist-fix-permissions.sql` as well.

## 4. Redeploy on Vercel

After env vars are set, redeploy. Sign-ups from the popup persist in `clothing_wishlist_entries`.

View them at `/clothing/wishlist` with `CLOTHING_ADMIN_PASSWORD`.
