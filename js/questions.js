const QUESTIONS = [
  {
    "id": 1,
    "nivel": "iniciante",
    "texto": "O Claude Code é uma ferramenta da Anthropic que ajuda desenvolvedores a programar usando inteligência artificial.",
    "resposta": true,
    "explicacao": "O Claude Code é a ferramenta de codificação agêntica da Anthropic: você descreve o que precisa e ele lê, escreve e executa código para realizar a tarefa."
  },
  {
    "id": 2,
    "nivel": "iniciante",
    "texto": "O Claude Code é desenvolvido pelo Google.",
    "resposta": false,
    "explicacao": "O Claude Code é desenvolvido pela Anthropic, a empresa criadora dos modelos Claude."
  },
  {
    "id": 3,
    "nivel": "iniciante",
    "texto": "Com o Claude Code, é possível pedir alterações no código usando linguagem natural, como numa conversa.",
    "resposta": true,
    "explicacao": "Essa é a proposta central: você conversa em linguagem natural (\"corrija esse bug\", \"crie essa tela\") e ele executa as mudanças."
  },
  {
    "id": 4,
    "nivel": "iniciante",
    "texto": "O Claude Code é um editor de código, como o VS Code.",
    "resposta": false,
    "explicacao": "Ele não é um editor: é um agente que roda no terminal (e se integra a editores como VS Code e JetBrains) para trabalhar no seu projeto."
  },
  {
    "id": 5,
    "nivel": "iniciante",
    "texto": "O Claude Code pode ler, criar e editar arquivos do seu projeto.",
    "resposta": true,
    "explicacao": "Ele tem ferramentas para ler, criar e editar arquivos, além de buscar no código — sempre dentro das permissões concedidas."
  },
  {
    "id": 6,
    "nivel": "iniciante",
    "texto": "O Claude Code executa qualquer comando no computador sem pedir permissão.",
    "resposta": false,
    "explicacao": "Ele possui um sistema de permissões: ações sensíveis (comandos, edições) pedem aprovação do usuário, que pode configurar o que é permitido."
  },
  {
    "id": 7,
    "nivel": "iniciante",
    "texto": "Equipes podem usar o Claude Code para automatizar tarefas repetitivas, como escrever testes e documentação.",
    "resposta": true,
    "explicacao": "Casos de uso comuns incluem gerar testes, escrever documentação, refatorar código e automatizar tarefas repetitivas — liberando tempo do time."
  },
  {
    "id": 8,
    "nivel": "iniciante",
    "texto": "O Claude Code só funciona com a linguagem Python.",
    "resposta": false,
    "explicacao": "Ele trabalha com qualquer linguagem de programação e até com tarefas que não envolvem código, como organizar arquivos e escrever textos."
  },
  {
    "id": 9,
    "nivel": "iniciante",
    "texto": "O Claude Code precisa de conexão com a internet para funcionar.",
    "resposta": true,
    "explicacao": "Os modelos Claude rodam na nuvem da Anthropic, então é necessária conexão para enviar as solicitações e receber as respostas."
  },
  {
    "id": 10,
    "nivel": "iniciante",
    "texto": "O Claude Code pode ajudar tanto em projetos novos quanto em bases de código já existentes.",
    "resposta": true,
    "explicacao": "Ele explora e entende codebases existentes (mesmo grandes) e também cria projetos do zero."
  },
  {
    "id": 11,
    "nivel": "intermediario",
    "texto": "O Claude Code roda no terminal, mas também tem extensões para IDEs como VS Code e JetBrains.",
    "resposta": true,
    "explicacao": "Além do CLI no terminal, há integrações oficiais com VS Code e IDEs JetBrains, além de app desktop e versão web."
  },
  {
    "id": 12,
    "nivel": "intermediario",
    "texto": "O arquivo CLAUDE.md serve para dar contexto e instruções permanentes sobre o projeto ao Claude Code.",
    "resposta": true,
    "explicacao": "O CLAUDE.md é lido automaticamente no início da sessão: nele ficam convenções do projeto, comandos comuns e instruções que o Claude deve seguir sempre."
  },
  {
    "id": 13,
    "nivel": "intermediario",
    "texto": "O comando /init cria automaticamente um arquivo CLAUDE.md com documentação do projeto.",
    "resposta": true,
    "explicacao": "O /init analisa o projeto e gera um CLAUDE.md inicial documentando estrutura, comandos e convenções."
  },
  {
    "id": 14,
    "nivel": "intermediario",
    "texto": "O Claude Code consegue executar comandos de terminal, como rodar testes e usar git.",
    "resposta": true,
    "explicacao": "Ele executa comandos shell (com permissão): rodar testes, instalar dependências, usar git, entre outros."
  },
  {
    "id": 15,
    "nivel": "intermediario",
    "texto": "O Claude Code não consegue fazer commits nem criar pull requests no git.",
    "resposta": false,
    "explicacao": "Ele pode fazer commits, criar branches e abrir pull requests (por exemplo, usando o gh CLI do GitHub)."
  },
  {
    "id": 16,
    "nivel": "intermediario",
    "texto": "O usuário pode criar seus próprios slash commands personalizados.",
    "resposta": true,
    "explicacao": "É possível criar comandos personalizados (arquivos markdown em .claude/commands/ ou skills), reutilizáveis com /nome-do-comando."
  },
  {
    "id": 17,
    "nivel": "intermediario",
    "texto": "O modo Plan faz o Claude Code planejar as mudanças e pedir aprovação antes de editar qualquer arquivo.",
    "resposta": true,
    "explicacao": "No Plan Mode ele apenas pesquisa e monta um plano; só após o usuário aprovar é que começa a editar arquivos."
  },
  {
    "id": 18,
    "nivel": "intermediario",
    "texto": "Ao fechar o terminal, a conversa com o Claude Code é perdida para sempre.",
    "resposta": false,
    "explicacao": "As sessões ficam salvas: é possível retomá-las com claude --continue (última sessão) ou claude --resume (escolher uma sessão)."
  },
  {
    "id": 19,
    "nivel": "intermediario",
    "texto": "O Claude Code só consegue trabalhar em um arquivo por vez.",
    "resposta": false,
    "explicacao": "Ele trabalha com vários arquivos na mesma tarefa: pode ler, criar e editar múltiplos arquivos para completar uma mudança."
  },
  {
    "id": 20,
    "nivel": "intermediario",
    "texto": "Para mudar as permissões concedidas ao Claude Code é preciso reinstalá-lo.",
    "resposta": false,
    "explicacao": "Permissões são gerenciadas por configuração (/permissions ou arquivos settings.json) — nada de reinstalação."
  },
  {
    "id": 21,
    "nivel": "avancado",
    "texto": "O MCP (Model Context Protocol) permite conectar o Claude Code a ferramentas e serviços externos.",
    "resposta": true,
    "explicacao": "O MCP é um protocolo aberto que conecta o Claude Code a servidores externos (bancos de dados, APIs, navegadores etc.), ampliando suas ferramentas."
  },
  {
    "id": 22,
    "nivel": "avancado",
    "texto": "Servidores MCP só podem ser escritos em JavaScript.",
    "resposta": false,
    "explicacao": "O MCP é um protocolo aberto com SDKs em várias linguagens (Python, TypeScript, e outras) — qualquer linguagem que fale o protocolo serve."
  },
  {
    "id": 23,
    "nivel": "avancado",
    "texto": "Hooks permitem executar comandos automaticamente em eventos, como antes ou depois do uso de uma ferramenta.",
    "resposta": true,
    "explicacao": "Hooks são comandos configurados em eventos do ciclo de vida (ex: PreToolUse, PostToolUse), úteis para lint automático, validações e notificações."
  },
  {
    "id": 24,
    "nivel": "avancado",
    "texto": "Subagents compartilham a mesma janela de contexto da conversa principal.",
    "resposta": false,
    "explicacao": "Cada subagent roda com contexto próprio e isolado, devolvendo apenas o resultado final — isso preserva o contexto da conversa principal."
  },
  {
    "id": 25,
    "nivel": "avancado",
    "texto": "O arquivo settings.json permite configurar permissões, variáveis de ambiente e hooks.",
    "resposta": true,
    "explicacao": "Os arquivos settings.json (de usuário e de projeto) centralizam permissões, variáveis de ambiente, hooks e outras configurações do harness."
  },
  {
    "id": 26,
    "nivel": "avancado",
    "texto": "A flag --dangerously-skip-permissions faz o Claude Code executar ações sem pedir confirmação.",
    "resposta": true,
    "explicacao": "Essa flag pula todas as confirmações de permissão. É útil em ambientes isolados/sandboxes, mas arriscada em máquinas de uso normal."
  },
  {
    "id": 27,
    "nivel": "avancado",
    "texto": "O Claude Code pode rodar de forma não interativa (headless) em pipelines de CI/CD.",
    "resposta": true,
    "explicacao": "Com claude -p \"prompt\" ele roda em modo não interativo, imprimindo o resultado — ideal para automações e CI/CD."
  },
  {
    "id": 28,
    "nivel": "avancado",
    "texto": "O CLAUDE.md só pode existir na raiz do projeto, nunca em subdiretórios ou na pasta do usuário.",
    "resposta": false,
    "explicacao": "Há vários níveis: global do usuário (~/.claude/CLAUDE.md), raiz do projeto e subdiretórios — os contextos se combinam."
  },
  {
    "id": 29,
    "nivel": "avancado",
    "texto": "O Claude Agent SDK permite construir agentes personalizados usando a mesma base do Claude Code.",
    "resposta": true,
    "explicacao": "O Claude Agent SDK expõe o mesmo harness agêntico (ferramentas, loop, permissões) para desenvolvedores criarem seus próprios agentes."
  },
  {
    "id": 30,
    "nivel": "avancado",
    "texto": "Quando o contexto da conversa fica cheio, o Claude Code pode compactá-lo preservando um resumo.",
    "resposta": true,
    "explicacao": "A compactação (automática ou via /compact) resume a conversa para liberar espaço na janela de contexto sem perder o fio da tarefa."
  }
];
