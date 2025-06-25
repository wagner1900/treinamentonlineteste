-- Script para criar tabelas relacionadas ao PagSeguro
-- Use em conjunto com o banco de dados configurado no Netlify ou Supabase

-- Tabela para registrar transações do PagSeguro
create table if not exists public.pagseguro_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  reference_id text not null,
  status text not null,
  amount numeric not null,
  created_at timestamptz default now()
);
