-- Schema do Supabase para o Quiz Claude Code (ver prd.md §6.2).
-- Não é executado automaticamente: cole este conteúdo no SQL Editor
-- do painel do Supabase (dashboard > SQL Editor > New query > Run).

create table public.ranking (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 1 and 20),
  pontos integer not null check (pontos >= 0),
  acertos integer not null check (acertos between 0 and 15),
  criado_em timestamptz not null default now()
);

-- Segurança: RLS ligado; anônimos podem apenas inserir e ler.
alter table public.ranking enable row level security;

create policy "leitura publica" on public.ranking
  for select to anon using (true);

create policy "insercao publica" on public.ranking
  for insert to anon with check (true);
-- Sem policies de update/delete: registros são imutáveis para o cliente.
