-- Run this in Supabase SQL Editor if wishlist join shows "permission denied"
-- (fixes grants + RLS for server-only access via secret key)

grant usage on schema public to service_role;

grant select, insert, update, delete
  on table public.clothing_wishlist_entries
  to service_role;

alter table public.clothing_wishlist_entries disable row level security;
