-- Tabela de comentários
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  lesson_slug text not null,
  content text not null,
  created_at timestamptz default now()
);

-- View simples para comentários em tempo-real
alter table public.comments enable row level security;
create policy "Comments apenas de assinantes" on public.comments
  for select using (auth.role() = 'authenticated');

-- Tabela que mapeia assinatura Stripe ao usuário
create table if not exists public.stripe_subscriptions (
  id text primary key,
  user_id uuid references auth.users on delete cascade,
  status text,
  current_period_end timestamptz
);
