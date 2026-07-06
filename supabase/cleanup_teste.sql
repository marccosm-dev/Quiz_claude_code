-- Remove os registros de teste inseridos durante a validação do ranking.
-- Cole no SQL Editor do Supabase (dashboard > SQL Editor > New query > Run).

delete from public.ranking where nome like 'QA%';
