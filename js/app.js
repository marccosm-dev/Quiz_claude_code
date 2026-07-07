const App = (function () {
  const CHAVE_NOME = "quizClaudeCode.ultimoNome";
  const PERGUNTAS_POR_NIVEL = 5;
  const NIVEIS_ORDEM = ["iniciante", "intermediario", "avancado"];
  const TEMPO_TOTAL = 15;
  const RAIO_TIMER = 44;
  const CIRCUNFERENCIA = 2 * Math.PI * RAIO_TIMER;

  const NOMES_NIVEL = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  };

  const PATENTES = [
    { min: 0, max: 5, nome: "🧭 Explorador Curioso" },
    { min: 6, max: 9, nome: "🌱 Aprendiz de Agentes" },
    { min: 10, max: 12, nome: "⚙️ Engenheiro de Contexto" },
    { min: 13, max: 14, nome: "💻 Comandante do Terminal" },
    { min: 15, max: 15, nome: "🏆 Mestre do Claude Code" },
  ];

  const estado = {
    nome: "",
    perguntas: [],
    indiceAtual: 0,
    pontos: 0,
    acertos: 0,
    tempoRestante: TEMPO_TOTAL,
    temporizadorId: null,
    respondida: false,
  };

  const els = {};

  function cacheElementos() {
    els.formInicio = document.getElementById("form-inicio");
    els.inputNome = document.getElementById("input-nome");
    els.btnVerRanking = document.getElementById("btn-ver-ranking");

    els.progressoNumero = document.getElementById("progresso-numero");
    els.indicadorNivel = document.getElementById("indicador-nivel");
    els.timerContainer = document.getElementById("timer-container");
    els.timerProgresso = document.getElementById("timer-progresso");
    els.timerNumero = document.getElementById("timer-numero");
    els.placar = document.getElementById("placar");
    els.textoPergunta = document.getElementById("texto-pergunta");
    els.btnVerdadeiro = document.getElementById("btn-verdadeiro");
    els.btnFalso = document.getElementById("btn-falso");
    els.cardFeedback = document.getElementById("card-feedback");
    els.feedbackResultado = document.getElementById("feedback-resultado");
    els.respostaCorretaDestaque = document.getElementById("resposta-correta-destaque");
    els.explicacaoTexto = document.getElementById("explicacao-texto");
    els.pontosRodada = document.getElementById("pontos-rodada");
    els.btnProxima = document.getElementById("btn-proxima");

    els.resultadoResumo = document.getElementById("resultado-resumo");
    els.patenteDestaque = document.getElementById("patente-destaque");
    els.posicaoRanking = document.getElementById("posicao-ranking");
    els.btnJogarNovamente = document.getElementById("btn-jogar-novamente");
    els.btnVerRankingResultado = document.getElementById("btn-ver-ranking-resultado");

    els.rankingCarregando = document.getElementById("ranking-carregando");
    els.rankingOfflineAviso = document.getElementById("ranking-offline-aviso");
    els.tabelaRanking = document.getElementById("tabela-ranking");
    els.rankingCorpo = document.getElementById("ranking-corpo");
    els.btnVoltarInicio = document.getElementById("btn-voltar-inicio");
  }

  function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach((tela) => tela.classList.remove("tela--ativa"));
    document.getElementById(id).classList.add("tela--ativa");
  }

  function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function sortearPerguntas() {
    const selecionadas = [];
    NIVEIS_ORDEM.forEach((nivel) => {
      const doNivel = QUESTIONS.filter((pergunta) => pergunta.nivel === nivel);
      selecionadas.push(...embaralhar(doNivel.slice()).slice(0, PERGUNTAS_POR_NIVEL));
    });
    return selecionadas;
  }

  function obterPatente(acertos) {
    const patente = PATENTES.find((p) => acertos >= p.min && acertos <= p.max);
    return patente ? patente.nome : "";
  }

  // --- Tela 1: Início ---

  function carregarUltimoNome() {
    const nome = localStorage.getItem(CHAVE_NOME);
    if (nome) els.inputNome.value = nome;
  }

  function aoSubmeterInicio(evento) {
    evento.preventDefault();
    const nome = els.inputNome.value.trim();
    if (!nome) return;
    localStorage.setItem(CHAVE_NOME, nome);
    iniciarPartida(nome);
  }

  // --- Tela 2: Pergunta ---

  function iniciarPartida(nome) {
    estado.nome = nome;
    estado.perguntas = sortearPerguntas();
    estado.indiceAtual = 0;
    estado.pontos = 0;
    estado.acertos = 0;
    mostrarTela("tela-pergunta");
    exibirPerguntaAtual();
  }

  function exibirPerguntaAtual() {
    const pergunta = estado.perguntas[estado.indiceAtual];
    estado.respondida = false;

    els.progressoNumero.textContent = `Pergunta ${estado.indiceAtual + 1} de ${estado.perguntas.length}`;
    definirBadgeNivel(pergunta.nivel);
    els.textoPergunta.textContent = pergunta.texto;
    els.placar.textContent = `Pontos: ${estado.pontos}`;

    els.cardFeedback.hidden = true;
    els.cardFeedback.classList.remove("card-feedback--correto", "card-feedback--incorreto");
    els.respostaCorretaDestaque.hidden = true;
    els.pontosRodada.hidden = true;
    els.btnVerdadeiro.disabled = false;
    els.btnFalso.disabled = false;

    iniciarTimer();
  }

  function definirBadgeNivel(nivel) {
    els.indicadorNivel.textContent = NOMES_NIVEL[nivel];
    els.indicadorNivel.className = "badge-nivel";
    if (nivel === "intermediario") els.indicadorNivel.classList.add("badge-nivel--intermediario");
    if (nivel === "avancado") els.indicadorNivel.classList.add("badge-nivel--avancado");
  }

  function iniciarTimer() {
    pararTimer();
    estado.tempoRestante = TEMPO_TOTAL;
    atualizarTimerVisual();
    estado.temporizadorId = setInterval(() => {
      estado.tempoRestante -= 1;
      atualizarTimerVisual();
      if (estado.tempoRestante <= 0) {
        pararTimer();
        responder(null);
      }
    }, 1000);
  }

  function pararTimer() {
    if (estado.temporizadorId) {
      clearInterval(estado.temporizadorId);
      estado.temporizadorId = null;
    }
  }

  function atualizarTimerVisual() {
    els.timerNumero.textContent = Math.max(estado.tempoRestante, 0);
    const fracao = Math.max(estado.tempoRestante, 0) / TEMPO_TOTAL;
    els.timerProgresso.style.strokeDashoffset = String(CIRCUNFERENCIA * (1 - fracao));
    els.timerContainer.classList.toggle("timer--urgente", estado.tempoRestante <= 5 && estado.tempoRestante > 0);
  }

  function responder(respostaUsuario) {
    if (estado.respondida) return;
    estado.respondida = true;
    pararTimer();
    els.btnVerdadeiro.disabled = true;
    els.btnFalso.disabled = true;

    const pergunta = estado.perguntas[estado.indiceAtual];
    const acertou = respostaUsuario !== null && respostaUsuario === pergunta.resposta;
    let pontosGanhos = 0;

    if (acertou) {
      pontosGanhos = 100 + estado.tempoRestante * 10;
      estado.pontos += pontosGanhos;
      estado.acertos += 1;
    }

    exibirFeedback(acertou, pergunta, pontosGanhos);
  }

  function dispararConfetes() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const CORES = ["#D97757", "#4C8055", "#C99A4A", "#6B8F9C", "#8B4B6B", "#FAF8F5"];
    const canvas = document.createElement("canvas");
    canvas.className = "canvas-confetes";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const particulas = Array.from({ length: 120 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.4,
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 12,
      vy: -(Math.random() * 10 + 5),
      tamanho: Math.random() * 6 + 4,
      cor: CORES[Math.floor(Math.random() * CORES.length)],
      rotacao: Math.random() * Math.PI,
      velocidadeRotacao: (Math.random() - 0.5) * 0.3,
    }));

    const DURACAO_MS = 1800;
    const inicio = performance.now();

    // Garante a remoção mesmo se o requestAnimationFrame for pausado
    // (ex: aba em segundo plano), evitando canvases acumulados no DOM.
    const limpezaGarantida = setTimeout(() => canvas.remove(), DURACAO_MS + 500);

    function quadro(agora) {
      const decorrido = agora - inicio;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = Math.max(1 - decorrido / DURACAO_MS, 0);

      particulas.forEach((p) => {
        p.vy += 0.25; // gravidade
        p.x += p.vx;
        p.y += p.vy;
        p.rotacao += p.velocidadeRotacao;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotacao);
        ctx.fillStyle = p.cor;
        ctx.fillRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho * 0.6);
        ctx.restore();
      });

      if (decorrido < DURACAO_MS) {
        requestAnimationFrame(quadro);
      } else {
        clearTimeout(limpezaGarantida);
        canvas.remove();
      }
    }

    requestAnimationFrame(quadro);
  }

  function exibirFeedback(acertou, pergunta, pontosGanhos) {
    els.cardFeedback.hidden = false;
    els.cardFeedback.classList.add(acertou ? "card-feedback--correto" : "card-feedback--incorreto");
    els.feedbackResultado.textContent = acertou ? "Você acertou!" : "Você errou!";

    els.respostaCorretaDestaque.hidden = acertou;
    if (!acertou) {
      els.respostaCorretaDestaque.textContent = `A resposta correta é ${pergunta.resposta ? "VERDADEIRO" : "FALSO"}.`;
    }

    els.explicacaoTexto.textContent = pergunta.explicacao;

    els.pontosRodada.hidden = !acertou;
    if (acertou) {
      els.pontosRodada.textContent = `+${pontosGanhos} pontos`;
      dispararConfetes();
    }

    els.placar.textContent = `Pontos: ${estado.pontos}`;
    els.btnProxima.focus();
  }

  function proximaPergunta() {
    estado.indiceAtual += 1;
    if (estado.indiceAtual >= estado.perguntas.length) {
      finalizarPartida();
    } else {
      exibirPerguntaAtual();
    }
  }

  // --- Tela 3: Resultado ---

  async function finalizarPartida() {
    mostrarTela("tela-resultado");
    els.resultadoResumo.textContent = `${estado.acertos}/${estado.perguntas.length} acertos · ${estado.pontos} pontos`;
    els.patenteDestaque.textContent = obterPatente(estado.acertos);
    els.posicaoRanking.hidden = true;

    const { modo } = await Ranking.salvarResultado({
      nome: estado.nome,
      pontos: estado.pontos,
      acertos: estado.acertos,
    });

    const { dados } = await Ranking.buscarTop10();
    const posicao = dados.findIndex(
      (item) => item.nome === estado.nome && item.pontos === estado.pontos && item.acertos === estado.acertos
    );

    if (posicao !== -1) {
      els.posicaoRanking.hidden = false;
      const destino = modo === "online" ? "ranking global" : "ranking local";
      els.posicaoRanking.textContent = `Você está em ${posicao + 1}º lugar no ${destino}!`;
    }
  }

  // --- Tela 4: Ranking ---

  async function exibirRanking() {
    mostrarTela("tela-ranking");
    els.rankingCarregando.hidden = false;
    els.rankingOfflineAviso.hidden = true;
    els.tabelaRanking.hidden = true;
    els.rankingCorpo.innerHTML = "";

    const { dados, modo } = await Ranking.buscarTop10();

    els.rankingCarregando.hidden = true;
    els.rankingOfflineAviso.hidden = modo !== "local";

    dados.forEach((entrada, indice) => {
      const linha = document.createElement("tr");
      if (entrada.nome === estado.nome && entrada.pontos === estado.pontos && entrada.acertos === estado.acertos) {
        linha.classList.add("linha-atual");
      }

      const celulas = [
        String(indice + 1),
        entrada.nome,
        String(entrada.pontos),
        String(entrada.acertos),
        new Date(entrada.criado_em).toLocaleDateString("pt-BR"),
      ];

      celulas.forEach((texto) => {
        const celula = document.createElement("td");
        celula.textContent = texto;
        linha.appendChild(celula);
      });

      els.rankingCorpo.appendChild(linha);
    });

    els.tabelaRanking.hidden = false;
  }

  // --- Eventos e atalhos de teclado ---

  function aoPressionarTecla(evento) {
    const telaPerguntaAtiva = document.getElementById("tela-pergunta").classList.contains("tela--ativa");
    if (!telaPerguntaAtiva || estado.respondida) return;

    const tecla = evento.key.toLowerCase();
    if (tecla === "v") responder(true);
    if (tecla === "f") responder(false);
  }

  function vincularEventos() {
    els.formInicio.addEventListener("submit", aoSubmeterInicio);
    els.btnVerRanking.addEventListener("click", exibirRanking);
    els.btnVerRankingResultado.addEventListener("click", exibirRanking);
    els.btnVoltarInicio.addEventListener("click", () => mostrarTela("tela-inicio"));

    els.btnVerdadeiro.addEventListener("click", () => responder(true));
    els.btnFalso.addEventListener("click", () => responder(false));
    els.btnProxima.addEventListener("click", proximaPergunta);
    els.btnJogarNovamente.addEventListener("click", () => iniciarPartida(estado.nome));

    document.addEventListener("keydown", aoPressionarTecla);
  }

  function iniciar() {
    cacheElementos();
    els.timerProgresso.style.strokeDasharray = String(CIRCUNFERENCIA);
    carregarUltimoNome();
    vincularEventos();
  }

  return { iniciar };
})();

document.addEventListener("DOMContentLoaded", App.iniciar);
