-- NRG Portfolio — clothing wishlist (paste all of this into Supabase SQL Editor → Run once)

create table if not exists public.clothing_wishlist_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  email text not null,
  name text,
  created_at timestamptz not null default now(),
  constraint clothing_wishlist_entries_slug_email_key unique (slug, email)
);

create index if not exists clothing_wishlist_entries_slug_created_at_idx
  on public.clothing_wishlist_entries (slug, created_at desc);

-- Server-only: Next.js API uses SUPABASE_SECRET_KEY (not the browser publishable key)
alter table public.clothing_wishlist_entries disable row level security;

grant usage on schema public to service_role;

grant select, insert, update, delete
  on table public.clothing_wishlist_entries
  to service_role;
