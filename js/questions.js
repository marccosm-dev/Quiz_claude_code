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
  },
  {
    "id": 31,
    "nivel": "iniciante",
    "texto": "O Claude Code é totalmente gratuito e não precisa de conta para usar.",
    "resposta": false,
    "explicacao": "É preciso uma conta Anthropic: o acesso vem com as assinaturas do Claude (Pro/Max) ou com créditos de API pagos por uso."
  },
  {
    "id": 32,
    "nivel": "iniciante",
    "texto": "O Claude Code pode ser usado em tarefas fora da programação, como organizar arquivos e redigir documentos.",
    "resposta": true,
    "explicacao": "Ele é um agente de propósito geral no computador: além de código, organiza pastas, escreve e edita textos e outros arquivos."
  },
  {
    "id": 33,
    "nivel": "iniciante",
    "texto": "É possível conversar com o Claude Code em português.",
    "resposta": true,
    "explicacao": "Os modelos Claude entendem e respondem em dezenas de idiomas — você pode trabalhar inteiramente em português."
  },
  {
    "id": 34,
    "nivel": "iniciante",
    "texto": "Depois de escrever um código, o Claude Code não consegue executá-lo para verificar se funciona.",
    "resposta": false,
    "explicacao": "Ele pode rodar o código e os testes no terminal, ver os erros e corrigir sozinho — esse ciclo de verificação é um dos seus pontos fortes."
  },
  {
    "id": 35,
    "nivel": "iniciante",
    "texto": "O Claude Code funciona em Windows, macOS e Linux.",
    "resposta": true,
    "explicacao": "Há suporte oficial para os três sistemas operacionais, incluindo Windows nativo."
  },
  {
    "id": 36,
    "nivel": "iniciante",
    "texto": "Ao ser instalado, o Claude Code lê e envia todos os arquivos do seu computador para a Anthropic.",
    "resposta": false,
    "explicacao": "Ele só acessa os arquivos necessários para a tarefa, dentro da pasta de trabalho e das permissões que você concede."
  },
  {
    "id": 37,
    "nivel": "iniciante",
    "texto": "O Claude Code pode explicar um código existente em linguagem simples, ajudando quem está aprendendo.",
    "resposta": true,
    "explicacao": "Pedir explicações sobre um trecho ou um projeto inteiro é um uso comum — ótimo para estudar e para entender sistemas legados."
  },
  {
    "id": 38,
    "nivel": "intermediario",
    "texto": "É possível anexar imagens, como capturas de tela, para o Claude Code analisar.",
    "resposta": true,
    "explicacao": "Os modelos Claude têm visão: você pode colar um print (de um erro, de um layout) e ele analisa a imagem para trabalhar."
  },
  {
    "id": 39,
    "nivel": "intermediario",
    "texto": "Uma vez iniciada uma resposta, não há como interromper o Claude Code até ele terminar.",
    "resposta": false,
    "explicacao": "A tecla Esc interrompe a ação a qualquer momento, permitindo corrigir o rumo ou dar novas instruções."
  },
  {
    "id": 40,
    "nivel": "intermediario",
    "texto": "O comando /clear limpa o contexto da conversa para começar uma nova tarefa do zero.",
    "resposta": true,
    "explicacao": "O /clear zera o contexto sem fechar o programa — útil entre tarefas sem relação, para manter o foco e economizar contexto."
  },
  {
    "id": 41,
    "nivel": "intermediario",
    "texto": "O Claude Code decide sozinho qual modelo de IA usar e o usuário não pode trocá-lo.",
    "resposta": false,
    "explicacao": "O comando /model permite escolher o modelo (ex: Opus, Sonnet, Haiku), equilibrando capacidade, velocidade e custo."
  },
  {
    "id": 42,
    "nivel": "intermediario",
    "texto": "O Claude Code pode revisar um pull request e sugerir melhorias no código.",
    "resposta": true,
    "explicacao": "Revisão de código é um caso de uso oficial: ele analisa o diff, aponta bugs e sugere melhorias — inclusive via comandos como /review."
  },
  {
    "id": 43,
    "nivel": "intermediario",
    "texto": "O Claude Code só funciona com repositórios hospedados no GitHub.",
    "resposta": false,
    "explicacao": "As operações git (commit, branch, merge) funcionam com qualquer servidor — GitHub, GitLab, Bitbucket ou um git local."
  },
  {
    "id": 44,
    "nivel": "intermediario",
    "texto": "O Claude Code localiza trechos de código no projeto com ferramentas de busca por padrões, sem precisar abrir arquivo por arquivo.",
    "resposta": true,
    "explicacao": "Ele usa ferramentas de busca (por conteúdo e por nome de arquivo) para navegar com eficiência mesmo em projetos grandes."
  },
  {
    "id": 45,
    "nivel": "avancado",
    "texto": "Subagents personalizados podem ser definidos em arquivos markdown, com instruções e ferramentas específicas.",
    "resposta": true,
    "explicacao": "Arquivos em .claude/agents/ definem subagents com prompt próprio e lista de ferramentas permitidas, reutilizáveis pelo time."
  },
  {
    "id": 46,
    "nivel": "avancado",
    "texto": "Um hook do tipo PreToolUse pode bloquear uma ação do Claude Code antes de ela ser executada.",
    "resposta": true,
    "explicacao": "Hooks PreToolUse rodam antes da ferramenta e podem vetar a ação — útil para políticas de segurança e validações automáticas."
  },
  {
    "id": 47,
    "nivel": "avancado",
    "texto": "Skills e slash commands personalizados valem apenas na máquina onde foram criados e não podem ser compartilhados.",
    "resposta": false,
    "explicacao": "Eles podem ser versionados na pasta .claude/ do repositório e distribuídos via plugins — todo o time passa a usá-los."
  },
  {
    "id": 48,
    "nivel": "avancado",
    "texto": "No modo headless, o claude -p pode retornar a saída em formato JSON para integração com outros sistemas.",
    "resposta": true,
    "explicacao": "Com --output-format json, a resposta sai estruturada — ideal para scripts, pipelines e integrações programáticas."
  },
  {
    "id": 49,
    "nivel": "avancado",
    "texto": "O protocolo MCP só funciona com produtos da Anthropic.",
    "resposta": false,
    "explicacao": "O MCP é um protocolo aberto adotado pela indústria: outras empresas e ferramentas de IA também o utilizam para conectar modelos a sistemas."
  },
  {
    "id": 50,
    "nivel": "avancado",
    "texto": "Com git worktrees, é possível rodar várias sessões do Claude Code em paralelo no mesmo repositório, cada uma em uma cópia isolada.",
    "resposta": true,
    "explicacao": "Worktrees criam diretórios de trabalho independentes do mesmo repositório — cada sessão atua em um sem conflitar com as outras."
  }
];
