# PRD — Quiz Claude Code (Verdadeiro ou Falso)

**Versão:** 1.3 · **Data:** 2026-07-02 · **Status:** Aprovado para desenvolvimento

Este documento é a especificação completa do projeto e deve ser consumido pelo Claude Code para construir a aplicação do zero.

---

## 1. Visão Geral (Negócio)

### 1.1 O que é
Um quiz web de perguntas **Verdadeiro ou Falso** sobre o **Claude Code**, a ferramenta de codificação agêntica da Anthropic. O quiz é uma **jornada progressiva**: começa com perguntas de nível iniciante (conceitos e valor de negócio) e evolui até perguntas avançadas (recursos técnicos como MCP, hooks e subagents).

### 1.2 Objetivo de negócio
- **Educar** de forma divertida sobre o que é o Claude Code e o que ele pode fazer.
- **Engajar** tanto público de negócio (gestores, curiosos) quanto desenvolvedores.
- Servir como ferramenta de **divulgação/onboarding** em apresentações, treinamentos e comunidades.

### 1.3 Público-alvo
**Misto — negócio + desenvolvedores.** As perguntas iniciantes devem ser compreensíveis por alguém sem conhecimento de programação (foco em conceito, valor e casos de uso). As perguntas avançadas assumem familiaridade técnica.

### 1.4 Métricas de sucesso (qualitativas para o MVP)
- Usuário consegue completar uma partida em menos de 5 minutos.
- Usuário aprende algo novo (via explicações pós-resposta).
- Usuário sente vontade de jogar de novo para melhorar a pontuação (ranking local).

---

## 2. Escopo

### 2.1 Dentro do escopo (MVP)
- Quiz Verdadeiro/Falso com jornada progressiva de dificuldade.
- Banco de **30 a 50 perguntas**, persistido em **JSON local** (ver seção 5.4). O escopo inicial entrega **30 perguntas** (10 iniciantes, 10 intermediárias, 10 avançadas) — conteúdo completo na seção 8 — e a estrutura deve suportar expansão até 50 sem mudança de código.
- Cada partida sorteia **15 perguntas** (5 de cada nível), apresentadas em ordem crescente de dificuldade.
- **Timer de 15 segundos** por pergunta.
- **Explicação educativa** exibida após cada resposta.
- **Pontuação com bônus de tempo.**
- **Ranking global** (top 10, persistido no **Supabase**, com nome do jogador) e fallback local via `localStorage` quando offline.
- **Título/patente** conferido ao final conforme desempenho.
- Interface **responsiva** (desktop e mobile) em **português do Brasil**.
- **Deploy na Vercel** (hospedagem estática) com **Supabase** como persistência — ambos no plano gratuito (ver seção 6).

### 2.2 Fora do escopo (não construir agora)
- Backend próprio (API/servidor custom) — a persistência é feita direto do cliente no Supabase.
- Login/autenticação (o ranking usa apenas o nome informado, sem conta).
- Compartilhamento em redes sociais.
- Outros formatos de pergunta (múltipla escolha, etc.).
- Internacionalização (i18n).

---

## 3. Fluxo do Usuário e Telas

A aplicação é uma **SPA de tela única** com 4 estados/telas, alternadas via JavaScript (mostrar/esconder seções):

### Tela 1 — Início
- Logo/título do quiz ("Quiz Claude Code") e subtítulo curto explicando a dinâmica.
- Campo de texto para o **nome do jogador** (obrigatório, máx. 20 caracteres; lembrar o último nome usado via `localStorage`).
- Botão **"Começar"**.
- Botão/link secundário **"Ranking"** que abre a tela 4.
- Resumo das regras: 15 perguntas, 15s cada, dificuldade crescente.

### Tela 2 — Pergunta (loop do jogo)
- Barra de progresso: "Pergunta X de 15" + indicador visual do nível atual (Iniciante / Intermediário / Avançado).
- Timer circular ou barra regressiva de **15 segundos**, com mudança de cor nos últimos 5s.
- Texto da afirmação.
- Dois botões grandes: **VERDADEIRO** e **FALSO**.
- Placar de pontos acumulados sempre visível.

**Após responder (ou estourar o tempo):**
- Feedback imediato: acerto (verde) ou erro (vermelho); tempo esgotado conta como erro.
- **Em caso de erro (ou tempo esgotado), mostrar de forma destacada qual era a resposta correta** (ex: "A resposta correta é VERDADEIRO") junto com a explicação educativa — este é o momento principal de aprendizado do quiz.
- Em caso de acerto, mostrar a explicação e os pontos ganhos na rodada (base + bônus de tempo).
- Botão **"Próxima"** para avançar (sem avanço automático — o usuário controla o ritmo de leitura).

### Tela 3 — Resultado
- Pontuação final e total de acertos (ex: "12/15 acertos · 2.840 pontos").
- **Patente** conferida (ver seção 4.4), com destaque visual.
- Posição no ranking global, se entrou no top 10 (após o resultado ser gravado no Supabase).
- Botões: **"Jogar novamente"** (re-sorteia perguntas) e **"Ver ranking"**.

### Tela 4 — Ranking
- Tabela com o **top 10 global** (consultado do Supabase): posição, nome, pontos, acertos, data.
- Destaque para a entrada do jogador atual, se aplicável.
- Estado de carregamento enquanto consulta o Supabase; em caso de falha de rede, exibir o ranking local (`localStorage`) com aviso "ranking offline".
- Botão para voltar ao início.

---

## 4. Regras do Jogo

### 4.1 Montagem da partida
1. Sortear aleatoriamente **5 perguntas de cada nível** do banco (sem repetição dentro da partida).
2. Ordenar a partida: perguntas 1–5 iniciantes, 6–10 intermediárias, 11–15 avançadas.
3. Dentro de cada bloco de nível, a ordem é aleatória.

### 4.2 Timer
- **15 segundos** por pergunta, iniciando quando a pergunta é exibida.
- Tempo esgotado = resposta errada (0 pontos), com exibição da explicação normalmente.
- O timer pausa enquanto a explicação está na tela.

### 4.3 Pontuação
- **Acerto:** `100 pontos base + (segundos restantes × 10)` de bônus.
  - Exemplo: acertou com 8s restantes → 100 + 80 = **180 pontos**.
  - Máximo teórico por pergunta: ~250 pontos; por partida: ~3.750 pontos.
- **Erro ou tempo esgotado:** 0 pontos (sem penalidade negativa).

### 4.4 Patentes (por número de acertos)
| Acertos | Patente |
|---|---|
| 0–5 | 🧭 Explorador Curioso |
| 6–9 | 🌱 Aprendiz de Agentes |
| 10–12 | ⚙️ Engenheiro de Contexto |
| 13–14 | 💻 Comandante do Terminal |
| 15 | 🏆 Mestre do Claude Code |

### 4.5 Ranking global (Supabase)
- Ao final de cada partida, o resultado `{ nome, pontos, acertos }` é **gravado no Supabase** (tabela `ranking`, ver seção 6.2).
- A tela de ranking exibe o **top 10 global**, ordenado por pontos (desempate: mais acertos, depois data mais antiga).
- **Fallback offline:** se a gravação ou a consulta ao Supabase falhar, o resultado é salvo em `localStorage` (chave `quizClaudeCode.rankingLocal`) e o ranking local é exibido com aviso — o jogo nunca quebra por falta de rede.
- Último nome usado persistido em `localStorage` (chave `quizClaudeCode.ultimoNome`) — dado de conveniência, não vai ao Supabase.

---

## 5. Requisitos Técnicos

### 5.1 Stack
- **HTML + CSS + JavaScript puro (vanilla).** Sem frameworks, sem etapa de build.
- **Única dependência externa:** `@supabase/supabase-js` carregada via CDN (`https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`) — nenhuma outra biblioteca.
- Alvo de execução: **hospedagem estática na Vercel** (ver seção 6). Para desenvolvimento local, basta um servidor estático simples (ex: `npx serve`); o jogo em si também funciona offline graças ao fallback de ranking local.

### 5.2 Estrutura de arquivos
```
/
├── index.html        # Estrutura das 4 telas
├── css/
│   └── style.css     # Todo o estilo, incluindo responsividade
└── js/
    ├── questions.js  # Banco de perguntas em JSON local (30–50 itens, dados puros, sem lógica)
    ├── config.js     # SUPABASE_URL e SUPABASE_ANON_KEY (chave publicável, ver seção 6.3)
    ├── ranking.js    # Acesso ao Supabase (gravar resultado, consultar top 10) + fallback localStorage
    └── app.js        # Toda a lógica do jogo (estado, timer, pontuação, DOM)
```

### 5.3 Identidade visual — Tema Claude/Anthropic
- **Paleta:**
  - Primária (destaques, botões, timer): terracota `#D97757`.
  - Fundo claro: creme `#F5F0EA` / branco quente `#FAF8F5`.
  - Texto e superfícies escuras: `#2B2620` / `#1F1B16`.
  - Acerto: verde `#4C8055`; erro: vermelho `#C4553D`.
- **Tipografia:** fontes do sistema (`system-ui`, `-apple-system`, `Segoe UI`, sans-serif) — sem webfonts externas.
- Visual **limpo e moderno**: cantos arredondados (12–16px), sombras suaves, transições CSS sutis (fade/slide entre telas, pulso no timer).
- Responsivo: layout confortável de 360px a desktop; botões V/F empilham no mobile.

### 5.4 Persistência do banco de perguntas — JSON local

- O banco de perguntas é **persistido em JSON local**, com **30 a 50 perguntas** (mínimo 10 por nível; distribuição equilibrada entre os níveis). As perguntas **não** ficam no Supabase — são conteúdo estático versionado junto com o código; o Supabase guarda apenas dados de jogo (ranking).
- O JSON fica **embutido em `js/questions.js`**: o arquivo contém exclusivamente a estrutura JSON atribuída a uma constante — zero lógica, editável como dados puros. Isso dispensa `fetch()` extra e mantém o quiz jogável mesmo sem conexão com o Supabase.
- Para adicionar perguntas (até 50), basta acrescentar objetos ao array; o app deve funcionar com qualquer quantidade dentro da faixa, sem alteração em `app.js`.

```js
// js/questions.js — somente dados, em formato JSON
const QUESTIONS = [
  {
    "id": 1,
    "nivel": "iniciante",          // "iniciante" | "intermediario" | "avancado"
    "texto": "Afirmação a ser julgada...",
    "resposta": true,               // true = Verdadeiro, false = Falso
    "explicacao": "Explicação curta e educativa da resposta correta."
  }
  // ... até 50 itens
];
```

- O sorteio da partida (seção 4.1) continua fixo em **5 perguntas por nível**, independentemente do tamanho do banco — bancos maiores só aumentam a rejogabilidade.

### 5.5 Qualidade e boas práticas
- JavaScript organizado com estado central do jogo (objeto único), funções puras para sorteio/pontuação e separação clara entre lógica e manipulação de DOM.
- Sem variáveis globais vazando além dos módulos definidos.
- Acessibilidade mínima: HTML semântico, `aria-live` para feedback de acerto/erro, navegação por teclado nos botões (V/F acionáveis por teclas `V` e `F`).
- Comentários apenas onde a regra de negócio não for óbvia pelo código.
- Código, textos de UI e conteúdo em **português do Brasil** (nomes de variáveis podem ser em inglês ou português, mas consistentes).

---

## 6. Infraestrutura e Deploy — Vercel + Supabase

### 6.1 Visão da arquitetura
- **Vercel (plano gratuito):** hospeda o site estático (HTML/CSS/JS). Sem etapa de build — deploy direto da raiz do projeto (conectando o repositório Git ou via `vercel` CLI).
- **Supabase (plano gratuito, instância global):** persiste os dados de jogo (ranking global). O cliente browser conversa direto com o Supabase via `@supabase/supabase-js`; não há backend próprio.
- Ambos os serviços devem operar **dentro dos limites dos planos gratuitos** — o volume esperado (inserts pequenos e um select de top 10) está muito abaixo desses limites.

### 6.2 Modelo de dados no Supabase
Tabela única `ranking`, criada via SQL Editor do Supabase:

```sql
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
```

Consulta do top 10: `select * from ranking order by pontos desc, acertos desc, criado_em asc limit 10`.

### 6.3 Configuração e segredos
- `js/config.js` contém `SUPABASE_URL` e `SUPABASE_ANON_KEY`. A **anon key é publicável por design** — a segurança vem das policies de RLS (só insert/select), não do sigilo da chave. Não há segredo real no front-end.
- Instruções de setup devem constar no `README.md`: criar projeto no Supabase, rodar o SQL da seção 6.2, preencher `config.js`, conectar o repositório à Vercel.

### 6.4 Resiliência
- Toda chamada ao Supabase tem tratamento de erro; falha de rede **nunca impede de jogar** (fallback `localStorage`, seção 4.5).
- Timeout curto e mensagem amigável ("ranking indisponível no momento") em caso de indisponibilidade.

---

## 7. Critérios de Aceite

1. Partida completa funciona de ponta a ponta: início → 15 perguntas → resultado → ranking.
2. Cada partida sorteia 5 perguntas por nível, sem repetição, em ordem de dificuldade crescente.
3. Timer de 15s funciona, expira como erro e pausa durante a explicação.
4. Pontuação segue a fórmula `100 + (segundos restantes × 10)` por acerto.
5. Explicação aparece após toda resposta; **em caso de erro ou tempo esgotado, a resposta correta é exibida de forma destacada** junto com a explicação.
6. Patente correta é exibida conforme a tabela de acertos.
7. Resultado da partida é gravado no Supabase e o ranking exibe o top 10 global ordenado corretamente.
8. Com o Supabase indisponível, o jogo continua funcionando e o ranking cai para o modo local com aviso.
9. Aplicação publicada na Vercel funciona de ponta a ponta no plano gratuito.
10. Layout utilizável em mobile (360px) e desktop.
11. Todas as 30 perguntas da seção 8 estão no banco JSON local (`js/questions.js`), com respostas e explicações fiéis.
12. O banco suporta expansão até 50 perguntas apenas adicionando itens ao JSON, sem alterar `app.js`.

---

## 8. Banco de Perguntas (conteúdo completo)

> As perguntas abaixo são o **escopo inicial** (30 perguntas) do banco JSON local. Transcrever fielmente para `js/questions.js`. O banco pode crescer até 50 perguntas mantendo o mesmo formato e o equilíbrio entre níveis.

### Nível Iniciante (negócio/conceitos) — 10 perguntas

| # | Afirmação | Resposta | Explicação |
|---|---|---|---|
| 1 | O Claude Code é uma ferramenta da Anthropic que ajuda desenvolvedores a programar usando inteligência artificial. | **V** | O Claude Code é a ferramenta de codificação agêntica da Anthropic: você descreve o que precisa e ele lê, escreve e executa código para realizar a tarefa. |
| 2 | O Claude Code é desenvolvido pelo Google. | **F** | O Claude Code é desenvolvido pela **Anthropic**, a empresa criadora dos modelos Claude. |
| 3 | Com o Claude Code, é possível pedir alterações no código usando linguagem natural, como numa conversa. | **V** | Essa é a proposta central: você conversa em linguagem natural ("corrija esse bug", "crie essa tela") e ele executa as mudanças. |
| 4 | O Claude Code é um editor de código, como o VS Code. | **F** | Ele não é um editor: é um **agente** que roda no terminal (e se integra a editores como VS Code e JetBrains) para trabalhar no seu projeto. |
| 5 | O Claude Code pode ler, criar e editar arquivos do seu projeto. | **V** | Ele tem ferramentas para ler, criar e editar arquivos, além de buscar no código — sempre dentro das permissões concedidas. |
| 6 | O Claude Code executa qualquer comando no computador sem pedir permissão. | **F** | Ele possui um **sistema de permissões**: ações sensíveis (comandos, edições) pedem aprovação do usuário, que pode configurar o que é permitido. |
| 7 | Equipes podem usar o Claude Code para automatizar tarefas repetitivas, como escrever testes e documentação. | **V** | Casos de uso comuns incluem gerar testes, escrever documentação, refatorar código e automatizar tarefas repetitivas — liberando tempo do time. |
| 8 | O Claude Code só funciona com a linguagem Python. | **F** | Ele trabalha com **qualquer linguagem de programação** e até com tarefas que não envolvem código, como organizar arquivos e escrever textos. |
| 9 | O Claude Code precisa de conexão com a internet para funcionar. | **V** | Os modelos Claude rodam na nuvem da Anthropic, então é necessária conexão para enviar as solicitações e receber as respostas. |
| 10 | O Claude Code pode ajudar tanto em projetos novos quanto em bases de código já existentes. | **V** | Ele explora e entende codebases existentes (mesmo grandes) e também cria projetos do zero. |

### Nível Intermediário (uso no dia a dia) — 10 perguntas

| # | Afirmação | Resposta | Explicação |
|---|---|---|---|
| 11 | O Claude Code roda no terminal, mas também tem extensões para IDEs como VS Code e JetBrains. | **V** | Além do CLI no terminal, há integrações oficiais com VS Code e IDEs JetBrains, além de app desktop e versão web. |
| 12 | O arquivo CLAUDE.md serve para dar contexto e instruções permanentes sobre o projeto ao Claude Code. | **V** | O CLAUDE.md é lido automaticamente no início da sessão: nele ficam convenções do projeto, comandos comuns e instruções que o Claude deve seguir sempre. |
| 13 | O comando /init cria automaticamente um arquivo CLAUDE.md com documentação do projeto. | **V** | O `/init` analisa o projeto e gera um CLAUDE.md inicial documentando estrutura, comandos e convenções. |
| 14 | O Claude Code consegue executar comandos de terminal, como rodar testes e usar git. | **V** | Ele executa comandos shell (com permissão): rodar testes, instalar dependências, usar git, entre outros. |
| 15 | O Claude Code não consegue fazer commits nem criar pull requests no git. | **F** | Ele pode fazer commits, criar branches e abrir pull requests (por exemplo, usando o `gh` CLI do GitHub). |
| 16 | O usuário pode criar seus próprios slash commands personalizados. | **V** | É possível criar comandos personalizados (arquivos markdown em `.claude/commands/` ou skills), reutilizáveis com `/nome-do-comando`. |
| 17 | O modo Plan faz o Claude Code planejar as mudanças e pedir aprovação antes de editar qualquer arquivo. | **V** | No Plan Mode ele apenas pesquisa e monta um plano; só após o usuário aprovar é que começa a editar arquivos. |
| 18 | Ao fechar o terminal, a conversa com o Claude Code é perdida para sempre. | **F** | As sessões ficam salvas: é possível retomá-las com `claude --continue` (última sessão) ou `claude --resume` (escolher uma sessão). |
| 19 | O Claude Code só consegue trabalhar em um arquivo por vez. | **F** | Ele trabalha com vários arquivos na mesma tarefa: pode ler, criar e editar múltiplos arquivos para completar uma mudança. |
| 20 | Para mudar as permissões concedidas ao Claude Code é preciso reinstalá-lo. | **F** | Permissões são gerenciadas por configuração (`/permissions` ou arquivos `settings.json`) — nada de reinstalação. |

### Nível Avançado (recursos técnicos) — 10 perguntas

| # | Afirmação | Resposta | Explicação |
|---|---|---|---|
| 21 | O MCP (Model Context Protocol) permite conectar o Claude Code a ferramentas e serviços externos. | **V** | O MCP é um protocolo aberto que conecta o Claude Code a servidores externos (bancos de dados, APIs, navegadores etc.), ampliando suas ferramentas. |
| 22 | Servidores MCP só podem ser escritos em JavaScript. | **F** | O MCP é um protocolo aberto com SDKs em várias linguagens (Python, TypeScript, e outras) — qualquer linguagem que fale o protocolo serve. |
| 23 | Hooks permitem executar comandos automaticamente em eventos, como antes ou depois do uso de uma ferramenta. | **V** | Hooks são comandos configurados em eventos do ciclo de vida (ex: PreToolUse, PostToolUse), úteis para lint automático, validações e notificações. |
| 24 | Subagents compartilham a mesma janela de contexto da conversa principal. | **F** | Cada subagent roda com **contexto próprio e isolado**, devolvendo apenas o resultado final — isso preserva o contexto da conversa principal. |
| 25 | O arquivo settings.json permite configurar permissões, variáveis de ambiente e hooks. | **V** | Os arquivos `settings.json` (de usuário e de projeto) centralizam permissões, variáveis de ambiente, hooks e outras configurações do harness. |
| 26 | A flag --dangerously-skip-permissions faz o Claude Code executar ações sem pedir confirmação. | **V** | Essa flag pula todas as confirmações de permissão. É útil em ambientes isolados/sandboxes, mas arriscada em máquinas de uso normal. |
| 27 | O Claude Code pode rodar de forma não interativa (headless) em pipelines de CI/CD. | **V** | Com `claude -p "prompt"` ele roda em modo não interativo, imprimindo o resultado — ideal para automações e CI/CD. |
| 28 | O CLAUDE.md só pode existir na raiz do projeto, nunca em subdiretórios ou na pasta do usuário. | **F** | Há vários níveis: global do usuário (`~/.claude/CLAUDE.md`), raiz do projeto e subdiretórios — os contextos se combinam. |
| 29 | O Claude Agent SDK permite construir agentes personalizados usando a mesma base do Claude Code. | **V** | O Claude Agent SDK expõe o mesmo harness agêntico (ferramentas, loop, permissões) para desenvolvedores criarem seus próprios agentes. |
| 30 | Quando o contexto da conversa fica cheio, o Claude Code pode compactá-lo preservando um resumo. | **V** | A compactação (automática ou via `/compact`) resume a conversa para liberar espaço na janela de contexto sem perder o fio da tarefa. |

---

## 9. Decisões de Produto (registro do brainstorm)

| Decisão | Escolha |
|---|---|
| Stack | HTML/CSS/JS puro; única dependência: `@supabase/supabase-js` via CDN |
| Progressão | Jornada progressiva (iniciante → avançado) na mesma partida |
| Features | Explicação pós-resposta (com resposta correta destacada no erro), timer 15s, ranking global |
| Banco/partida | 30 a 50 perguntas em JSON local (inicial: 30) / 15 por partida (5 por nível) |
| Persistência | Supabase (plano gratuito) para ranking global; localStorage como fallback offline |
| Infra/deploy | Vercel (site estático) + Supabase (dados), ambos no plano gratuito |
| Visual | Tema Claude/Anthropic (terracota, creme, escuro) |
| Pontuação | 100 base + bônus de tempo (10 pts/segundo restante) |
| Tela final | Patente por desempenho |
| Público | Misto: negócio + desenvolvedores |
| Idioma | Português do Brasil |
| Fora de escopo | Backend próprio, login, compartilhamento, múltipla escolha, i18n |
