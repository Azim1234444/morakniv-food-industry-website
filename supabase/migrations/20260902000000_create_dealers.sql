-- Dealer directory for Morakniv Food Industry Malaysia.
-- Apply through the Supabase SQL Editor or Supabase CLI after reviewing it.

create extension if not exists pgcrypto;

create table if not exists public.dealers (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  address text not null,
  phone_number text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint dealers_company_name_length
    check (char_length(btrim(company_name)) between 2 and 160),
  constraint dealers_address_length
    check (char_length(btrim(address)) between 5 and 500),
  constraint dealers_phone_number_length
    check (char_length(btrim(phone_number)) between 7 and 40),
  constraint dealers_phone_number_format
    check (
      phone_number ~ '^\+?[0-9() .-]+$'
      and char_length(regexp_replace(phone_number, '[^0-9]', '', 'g'))
        between 7 and 15
    )
);

create or replace function public.set_dealers_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_dealers_updated_at on public.dealers;
create trigger set_dealers_updated_at
before update on public.dealers
for each row
execute function public.set_dealers_updated_at();

alter table public.dealers enable row level security;

-- Grants and policies are both required. Anonymous visitors can read only;
-- authenticated, non-anonymous accounts can manage the directory.
revoke all on table public.dealers from anon, authenticated;
grant select on table public.dealers to anon;
grant select, insert, update, delete on table public.dealers to authenticated;

drop policy if exists "Public can read dealers" on public.dealers;
create policy "Public can read dealers"
on public.dealers
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated admins can create dealers" on public.dealers;
create policy "Authenticated admins can create dealers"
on public.dealers
for insert
to authenticated
with check (
  (select auth.uid()) is not null
  and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
);

drop policy if exists "Authenticated admins can update dealers" on public.dealers;
create policy "Authenticated admins can update dealers"
on public.dealers
for update
to authenticated
using (
  (select auth.uid()) is not null
  and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
)
with check (
  (select auth.uid()) is not null
  and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
);

drop policy if exists "Authenticated admins can delete dealers" on public.dealers;
create policy "Authenticated admins can delete dealers"
on public.dealers
for delete
to authenticated
using (
  (select auth.uid()) is not null
  and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
);

comment on table public.dealers is
  'Public dealer directory managed by authenticated Akmal Station admins.';
