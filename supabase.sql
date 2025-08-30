-- Run this in Supabase SQL Editor
-- 1) Enums
create type public.user_role as enum ('candidate','employer');
create type public.job_type as enum ('full-time','part-time','contract','internship');
create type public.location_type as enum ('onsite','remote','hybrid');

-- 2) Tables
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'candidate',
  full_name text,
  company_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  company text not null,
  location text,
  job_type job_type,
  location_type location_type,
  salary_min numeric,
  salary_max numeric,
  currency text default 'USD',
  description text,
  requirements text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.jobs enable row level security;

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid not null references public.profiles(id) on delete cascade,
  resume_url text,
  cover_letter text,
  status text not null default 'applied',
  created_at timestamptz not null default now()
);
alter table public.applications enable row level security;

-- 3) Policies
-- Profiles
create policy "read own and others minimal" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Jobs
create policy "read active jobs" on public.jobs
  for select using (true);

create policy "employers can insert jobs" on public.jobs
  for insert with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'employer')
    and employer_id = auth.uid()
  );

create policy "employers can update own jobs" on public.jobs
  for update using (employer_id = auth.uid());

create policy "employers can delete own jobs" on public.jobs
  for delete using (employer_id = auth.uid());

-- Applications
create policy "candidates see own applications" on public.applications
  for select using (candidate_id = auth.uid());

create policy "employers see applications on their jobs" on public.applications
  for select using (
    exists (select 1 from public.jobs j where j.id = applications.job_id and j.employer_id = auth.uid())
  );

create policy "candidates can apply" on public.applications
  for insert with check (candidate_id = auth.uid());
