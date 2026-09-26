-- Padel Social Vol. 2 — registrations (OPTIONAL: the site works with Formspree alone)
-- Run once in Supabase → SQL Editor. Never expose the service_role key in the site.

create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  full_name     text not null check (length(trim(full_name)) > 0),
  phone         text not null check (phone ~ '^\+[1-9][0-9]{6,17}$'),  -- E.164, e.g. +351912345678
  contact_via   text not null check (contact_via in ('telegram', 'whatsapp')),
  participation text not null check (participation in ('tournament_after', 'after_only')),
  level         text check (level in ('M1','M2','M3','M4','M5','M6','F1','F2','F3','F4','F5','F6')),
  consent       boolean not null check (consent = true),
  source        text not null default 'landing-vol2',
  -- a level is required for the tournament
  constraint level_required_for_tournament
    check (participation <> 'tournament_after' or level is not null)
);

-- one registration per phone number (duplicate detection)
create unique index if not exists registrations_phone_unique on public.registrations (phone);

-- Row Level Security: the public (anon) key may only INSERT, and only with consent
alter table public.registrations enable row level security;

drop policy if exists "anon can register" on public.registrations;
create policy "anon can register"
  on public.registrations
  for insert
  to anon
  with check (consent = true);
-- No select / update / delete policies for anon → those are denied.
