const Ranking = (function () {
  const CHAVE_LOCAL = "quizClaudeCode.rankingLocal";
  const TIMEOUT_MS = 5000;

  let cliente = null;
  try {
    cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (erro) {
    cliente = null;
  }

  function comTimeout(promessa) {
    return Promise.race([
      promessa,
      new Promise((_, rejeitar) => setTimeout(() => rejeitar(new Error("timeout")), TIMEOUT_MS)),
    ]);
  }

  function lerLocal() {
    try {
      const dados = JSON.parse(localStorage.getItem(CHAVE_LOCAL) || "[]");
      return Array.isArray(dados) ? dados : [];
    } catch (erro) {
      return [];
    }
  }

  function gravarLocal(entrada) {
    const dados = lerLocal();
    dados.push(entrada);
    localStorage.setItem(CHAVE_LOCAL, JSON.stringify(dados));
  }

  function ordenar(a, b) {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;
    if (b.acertos !== a.acertos) return b.acertos - a.acertos;
    return new Date(a.criado_em) - new Date(b.criado_em);
  }

  async function salvarResultado({ nome, pontos, acertos }) {
    const criado_em = new Date().toISOString();
    if (cliente) {
      try {
        const { error } = await comTimeout(cliente.from("ranking").insert({ nome, pontos, acertos }));
        if (error) throw error;
        return { modo: "online" };
      } catch (erro) {
        // segue para o fallback local abaixo
      }
    }
    gravarLocal({ nome, pontos, acertos, criado_em });
    return { modo: "local" };
  }

  async function buscarTop10() {
    if (cliente) {
      try {
        const { data, error } = await comTimeout(
          cliente
            .from("ranking")
            .select("*")
            .order("pontos", { ascending: false })
            .order("acertos", { ascending: false })
            .order("criado_em", { ascending: true })
            .limit(10)
        );
        if (error) throw error;
        return { dados: data, modo: "online" };
      } catch (erro) {
        // segue para o fallback local abaixo
      }
    }
    const dados = lerLocal().sort(ordenar).slice(0, 10);
    return { dados, modo: "local" };
  }

  return { salvarResultado, buscarTop10 };
})();
