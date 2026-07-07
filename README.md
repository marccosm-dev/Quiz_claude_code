# Quiz Claude Code 🎯

Quiz web de **Verdadeiro ou Falso** sobre o [Claude Code](https://claude.com/claude-code), a ferramenta de codificação agêntica da Anthropic. Uma jornada progressiva: 15 perguntas sorteadas (5 iniciantes, 5 intermediárias, 5 avançadas), 15 segundos por pergunta, pontuação com bônus de velocidade e ranking global.

A especificação completa está em [prd.md](prd.md).

## Como funciona

- **15 perguntas por partida**, sorteadas de um banco de 50 (dificuldade crescente: negócio → uso diário → recursos técnicos).
- **15 segundos** por pergunta; acerto vale `100 + segundos restantes × 10` pontos.
- Errou ou estourou o tempo? A **resposta correta aparece destacada** com uma explicação educativa — o quiz também ensina.
- Ao final: patente conforme seu desempenho (de 🧭 Explorador Curioso a 🏆 Mestre do Claude Code) e posição no **ranking global top 10**.
- Sem internet ou Supabase fora do ar? O jogo continua e o ranking cai para o modo local (`localStorage`) com aviso.

## Rodando localmente

Não há etapa de build. Basta servir a pasta com qualquer servidor estático:

```bash
npx serve .
```

E abrir o endereço indicado (ex: `http://localhost:3000`). Abrir o `index.html` direto também funciona para jogar; apenas o ranking global depende de rede.

## Configurando o Supabase (ranking global)

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. No painel, abra **SQL Editor → New query**, cole o conteúdo de [supabase/schema.sql](supabase/schema.sql) e execute. Isso cria a tabela `ranking` com Row Level Security (anônimos só podem inserir e ler — nunca alterar ou apagar).
3. Em **Settings → API**, copie a **Project URL** e a **anon key**.
4. Preencha `SUPABASE_URL` e `SUPABASE_ANON_KEY` em [js/config.js](js/config.js).

> A anon key é publicável por design: a segurança vem das policies de RLS, não do sigilo da chave.

## Deploy na Vercel

1. Suba o projeto para um repositório Git (GitHub, GitLab...).
2. Em [vercel.com](https://vercel.com), **Add New → Project**, importe o repositório.
3. Framework preset: **Other** (site estático, sem build). Deploy.

Alternativa via CLI: `npx vercel` na raiz do projeto.

## Estrutura

```
/
├── index.html            # As 4 telas (início, pergunta, resultado, ranking)
├── css/style.css         # Estilo e responsividade (tema Claude/Anthropic)
├── js/questions.js       # Banco de perguntas em JSON local (50 itens, dados puros)
├── js/config.js          # URL e anon key do Supabase
├── js/ranking.js         # Supabase (gravar/top 10) + fallback localStorage
├── js/app.js             # Lógica do jogo: estado, timer, pontuação, DOM
└── supabase/schema.sql   # Criação da tabela ranking + policies RLS
```

## Adicionando perguntas

O banco está no teto definido pelo PRD (50 perguntas). Para ir além, ajuste primeiro o limite em [prd.md](prd.md); o formato de cada item em [js/questions.js](js/questions.js) é:

```js
{
  "id": 51,
  "nivel": "iniciante",            // "iniciante" | "intermediario" | "avancado"
  "texto": "Afirmação a ser julgada...",
  "resposta": true,                 // true = VERDADEIRO, false = FALSO
  "explicacao": "Explicação curta e educativa."
}
```

Nada mais precisa mudar — o sorteio se adapta automaticamente.
