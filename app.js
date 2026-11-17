(function () {
  // ── storage seguro ──────────────────────────────────────────
  // em alguns ambientes (ex: abrindo o arquivo direto com duplo-clique,
  // protocolo file://, ou navegação privada) o sessionStorage pode lançar
  // erro ao ser acessado. Por isso todo acesso passa por aqui, com um
  // fallback em memória para a página nunca travar por causa disso.
  const memoryState = {};
  function storageGet(key) {
    try { return sessionStorage.getItem(key); }
    catch (e) { return memoryState[key] || null; }
  }
  function storageSet(key, value) {
    try { sessionStorage.setItem(key, value); }
    catch (e) { memoryState[key] = value; }
  }
  function storageGetJSON(key, fallback) {
    try { const v = JSON.parse(storageGet(key)); return (v === null || v === undefined) ? fallback : v; }
    catch (e) { return fallback; }
  }
  function storageSetJSON(key, value) {
    storageSet(key, JSON.stringify(value));
  }

  // ══════════════════════════════════════════════════════════════════
  // IDIOMA — PT/EN. LANG controla tudo; tr() resolve um campo bilíngue.
  // ══════════════════════════════════════════════════════════════════
  let LANG = (storageGet("trilha_lang") === "en") ? "en" : "pt";

  function tr(val){
    if (val === null || val === undefined) return "";
    if (typeof val === "string") return val;
    return val[LANG] || val.pt || val.en || "";
  }

  // texto com **negrito** → HTML seguro (escapa tudo e só libera o negrito)
  function fmt(val){
    const s = tr(val)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    return s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  }

  // textos fixos da interface (telas, botões, rótulos)
  const STRINGS = {
    pt: {
      landingBadge: "Ciclo B · Performance & Desenvolvimento",
      landingTitle1: "Jornada de",
      landingTitle2: "Desenvolvimento",
      landingSubtitle: "Seu desenvolvimento também faz parte da construção do futuro da Scania. Escolha seu destino e avance na sua Jornada.",
      landingCta: "Iniciar Jornada",
      landingDuration: "Duração: 8 a 10 minutos por jogo",

      headerTitle: "Gestão de Performance - Ciclo B",
      jornadaTitle: "Jornada de Desenvolvimento",

      game: "Jogo",
      next: "Avançar",
      finish: "Concluir",
      back: "Voltar",

      ovInfo: "Conteúdo",
      ovQuiz: "Desafio",
      ovChallenge: "Desafio",
      ovExplore: "Explore",
      ovHub: "Central de consulta",
      ovClosing: "Conclusão",
      ovMission: "Missão concluída",

      // painel do simulador
      hudQuestion: "Missão",
      hudQuestionVal: "Pergunta final",
      hudSituation: "Situação",
      hudScenario: "Cenário",
      hudLevel: "Nível",
      hudScore: "Acertos",
      hudStatus: "Status da linha",
      hudWaiting: "AGUARDANDO",
      hudOk: "OK",
      hudError: "ERRO",
      hudRound: "Rodada",
      hudDone: "CONCLUÍDA",
      workOrder: "Ordem de serviço",
      onSite: "Situação na operação",
      drawnQuestion: "Pergunta sorteada",
      simulation: "Simulação · situação fictícia",
      levelEasy: "Fácil",
      levelMid: "Intermediário",
      levelAdv: "Avançado",
      ask7020: "Aperte o botão da principal forma de aprendizado:",
      askScore: "Qual nota melhor representa o comportamento demonstrado?",
      askQuiz: "Escolha a alternativa correta:",
      lbl70: "Prática",
      lbl20: "Pessoas",
      lbl10: "Formal",
      grade: "Nota",
      correct: "Resposta correta!",
      incorrect: "Resposta incorreta",
      notQuite: "Não é bem assim!",
      thatsRight: "Isso mesmo!",
      correctClass: "A classificação correta é",
      bestGrade: "A nota mais adequada é",
      howToJustify: "Como justificar no comentário",
      nextSituation: "Próxima situação",
      nextScenario: "Próximo cenário",
      seeResult: "Ver resultado",
      playAgain: "Jogar novamente",
      hits: "acertos",
      resultTitle7020: "Desafio 70/20/10 concluído!",
      resultTitleSW: "Rodada Scania Way concluída!",
      resultHigh: "Excelente! Você identificou corretamente todas as situações.",
      resultMid: "Muito bem! Revise os feedbacks para reforçar os pontos de atenção.",
      resultLow: "Vale a pena revisar os feedbacks e jogar novamente com novas situações.",
      resultAgainHint: "Ao jogar novamente, você recebe uma nova combinação de situações.",
      examplesSupport: "Exemplos de apoio na prática:",
      inPractice: "Na prática",
      chooseCard: "Selecione um card para ver a explicação.",
      openGuide: "Abrir guia",
      quickAccess: "Acesso rápido",
      queryDone: "Consulta finalizada",
      introTag: "Apresentação",
      introTitle: "Boas-vindas à Jornada!",
      introSkip: "Pular apresentação",
      introGo: "Começar jornada",
      introHintPlaying: "Narração em andamento",
      introHintPaused: "Narração pausada",
      introHintMuted: "Som desligado",
      introHintEnd: "Fim da apresentação",
      introNoVoice: "Seu navegador não tem narração por voz. Leia a apresentação abaixo.",
      cycleName: "Ciclo B",
      langLabel: "Idioma",
      kpiQuestion: "Pergunta",
      finalQuestion: "Pergunta final",
      of: "de",
      mission: "Missão",
      tagEasy: "Nível fácil",
      tagMid: "Nível intermediário",
      tagAdv: "Nível avançado",
      askMainLearning: "Qual é a principal forma de aprendizado?",
      scale1: "Abaixo das expectativas",
      scale2: "Atende parcialmente",
      scale3: "Atende plenamente",
      scale4: "Supera as expectativas",
      scale5: "Supera amplamente",
      roundDoneKpi: "RODADA CONCLUÍDA",
      roundDoneTitle: "Rodada concluída!",
      perfectTitle: "Rodada perfeita!",
      perfectRound: "Rodada perfeita",
      sealUnlocked: "Selo desbloqueado",
      roundRegistered: "Rodada registrada",
      badgeSW: "Avaliador Scania Way",
      badge7020: "Especialista 70/20/10",
      shieldMissions: "MISSÕES",
      shieldHits: "ACERTOS",
      xpGained: "XP ganho",
      levelWord: "Nível",
      levelReached: "Alcançado",
      resultSubSW: "Você analisou 5 situações da operação. Revise os feedbacks e jogue novamente para receber novas missões.",
      resultSub7020: "Você analisou 5 situações da operação. Revise os feedbacks e jogue novamente para receber novas situações."
    },
    en: {
      landingBadge: "Template B · Performance & Development",
      landingTitle1: "Development",
      landingTitle2: "Journey",
      landingSubtitle: "Your development is also part of building Scania's future. Choose your destination and move forward on your Journey.",
      landingCta: "Start Journey",
      landingDuration: "Duration: 8 to 10 minutes per game",

      headerTitle: "Performance Management - Template B",
      jornadaTitle: "Development Journey",

      game: "Game",
      next: "Next",
      finish: "Finish",
      back: "Back",

      ovInfo: "Content",
      ovQuiz: "Challenge",
      ovChallenge: "Challenge",
      ovExplore: "Explore",
      ovHub: "Reference hub",
      ovClosing: "Conclusion",
      ovMission: "Mission complete",

      hudQuestion: "Mission",
      hudQuestionVal: "Final question",
      hudSituation: "Situation",
      hudScenario: "Scenario",
      hudLevel: "Level",
      hudScore: "Correct",
      hudStatus: "Line status",
      hudWaiting: "WAITING",
      hudOk: "OK",
      hudError: "ERROR",
      hudRound: "Round",
      hudDone: "COMPLETE",
      workOrder: "Work order",
      onSite: "Situation on the shop floor",
      drawnQuestion: "Random question",
      simulation: "Simulation · fictional situation",
      levelEasy: "Easy",
      levelMid: "Intermediate",
      levelAdv: "Advanced",
      ask7020: "Press the button for the main way of learning:",
      askScore: "Which score best represents the behavior shown?",
      askQuiz: "Choose the correct answer:",
      lbl70: "Practice",
      lbl20: "People",
      lbl10: "Formal",
      grade: "Score",
      correct: "Correct answer!",
      incorrect: "Incorrect answer",
      notQuite: "Not quite!",
      thatsRight: "That's right!",
      correctClass: "The correct classification is",
      bestGrade: "The most suitable score is",
      howToJustify: "How to justify it in the comment",
      nextSituation: "Next situation",
      nextScenario: "Next scenario",
      seeResult: "See result",
      playAgain: "Play again",
      hits: "correct",
      resultTitle7020: "70/20/10 challenge complete!",
      resultTitleSW: "Scania Way round complete!",
      resultHigh: "Excellent! You identified every situation correctly.",
      resultMid: "Well done! Review the feedback to reinforce the points of attention.",
      resultLow: "It's worth reviewing the feedback and playing again with new situations.",
      resultAgainHint: "When you play again, you get a new combination of situations.",
      examplesSupport: "Examples of support in practice:",
      inPractice: "In practice",
      chooseCard: "Select a card to see the explanation.",
      openGuide: "Open guide",
      quickAccess: "Quick access",
      queryDone: "Reference complete",
      introTag: "Introduction",
      introTitle: "Welcome to the Journey!",
      introSkip: "Skip introduction",
      introGo: "Start journey",
      introHintPlaying: "Narration playing",
      introHintPaused: "Narration paused",
      introHintMuted: "Sound off",
      introHintEnd: "End of introduction",
      introNoVoice: "Your browser doesn't support voice narration. Read the introduction below.",
      cycleName: "Template B",
      langLabel: "Language",
      kpiQuestion: "Question",
      finalQuestion: "Final question",
      of: "of",
      mission: "Mission",
      tagEasy: "Easy level",
      tagMid: "Intermediate level",
      tagAdv: "Advanced level",
      askMainLearning: "What is the main way of learning?",
      scale1: "Below expectations",
      scale2: "Partially meets",
      scale3: "Fully meets",
      scale4: "Exceeds expectations",
      scale5: "Far exceeds expectations",
      roundDoneKpi: "ROUND COMPLETE",
      roundDoneTitle: "Round complete!",
      perfectTitle: "Perfect round!",
      perfectRound: "Perfect round",
      sealUnlocked: "Badge unlocked",
      roundRegistered: "Round recorded",
      badgeSW: "Scania Way Assessor",
      badge7020: "70/20/10 Specialist",
      shieldMissions: "MISSIONS",
      shieldHits: "CORRECT",
      xpGained: "XP earned",
      levelWord: "Level",
      levelReached: "Reached",
      resultSubSW: "You analyzed 5 shop-floor situations. Review the feedback and play again to get new missions.",
      resultSub7020: "You analyzed 5 shop-floor situations. Review the feedback and play again to get new situations."
    }
  };
  const OVERLINE_KEY_BY_TYPE = {
    info: "ovInfo", quizBank: "ovQuiz", desafio7020: "ovChallenge", desafioSW: "ovChallenge",
    explore: "ovExplore", hub: "ovHub", closing: "ovClosing"
  };

  // ── temas da trilha ──────────────────────────────────────────
  // top/left em % sobre a imagem (0-100), ajuste pra encaixar nos prédios
  // da SUA foto (Images/Planta_fundo.jpeg). "icon" é o SVG mostrado do
  // lado do texto (equivalente ao cadeado da referência visual).
  const TEMAS = [
    {
      id: "cicloB", top: 40.9, left: 13.2, accent: "#1c5cc4",
      label: { pt: "Saiba mais<br>Sobre o Ciclo B", en: "Learn more<br>About Template B" },
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.34-5.66"/><polyline points="20 4 20 9 15 9"/></svg>'
    },
    {
      id: "rotaPDI", top: 34.3, left: 33.8, accent: "#16a34a",
      label: { pt: "Monte Sua Rota<br>PDI", en: "Build Your Route<br>IDP" },
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>'
    },
    {
      id: "carreira", top: 21.0, left: 55.9, accent: "#f59e0b",
      label: { pt: "Explore o seu<br>desenvolvimento<br>(Carreira)", en: "Explore your<br>development<br>(Career)" },
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/></svg>'
    },
    {
      id: "autoavaliacao", top: 44.9, left: 52.8, accent: "#C00000",
      label: { pt: "Scania Way em<br>ação<br>Autoavaliação", en: "Scania Way in<br>action<br>Self-assessment" },
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><polyline points="9 13 11 15 15 10.5"/></svg>'
    },
    {
      id: "mySuccess", top: 40.9, left: 79.2, accent: "#0891b2",
      label: { pt: "Central MySuccess", en: "MySuccess Hub" },
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="1"/></svg>'
    }
    // top/left = ponto do prédio (em % da imagem); a caixa fica logo acima, com uma perninha até ele
    // adicione o 6º tema aqui quando tiver o texto/posição dele
    // — a barra de progresso e as bolinhas se ajustam sozinhas à quantidade de itens desta lista
  ];

  function hexToRgba(hex, alpha){
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  const ARROW_ICON =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';

  const CHECK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6"/></svg>';

  function getTemasDone(){
    try { return JSON.parse(storageGet("trilha_temas_done") || "[]"); }
    catch (e) { return []; }
  }
  function setTemasDone(list){
    storageSet("trilha_temas_done", JSON.stringify(list));
  }
  function markTemaDone(id){
    const done = getTemasDone();
    if (done.indexOf(id) === -1) {
      done.push(id);
      setTemasDone(done);
    }
    renderTemas();
    renderJornada();
  }

  // progresso dentro de cada tema (0 a 1), guardado ao avançar as telas do modal
  function getTemasProg(){
    return storageGetJSON("trilha_temas_prog", {});
  }
  function setTemaProg(id, frac){
    const prog = getTemasProg();
    if (!(prog[id] >= frac)) { prog[id] = frac; storageSetJSON("trilha_temas_prog", prog); }
  }

  // caixas do mapa — selo hexagonal (número/ícone) + nome com barra de progresso
  function renderTemas(){
    const layer = document.getElementById("trilhaTemasLayer");
    if (!layer) return;
    const done = getTemasDone();
    const prog = getTemasProg();
    const proximo = TEMAS.filter(function(t){ return done.indexOf(t.id) === -1; })[0];
    layer.innerHTML = "";
    TEMAS.forEach(function(tema, i){
      const isDone = done.indexOf(tema.id) !== -1;
      const isNext = !isDone && proximo && proximo.id === tema.id;
      const pct = isDone ? 100 : Math.round((prog[tema.id] || 0) * 100);
      const box = document.createElement("button");
      box.type = "button";
      box.className = "fase" + (isDone ? " is-done" : "") + (isNext ? " is-next" : "") + (tema.left >= 88 ? " is-flip" : "");
      box.dataset.tema = tema.id;
      box.style.top = tema.top + "%";
      box.style.left = tema.left + "%";
      box.style.setProperty("--tema-accent", tema.accent);
      const nome = tr(tema.label).replace(/<br\s*\/?>/gi, " ");
      box.setAttribute("aria-label", nome + (isDone ? " ✓" : ""));
      box.innerHTML =
        '<span class="fase__hex"><span class="fase__hex-in">' +
          '<span class="fase__ic">' + tema.icon + '</span>' +
        '</span></span>' +
        '<span class="fase__tx">' +
          '<span class="fase__nm">' + nome + '</span>' +
          '<span class="fase__bar"><i style="width:' + pct + '%"></i></span>' +
        '</span>' +
        (isDone ? '<span class="fase__check">' + CHECK_ICON + '</span>' : '') +
        '<span class="fase__leg"></span><span class="fase__dot"></span>';
      box.style.animationDelay = (0.1 + i * 0.12) + "s";
      box.addEventListener("click", function(){ abrirTema(tema.id); });
      layer.appendChild(box);
    });
  }

  function abrirTema(id){
    abrirModalTema(id);
  }

  // ══════════════════════════════════════════════════════════════════
  // CONTEÚDO DOS TEMAS — conforme o documento "REVISÃO JOGO"
  // Todo campo de texto é { pt: "...", en: "..." } e passa por tr()/fmt()
  // **texto** = negrito
  // ══════════════════════════════════════════════════════════════════

  // links oficiais
  const LINKS = {
    manualCicloB:      "https://sway.cloud.microsoft/1L0anMOtcTZ8bkIP?ref=Link",
    manualCicloBEmail: "https://sway.cloud.microsoft/1L0anMOtcTZ8bkIP?ref=email",
    metodologia702010: "https://scaniaazureservices.sharepoint.com/:b:/t/PessoasCultura61-08.1LHRD-DesenvolvimentoOrganizacional/IQBOGbvpUWUPSJ_eVoOxFCiaAa4wiLdbfe0MEx3pEmk8ghQ?e=HnWAjL",
    mySuccessSF:       "https://performancemanager5.successfactors.eu/sf/home?bplte_company=volkswagenP20&_s.crb=BoN5usTgOdzpUVyMJv39RwIRdokJ4HgjpOLt29C4ryc%3d#/",
    mySuccess:         "https://mysuccess.scania.com/",
    pdiCicloB:         "https://scaniaazureservices.sharepoint.com/:b:/r/teams/PessoasCultura61-08.1LHRD-DesenvolvimentoOrganizacional/Shared%20Documents/08.%20LHRD%20-%20Desenvolvimento%20Organizacional/05.%20Performance%20Mgm%20%26%20Sucess%C3%A3o/00.%202026/05.%20Treinamentos/Performance/02.%20Ciclo%20B/PDI%20CICLO%20B.pdf?d=we9bb194e6551480f9fde5683b114289a&csf=1&web=1&e=XtVA0O",
    autoavaliacaoCicloB: "https://scaniaazureservices.sharepoint.com/:b:/r/teams/PessoasCultura61-08.1LHRD-DesenvolvimentoOrganizacional/Shared%20Documents/08.%20LHRD%20-%20Desenvolvimento%20Organizacional/05.%20Performance%20Mgm%20%26%20Sucess%C3%A3o/00.%202026/05.%20Treinamentos/Performance/02.%20Ciclo%20B/AUTOAVALIA%C3%87%C3%83O%20CICLO%20B.pdf?d=w2dabdacdefdc42288e98ccaf508ab7aa&csf=1&web=1&e=SAA2pH",
    jobArchitecture:   "https://scaniaazureservices.sharepoint.com/teams/DescriesdeCargos-JobArchitecture/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=PAYP7o&CID=9a380c28-f8b8-4819-9586-d2038bff784c&FolderCTID=0x0120004C09A1BB374FD744B49F49905C1693D3&id=%2Fteams%2FDescriesdeCargos-JobArchitecture%2FShared%20Documents%2FGeneral&TeamsCID=1b34fe31-c222-4460-8871-26200525338b",
    reflex:            "https://sla.reflex.scania.com/sla/11902.html"
  };

  // ícones (traço) usados nos cards
  const S = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">';
  const ICONS = {
    eye:      S + '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    clip:     S + '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><polyline points="9 13 11 15 15 10.5"/></svg>',
    scale:    S + '<line x1="12" y1="3" x2="12" y2="21"/><line x1="5" y1="7" x2="19" y2="7"/><path d="M5 7l-3 6a3 3 0 0 0 6 0z"/><path d="M19 7l-3 6a3 3 0 0 0 6 0z"/><line x1="8" y1="21" x2="16" y2="21"/></svg>',
    bulb:     S + '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>',
    users:    S + '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15 14.5c2.8.3 5 2.6 5 5.5"/></svg>',
    hands:    S + '<circle cx="8" cy="10" r="3.2"/><path d="M2.5 21c0-3.3 2.5-5.6 5.5-5.6s5.5 2.3 5.5 5.6"/><path d="M13 3h8a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 21 11h-4.5L14 13.2V11h-1a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 13 3z"/><line x1="15" y1="6.3" x2="19.5" y2="6.3"/><line x1="15" y1="8.4" x2="18" y2="8.4"/></svg>',
    userCheck:S + '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6 1.5 0 2.9.6 4 1.5"/><polyline points="15 18 17 20 21 15"/></svg>',
    network:  S + '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5L6.5 17M12 11.5l5.5 5.5"/></svg>',
    wrench:   S + '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>',
    target:   S + '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    compass:  S + '<circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5"/></svg>',
    chat:     S + '<path d="M4 4h12v9H8l-4 3z"/><path d="M8 16v1h8l4 3V10h-4"/></svg>',
    trend:    S + '<polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/></svg>',
    book:     S + '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    info:     S + '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12" y2="8"/></svg>',
    monitor:  S + '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>',
    shield:   S + '<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><polyline points="9 12 11 14 15 10"/></svg>',
    flag:     S + '<path d="M4 22V3"/><path d="M4 3h13l-2 4 2 4H4"/></svg>'
  };

  // ── BANCO 1 — Papel do colaborador no Ciclo B (1 pergunta sorteada por partida)
  // a resposta correta é marcada por "correta: true" (código fixo), nunca pela letra exibida
  const BANCO_CICLO_B = [
    {
      id: "cb1",
      pergunta: { pt: "Qual atitude melhor representa o papel do colaborador no Ciclo B?", en: "Which attitude best represents the employee's role in Template B?" },
      opcoes: [
        { id: "a", texto: { pt: "Realizar a autoavaliação e aguardar a liderança definir as ações do PDI.", en: "Completing the self-assessment and waiting for the leader to define the IDP actions." }, correta: false,
          feedback: { pt: "Quase lá! A autoavaliação é importante, mas o colaborador também participa da construção do PDI, definindo ações de desenvolvimento junto à liderança.", en: "Almost there! The self-assessment is important, but the employee also takes part in building the IDP, defining development actions together with the leader." } },
        { id: "b", texto: { pt: "Participar da avaliação anual e deixar a definição do desenvolvimento sob responsabilidade da liderança.", en: "Taking part in the annual assessment and leaving the definition of development to the leader." }, correta: false,
          feedback: { pt: "Não é bem assim! A liderança apoia o desenvolvimento, mas o colaborador também participa da identificação de oportunidades e da definição das ações do PDI.", en: "Not quite! The leader supports development, but the employee also helps identify opportunities and define the IDP actions." } },
        { id: "c", texto: { pt: "Refletir sobre o desempenho, participar da avaliação e construir o PDI junto à liderança.", en: "Reflecting on performance, taking part in the assessment and building the IDP together with the leader." }, correta: true,
          feedback: { pt: "Isso mesmo! O colaborador participa ativamente da avaliação anual e contribui para a construção do PDI, assumindo um papel ativo no próprio desenvolvimento.", en: "That's right! The employee actively takes part in the annual assessment and contributes to building the IDP, playing an active role in their own development." } },
        { id: "d", texto: { pt: "Identificar oportunidades de melhoria e definir individualmente as ações do PDI.", en: "Identifying improvement opportunities and defining the IDP actions alone." }, correta: false,
          feedback: { pt: "Identificar oportunidades de melhoria faz parte do processo, mas o PDI deve ser construído em conjunto com a liderança.", en: "Identifying improvement opportunities is part of the process, but the IDP should be built together with the leader." } }
      ]
    },
    {
      id: "cb2",
      pergunta: { pt: "Qual é a postura mais adequada do colaborador ao se preparar para a avaliação de desempenho?", en: "What is the most appropriate approach for an employee preparing for the performance assessment?" },
      opcoes: [
        { id: "a", texto: { pt: "Refletir sobre os comportamentos demonstrados e considerar exemplos reais do dia a dia.", en: "Reflecting on the behaviors shown and considering real day-to-day examples." }, correta: true,
          feedback: { pt: "Isso mesmo! A autoavaliação deve considerar comportamentos observáveis e situações reais, tendo os valores do Scania Way como referência.", en: "That's right! The self-assessment should consider observable behaviors and real situations, using the Scania Way values as a reference." } },
        { id: "b", texto: { pt: "Considerar principalmente os acontecimentos mais recentes, pois representam o desempenho atual.", en: "Mainly considering the most recent events, since they represent current performance." }, correta: false,
          feedback: { pt: "Os acontecimentos recentes são importantes, mas a reflexão deve considerar a atuação ao longo do período avaliado.", en: "Recent events matter, but the reflection should consider performance throughout the whole period assessed." } },
        { id: "c", texto: { pt: "Aguardar a avaliação da liderança para depois refletir sobre o próprio desempenho.", en: "Waiting for the leader's assessment before reflecting on one's own performance." }, correta: false,
          feedback: { pt: "A autoavaliação é uma oportunidade para o colaborador refletir sobre sua atuação e contribuir para a conversa com a liderança.", en: "The self-assessment is an opportunity for the employee to reflect on their performance and contribute to the conversation with the leader." } },
        { id: "d", texto: { pt: "Concentrar a autoavaliação nos resultados das atividades, independentemente dos comportamentos.", en: "Focusing the self-assessment on task results, regardless of behaviors." }, correta: false,
          feedback: { pt: "No Ciclo B, a avaliação considera os comportamentos demonstrados, com base nos valores do Scania Way.", en: "In Template B, the assessment considers the behaviors shown, based on the Scania Way values." } }
      ]
    },
    {
      id: "cb3",
      pergunta: { pt: "Ao identificar uma oportunidade de desenvolvimento, qual atitude está mais alinhada ao Ciclo B?", en: "When identifying a development opportunity, which attitude is most aligned with Template B?" },
      opcoes: [
        { id: "a", texto: { pt: "Aguardar a liderança apresentar as ações de desenvolvimento.", en: "Waiting for the leader to present the development actions." }, correta: false,
          feedback: { pt: "A liderança apoia o processo, mas o colaborador também deve participar da identificação e da definição das ações de desenvolvimento.", en: "The leader supports the process, but the employee should also take part in identifying and defining the development actions." } },
        { id: "b", texto: { pt: "Definir as ações individualmente e informar à liderança após iniciar sua execução.", en: "Defining the actions alone and informing the leader after starting them." }, correta: false,
          feedback: { pt: "O protagonismo é importante, mas as ações do PDI devem ser construídas e alinhadas com a liderança.", en: "Taking ownership is important, but the IDP actions should be built and aligned with the leader." } },
        { id: "c", texto: { pt: "Priorizar a participação em treinamentos formais como principal caminho de desenvolvimento.", en: "Prioritizing formal training as the main path for development." }, correta: false,
          feedback: { pt: "Os treinamentos são uma possibilidade, mas o desenvolvimento também acontece na prática e na troca de experiências.", en: "Training is one possibility, but development also happens through practice and sharing experiences." } },
        { id: "d", texto: { pt: "Conversar com a liderança e contribuir para a definição de ações práticas no PDI.", en: "Talking with the leader and contributing to defining practical actions in the IDP." }, correta: true,
          feedback: { pt: "Isso mesmo! O PDI é construído em conjunto, considerando oportunidades de melhoria, objetivos profissionais e ações viáveis de desenvolvimento.", en: "That's right! The IDP is built together, considering improvement opportunities, professional goals and feasible development actions." } }
      ]
    },
    {
      id: "cb4",
      pergunta: { pt: "Durante a conversa de avaliação, existem percepções diferentes entre colaborador e liderança. Qual é a atitude mais adequada?", en: "During the assessment conversation, the employee and the leader have different perceptions. What is the most appropriate attitude?" },
      opcoes: [
        { id: "a", texto: { pt: "Concordar com a avaliação da liderança, mesmo sem esclarecer as diferenças de percepção.", en: "Agreeing with the leader's assessment, even without clarifying the differences in perception." }, correta: false,
          feedback: { pt: "A conversa de avaliação é uma oportunidade para compartilhar percepções e esclarecer dúvidas de maneira respeitosa.", en: "The assessment conversation is an opportunity to share perceptions and clarify doubts respectfully." } },
        { id: "b", texto: { pt: "Apresentar exemplos concretos, ouvir o feedback e dialogar sobre as diferenças de percepção.", en: "Presenting concrete examples, listening to the feedback and discussing the differences in perception." }, correta: true,
          feedback: { pt: "Isso mesmo! O diálogo permite compreender diferentes percepções e alinhar o entendimento sobre os comportamentos demonstrados.", en: "That's right! Dialogue helps understand different perceptions and align the understanding of the behaviors shown." } },
        { id: "c", texto: { pt: "Considerar a autoavaliação como referência principal, independentemente das observações da liderança.", en: "Treating the self-assessment as the main reference, regardless of the leader's observations." }, correta: false,
          feedback: { pt: "A autoavaliação é importante, mas a conversa também considera os comportamentos observados pela liderança.", en: "The self-assessment is important, but the conversation also considers the behaviors observed by the leader." } },
        { id: "d", texto: { pt: "Concentrar a conversa nas próximas ações de desenvolvimento, sem aprofundar as diferenças identificadas.", en: "Focusing the conversation on the next development actions, without exploring the differences identified." }, correta: false,
          feedback: { pt: "As ações de desenvolvimento são importantes, mas compreender as percepções sobre o desempenho também faz parte do processo.", en: "Development actions are important, but understanding perceptions about performance is also part of the process." } }
      ]
    },
    {
      id: "cb5",
      pergunta: { pt: "Qual afirmação representa melhor a relação entre avaliação de desempenho e desenvolvimento no Ciclo B?", en: "Which statement best represents the relationship between performance assessment and development in Template B?" },
      opcoes: [
        { id: "a", texto: { pt: "O desenvolvimento deve ser planejado após a avaliação e retomado no próximo ciclo.", en: "Development should be planned after the assessment and picked up again in the next cycle." }, correta: false,
          feedback: { pt: "A avaliação é anual, mas as ações de desenvolvimento podem acontecer e ser acompanhadas ao longo do ano.", en: "The assessment is annual, but development actions can happen and be followed up throughout the year." } },
        { id: "b", texto: { pt: "As ações de desenvolvimento são necessárias principalmente quando a avaliação identifica comportamentos a melhorar.", en: "Development actions are needed mainly when the assessment identifies behaviors to improve." }, correta: false,
          feedback: { pt: "O desenvolvimento também pode fortalecer competências e ampliar conhecimentos, não apenas corrigir oportunidades de melhoria.", en: "Development can also strengthen skills and broaden knowledge, not just address improvement opportunities." } },
        { id: "c", texto: { pt: "A avaliação acontece anualmente, enquanto o desenvolvimento é contínuo e envolve a participação do colaborador e da liderança.", en: "The assessment happens annually, while development is continuous and involves both the employee and the leader." }, correta: true,
          feedback: { pt: "Isso mesmo! A avaliação é realizada uma vez ao ano, mas o desenvolvimento acontece continuamente, por meio de aprendizados, feedbacks e ações práticas.", en: "That's right! The assessment happens once a year, but development happens continuously, through learning, feedback and practical actions." } },
        { id: "d", texto: { pt: "A participação do colaborador concentra-se na avaliação anual, enquanto a liderança acompanha o desenvolvimento.", en: "The employee's participation is concentrated on the annual assessment, while the leader follows up on development." }, correta: false,
          feedback: { pt: "O colaborador também participa da realização e do acompanhamento das ações de desenvolvimento ao longo do ano.", en: "The employee also takes part in carrying out and following up on development actions throughout the year." } }
      ]
    },
    {
      id: "cb6",
      pergunta: { pt: "Após a construção do PDI, qual atitude demonstra protagonismo no desenvolvimento?", en: "After building the IDP, which attitude shows ownership of development?" },
      opcoes: [
        { id: "a", texto: { pt: "Colocar em prática as ações combinadas, acompanhar a evolução e conversar com a liderança sobre os aprendizados.", en: "Putting the agreed actions into practice, tracking progress and talking with the leader about what was learned." }, correta: true,
          feedback: { pt: "Isso mesmo! O protagonismo envolve participar da construção do PDI e colocar em prática as ações de desenvolvimento.", en: "That's right! Ownership means taking part in building the IDP and putting the development actions into practice." } },
        { id: "b", texto: { pt: "Aguardar a liderança solicitar atualizações sobre as ações definidas.", en: "Waiting for the leader to ask for updates on the defined actions." }, correta: false,
          feedback: { pt: "A liderança apoia o acompanhamento, mas o colaborador também deve participar ativamente da realização das ações.", en: "The leader supports the follow-up, but the employee should also actively carry out the actions." } },
        { id: "c", texto: { pt: "Retomar as ações do PDI somente no período da próxima avaliação.", en: "Returning to the IDP actions only in the next assessment period." }, correta: false,
          feedback: { pt: "O desenvolvimento é contínuo. As ações do PDI devem ser realizadas e acompanhadas ao longo do ano.", en: "Development is continuous. The IDP actions should be carried out and followed up throughout the year." } },
        { id: "d", texto: { pt: "Priorizar as ações de desenvolvimento que envolvam treinamentos oferecidos pela empresa.", en: "Prioritizing development actions that involve company training courses." }, correta: false,
          feedback: { pt: "Os treinamentos são importantes, mas o PDI também pode incluir experiências práticas e aprendizado com outras pessoas.", en: "Training is important, but the IDP can also include practical experiences and learning from other people." } }
      ]
    },
    {
      id: "cb7",
      pergunta: { pt: "Qual situação demonstra uma participação efetiva do colaborador na construção do PDI?", en: "Which situation shows effective employee participation in building the IDP?" },
      opcoes: [
        { id: "a", texto: { pt: "Aceitar as ações sugeridas pela liderança, considerando que ela conhece as necessidades da área.", en: "Accepting the actions suggested by the leader, since they know the area's needs." }, correta: false,
          feedback: { pt: "A visão da liderança é importante, mas o colaborador também deve contribuir com suas percepções e interesses de desenvolvimento.", en: "The leader's view is important, but the employee should also contribute their own perceptions and development interests." } },
        { id: "b", texto: { pt: "Priorizar ações relacionadas aos interesses profissionais, mesmo sem alinhamento com as necessidades da função.", en: "Prioritizing actions related to professional interests, even without alignment with the role's needs." }, correta: false,
          feedback: { pt: "Os interesses profissionais devem ser considerados junto às necessidades de desenvolvimento e à realidade da função.", en: "Professional interests should be considered together with development needs and the reality of the role." } },
        { id: "c", texto: { pt: "Definir objetivos de desenvolvimento e buscar aprovação da liderança apenas ao finalizar o PDI.", en: "Defining development goals and seeking the leader's approval only when the IDP is finished." }, correta: false,
          feedback: { pt: "A construção do PDI deve acontecer em conjunto, permitindo o alinhamento dos objetivos e das ações.", en: "The IDP should be built together, allowing goals and actions to be aligned." } },
        { id: "d", texto: { pt: "Compartilhar interesses, discutir oportunidades de melhoria e combinar ações viáveis com a liderança.", en: "Sharing interests, discussing improvement opportunities and agreeing on feasible actions with the leader." }, correta: true,
          feedback: { pt: "Isso mesmo! A construção do PDI envolve diálogo, participação ativa e definição conjunta de objetivos e ações de desenvolvimento.", en: "That's right! Building the IDP involves dialogue, active participation and jointly defining development goals and actions." } }
      ]
    },
    {
      id: "cb8",
      pergunta: { pt: "Um colaborador recebe um feedback sobre uma oportunidade de melhoria. Como esse momento pode contribuir para o Ciclo B?", en: "An employee receives feedback about an improvement opportunity. How can this moment contribute to Template B?" },
      opcoes: [
        { id: "a", texto: { pt: "O feedback deve ser considerado principalmente na próxima avaliação anual.", en: "The feedback should be considered mainly in the next annual assessment." }, correta: false,
          feedback: { pt: "O feedback pode orientar ações de desenvolvimento ao longo do ano, sem precisar aguardar a próxima avaliação.", en: "Feedback can guide development actions throughout the year, without waiting for the next assessment." } },
        { id: "b", texto: { pt: "O feedback pode apoiar a reflexão e a definição de ações de desenvolvimento junto à liderança.", en: "The feedback can support reflection and the definition of development actions with the leader." }, correta: true,
          feedback: { pt: "Isso mesmo! O feedback contribui para reconhecer pontos fortes, identificar oportunidades de melhoria e orientar ações práticas de desenvolvimento.", en: "That's right! Feedback helps recognize strengths, identify improvement opportunities and guide practical development actions." } },
        { id: "c", texto: { pt: "A liderança deve transformar o feedback em uma ação de desenvolvimento e comunicar ao colaborador.", en: "The leader should turn the feedback into a development action and inform the employee." }, correta: false,
          feedback: { pt: "A liderança apoia a definição das ações, mas o colaborador também participa ativamente desse processo.", en: "The leader supports defining the actions, but the employee also actively takes part in this process." } },
        { id: "d", texto: { pt: "O feedback pode substituir a construção do PDI quando as oportunidades de melhoria estão claras.", en: "The feedback can replace building the IDP when the improvement opportunities are clear." }, correta: false,
          feedback: { pt: "O feedback ajuda a identificar oportunidades, enquanto o PDI organiza os objetivos e as ações de desenvolvimento.", en: "Feedback helps identify opportunities, while the IDP organizes development goals and actions." } }
      ]
    }
  ];

  // ── BANCO 2 — Desafio 70/20/10 (12 situações em 3 níveis; 5 por rodada)
  const BANCO_7020 = [
    { id: "s1", nivel: 1, tema: { pt: "Qualidade", en: "Quality" }, resposta: "10",
      situacao: { pt: "Um colaborador participa de uma capacitação sobre os padrões de qualidade utilizados na produção, com explicações e exercícios conduzidos por um instrutor.", en: "An employee attends a training session on the quality standards used in production, with explanations and exercises led by an instructor." },
      feedback: { pt: "O aprendizado acontece por meio de uma capacitação estruturada.", en: "Learning happens through structured training." } },
    { id: "s2", nivel: 1, tema: { pt: "Organização do posto", en: "Workstation organization" }, resposta: "20",
      situacao: { pt: "Para melhorar a organização do posto de trabalho, um colaborador conversa com colegas de outras áreas e conhece soluções que eles utilizam em suas rotinas.", en: "To improve the organization of the workstation, an employee talks with colleagues from other areas and learns about solutions they use in their routines." },
      feedback: { pt: "O aprendizado acontece principalmente pela troca de experiências e conhecimentos.", en: "Learning happens mainly through sharing experiences and knowledge." } },
    { id: "s3", nivel: 1, tema: { pt: "Melhoria contínua", en: "Continuous improvement" }, resposta: "70",
      situacao: { pt: "Como parte do seu PDI, um colaborador participa de uma ação de melhoria, testa uma nova organização dos materiais e acompanha os resultados.", en: "As part of their IDP, an employee takes part in an improvement action, tests a new way of organizing materials and tracks the results." },
      feedback: { pt: "O aprendizado acontece pela experiência prática, ao aplicar melhorias e avaliar os resultados.", en: "Learning happens through practical experience, by applying improvements and evaluating the results." } },
    { id: "s4", nivel: 1, tema: { pt: "Desenho técnico", en: "Technical drawing" }, resposta: "10",
      situacao: { pt: "Um colaborador participa de um curso estruturado sobre leitura e interpretação de desenhos técnicos para ampliar seus conhecimentos.", en: "An employee takes a structured course on reading and interpreting technical drawings to broaden their knowledge." },
      feedback: { pt: "O aprendizado acontece por meio de um curso com conteúdo estruturado.", en: "Learning happens through a course with structured content." } },
    { id: "s5", nivel: 2, tema: { pt: "Comunicação entre turnos", en: "Communication between shifts" }, resposta: "20",
      situacao: { pt: "Um colaborador quer aprimorar sua comunicação na passagem de turno. Para isso, solicita feedback ao Team Leader e conversa sobre como transmitir informações com mais clareza.", en: "An employee wants to improve their communication at shift handover. To do so, they ask the Team Leader for feedback and talk about how to pass on information more clearly." },
      feedback: { pt: "O aprendizado acontece por meio de feedbacks e orientações.", en: "Learning happens through feedback and guidance." } },
    { id: "s6", nivel: 2, tema: { pt: "Redução de desperdícios", en: "Waste reduction" }, resposta: "70",
      situacao: { pt: "Durante uma iniciativa de melhoria contínua, um colaborador participa da identificação de desperdícios, testa uma ação aprovada e verifica seu efeito no processo.", en: "During a continuous improvement initiative, an employee helps identify waste, tests an approved action and checks its effect on the process." },
      feedback: { pt: "O aprendizado acontece pela experiência de executar e acompanhar uma melhoria real.", en: "Learning happens through the experience of carrying out and following up on a real improvement." } },
    { id: "s7", nivel: 2, tema: { pt: "Ferramentas de análise", en: "Analysis tools" }, resposta: "10",
      situacao: { pt: "Para conhecer uma nova ferramenta de análise de problemas, um colaborador participa de um treinamento com demonstrações e exercícios orientados.", en: "To learn a new problem-analysis tool, an employee attends a training session with demonstrations and guided exercises." },
      feedback: { pt: "Mesmo contendo exercícios, o aprendizado ocorre principalmente em uma capacitação estruturada.", en: "Even with exercises, learning happens mainly in structured training." } },
    { id: "s8", nivel: 2, tema: { pt: "Análise de qualidade", en: "Quality analysis" }, resposta: "20",
      situacao: { pt: "Um colaborador acompanha um colega experiente durante uma análise de qualidade. Depois, conversa com ele sobre os critérios utilizados para identificar possíveis causas de um desvio.", en: "An employee shadows an experienced colleague during a quality analysis. Afterwards, they talk about the criteria used to identify possible causes of a deviation." },
      feedback: { pt: "O aprendizado acontece principalmente pela observação e troca de conhecimentos com outra pessoa.", en: "Learning happens mainly through observing and sharing knowledge with another person." } },
    { id: "s9", nivel: 3, tema: { pt: "Aplicação de melhorias", en: "Applying improvements" }, resposta: "70",
      situacao: { pt: "Após receber orientações sobre uma ferramenta de melhoria, um colaborador a utiliza em uma iniciativa da área, avalia os resultados e propõe ajustes com a equipe.", en: "After receiving guidance on an improvement tool, an employee uses it in an area initiative, evaluates the results and proposes adjustments with the team." },
      feedback: { pt: "Embora exista orientação, o principal aprendizado acontece na aplicação da ferramenta e na avaliação dos resultados.", en: "Although there is guidance, the main learning happens in applying the tool and evaluating the results." } },
    { id: "s10", nivel: 3, tema: { pt: "Investigação de desvios", en: "Deviation investigation" }, resposta: "20",
      situacao: { pt: "Um colaborador participa de uma análise de problema real na linha. Durante a atividade, recebe explicações de um colega sobre os critérios de investigação e discute diferentes possibilidades de solução.", en: "An employee takes part in analyzing a real problem on the line. During the activity, a colleague explains the investigation criteria and they discuss different possible solutions." },
      feedback: { pt: "Apesar de ocorrer em uma situação real, o aprendizado está concentrado nas explicações e na troca de conhecimentos.", en: "Although it happens in a real situation, learning is concentrated on the explanations and the exchange of knowledge." } },
    { id: "s11", nivel: 3, tema: { pt: "Metodologia de melhoria", en: "Improvement methodology" }, resposta: "10",
      situacao: { pt: "Após trocar experiências com colegas sobre redução de desperdícios, um colaborador participa de uma capacitação estruturada para aprender os conceitos e as etapas de uma metodologia de melhoria.", en: "After sharing experiences with colleagues about waste reduction, an employee attends structured training to learn the concepts and stages of an improvement methodology." },
      feedback: { pt: "Embora exista troca de experiências, o aprendizado principal acontece na capacitação estruturada.", en: "Although there is an exchange of experiences, the main learning happens in the structured training." } },
    { id: "s12", nivel: 3, tema: { pt: "Resolução de problemas", en: "Problem solving" }, resposta: "70",
      situacao: { pt: "Como parte do PDI, um colaborador participa de um treinamento sobre resolução de problemas, recebe orientações da liderança e depois aplica uma contramedida aprovada, acompanhando os resultados na operação.", en: "As part of the IDP, an employee attends problem-solving training, receives guidance from the leader and then applies an approved countermeasure, tracking the results in operations." },
      feedback: { pt: "As três formas de aprendizado aparecem, mas a experiência prática é o foco principal da situação.", en: "All three ways of learning appear, but practical experience is the main focus of the situation." } }
  ];

  // ── BANCO 3 — Scania Way em ação (24 cenários; 5 por partida, valores diferentes)
  const VALORES_SW = {
    cliente:      { pt: "Cliente em Primeiro Lugar", en: "Customer First" },
    desperdicio:  { pt: "Eliminação de Desperdícios", en: "Elimination of Waste" },
    equipe:       { pt: "Espírito de Equipe", en: "Team Spirit" },
    respeito:     { pt: "Respeito", en: "Respect" },
    responsab:    { pt: "Responsabilidade", en: "Responsibility" },
    saude:        { pt: "Saúde", en: "Health" },
    seguranca:    { pt: "Segurança", en: "Safety" },
    ambiente:     { pt: "Meio Ambiente", en: "Environment" }
  };
  const BANCO_SW = [
    { id: "sw1", valor: "cliente", nota: 2,
      cenario: { pt: "Durante a montagem, um colaborador percebe uma diferença no padrão de qualidade, mas só comunica a situação após ser questionado pela liderança.", en: "During assembly, an employee notices a difference in the quality standard, but only reports it after being asked by the leader." },
      justificativa: { pt: "Reconhece a situação, mas demonstra atuação parcialmente alinhada ao esperado.", en: "Recognizes the situation, but shows behavior only partially aligned with expectations." },
      comentario: { pt: "Identifiquei uma diferença no padrão de qualidade, mas precisei de orientação para comunicar o desvio no momento adequado.", en: "I identified a difference in the quality standard, but needed guidance to report the deviation at the right time." } },
    { id: "sw2", valor: "cliente", nota: 3,
      cenario: { pt: "Um colaborador identifica um desvio que pode afetar a próxima etapa, segue o procedimento aplicável e comunica a liderança para evitar impactos.", en: "An employee identifies a deviation that could affect the next stage, follows the applicable procedure and informs the leader to avoid impacts." },
      justificativa: { pt: "Cumpre os padrões e atua corretamente diante de um desvio.", en: "Meets the standards and acts correctly when facing a deviation." },
      comentario: { pt: "Identifiquei um desvio, segui o procedimento e comuniquei a liderança para proteger a qualidade da próxima etapa.", en: "I identified a deviation, followed the procedure and informed the leader to protect the quality of the next stage." } },
    { id: "sw3", valor: "cliente", nota: 5,
      cenario: { pt: "Um colaborador desenvolve uma solução para um problema recorrente de qualidade. Após validação, a melhoria é adotada por outras equipes e mantém resultados positivos.", en: "An employee develops a solution to a recurring quality problem. After validation, the improvement is adopted by other teams and keeps delivering positive results." },
      justificativa: { pt: "A contribuição gera impacto sustentável e é compartilhada com outras equipes.", en: "The contribution creates sustainable impact and is shared with other teams." },
      comentario: { pt: "Contribuí para uma solução de qualidade que, após validação, foi aplicada em outras equipes e apresentou resultados sustentáveis.", en: "I contributed to a quality solution that, after validation, was applied in other teams and delivered sustainable results." } },
    { id: "sw4", valor: "desperdicio", nota: 1,
      cenario: { pt: "Mesmo percebendo perdas frequentes de material, um colaborador continua descartando recursos de forma inadequada e não segue as orientações recebidas.", en: "Even noticing frequent material losses, an employee keeps discarding resources improperly and does not follow the guidance received." },
      justificativa: { pt: "Não demonstra o comportamento esperado de utilização responsável dos recursos.", en: "Does not show the expected behavior of using resources responsibly." },
      comentario: { pt: "Identifiquei que preciso melhorar o cumprimento dos procedimentos de descarte e utilização de materiais.", en: "I identified that I need to improve how I follow the procedures for discarding and using materials." } },
    { id: "sw5", valor: "desperdicio", nota: 3,
      cenario: { pt: "Durante as atividades, um colaborador utiliza os recursos adequadamente, evita perdas e participa das melhorias propostas para aumentar a eficiência do processo.", en: "During activities, an employee uses resources properly, avoids losses and takes part in the improvements proposed to increase process efficiency." },
      justificativa: { pt: "Demonstra utilização adequada dos recursos e contribuição consistente para melhorias.", en: "Shows proper use of resources and a consistent contribution to improvements." },
      comentario: { pt: "Utilizei os recursos conforme os padrões e participei de ações para reduzir perdas no processo.", en: "I used resources according to the standards and took part in actions to reduce losses in the process." } },
    { id: "sw6", valor: "desperdicio", nota: 4,
      cenario: { pt: "Um colaborador identifica uma oportunidade de reduzir retrabalho, propõe uma melhoria e participa de sua implementação, acompanhando os resultados na área.", en: "An employee identifies an opportunity to reduce rework, proposes an improvement and takes part in implementing it, tracking the results in the area." },
      justificativa: { pt: "Vai além da execução habitual e contribui ativamente para reduzir desperdícios.", en: "Goes beyond the usual tasks and actively contributes to reducing waste." },
      comentario: { pt: "Propus e participei da implementação de uma melhoria que reduziu o retrabalho na área.", en: "I proposed and helped implement an improvement that reduced rework in the area." } },
    { id: "sw7", valor: "equipe", nota: 2,
      cenario: { pt: "Um colaborador mantém bom relacionamento com a equipe, mas compartilha informações importantes somente quando solicitado.", en: "An employee has a good relationship with the team, but only shares important information when asked." },
      justificativa: { pt: "Demonstra colaboração parcial, sem compartilhar informações de forma consistente.", en: "Shows partial collaboration, without consistently sharing information." },
      comentario: { pt: "Reconheço que posso melhorar a iniciativa de compartilhar informações relevantes com a equipe.", en: "I recognize I can take more initiative in sharing relevant information with the team." } },
    { id: "sw8", valor: "equipe", nota: 3,
      cenario: { pt: "Durante a passagem de turno, um colaborador compartilha informações necessárias, coopera com os colegas e contribui para a continuidade das atividades.", en: "During shift handover, an employee shares the necessary information, cooperates with colleagues and contributes to the continuity of activities." },
      justificativa: { pt: "Demonstra colaboração e compartilhamento adequado de informações.", en: "Shows collaboration and proper information sharing." },
      comentario: { pt: "Compartilhei informações nas passagens de turno e colaborei para manter as atividades alinhadas.", en: "I shared information at shift handovers and helped keep activities aligned." } },
    { id: "sw9", valor: "equipe", nota: 5,
      cenario: { pt: "Um colaborador é reconhecido por compartilhar conhecimentos, apoiar diferentes equipes e contribuir para melhorar a colaboração entre áreas.", en: "An employee is recognized for sharing knowledge, supporting different teams and helping improve collaboration between areas." },
      justificativa: { pt: "Torna-se referência de colaboração e amplia o impacto positivo para outras equipes.", en: "Becomes a reference for collaboration and extends the positive impact to other teams." },
      comentario: { pt: "Compartilhei conhecimentos com diferentes equipes e contribuí para melhorar a colaboração entre áreas.", en: "I shared knowledge with different teams and helped improve collaboration between areas." } },
    { id: "sw10", valor: "respeito", nota: 1,
      cenario: { pt: "Durante uma divergência, um colaborador interrompe repetidamente os colegas e utiliza comentários inadequados, mesmo após receber orientações.", en: "During a disagreement, an employee repeatedly interrupts colleagues and makes inappropriate comments, even after receiving guidance." },
      justificativa: { pt: "Demonstra comportamentos incompatíveis com o respeito esperado.", en: "Shows behaviors that are incompatible with the expected respect." },
      comentario: { pt: "Reconheço a necessidade de melhorar minha postura em situações de divergência, especialmente na escuta e na comunicação.", en: "I recognize the need to improve my conduct in disagreements, especially in listening and communication." } },
    { id: "sw11", valor: "respeito", nota: 3,
      cenario: { pt: "Durante uma discussão sobre melhorias, um colaborador ouve diferentes opiniões, mantém uma comunicação respeitosa e apresenta seu ponto de vista de forma equilibrada.", en: "During a discussion about improvements, an employee listens to different opinions, keeps communication respectful and presents their point of view in a balanced way." },
      justificativa: { pt: "Demonstra respeito e escuta ativa de maneira consistente.", en: "Consistently shows respect and active listening." },
      comentario: { pt: "Participei de discussões de melhoria ouvindo diferentes opiniões e mantendo uma comunicação respeitosa.", en: "I took part in improvement discussions listening to different opinions and keeping communication respectful." } },
    { id: "sw12", valor: "respeito", nota: 4,
      cenario: { pt: "Um colaborador percebe dificuldades de comunicação entre colegas, incentiva o diálogo e ajuda a construir um entendimento respeitoso entre as pessoas envolvidas.", en: "An employee notices communication difficulties between colleagues, encourages dialogue and helps build respectful understanding between the people involved." },
      justificativa: { pt: "Além de agir com respeito, contribui ativamente para melhorar as relações.", en: "Besides acting respectfully, actively contributes to improving relationships." },
      comentario: { pt: "Contribuí para facilitar o diálogo entre colegas e apoiar um ambiente de respeito.", en: "I helped facilitate dialogue between colleagues and support a respectful environment." } },
    { id: "sw13", valor: "responsab", nota: 1,
      cenario: { pt: "Um colaborador deixa de seguir etapas obrigatórias do processo e transfere a responsabilidade por falhas identificadas, apesar das orientações recebidas.", en: "An employee skips mandatory process steps and shifts the responsibility for identified failures to others, despite the guidance received." },
      justificativa: { pt: "Não demonstra o cumprimento das responsabilidades esperadas.", en: "Does not show fulfillment of the expected responsibilities." },
      comentario: { pt: "Preciso aprimorar o cumprimento dos procedimentos e assumir maior responsabilidade pelas minhas atividades.", en: "I need to improve how I follow procedures and take greater responsibility for my activities." } },
    { id: "sw14", valor: "responsab", nota: 3,
      cenario: { pt: "Um colaborador cumpre os padrões de trabalho, comunica desvios com transparência e assume a responsabilidade pelas atividades sob sua atribuição.", en: "An employee follows the work standards, reports deviations transparently and takes responsibility for the activities assigned to them." },
      justificativa: { pt: "Demonstra cumprimento consistente dos padrões e das responsabilidades.", en: "Shows consistent fulfillment of standards and responsibilities." },
      comentario: { pt: "Cumpri os procedimentos e comuniquei desvios identificados nas minhas atividades.", en: "I followed the procedures and reported deviations identified in my activities." } },
    { id: "sw15", valor: "responsab", nota: 5,
      cenario: { pt: "Um colaborador assume desafios relevantes, contribui para resolver problemas críticos e compartilha aprendizados que fortalecem a responsabilidade de outras equipes.", en: "An employee takes on significant challenges, helps solve critical problems and shares lessons that strengthen responsibility in other teams." },
      justificativa: { pt: "Demonstra atuação de referência, com impacto que ultrapassa suas atividades habituais.", en: "Shows reference-level performance, with impact beyond their usual activities." },
      comentario: { pt: "Contribuí para solucionar um problema crítico e compartilhei os aprendizados com outras equipes.", en: "I helped solve a critical problem and shared the lessons learned with other teams." } },
    { id: "sw16", valor: "saude", nota: 2,
      cenario: { pt: "Um colaborador segue as orientações de ergonomia na maior parte do tempo, mas precisa de lembretes frequentes para manter os cuidados durante as atividades.", en: "An employee follows the ergonomics guidance most of the time, but needs frequent reminders to keep taking care during activities." },
      justificativa: { pt: "Aplica parcialmente as orientações de prevenção e ergonomia.", en: "Partially applies the prevention and ergonomics guidance." },
      comentario: { pt: "Reconheço a necessidade de manter os cuidados ergonômicos de forma mais consistente.", en: "I recognize the need to keep up ergonomic care more consistently." } },
    { id: "sw17", valor: "saude", nota: 3,
      cenario: { pt: "Um colaborador segue as orientações de ergonomia e comunica situações que podem afetar sua saúde ou a dos colegas durante a rotina.", en: "An employee follows the ergonomics guidance and reports situations that could affect their own or colleagues' health during the routine." },
      justificativa: { pt: "Demonstra comportamento preventivo consistente.", en: "Shows consistent preventive behavior." },
      comentario: { pt: "Segui as orientações de ergonomia e comuniquei situações que poderiam afetar a saúde no posto.", en: "I followed the ergonomics guidance and reported situations that could affect health at the workstation." } },
    { id: "sw18", valor: "saude", nota: 4,
      cenario: { pt: "Além de seguir as orientações de saúde, um colaborador identifica uma oportunidade de melhoria ergonômica e contribui para implementar uma solução aprovada.", en: "Besides following the health guidance, an employee identifies an ergonomic improvement opportunity and helps implement an approved solution." },
      justificativa: { pt: "Vai além do cumprimento das orientações e contribui para prevenir riscos.", en: "Goes beyond following the guidance and helps prevent risks." },
      comentario: { pt: "Participei de uma melhoria ergonômica aprovada para reduzir riscos no posto.", en: "I took part in an approved ergonomic improvement to reduce risks at the workstation." } },
    { id: "sw19", valor: "seguranca", nota: 1,
      cenario: { pt: "Um colaborador deixa de utilizar um EPI obrigatório durante uma atividade, mesmo conhecendo o procedimento e tendo recebido orientação.", en: "An employee does not use mandatory PPE during an activity, even though they know the procedure and have received guidance." },
      justificativa: { pt: "Não cumpre um requisito essencial de segurança.", en: "Does not meet an essential safety requirement." },
      comentario: { pt: "Reconheço a necessidade de cumprir integralmente os requisitos de EPI e segurança.", en: "I recognize the need to fully comply with PPE and safety requirements." } },
    { id: "sw20", valor: "seguranca", nota: 3,
      cenario: { pt: "Antes de iniciar uma atividade, um colaborador verifica as condições do posto, utiliza os EPIs exigidos e comunica uma condição insegura identificada.", en: "Before starting an activity, an employee checks the workstation conditions, uses the required PPE and reports an unsafe condition they identified." },
      justificativa: { pt: "Cumpre os procedimentos e comunica riscos de forma adequada.", en: "Follows procedures and reports risks properly." },
      comentario: { pt: "Verifiquei as condições do posto, utilizei os EPIs e comuniquei uma condição insegura.", en: "I checked the workstation conditions, used the PPE and reported an unsafe condition." } },
    { id: "sw21", valor: "seguranca", nota: 5,
      cenario: { pt: "Um colaborador contribui para uma melhoria de segurança validada, compartilha os aprendizados e apoia sua adoção em outras áreas.", en: "An employee contributes to a validated safety improvement, shares the lessons learned and supports its adoption in other areas." },
      justificativa: { pt: "Além da prevenção no próprio posto, gera contribuição positiva de maior alcance.", en: "Beyond prevention at their own workstation, creates a positive contribution with wider reach." },
      comentario: { pt: "Participei de uma melhoria de segurança que foi compartilhada e aplicada em outras áreas.", en: "I took part in a safety improvement that was shared and applied in other areas." } },
    { id: "sw22", valor: "ambiente", nota: 2,
      cenario: { pt: "Um colaborador realiza a separação de resíduos corretamente na maior parte do tempo, mas ainda precisa de orientações em algumas situações.", en: "An employee sorts waste correctly most of the time, but still needs guidance in some situations." },
      justificativa: { pt: "Demonstra atendimento parcial aos procedimentos ambientais.", en: "Shows partial compliance with environmental procedures." },
      comentario: { pt: "Realizei a separação de resíduos, mas identifiquei oportunidades para melhorar a consistência no cumprimento dos procedimentos.", en: "I sorted waste, but identified opportunities to follow the procedures more consistently." } },
    { id: "sw23", valor: "ambiente", nota: 3,
      cenario: { pt: "Um colaborador realiza o descarte correto de resíduos, utiliza materiais de forma consciente e segue os padrões ambientais aplicáveis à sua atividade.", en: "An employee disposes of waste correctly, uses materials consciously and follows the environmental standards that apply to their activity." },
      justificativa: { pt: "Cumpre os procedimentos ambientais de forma consistente.", en: "Consistently follows environmental procedures." },
      comentario: { pt: "Segui os padrões de descarte e utilizei os recursos de maneira consciente durante as atividades.", en: "I followed the disposal standards and used resources consciously during activities." } },
    { id: "sw24", valor: "ambiente", nota: 4,
      cenario: { pt: "Um colaborador identifica uma oportunidade de reduzir o consumo de materiais, apresenta a proposta e participa da implementação de uma melhoria ambiental na área.", en: "An employee identifies an opportunity to reduce material consumption, presents the proposal and takes part in implementing an environmental improvement in the area." },
      justificativa: { pt: "Vai além do cumprimento dos padrões e contribui ativamente para reduzir impactos ambientais.", en: "Goes beyond meeting the standards and actively helps reduce environmental impacts." },
      comentario: { pt: "Propus e participei de uma melhoria para reduzir o consumo de materiais na área.", en: "I proposed and took part in an improvement to reduce material consumption in the area." } }
  ];

  const TEMA_CONTENT = {
    // ─────────────────────────────── 1 · SAIBA MAIS SOBRE O CICLO B
    cicloB: {
      titulo: { pt: "Saiba mais sobre o Ciclo B", en: "Learn more about Template B" },
      steps: [
        {
          type: "info",
          titulo: { pt: "O Ciclo B", en: "Template B" },
          blocks: [
            { t: "p", x: { pt: "O **Ciclo B** é o processo de Gestão de Desempenho dos colaboradores Blue collar.", en: "**Template B** is the Performance Management process for Blue collar employees." } },
            { t: "p", x: { pt: "Seu objetivo é apoiar o **desenvolvimento profissional** por meio de conversas entre colaborador e liderança, com foco nos **comportamentos** demonstrados no dia a dia e nos objetivos de desenvolvimento registrados no **Plano de Desenvolvimento Individual (PDI).**", en: "Its goal is to support **professional development** through conversations between employee and leader, focusing on the **behaviors** shown day to day and on the development goals recorded in the **Individual Development Plan (IDP).**" } },
            { t: "h", x: { pt: "O que o Ciclo B avalia:", en: "What Template B assesses:" } },
            { t: "p", x: { pt: "Como você trabalha no dia a dia, com base nos valores do Scania Way:", en: "How you work day to day, based on the Scania Way values:" } },
            { t: "ol", items: [
              { pt: "Cliente em Primeiro Lugar", en: "Customer First" },
              { pt: "Eliminação de Desperdícios", en: "Elimination of Waste" },
              { pt: "Respeito", en: "Respect" },
              { pt: "Responsabilidade", en: "Responsibility" },
              { pt: "Espírito de Equipe", en: "Team Spirit" },
              { pt: "Saúde, Segurança e Meio Ambiente", en: "Health, Safety and Environment" }
            ] },
            { t: "links", intro: { pt: "Para saber mais, acesse o site sobre o Ciclo B:", en: "To learn more, visit the Template B website:" },
              items: [ { label: { pt: "Gestão de Performance: Manual Ciclo B", en: "Performance Management: Template B Manual" }, url: LINKS.manualCicloB } ] }
          ]
        },
        {
          type: "info",
          titulo: { pt: "Papel do colaborador no Ciclo B", en: "The employee's role in Template B" },
          blocks: [
            { t: "p", x: { pt: "O colaborador é **protagonista do seu desenvolvimento**. Seu papel é participar ativamente do processo, refletir sobre seu desempenho, buscar novos conhecimentos e identificar, junto à liderança, oportunidades de melhoria.", en: "The employee is the **driver of their own development**. Their role is to take an active part in the process, reflect on their performance, seek new knowledge and identify improvement opportunities together with the leader." } },
            { t: "h", x: { pt: "Exemplos na prática:", en: "Examples in practice:" } },
            { t: "ul", items: [
              { pt: "**Buscar aprendizado:** desenvolver novas habilidades e aprimorar suas atividades.", en: "**Seek learning:** develop new skills and improve your activities." },
              { pt: "**Compartilhar conhecimentos:** trocar experiências e aprendizados com os colegas.", en: "**Share knowledge:** exchange experiences and lessons with colleagues." },
              { pt: "**Participar da avaliação:** refletir sobre seus comportamentos, reconhecer pontos fortes e oportunidades de melhoria.", en: "**Take part in the assessment:** reflect on your behaviors, recognize strengths and improvement opportunities." },
              { pt: "**Construir seu PDI:** definir, junto à liderança, objetivos e ações práticas para seu desenvolvimento profissional.", en: "**Build your IDP:** define, together with your leader, goals and practical actions for your professional development." },
              { pt: "**Aproveitar os feedbacks:** ouvir a liderança, colegas e entre outros, e colocar em prática as ações de desenvolvimento.", en: "**Make the most of feedback:** listen to your leader, colleagues and others, and put the development actions into practice." }
            ] }
          ]
        },
        {
          type: "info",
          titulo: { pt: "Papel da liderança no Ciclo B", en: "The leader's role in Template B" },
          blocks: [
            { t: "p", x: { pt: "A liderança é **responsável por conduzir o processo de Gestão de Desempenho**, avaliando os colaboradores de forma justa e objetiva, oferecendo feedbacks e apoiando seu desenvolvimento contínuo.", en: "The leader is **responsible for running the Performance Management process**, assessing employees fairly and objectively, giving feedback and supporting their continuous development." } },
            { t: "h", x: { pt: "Exemplos na prática:", en: "Examples in practice:" } },
            { t: "ul", items: [
              { pt: "**Acompanhar o desempenho:** observar os comportamentos dos colaboradores no dia a dia, considerando os valores do Scania Way.", en: "**Follow performance:** observe employees' day-to-day behaviors, considering the Scania Way values." },
              { pt: "**Realizar a avaliação:** avaliar de forma justa e objetiva, com base em comportamentos e situações reais.", en: "**Carry out the assessment:** assess fairly and objectively, based on real behaviors and situations." },
              { pt: "**Oferecer feedbacks:** reconhecer pontos fortes, orientar melhorias e manter um diálogo aberto com o colaborador.", en: "**Give feedback:** recognize strengths, guide improvements and keep an open dialogue with the employee." },
              { pt: "**Apoiar a construção do PDI:** definir, junto ao colaborador, objetivos e ações práticas de desenvolvimento.", en: "**Support building the IDP:** define, together with the employee, practical development goals and actions." },
              { pt: "**Acompanhar o desenvolvimento:** orientar, incentivar o aprendizado e acompanhar a evolução das ações combinadas.", en: "**Follow development:** guide, encourage learning and track the progress of the agreed actions." }
            ] }
          ]
        },
        {
          type: "quizBank",
          banco: BANCO_CICLO_B,
          chave: "cicloB"
        },
        {
          type: "closing",
          titulo: { pt: "Você concluiu o módulo!", en: "You've completed the module!" },
          blocks: [
            { t: "p", x: { pt: "O Ciclo B vai além da avaliação anual. Seu desenvolvimento acontece ao longo do ano, com participação ativa, feedbacks e ações construídas junto à liderança.", en: "Template B goes beyond the annual assessment. Your development happens throughout the year, with active participation, feedback and actions built together with your leader." } },
            { t: "p", x: { pt: "Quer saber mais ou revisar alguma informação?", en: "Want to learn more or review something?" } },
            { t: "links", intro: { pt: "Acesse o Manual do Ciclo B sempre que precisar.", en: "Access the Template B Manual whenever you need." },
              items: [ { label: { pt: "Gestão de Performance: Manual Ciclo B", en: "Performance Management: Template B Manual" }, url: LINKS.manualCicloBEmail, icon: "book" } ] }
          ]
        }
      ]
    },

    // ─────────────────────────────── 2 · MONTE SUA ROTA: PDI
    rotaPDI: {
      titulo: { pt: "Monte sua Rota: PDI", en: "Build Your Route: IDP" },
      steps: [
        {
          type: "info",
          titulo: { pt: "Entenda o PDI – Plano de Desenvolvimento Individual", en: "Understand the IDP – Individual Development Plan" },
          blocks: [
            { t: "p", x: { pt: "O Plano de Desenvolvimento Individual (PDI) é construído pelo colaborador junto à liderança. Ele define o que você deseja desenvolver e quais ações podem ajudar nesse processo, considerando sua realidade, sua função e seus objetivos profissionais.", en: "The Individual Development Plan (IDP) is built by the employee together with the leader. It defines what you want to develop and which actions can help in this process, considering your reality, your role and your professional goals." } },
            { t: "h", x: { pt: "O desenvolvimento pode acontecer de diferentes formas:", en: "Development can happen in different ways:" } },
            { t: "cards", items: [
              { icon: "wrench", titulo: { pt: "70% prática", en: "70% practice" }, texto: { pt: "Aprender realizando atividades no dia a dia.", en: "Learning by carrying out day-to-day activities." } },
              { icon: "users", titulo: { pt: "20% pessoas", en: "20% people" }, texto: { pt: "Aprender com feedbacks e troca de experiências.", en: "Learning from feedback and sharing experiences." } },
              { icon: "book", titulo: { pt: "10% treinamento formal", en: "10% formal training" }, texto: { pt: "Aprender por meio de cursos e treinamentos.", en: "Learning through courses and training." } }
            ] },
            { t: "links", items: [ { label: { pt: "Metodologia 70/20/10", en: "70/20/10 methodology" }, url: LINKS.metodologia702010 } ] }
          ]
        },
        {
          type: "desafio7020",
          titulo: { pt: "Desafio 70/20/10", en: "70/20/10 challenge" }
        },
        {
          type: "explore",
          titulo: { pt: "Apoio ao desenvolvimento", en: "Support for development" },
          pergunta: { pt: "Quem pode contribuir para o desenvolvimento?", en: "Who can contribute to development?" },
          detalheLabel: "examplesSupport",
          cards: [
            { icon: "users", titulo: { pt: "Colega mais experiente", en: "More experienced colleague" },
              texto: { pt: "Compartilha conhecimentos e experiências que ajudam no desenvolvimento das suas habilidades.", en: "Shares knowledge and experience that help develop your skills." },
              exemplos: [
                { pt: "Demonstrar boas práticas na execução das atividades.", en: "Demonstrating good practices when carrying out activities." },
                { pt: "Compartilhar experiências e soluções utilizadas no dia a dia.", en: "Sharing experiences and solutions used day to day." },
                { pt: "Ajudar na compreensão de processos e rotinas de trabalho.", en: "Helping understand processes and work routines." }
              ] },
            { icon: "hands", titulo: { pt: "HRBP / RH", en: "HRBP / HR" },
              texto: { pt: "Orienta sobre o processo de Gestão de Performance e apoia no esclarecimento de dúvidas sobre o Ciclo B.", en: "Provides guidance on the Performance Management process and helps clarify questions about Template B." },
              exemplos: [
                { pt: "Esclarecer dúvidas sobre as etapas da avaliação.", en: "Clarifying questions about the assessment stages." },
                { pt: "Orientar sobre o processo de construção do PDI.", en: "Guiding the process of building the IDP." },
                { pt: "Apoiar em dúvidas sobre as diretrizes de desenvolvimento.", en: "Helping with questions about development guidelines." }
              ] },
            { icon: "userCheck", titulo: { pt: "Liderança direta", en: "Direct leader" },
              texto: { pt: "Conduz a avaliação de desempenho, oferece feedbacks e apoia a construção e o acompanhamento do PDI.", en: "Runs the performance assessment, gives feedback and supports building and following up on the IDP." },
              exemplos: [
                { pt: "Avaliar os comportamentos com base nos valores do Scania Way.", en: "Assessing behaviors based on the Scania Way values." },
                { pt: "Conversar sobre pontos fortes e oportunidades de melhoria.", en: "Talking about strengths and improvement opportunities." },
                { pt: "Definir, junto ao colaborador, ações práticas de desenvolvimento.", en: "Defining practical development actions together with the employee." },
                { pt: "Acompanhar a evolução das ações combinadas.", en: "Tracking the progress of the agreed actions." }
              ] },
            { icon: "network", titulo: { pt: "Outra área ou mentor", en: "Another area or mentor" },
              texto: { pt: "Amplia a visão sobre diferentes atividades, compartilha experiências e contribui para o desenvolvimento de novas competências.", en: "Broadens the view of different activities, shares experiences and contributes to developing new skills." },
              exemplos: [
                { pt: "Apresentar boas práticas utilizadas em outras áreas.", en: "Presenting good practices used in other areas." },
                { pt: "Compartilhar conhecimentos técnicos e experiências profissionais.", en: "Sharing technical knowledge and professional experience." },
                { pt: "Orientar sobre competências relacionadas aos interesses de desenvolvimento.", en: "Guiding on skills related to development interests." }
              ] }
          ]
        },
        {
          type: "closing",
          titulo: { pt: "Agora é hora de colocar em prática!", en: "Now it's time to put it into practice!" },
          blocks: [
            { t: "p", x: { pt: "O desenvolvimento profissional começa com a identificação de oportunidades de melhoria e se fortalece com ações práticas. O PDI é construído em conjunto entre colaborador e liderança, considerando os objetivos e as necessidades de desenvolvimento.", en: "Professional development starts by identifying improvement opportunities and grows stronger with practical actions. The IDP is built jointly by employee and leader, considering development goals and needs." } },
            { t: "p", x: { pt: "Lembre-se: o desenvolvimento acontece ao longo do ano, e cada colaborador é protagonista da sua evolução.", en: "Remember: development happens throughout the year, and each employee drives their own progress." } },
            { t: "links", items: [
              { label: { pt: "Acessar o MySuccess", en: "Access MySuccess" }, url: LINKS.mySuccessSF },
              { label: { pt: "Passo a passo do PDI", en: "IDP step-by-step guide" }, url: LINKS.pdiCicloB }
            ] }
          ]
        }
      ]
    },

    // ─────────────────────────────── 3 · SCANIA WAY EM AÇÃO
    autoavaliacao: {
      titulo: { pt: "Scania Way em Ação: Autoavaliação", en: "Scania Way in Action: Self-assessment" },
      steps: [
        {
          type: "info",
          titulo: { pt: "Antes de começar", en: "Before you start" },
          blocks: [
            { t: "p", x: { pt: "A autoavaliação no Ciclo B é um momento de reflexão sobre os comportamentos demonstrados no dia a dia, considerando os valores do Scania Way.", en: "The self-assessment in Template B is a moment to reflect on the behaviors shown day to day, considering the Scania Way values." } },
            { t: "h", x: { pt: "Para realizar uma avaliação coerente, três pontos são fundamentais:", en: "To carry out a consistent assessment, three points are essential:" } },
            { t: "cards", items: [
              { icon: "eye", titulo: { pt: "Observe os comportamentos", en: "Observe behaviors" }, texto: { pt: "Considere como os valores do Scania Way são demonstrados nas atividades e nas relações de trabalho.", en: "Consider how the Scania Way values are shown in activities and working relationships." } },
              { icon: "clip", titulo: { pt: "Considere exemplos reais", en: "Consider real examples" }, texto: { pt: "Utilize situações concretas do dia a dia para fundamentar a avaliação dos comportamentos.", en: "Use concrete everyday situations to support the assessment of behaviors." } },
              { icon: "scale", titulo: { pt: "Avalie com objetividade", en: "Assess objectively" }, texto: { pt: "Considere os critérios de avaliação e identifique pontos fortes e oportunidades de melhoria.", en: "Consider the assessment criteria and identify strengths and improvement opportunities." } }
            ] },
            { t: "callout", icon: "bulb", titulo: { pt: "Lembre-se!", en: "Remember!" },
              x: { pt: "O objetivo não é escolher a maior nota, mas compreender como os comportamentos devem ser avaliados com base em evidências e nos valores do Scania Way.", en: "The goal is not to pick the highest score, but to understand how behaviors should be assessed based on evidence and the Scania Way values." } }
          ]
        },
        {
          type: "info",
          titulo: { pt: "Como avaliar?", en: "How to assess?" },
          blocks: [
            { t: "p", x: { pt: "Cada nota representa um nível de demonstração dos comportamentos esperados, considerando os valores do Scania Way.", en: "Each score represents a level of demonstration of the expected behaviors, considering the Scania Way values." } },
            { t: "scale", items: [
              { nota: "1", label: { pt: "Abaixo das expectativas", en: "Below expectations" } },
              { nota: "2", label: { pt: "Atende parcialmente", en: "Partially meets" } },
              { nota: "3", label: { pt: "Atende plenamente", en: "Fully meets" }, destaque: true },
              { nota: "4", label: { pt: "Supera as expectativas", en: "Exceeds expectations" } },
              { nota: "5", label: { pt: "Supera amplamente", en: "Far exceeds expectations" } }
            ] },
            { t: "note", icon: "info", x: { pt: "A nota 3 representa o atendimento pleno ao esperado. Não significa desempenho insuficiente.", en: "A score of 3 means fully meeting expectations. It does not mean insufficient performance." } }
          ]
        },
        {
          type: "desafioSW",
          titulo: { pt: "Desafio Scania Way", en: "Scania Way challenge" }
        },
        {
          type: "closing",
          overline: "ovMission",
          titulo: { pt: "Scania Way em ação: desafio concluído!", en: "Scania Way in action: challenge complete!" },
          blocks: [
            { t: "p", x: { pt: "Uma boa autoavaliação vai além da escolha de uma nota. É preciso refletir sobre os comportamentos demonstrados e justificar a avaliação com exemplos reais do dia a dia.", en: "A good self-assessment goes beyond picking a score. You need to reflect on the behaviors shown and justify the assessment with real everyday examples." } },
            { t: "callout", icon: "clip", titulo: { pt: "Da simulação à prática", en: "From simulation to practice" },
              x: { pt: "Na autoavaliação real, a orientação é registrar a nota nos comentários de cada valor do Scania Way e justificar com situações concretas.", en: "In the real self-assessment, the guidance is to record the score in the comments for each Scania Way value and justify it with concrete situations." },
              exemplo: { label: { pt: "Exemplo de registro", en: "Example entry" },
                x: { pt: "\"Nota 3 — Durante a passagem de turno, compartilhei informações importantes com a equipe, contribuindo para a continuidade das atividades.\"", en: "\"Score 3 — During shift handover, I shared important information with the team, contributing to the continuity of activities.\"" } } },
            { t: "links", items: [ { label: { pt: "Passo a passo da Autoavaliação", en: "Self-assessment step-by-step guide" }, url: LINKS.autoavaliacaoCicloB, icon: "book" } ] }
          ]
        }
      ]
    },

    // ─────────────────────────────── 4 · EXPLORE SEU DESENVOLVIMENTO: CARREIRA
    carreira: {
      titulo: { pt: "Explore seu Desenvolvimento: Carreira", en: "Explore Your Development: Career" },
      steps: [
        {
          type: "info",
          titulo: { pt: "Desenvolvimento também é hoje", en: "Development happens today too" },
          blocks: [
            { t: "p", x: { pt: "O desenvolvimento profissional não depende apenas de uma promoção ou mudança de cargo. Também acontece ao ampliar conhecimentos, fortalecer competências e assumir novos desafios na função atual.", en: "Professional development doesn't depend only on a promotion or a job change. It also happens by broadening knowledge, strengthening skills and taking on new challenges in your current role." } },
            { t: "cards", items: [
              { icon: "trend", titulo: { pt: "Aprimorar competências", en: "Improve skills" }, texto: { pt: "Desenvolver habilidades técnicas e comportamentais que contribuam para a atuação na função atual.", en: "Develop technical and behavioral skills that contribute to performance in the current role." } },
              { icon: "book", titulo: { pt: "Ampliar conhecimentos", en: "Broaden knowledge" }, texto: { pt: "Aprender com experiências, colegas e diferentes atividades da rotina.", en: "Learn from experiences, colleagues and different routine activities." } },
              { icon: "flag", titulo: { pt: "Preparar-se para desafios", en: "Prepare for challenges" }, texto: { pt: "Construir competências que contribuam para oportunidades e responsabilidades futuras.", en: "Build skills that contribute to future opportunities and responsibilities." } }
            ] },
            { t: "callout", icon: "target", x: { pt: "O PDI ajuda a transformar interesses e oportunidades de desenvolvimento em objetivos e ações práticas, construídos em conjunto com a liderança.", en: "The IDP helps turn development interests and opportunities into practical goals and actions, built together with the leader." } }
          ]
        },
        {
          type: "explore",
          titulo: { pt: "Escolha seu caminho", en: "Choose your path" },
          pergunta: { pt: "Quais caminhos podem contribuir para o desenvolvimento profissional?", en: "Which paths can contribute to professional development?" },
          detalheLabel: "inPractice",
          rodape: { pt: "Não existe um único caminho de desenvolvimento. As possibilidades podem ser combinadas conforme os interesses e as necessidades profissionais.", en: "There is no single development path. The possibilities can be combined according to professional interests and needs." },
          cards: [
            { icon: "wrench", titulo: { pt: "Desenvolvimento na função atual", en: "Development in the current role" },
              texto: { pt: "O desenvolvimento também acontece ao aprimorar conhecimentos, fortalecer competências e contribuir para melhorias na própria função.", en: "Development also happens by improving knowledge, strengthening skills and contributing to improvements in your own role." },
              exemplo: { pt: "Exemplo: desenvolver habilidades técnicas, participar de melhorias e ampliar conhecimentos sobre os processos.", en: "Example: developing technical skills, taking part in improvements and broadening knowledge of the processes." } },
            { icon: "target", titulo: { pt: "Preparação para oportunidades futuras", en: "Preparing for future opportunities" },
              texto: { pt: "O desenvolvimento pode incluir competências que contribuam para assumir novos desafios e responsabilidades no futuro.", en: "Development can include skills that help you take on new challenges and responsibilities in the future." },
              exemplo: { pt: "Exemplo: desenvolver conhecimentos e habilidades relacionados a uma função de interesse.", en: "Example: developing knowledge and skills related to a role of interest." } },
            { icon: "compass", titulo: { pt: "Exploração de possibilidades", en: "Exploring possibilities" },
              texto: { pt: "Conhecer diferentes atividades e possibilidades profissionais ajuda a identificar interesses e orientar o desenvolvimento.", en: "Getting to know different activities and professional possibilities helps identify interests and guide development." },
              exemplo: { pt: "Exemplo: conhecer atribuições de outras funções, conversar com profissionais e consultar descrições de cargos.", en: "Example: learning about the responsibilities of other roles, talking with professionals and checking job descriptions." } },
            { icon: "chat", titulo: { pt: "Conversa com a liderança", en: "Conversation with the leader" },
              texto: { pt: "O diálogo com a liderança ajuda a identificar oportunidades de desenvolvimento e alinhar objetivos e ações práticas.", en: "Dialogue with the leader helps identify development opportunities and align goals and practical actions." },
              exemplo: { pt: "Exemplo: compartilhar interesses profissionais e discutir competências que podem ser desenvolvidas.", en: "Example: sharing professional interests and discussing skills that can be developed." } }
          ]
        },
        {
          type: "closing",
          overline: "ovMission",
          titulo: { pt: "O desenvolvimento tem diferentes caminhos!", en: "Development has different paths!" },
          blocks: [
            { t: "p", x: { pt: "Desenvolver a carreira não significa apenas mudar de cargo. Também envolve aprimorar competências, ampliar conhecimentos e preparar-se para novos desafios.", en: "Developing your career doesn't only mean changing jobs. It also involves improving skills, broadening knowledge and preparing for new challenges." } },
            { t: "p", x: { pt: "O primeiro passo é identificar interesses e oportunidades de desenvolvimento e conversar com a liderança sobre os próximos passos.", en: "The first step is to identify development interests and opportunities and talk with your leader about next steps." } },
            { t: "links", intro: { pt: "Para explorar possibilidades profissionais, consulte:", en: "To explore professional possibilities, check:" },
              items: [
                { label: { pt: "Descrições de cargos | Job Architecture", en: "Job descriptions | Job Architecture" }, url: LINKS.jobArchitecture },
                { label: { pt: "Vagas internas | Reflex", en: "Internal openings | Reflex" }, url: LINKS.reflex }
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────── 5 · CENTRAL MYSUCCESS
    mySuccess: {
      titulo: { pt: "Central MySuccess", en: "MySuccess Hub" },
      steps: [
        {
          type: "info",
          titulo: { pt: "Por que registrar", en: "Why record it" },
          blocks: [
            { t: "p", x: { pt: "Registrar ajuda a organizar e acompanhar o desenvolvimento.", en: "Recording it helps organize and track your development." } }
          ]
        },
        {
          type: "hub",
          titulo: { pt: "Central MySuccess", en: "MySuccess Hub" },
          intro: { pt: "Consulte as orientações de registro da autoavaliação e do PDI ou acesse diretamente o MySuccess.", en: "Check the guidance on recording your self-assessment and IDP, or go straight to MySuccess." },
          perguntaGuias: { pt: "O que deseja consultar?", en: "What would you like to check?" },
          guias: [
            { icon: "target", titulo: { pt: "Plano de Desenvolvimento (PDI)", en: "Development Plan (IDP)" }, texto: { pt: "Passo a passo para cadastrar os objetivos de desenvolvimento.", en: "Step-by-step guide to entering your development goals." }, url: LINKS.pdiCicloB },
            { icon: "clip", titulo: { pt: "Autoavaliação", en: "Self-assessment" }, texto: { pt: "Passo a passo para registrar os comentários sobre os valores do Scania Way.", en: "Step-by-step guide to recording your comments on the Scania Way values." }, url: LINKS.autoavaliacaoCicloB }
          ],
          acessoRapido: [
            { label: { pt: "Acessar o MySuccess", en: "Access MySuccess" }, url: LINKS.mySuccess, icon: "monitor" },
            { label: { pt: "Gestão de Performance: Manual Ciclo B", en: "Performance Management: Template B Manual" }, url: LINKS.manualCicloB, icon: "book" }
          ]
        },
        {
          type: "closing",
          pctLabel: "queryDone",
          titulo: { pt: "Do registro à prática", en: "From recording to practice" },
          blocks: [
            { t: "p", x: { pt: "O MySuccess organiza as informações da autoavaliação e do Plano de Desenvolvimento Individual, facilitando o registro e o acompanhamento do desenvolvimento profissional.", en: "MySuccess organizes the information from the self-assessment and the Individual Development Plan, making it easier to record and track professional development." } },
            { t: "p", x: { pt: "O processo não termina no sistema: o desenvolvimento acontece ao longo do ano, com participação ativa do colaborador e apoio da liderança.", en: "The process doesn't end in the system: development happens throughout the year, with the employee's active participation and the leader's support." } },
            { t: "callout", icon: "info", titulo: { pt: "Consulta sempre disponível", en: "Always available" },
              x: { pt: "A Central MySuccess pode ser acessada novamente para revisar os passos de registro da autoavaliação e dos objetivos de desenvolvimento.", en: "The MySuccess Hub can be accessed again to review the steps for recording the self-assessment and development goals." } }
          ]
        }
      ]
    }
  };

  // ══════════════════════════════════════════════════════════════════
  // SORTEIOS — perguntas variam a cada partida, priorizando as inéditas
  // na sessão e evitando repetir a rodada anterior
  // ══════════════════════════════════════════════════════════════════
  function shuffleArray(arr){
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // pega n itens de "pool", priorizando os que ainda não saíram (seen)
  function pickPreferUnseen(pool, n, seen){
    const fresh = shuffleArray(pool.filter(function(it){ return seen.indexOf(it.id) === -1; }));
    const old   = shuffleArray(pool.filter(function(it){ return seen.indexOf(it.id) !== -1; }));
    return fresh.concat(old).slice(0, n);
  }

  // marca como vistos; se todo o banco já saiu, recomeça a contagem
  function markSeen(key, ids, bankSize){
    let seen = storageGetJSON(key, []);
    ids.forEach(function(id){ if (seen.indexOf(id) === -1) seen.push(id); });
    if (seen.length >= bankSize) seen = ids.slice();
    storageSetJSON(key, seen);
  }

  // embaralha as alternativas de cada pergunta e garante que a resposta
  // correta não caia na mesma posição em todas as perguntas da rodada
  function shuffleOptionsVaried(items, values, correctOf){
    for (let tent = 0; tent < 30; tent++) {
      const out = items.map(function(it){ return { id: it.id, opts: shuffleArray(values) }; });
      const pos = out.map(function(o, k){ return o.opts.indexOf(correctOf(items[k])); });
      const allSame = pos.every(function(p){ return p === pos[0]; });
      if (!allSame || out.length < 2) return out;
    }
    return items.map(function(it){ return { id: it.id, opts: shuffleArray(values) }; });
  }

  // Ciclo B — 1 pergunta por partida
  function pickQuiz(banco, chave){
    const seenKey = "trilha_seen_quiz_" + chave;
    const lastKey = "trilha_last_quiz_" + chave;
    const last = storageGet(lastKey);
    const pool = banco.filter(function(q){ return q.id !== last; });
    const q = pickPreferUnseen(pool, 1, storageGetJSON(seenKey, []))[0];
    markSeen(seenKey, [q.id], banco.length);
    storageSet(lastKey, q.id);
    return q;
  }

  // 70/20/10 — 5 situações: Fácil, Intermediária, Intermediária, Avançada, Avançada
  function pick7020(){
    const seenKey = "trilha_seen_7020";
    const lastKey = "trilha_last_7020";
    const seen = storageGetJSON(seenKey, []);
    const last = storageGet(lastKey);
    let escolhidas = [];
    for (let tent = 0; tent < 25; tent++) {
      const n1 = pickPreferUnseen(BANCO_7020.filter(function(s){ return s.nivel === 1; }), 1, seen);
      const n2 = pickPreferUnseen(BANCO_7020.filter(function(s){ return s.nivel === 2; }), 2, seen);
      const n3 = pickPreferUnseen(BANCO_7020.filter(function(s){ return s.nivel === 3; }), 2, seen);
      escolhidas = n1.concat(shuffleArray(n2), shuffleArray(n3));
      const combo = escolhidas.map(function(s){ return s.id; }).slice().sort().join(",");
      if (combo !== last) break;
      // na tentativa seguinte, embaralha o que já foi visto para variar a combinação
      seen.length = 0;
    }
    const ids = escolhidas.map(function(s){ return s.id; });
    markSeen(seenKey, ids, BANCO_7020.length);
    storageSet(lastKey, ids.slice().sort().join(","));
    return shuffleOptionsVaried(escolhidas, ["70", "20", "10"], function(s){ return s.resposta; });
  }

  // Scania Way — 5 cenários de valores diferentes, do mais evidente ao que exige mais interpretação
  const DIFICULDADE_NOTA = { 1: 1, 5: 2, 3: 3, 2: 4, 4: 5 };
  function pickSW(){
    const seenKey = "trilha_seen_sw";
    const lastKey = "trilha_last_sw";
    const seen = storageGetJSON(seenKey, []);
    const last = storageGet(lastKey);
    let escolhidos = [];
    for (let tent = 0; tent < 25; tent++) {
      const ordem = pickPreferUnseen(BANCO_SW, BANCO_SW.length, seen);
      const valoresUsados = {};
      escolhidos = [];
      ordem.forEach(function(c){
        if (escolhidos.length < 5 && !valoresUsados[c.valor]) {
          valoresUsados[c.valor] = true;
          escolhidos.push(c);
        }
      });
      const combo = escolhidos.map(function(c){ return c.id; }).slice().sort().join(",");
      if (combo !== last) break;
      seen.length = 0;
    }
    escolhidos.sort(function(a, b){ return DIFICULDADE_NOTA[a.nota] - DIFICULDADE_NOTA[b.nota]; });
    const ids = escolhidos.map(function(c){ return c.id; });
    markSeen(seenKey, ids, BANCO_SW.length);
    storageSet(lastKey, ids.slice().sort().join(","));
    return shuffleOptionsVaried(escolhidos, ["1", "2", "3", "4", "5"], function(c){ return String(c.nota); });
  }

  function findById(banco, id){
    for (let k = 0; k < banco.length; k++) { if (banco[k].id === id) return banco[k]; }
    return null;
  }

  // ══════════════════════════════════════════════════════════════════
  // MODAL DE TEMA
  // ══════════════════════════════════════════════════════════════════
  let modalTemaId = null;
  let modalStepIndex = 0;
  let stepStates = {};      // estado de cada passo (respostas, rodada atual...) enquanto o tema está aberto
  let stepCtrl = null;      // controlador do passo atual (desafios usam para avançar situações internas)

  const modalEl       = document.getElementById("temaModal");
  const modalTitleEl  = document.getElementById("temaModalTitle");
  const modalBodyEl   = document.getElementById("temaModalBody");
  const modalNextBtn  = document.getElementById("temaModalNext");
  const modalPrevBtn  = document.getElementById("temaModalPrev");
  const modalBackBtn  = document.getElementById("temaModalBack");

  const GAME_TYPES = { quizBank: true, desafio7020: true, desafioSW: true };

  function abrirModalTema(id){
    modalTemaId = id;
    modalStepIndex = 0;
    stepStates = {};
    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    renderModalStep();
  }

  function fecharModalTema(){
    renderTemas();
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    modalTemaId = null;
    stepStates = {};
    stepCtrl = null;
  }

  function getStepState(factory){
    const key = modalTemaId + ":" + modalStepIndex;
    if (!stepStates[key]) stepStates[key] = factory();
    return stepStates[key];
  }
  function resetStepState(){
    delete stepStates[modalTemaId + ":" + modalStepIndex];
  }

  function setNext(enabled, label){
    modalNextBtn.disabled = !enabled;
    if (label) modalNextBtn.textContent = label;
  }

  function el(tag, cls, html){
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  const EXT_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
  const CHEVRON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  function buildStepMeta(step, index, total){
    const wrap = el("div", "tema-step-meta");
    const ovKey = step.overline || OVERLINE_KEY_BY_TYPE[step.type];
    wrap.appendChild(el("span", "tema-step-meta__overline", fmt(STRINGS[LANG][ovKey] || "")));

    const pct = total > 1 ? Math.round((index / (total - 1)) * 100) : 100;
    const row = el("div", "tema-step-meta__row");
    const track = el("div", "tema-step-meta__track");
    const fill = el("div", "tema-step-meta__fill");
    fill.style.width = pct + "%";
    track.appendChild(fill);
    for (let n = 1; n <= total; n++) {
      const stop = el("div", "tema-step-meta__stop");
      if (n <= index) stop.classList.add("is-done");
      else if (n === index + 1) stop.classList.add("is-current");
      track.appendChild(stop);
    }
    row.appendChild(track);
    const pctTxt = (step.pctLabel && pct === 100) ? STRINGS[LANG][step.pctLabel] : (pct + "%");
    const pctEl = el("span", "tema-step-meta__pct" + (step.pctLabel && pct === 100 ? " is-label" : ""));
    pctEl.textContent = pctTxt;
    row.appendChild(pctEl);
    wrap.appendChild(row);
    return wrap;
  }

  function renderModalStep(){
    const conteudo = TEMA_CONTENT[modalTemaId];
    if (!conteudo) { fecharModalTema(); return; }
    const step = conteudo.steps[modalStepIndex];
    const total = conteudo.steps.length;
    const idxTema = TEMAS.findIndex(function(t){ return t.id === modalTemaId; });

    modalTitleEl.textContent = STRINGS[LANG].game + " " + (idxTema + 1) + " · " + tr(conteudo.titulo);
    modalEl.setAttribute("data-step-type", step.type);
    modalEl.setAttribute("data-mode", GAME_TYPES[step.type] ? "game" : "light");
    const kickerEl = document.getElementById("temaModalKicker");
    const heroTitleEl = document.getElementById("temaModalHeroTitle");
    if (kickerEl) kickerEl.textContent = STRINGS[LANG].game + " " + (idxTema + 1);
    if (heroTitleEl) {
      const palavras = tr(conteudo.titulo).split(" ");
      const ultima = palavras.pop();
      heroTitleEl.textContent = palavras.length ? palavras.join(" ") + " " : "";
      const em = document.createElement("em");
      em.textContent = ultima;
      heroTitleEl.appendChild(em);
    }

    setTemaProg(modalTemaId, total > 1 ? modalStepIndex / (total - 1) : 1);
    stepCtrl = null;
    modalBodyEl.innerHTML = "";
    modalBodyEl.appendChild(buildStepMeta(step, modalStepIndex, total));
    setNext(true, (modalStepIndex === total - 1) ? STRINGS[LANG].finish : STRINGS[LANG].next);
    if (modalPrevBtn) {
      modalPrevBtn.disabled = (modalStepIndex === 0);
      modalPrevBtn.textContent = STRINGS[LANG].back;
    }

    let node;
    if (step.type === "info" || step.type === "closing") node = buildInfoStep(step);
    else if (step.type === "quizBank")    node = buildQuizBankStep(step);
    else if (step.type === "desafio7020") node = build7020Step(step);
    else if (step.type === "desafioSW")   node = buildSWStep(step);
    else if (step.type === "explore")     node = buildExploreStep(step);
    else if (step.type === "hub")         node = buildHubStep(step);
    if (node) modalBodyEl.appendChild(node);
  }

  // re-desenha só o passo atual mantendo a rolagem no topo
  function rerenderStep(){
    renderModalStep();
    modalBodyEl.scrollTop = 0;
  }

  // ── blocos de conteúdo (telas claras) ─────────────────────────────
  function renderBlocks(blocks, wrap){
    (blocks || []).forEach(function(b){
      if (b.t === "p") {
        wrap.appendChild(el("p", "tema-step__body", fmt(b.x)));
      } else if (b.t === "h") {
        wrap.appendChild(el("p", "tema-step__subhead", fmt(b.x)));
      } else if (b.t === "ul" || b.t === "ol") {
        const list = el(b.t, b.t === "ol" ? "tema-step__olist" : "tema-step__list");
        b.items.forEach(function(it, k){
          const li = el("li", "", (b.t === "ol" ? '<span class="tema-step__olist-n">' + (k + 1) + '</span>' : "") + '<span>' + fmt(it) + '</span>');
          list.appendChild(li);
        });
        wrap.appendChild(list);
      } else if (b.t === "cards") {
        const grid = el("div", "tema-cards tema-cards--" + b.items.length);
        b.items.forEach(function(c){
          grid.appendChild(el("div", "tema-card",
            '<span class="tema-card__icon">' + (ICONS[c.icon] || "") + '</span>' +
            '<span class="tema-card__title">' + fmt(c.titulo) + '</span>' +
            '<span class="tema-card__text">' + fmt(c.texto) + '</span>'));
        });
        wrap.appendChild(grid);
      } else if (b.t === "callout") {
        let html = '<span class="tema-alert__icon">' + (ICONS[b.icon] || "") + '</span><div class="tema-alert__content">';
        if (b.titulo) html += '<span class="tema-alert__title">' + fmt(b.titulo) + '</span>';
        html += '<p class="tema-alert__text">' + fmt(b.x) + '</p>';
        if (b.exemplo) html += '<div class="tema-alert__example"><span>' + fmt(b.exemplo.label) + '</span><p>' + fmt(b.exemplo.x) + '</p></div>';
        html += '</div>';
        wrap.appendChild(el("div", "tema-alert", html));
      } else if (b.t === "scale") {
        const sc = el("div", "tema-scale");
        b.items.forEach(function(it){
          sc.appendChild(el("div", "tema-scale__row" + (it.destaque ? " is-highlight" : ""),
            '<span class="tema-scale__n">' + it.nota + '</span><span class="tema-scale__label">' + fmt(it.label) + '</span>'));
        });
        wrap.appendChild(sc);
      } else if (b.t === "note") {
        wrap.appendChild(el("p", "tema-note", '<span class="tema-note__icon">' + (ICONS[b.icon] || "") + '</span><span>' + fmt(b.x) + '</span>'));
      } else if (b.t === "links") {
        if (b.intro) wrap.appendChild(el("p", "tema-step__subhead", fmt(b.intro)));
        const lw = el("div", "tema-step__links");
        b.items.forEach(function(link){
          const a = el("a", "tema-step__link",
            (link.icon ? '<span class="tema-step__link-icon">' + ICONS[link.icon] + '</span>' : "") +
            '<span>' + fmt(link.label) + '</span>' + EXT_ICON);
          a.href = link.url; a.target = "_blank"; a.rel = "noopener noreferrer";
          lw.appendChild(a);
        });
        wrap.appendChild(lw);
      }
    });
  }

  function buildInfoStep(step){
    const wrap = el("div", "tema-step");
    if (step.titulo) wrap.appendChild(el("h3", "tema-step__title", fmt(step.titulo)));
    renderBlocks(step.blocks, wrap);
    return wrap;
  }

  // ── TELAS DE DESAFIO — 3 displays + caixa de pergunta branca + card de resultado ──
  function pad2(n){ return (n < 10 ? "0" : "") + n; }

  // display digital (KPI)
  function kpi(label, value, opts){
    opts = opts || {};
    let leds = "";
    if (opts.leds) {
      leds = '<div class="kpi__leds">' + opts.leds.map(function(c){ return '<i class="' + c + '"></i>'; }).join("") + '</div>';
    }
    return '<div class="kpi"><small>' + label + '</small>' +
      '<div class="kpi__d' + (opts.text ? " kpi__d--text" : "") + (opts.bump ? " is-bump" : "") + '">' + value + '</div>' + leds + '</div>';
  }
  function roundLeds(items, answers, current, correctOf){
    return items.map(function(it, k){
      if (answers[k] !== undefined) return answers[k] === correctOf(it) ? "g" : "r";
      if (k === current) return "c";
      return "";
    });
  }
  function tag(text, cls){ return '<span class="q-tag' + (cls ? " " + cls : "") + '">' + text + '</span>'; }
  function levelTag(n){
    const s = STRINGS[LANG];
    return tag(n === 1 ? s.tagEasy : (n === 2 ? s.tagMid : s.tagAdv), "q-tag--lv" + n);
  }

  // feedback: título, explicação, +100 XP e post-it opcional
  function feedbackBox(ok, title, bodyHtml, postitHtml){
    const s = STRINGS[LANG];
    return '<div class="q-fb ' + (ok ? "is-ok" : "is-ko") + '">' +
      '<div><div class="q-fb__st">' + title + '</div><p>' + bodyHtml + '</p></div>' +
      (ok ? '<span class="q-fb__xp">+100 XP</span>' : '') +
      (postitHtml ? '<div class="q-postit"><small>' + s.howToJustify + '</small>' + postitHtml + '</div>' : '') +
      '</div>';
  }

  // aplica o estado respondido nos botões (✓ na certa, ✕ na escolhida errada)
  function markOptions(container, chosen, correct){
    Array.from(container.querySelectorAll(".q-opt")).forEach(function(b){
      b.disabled = true;
      if (b.dataset.v === correct) {
        b.classList.add("is-ok");
        b.insertAdjacentHTML("beforeend", '<span class="q-opt__mk is-ok">✓</span>');
      } else if (b.dataset.v === chosen) {
        b.classList.add("is-ko");
        b.insertAdjacentHTML("beforeend", '<span class="q-opt__mk is-ko">✕</span>');
      } else {
        b.classList.add("is-dim");
      }
    });
  }

  // ao responder: redesenha sem voltar a rolagem para o topo
  function rerenderAnswer(){
    const top = modalBodyEl.scrollTop;
    renderModalStep();
    modalBodyEl.scrollTop = top;
    const fb = modalBodyEl.querySelector(".q-fb");
    if (fb && fb.scrollIntoView) {
      try { fb.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
    }
  }

  const SHIELD_SVG = function(score, label){
    return '<svg viewBox="0 0 190 210" aria-hidden="true">' +
      '<path d="M95 6l78 30v58c0 52-34 92-78 110C51 186 17 146 17 94V36z" fill="#041e42"/>' +
      '<path d="M95 22l62 24v48c0 42-27 75-62 90-35-15-62-48-62-90V46z" fill="#c00000"/>' +
      '<path d="M95 40l46 18v36c0 32-20 57-46 69-26-12-46-37-46-69V58z" fill="#fff"/>' +
      '<text x="95" y="102" text-anchor="middle" font-family="Arial" font-weight="800" font-size="34" fill="#041e42">' + score + '</text>' +
      '<text x="95" y="126" text-anchor="middle" font-family="Arial" font-weight="800" font-size="11" letter-spacing="2" fill="#c00000">' + label + '</text></svg>';
  };

  // card de resultado da rodada (70/20/10 e Scania Way)
  function buildResult(wrap, opts){
    const s = STRINGS[LANG];
    const h = opts.acertos, total = opts.total;
    const selo = h === total ? "🏆 " + s.perfectRound : (h >= 4 ? "🏅 " + s.sealUnlocked + ": " + opts.badge : s.roundRegistered);
    wrap.innerHTML =
      '<div class="kpis' + (opts.noScoreKpi ? " kpis--2" : "") + '">' +
        kpi(opts.k1, pad2(total) + "/" + pad2(total), { leds: opts.leds }) +
        kpi(opts.k2, s.roundDoneKpi, { text: true }) +
        (opts.noScoreKpi ? "" : kpi(s.hudScore, pad2(h))) +
      '</div>' +
      '<div class="q-card q-result">' +
        '<div class="q-result__badge">' + SHIELD_SVG(h + "/" + total, opts.shieldLabel) + '</div>' +
        '<div><span class="q-result__seal">' + selo + '</span>' +
        '<h4>' + (h === total ? s.perfectTitle : s.roundDoneTitle) + '</h4>' +
        '<p class="q-result__sub">' + opts.sub + '</p>' +
        '<div class="q-result__sum">' +
          '<div><b>' + h + '</b><small>' + s.hudScore + '</small></div>' +
          '<div><b>+' + (h * 100) + '</b><small>' + s.xpGained + '</small></div>' +
          '<div><b>' + s.levelWord + ' ' + (h >= 3 ? 4 : 3) + '</b><small>' + s.levelReached + '</small></div>' +
        '</div></div>' +
      '</div>';
    const again = el("button", "q-again", "↻ " + s.playAgain);
    again.type = "button";
    again.addEventListener("click", opts.onAgain);
    wrap.querySelector(".q-result > div:last-child").appendChild(again);
  }

  // Ciclo B — pergunta sorteada (4 alternativas, feedback por alternativa)
  function buildQuizBankStep(step){
    const s = STRINGS[LANG];
    const st = getStepState(function(){
      const q = pickQuiz(step.banco, step.chave);
      return { qid: q.id, order: shuffleArray(q.opcoes.map(function(o){ return o.id; })), chosen: null };
    });
    const q = findById(step.banco, st.qid);
    const opt = function(id){ return q.opcoes.filter(function(o){ return o.id === id; })[0]; };
    const correctId = q.opcoes.filter(function(o){ return o.correta; })[0].id;
    const answered = st.chosen !== null;
    const ok = answered && st.chosen === correctId;

    const wrap = el("div", "tema-step q-step");
    wrap.innerHTML =
      '<div class="kpis">' +
        kpi(s.kpiQuestion, "01/01", { leds: [answered ? (ok ? "g" : "r") : "c"] }) +
        kpi(s.cycleName, s.drawnQuestion.toUpperCase(), { text: true }) +
        kpi(s.hudScore, answered && ok ? "01" : "00", { bump: answered && ok }) +
      '</div>';

    const card = el("div", "q-card");
    card.innerHTML =
      '<div class="q-tags">' + tag(s.finalQuestion, "q-tag--dark") + tag(s.drawnQuestion, "q-tag--soft") + '</div>' +
      '<p class="q-sit">' + fmt(q.pergunta) + '</p>' +
      '<p class="q-ask">' + s.askQuiz + '</p>';
    const opts = el("div", "q-opts q-opts--text");
    st.order.forEach(function(id, k){
      const b = el("button", "q-opt q-opt--text",
        '<span class="q-opt__letter">' + "ABCD".charAt(k) + '</span><span class="q-opt__txt">' + fmt(opt(id).texto) + '</span>');
      b.type = "button";
      b.dataset.v = id;
      b.addEventListener("click", function(){
        if (st.chosen !== null) return;
        st.chosen = id;
        rerenderAnswer();
      });
      opts.appendChild(b);
    });
    card.appendChild(opts);
    if (answered) {
      markOptions(opts, st.chosen, correctId);
      card.insertAdjacentHTML("beforeend", feedbackBox(ok, ok ? s.correct : s.incorrect, fmt(opt(st.chosen).feedback)));
    } else {
      setNext(false);
    }
    wrap.appendChild(card);
    return wrap;
  }

  // Desafio 70/20/10 — 5 situações por rodada
  const ICON_7020 = { "70": "wrench", "20": "users", "10": "book" };
  function build7020Step(step){
    const s = STRINGS[LANG];
    const st = getStepState(function(){ return { round: pick7020(), i: 0, answers: [], phase: "q" }; });
    const itens = st.round.map(function(r){ return findById(BANCO_7020, r.id); });
    const correctOf = function(it){ return it.resposta; };
    const LBL = { "70": s.lbl70, "20": s.lbl20, "10": s.lbl10 };
    const wrap = el("div", "tema-step q-step");

    if (st.phase === "result") {
      buildResult(wrap, {
        acertos: st.answers.filter(function(a, k){ return a === itens[k].resposta; }).length,
        total: itens.length, badge: s.badge7020, shieldLabel: s.shieldHits,
        k1: s.hudSituation, k2: s.hudLevel, sub: s.resultSub7020,
        leds: roundLeds(itens, st.answers, -1, correctOf),
        onAgain: function(){ resetStepState(); rerenderStep(); }
      });
      return wrap;
    }

    const it = itens[st.i];
    const answered = st.answers[st.i] !== undefined;
    const ok = answered && st.answers[st.i] === it.resposta;
    const acertos = st.answers.filter(function(a, k){ return a === itens[k].resposta; }).length;
    const nivelTxt = it.nivel === 1 ? s.levelEasy : (it.nivel === 2 ? s.levelMid : s.levelAdv);

    wrap.innerHTML =
      '<div class="kpis">' +
        kpi(s.hudSituation, pad2(st.i + 1) + "/" + pad2(itens.length), { leds: roundLeds(itens, st.answers, st.i, correctOf) }) +
        kpi(s.hudLevel, nivelTxt.toUpperCase(), { text: true }) +
        kpi(s.hudScore, pad2(acertos), { bump: ok }) +
      '</div>';

    const card = el("div", "q-card");
    card.innerHTML =
      '<div class="q-tags">' + tag(s.hudSituation + " " + (st.i + 1) + " " + s.of + " " + itens.length, "q-tag--dark") +
        levelTag(it.nivel) + tag(fmt(it.tema), "q-tag--soft") + '</div>' +
      '<p class="q-sit">' + fmt(it.situacao) + '</p>' +
      '<p class="q-fict">' + s.simulation + '</p>' +
      '<p class="q-ask">' + s.askMainLearning + '</p>';
    const opts = el("div", "q-opts q-opts--3");
    st.round[st.i].opts.forEach(function(v){
      const b = el("button", "q-opt",
        '<span class="q-opt__ic">' + ICONS[ICON_7020[v]] + '</span><span class="q-opt__n">' + v + '</span><span class="q-opt__s">' + LBL[v] + '</span>');
      b.type = "button";
      b.dataset.v = v;
      b.addEventListener("click", function(){
        if (st.answers[st.i] !== undefined) return;
        st.answers[st.i] = v;
        rerenderAnswer();
      });
      opts.appendChild(b);
    });
    card.appendChild(opts);

    const ultima = st.i === itens.length - 1;
    if (answered) {
      markOptions(opts, st.answers[st.i], it.resposta);
      const corpo = (ok ? "" : s.correctClass + " <b>" + it.resposta + " — " + LBL[it.resposta] + "</b>. ") + fmt(it.feedback);
      card.insertAdjacentHTML("beforeend", feedbackBox(ok, ok ? s.correct : s.notQuite, corpo));
    }
    wrap.appendChild(card);
    setNext(answered, ultima ? s.seeResult : s.nextSituation);
    stepCtrl = {
      onNext: function(){
        if (ultima) st.phase = "result"; else st.i++;
        rerenderStep();
        return true;
      }
    };
    return wrap;
  }

  // Scania Way em ação — 5 cenários, notas de 1 a 5 embaralhadas
  const NIVEL_POR_NOTA = { 1: 1, 5: 1, 3: 2, 2: 3, 4: 3 };
  function buildSWStep(step){
    const s = STRINGS[LANG];
    const st = getStepState(function(){ return { round: pickSW(), i: 0, answers: [], phase: "q" }; });
    const itens = st.round.map(function(r){ return findById(BANCO_SW, r.id); });
    const correctOf = function(it){ return String(it.nota); };
    const wrap = el("div", "tema-step q-step");

    if (st.phase === "result") {
      buildResult(wrap, {
        acertos: st.answers.filter(function(a, k){ return a === String(itens[k].nota); }).length,
        total: itens.length, badge: s.badgeSW, shieldLabel: s.shieldMissions,
        k1: s.hudScenario, k2: "Scania Way", sub: s.resultSubSW, noScoreKpi: true,
        leds: roundLeds(itens, st.answers, -1, correctOf),
        onAgain: function(){ resetStepState(); rerenderStep(); }
      });
      return wrap;
    }

    const it = itens[st.i];
    const certa = String(it.nota);
    const answered = st.answers[st.i] !== undefined;
    const ok = answered && st.answers[st.i] === certa;
    wrap.innerHTML =
      '<div class="kpis kpis--2">' +
        kpi(s.hudScenario, pad2(st.i + 1) + "/" + pad2(itens.length), { leds: roundLeds(itens, st.answers, st.i, correctOf) }) +
        kpi("Scania Way", fmt(VALORES_SW[it.valor]).toUpperCase(), { text: true }) +
      '</div>';

    const card = el("div", "q-card");
    card.innerHTML =
      '<div class="q-tags">' + tag(s.mission + " " + (st.i + 1) + " " + s.of + " " + itens.length, "q-tag--dark") +
        levelTag(NIVEL_POR_NOTA[it.nota]) + '</div>' +
      '<p class="q-sit">' + fmt(it.cenario) + '</p>' +
      '<p class="q-fict">' + s.simulation + '</p>' +
      '<p class="q-ask">' + s.askScore + '</p>';
    const opts = el("div", "q-opts q-opts--5");
    ["1", "2", "3", "4", "5"].forEach(function(v){
      const b = el("button", "q-opt", '<span class="q-opt__n">' + v + '</span><span class="q-opt__s">' + s.grade + '</span>');
      b.type = "button";
      b.dataset.v = v;
      b.addEventListener("click", function(){
        if (st.answers[st.i] !== undefined) return;
        st.answers[st.i] = v;
        rerenderAnswer();
      });
      opts.appendChild(b);
    });
    card.appendChild(opts);

    const ultima = st.i === itens.length - 1;
    if (answered) {
      markOptions(opts, st.answers[st.i], certa);
      const corpo = (ok ? "" : s.bestGrade + " <b>" + certa + " · " + s["scale" + certa] + "</b>. ") + fmt(it.justificativa);
      const postit = "“" + s.grade + " " + certa + " — " + fmt(it.comentario) + "”";
      card.insertAdjacentHTML("beforeend", feedbackBox(ok, ok ? s.thatsRight : s.notQuite, corpo, postit));
    }
    wrap.appendChild(card);
    setNext(answered, ultima ? s.seeResult : s.nextScenario);
    stepCtrl = {
      onNext: function(){
        if (ultima) st.phase = "result"; else st.i++;
        rerenderStep();
        return true;
      }
    };
    return wrap;
  }

  // ── cards que abrem e fecham (um aberto por vez, sem certo/errado) ──
  function buildExploreStep(step){
    const s = STRINGS[LANG];
    const st = getStepState(function(){ return { open: -1, explored: false }; });
    const wrap = el("div", "tema-step");
    wrap.appendChild(el("h3", "tema-step__title", fmt(step.titulo)));
    if (step.pergunta) wrap.appendChild(el("p", "tema-step__body", fmt(step.pergunta)));

    const grid = el("div", "tema-picks");
    step.cards.forEach(function(c, k){
      const b = el("button", "tema-pick" + (st.open === k ? " is-open" : ""),
        '<span class="tema-pick__icon">' + (ICONS[c.icon] || "") + '</span>' +
        '<span class="tema-pick__title">' + fmt(c.titulo) + '</span>' +
        '<span class="tema-pick__chev">' + CHEVRON + '</span>');
      b.type = "button";
      b.setAttribute("aria-expanded", st.open === k ? "true" : "false");
      b.addEventListener("click", function(){
        st.open = (st.open === k) ? -1 : k;
        st.explored = true;
        const top = modalBodyEl.scrollTop;
        renderModalStep();
        modalBodyEl.scrollTop = top;
        const det = modalBodyEl.querySelector(".tema-detail");
        if (det && det.scrollIntoView) { try { det.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {} }
      });
      grid.appendChild(b);
    });
    wrap.appendChild(grid);

    if (st.open >= 0) {
      const c = step.cards[st.open];
      let html = '<div class="tema-detail__head"><span class="tema-detail__icon">' + (ICONS[c.icon] || "") + '</span><span>' + fmt(c.titulo) + '</span></div>' +
        '<p class="tema-detail__text">' + fmt(c.texto) + '</p>' +
        '<span class="tema-detail__label">' + (STRINGS[LANG][step.detalheLabel] || "") + '</span>';
      if (c.exemplos) html += '<ul class="tema-detail__list">' + c.exemplos.map(function(x){ return '<li>' + fmt(x) + '</li>'; }).join("") + '</ul>';
      if (c.exemplo) html += '<p class="tema-detail__text">' + fmt(c.exemplo) + '</p>';
      wrap.appendChild(el("div", "tema-detail", html));
    } else {
      wrap.appendChild(el("p", "tema-note tema-note--hint", '<span class="tema-note__icon">' + ICONS.info + '</span><span>' + s.chooseCard + '</span>'));
    }
    if (step.rodape) wrap.appendChild(el("p", "tema-footnote", fmt(step.rodape)));
    if (!st.explored) setNext(false);
    return wrap;
  }

  // ── Central MySuccess (menu de consulta) ───────────────────────────
  function buildHubStep(step){
    const s = STRINGS[LANG];
    const wrap = el("div", "tema-step");
    wrap.appendChild(el("h3", "tema-step__title", fmt(step.titulo)));
    wrap.appendChild(el("p", "tema-step__body", fmt(step.intro)));
    wrap.appendChild(el("p", "tema-step__subhead", fmt(step.perguntaGuias)));
    const grid = el("div", "tema-guides");
    step.guias.forEach(function(g){
      const a = el("a", "tema-guide",
        '<span class="tema-card__icon">' + (ICONS[g.icon] || "") + '</span>' +
        '<span class="tema-card__title">' + fmt(g.titulo) + '</span>' +
        '<span class="tema-card__text">' + fmt(g.texto) + '</span>' +
        '<span class="tema-guide__cta">' + s.openGuide + ' ' + EXT_ICON + '</span>');
      a.href = g.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      grid.appendChild(a);
    });
    wrap.appendChild(grid);
    wrap.appendChild(el("div", "tema-divider"));
    renderBlocks([{ t: "links", intro: { pt: s.quickAccess, en: s.quickAccess }, items: step.acessoRapido }], wrap);
    return wrap;
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener("click", function(){
      if (stepCtrl && stepCtrl.onNext && stepCtrl.onNext()) return;
      const conteudo = TEMA_CONTENT[modalTemaId];
      const total = conteudo.steps.length;
      if (modalStepIndex < total - 1) {
        modalStepIndex++;
        rerenderStep();
      } else {
        const idConcluido = modalTemaId;
        fecharModalTema();
        markTemaDone(idConcluido);
      }
    });
  }
  if (modalPrevBtn) {
    modalPrevBtn.addEventListener("click", function(){
      if (modalStepIndex > 0) {
        modalStepIndex--;
        rerenderStep();
      }
    });
  }
  if (modalBackBtn) {
    modalBackBtn.addEventListener("click", fecharModalTema);
  }

  // ══════════════════════════════════════════════════════════════════
  // TELAS — introdução → mapa (sem tela de escolha de modo)
  // ══════════════════════════════════════════════════════════════════
  const mainScreen = document.getElementById("trilhaMainScreen");
  const landingScreen = document.getElementById("trilhaLandingScreen");
  const btnIniciarJornada = document.getElementById("btnIniciarJornada");

  function renderJornada(){
    const total = TEMAS.length;
    const done = getTemasDone().length;
    const current = Math.min(done + 1, total);
    const pct = Math.round((done / total) * 100);
    // as bolinhas ficam espaçadas igualmente (0%, 1/(N-1), 2/(N-1)... 100%),
    // então a LINHA precisa usar essa proporção pra sempre encostar na bolinha certa
    // (o texto exibido continua sendo a % real de conclusão)
    const posIndex = Math.min(done, total - 1);
    const fillPct = total > 1 ? Math.round((posIndex / (total - 1)) * 100) : 100;

    document.getElementById("jornadaFill").style.width = fillPct + "%";
    document.getElementById("jornadaPct").textContent = pct + "%";

    const track = document.getElementById("jornadaTrack");
    track.querySelectorAll(".jornada-stop").forEach(function(e){ e.remove(); });
    for (let n = 1; n <= total; n++) {
      const stop = document.createElement("div");
      stop.className = "jornada-stop";
      stop.dataset.stop = n;
      if (n <= done) stop.classList.add("is-done");
      else if (n === current) stop.classList.add("is-current");
      track.appendChild(stop);
    }
  }

  // aplica os textos fixos (data-i18n) + o conteúdo dinâmico no idioma atual
  // troca de idioma — usada pelos botões da tela inicial, da apresentação e do cabeçalho do mapa
  function setLang(lang){
    LANG = (lang === "en") ? "en" : "pt";
    storageSet("trilha_lang", LANG);
    document.querySelectorAll(".lang-opt").forEach(function(o){ o.classList.toggle("lang-opt--on", o.dataset.lang === LANG); });
    document.querySelectorAll(".lang-switch__btn").forEach(function(b){
      const on = b.dataset.lang === LANG;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const label = document.getElementById("langCurrentLabel");
    if (label) label.textContent = LANG.toUpperCase();
    applyLang();
    if (typeof onLangChangeIntro === "function") onLangChangeIntro();
  }
  let onLangChangeIntro = null;

  function applyLang(){
    document.documentElement.lang = (LANG === "en") ? "en" : "pt-BR";
    document.querySelectorAll("[data-i18n]").forEach(function(e){
      const key = e.getAttribute("data-i18n");
      if (STRINGS[LANG] && STRINGS[LANG][key] != null) {
        e.textContent = STRINGS[LANG][key];
      }
    });
    renderTemas();
    renderJornada();
    if (modalEl && modalEl.classList.contains("is-open")) {
      const top = modalBodyEl.scrollTop;
      renderModalStep();
      modalBodyEl.scrollTop = top;
    }
  }

  function showMain() {
    mainScreen.classList.add("is-visible");
    try {
      renderJornada();
    } catch (err) {
      console.error("Falha ao renderizar a jornada:", err);
    }
  }

  function backToLanding() {
    mainScreen.classList.remove("is-visible");
    landingScreen.classList.remove("fade-out");
    landingScreen.style.display = "flex";
  }

  applyLang();

  // ══════════════════════════════════════════════════════════════════
  // APRESENTAÇÃO NARRADA — texto + voz do navegador (Web Speech API)
  // A narração começa depois do clique em "Iniciar Jornada" (os navegadores
  // só liberam áudio depois de uma interação da pessoa).
  // ══════════════════════════════════════════════════════════════════
  const INTRO_SCRIPT = [
    { pt: "Olá! Boas-vindas à **Jornada de Desenvolvimento**.",
      en: "Hello! Welcome to the **Development Journey**." },
    { pt: "Aqui você vai entender como funciona a **Gestão de Performance – Ciclo B** na Scania.",
      en: "Here you'll understand how **Performance Management – Template B** works at Scania." },
    { pt: "No mapa da planta, clique em uma das **cinco paradas**. Em cada uma, você vê um conteúdo rápido e responde a **desafios** com situações do dia a dia.",
      en: "On the plant map, click one of the **five stops**. At each one, you'll see short content and answer **challenges** based on everyday situations." },
    { pt: "A cada parada concluída, sua **barra de progresso** avança. Vamos começar?",
      en: "With each stop you complete, your **progress bar** moves forward. Shall we begin?" }
  ];

  const introScreen = document.getElementById("trilhaIntroScreen");
  const synth = ("speechSynthesis" in window) ? window.speechSynthesis : null;
  let introIdx = -1, introPaused = false, introMuted = false, introRunning = false, introToken = 0;

  // cada apresentadora tem a sua voz: se o computador tiver duas vozes femininas
  // no idioma, usa uma para cada; senão, usa a mesma voz com tom diferente
  function introVoices(){
    if (!synth) return [];
    const voices = synth.getVoices();
    const lang = LANG === "en" ? "en" : "pt";
    const doLang = voices.filter(function(v){ return (v.lang || "").toLowerCase().indexOf(lang) === 0; });
    const pref = LANG === "en" ? /female|samantha|zira|jenny|aria|google us english/i
                               : /francisca|maria|luciana|thalita|vit[oó]ria|female|google portugu[eê]s/i;
    const br = doLang.filter(function(v){ return LANG === "en" || /br/i.test(v.lang); });
    const fem = br.filter(function(v){ return pref.test(v.name); });
    const lista = fem.length ? fem : (br.length ? br : doLang);
    return lista.slice(0, 2);
  }
  function hostOf(k){ return k % 2; }   // frases pares: apresentadora da esquerda; ímpares: da direita
  function setTalking(host){
    document.querySelectorAll(".intro-mic").forEach(function(m){
      m.classList.toggle("is-on", host !== null && String(host) === m.dataset.host);
    });
  }


  function renderIntroText(){
    const box = document.getElementById("introText");
    box.innerHTML = "";
    INTRO_SCRIPT.forEach(function(frase, k){
      const p = el("p", "intro-line" + (k < introIdx ? " is-done" : (k === introIdx ? " is-current" : "")), fmt(frase));
      box.appendChild(p);
    });
    if (!synth || introMuted) box.querySelectorAll(".intro-line").forEach(function(l){ l.classList.add("is-done"); });
    const cur = box.querySelector(".is-current");
    if (cur && cur.scrollIntoView) { try { cur.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) {} }
    const pct = introIdx < 0 ? 0 : Math.round(Math.min(introIdx + 1, INTRO_SCRIPT.length) / INTRO_SCRIPT.length * 100);
    document.getElementById("introProgress").style.width = (synth && !introMuted ? pct : 100) + "%";
  }

  function renderIntroControls(){
    const s = STRINGS[LANG];
    const play = document.getElementById("introPlay");
    const mute = document.getElementById("introMute");
    const hint = document.getElementById("introHint");
    const wave = document.getElementById("introWave");
    if (!synth) {
      document.getElementById("introControls").style.display = "none";
      return;
    }
    play.textContent = (introRunning && !introPaused) ? "❚❚" : "▶";
    mute.textContent = introMuted ? "🔇" : "🔊";
    const falando = introRunning && !introPaused && !introMuted;
    wave.classList.toggle("is-on", falando);
    setTalking(falando && introIdx < INTRO_SCRIPT.length ? hostOf(introIdx) : null);
    hint.textContent = introMuted ? s.introHintMuted : (introPaused ? s.introHintPaused :
      (introRunning ? s.introHintPlaying : (introIdx >= INTRO_SCRIPT.length ? s.introHintEnd : "")));
  }

  function speakFrom(k){
    if (!synth) return;
    const token = ++introToken;
    synth.cancel();
    introIdx = k;
    introRunning = k < INTRO_SCRIPT.length;
    introPaused = false;
    renderIntroText();
    renderIntroControls();
    if (!introRunning || introMuted) return;
    const texto = tr(INTRO_SCRIPT[k]).replace(/\*\*/g, "");
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = LANG === "en" ? "en-US" : "pt-BR";
    const vozes = introVoices();
    const host = hostOf(k);
    const v = vozes.length > 1 ? vozes[host] : vozes[0];
    if (v) u.voice = v;
    u.rate = 1;
    u.pitch = (vozes.length > 1) ? 1 : (host === 0 ? 1 : 1.25);
    u.onend = function(){ if (token === introToken && !introMuted) speakFrom(k + 1); };
    synth.speak(u);
  }

  function stopIntroVoice(){
    introToken++;
    if (synth) synth.cancel();
    introRunning = false;
    setTalking(null);
  }

  function openIntro(){
    introScreen.classList.add("is-open");
    introScreen.setAttribute("aria-hidden", "false");
    introMuted = false;
    if (!synth) {
      introIdx = INTRO_SCRIPT.length;
      renderIntroText();
      document.getElementById("introControls").style.display = "none";
      document.getElementById("introText").insertAdjacentHTML("afterbegin",
        '<p class="intro-line is-current">' + STRINGS[LANG].introNoVoice + '</p>');
      return;
    }
    // as vozes podem carregar um pouco depois; começa assim que estiverem prontas
    if (synth.getVoices().length) speakFrom(0);
    else {
      renderIntroText();
      let started = false;
      const go = function(){ if (!started) { started = true; speakFrom(0); } };
      synth.onvoiceschanged = go;
      setTimeout(go, 600);
    }
  }

  onLangChangeIntro = function(){
    if (!introScreen.classList.contains("is-open")) return;
    if (!synth) { renderIntroText(); return; }
    if (introMuted) { renderIntroText(); renderIntroControls(); return; }
    // recomeça a fala atual já no novo idioma
    speakFrom(Math.max(0, Math.min(introIdx, INTRO_SCRIPT.length - 1)));
  };

  function closeIntro(){
    stopIntroVoice();
    introScreen.classList.add("fade-out");
    setTimeout(function(){
      introScreen.classList.remove("is-open", "fade-out");
      introScreen.setAttribute("aria-hidden", "true");
      showMain();
    }, 300);
  }

  document.getElementById("introPlay").addEventListener("click", function(){
    if (!synth) return;
    if (introMuted) { introMuted = false; speakFrom(Math.max(0, Math.min(introIdx, INTRO_SCRIPT.length - 1))); return; }
    if (!introRunning) { speakFrom(0); return; }
    if (introPaused) { synth.resume(); introPaused = false; }
    else { synth.pause(); introPaused = true; }
    renderIntroControls();
  });
  document.getElementById("introReplay").addEventListener("click", function(){
    introMuted = false;
    speakFrom(0);
  });
  document.getElementById("introMute").addEventListener("click", function(){
    if (!synth) return;
    if (introMuted) { introMuted = false; speakFrom(Math.max(0, Math.min(introIdx, INTRO_SCRIPT.length - 1))); }
    else { introMuted = true; stopIntroVoice(); renderIntroText(); renderIntroControls(); }
  });
  document.getElementById("introSkip").addEventListener("click", closeIntro);
  document.getElementById("introGo").addEventListener("click", closeIntro);

  if (btnIniciarJornada) {
    btnIniciarJornada.addEventListener("click", function(){
      storageSet("trilha_started", "1");
      landingScreen.classList.add("fade-out");
      setTimeout(function(){
        landingScreen.style.display = "none";
        openIntro();
      }, 300);
    });
  }

  // se a jornada já foi iniciada (mesma sessão), pula a introdução
  if (storageGet("trilha_started")) {
    if (landingScreen) landingScreen.style.display = "none";
    showMain();
  }

  // ── header: botão voltar + seletor de idioma ──
  function initHeader(){
    const backBtn = document.getElementById("backToModeBtn");
    if (backBtn) {
      backBtn.addEventListener("click", backToLanding);
    }

    const langBtn = document.getElementById("langBtn");
    const langDd  = document.getElementById("langDd");
    if (langBtn && langDd) {
      langBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const rect = langBtn.getBoundingClientRect();
        langDd.style.top   = (rect.bottom + 8) + "px";
        langDd.style.right = (window.innerWidth - rect.right) + "px";
        langDd.classList.toggle("open");
      });

      // reflete o idioma salvo (sessão anterior) no dropdown, antes de qualquer clique
      document.querySelectorAll(".lang-opt").forEach(function (opt) {
        opt.classList.toggle("lang-opt--on", opt.dataset.lang === LANG);
      });
      const currentLabel = document.getElementById("langCurrentLabel");
      if (currentLabel) currentLabel.textContent = LANG.toUpperCase();

      document.querySelectorAll(".lang-opt").forEach(function (opt) {
        opt.addEventListener("click", function () {
          langDd.classList.remove("open");
          setLang(opt.dataset.lang);
        });
      });

      document.addEventListener("click", function (e) {
        if (!langBtn.contains(e.target) && !langDd.contains(e.target)) {
          langDd.classList.remove("open");
        }
      });

      window.addEventListener("resize", function () {
        if (langDd.classList.contains("open")) {
          const rect = langBtn.getBoundingClientRect();
          langDd.style.top   = (rect.bottom + 8) + "px";
          langDd.style.right = (window.innerWidth - rect.right) + "px";
        }
      });
    }
  }
  initHeader();

  // botões PT / EN da tela inicial e da apresentação
  document.querySelectorAll(".lang-switch__btn").forEach(function(b){
    b.addEventListener("click", function(){ setLang(b.dataset.lang); });
  });
  setLang(LANG);
})();