// ============================================================
// SCADA-Core Automática — main.js
// Alternância de tema, menu mobile e inicialização do Mermaid
// ============================================================

(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'scada-core-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  let saved = 'dark';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'dark'; } catch (e) { /* ignore */ }
  applyTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(current);
      if (window.mermaid) {
        window.mermaid.initialize({ startOnLoad: false, theme: current === 'dark' ? 'dark' : 'default' });
        document.querySelectorAll('pre.mermaid[data-processed]').forEach((el) => el.removeAttribute('data-processed'));
        try { window.mermaid.run(); } catch (e) { /* ignore */ }
      }
    });
  }

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: true,
      theme: (root.getAttribute('data-theme') === 'dark') ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
    });
  }
})();

// ============================================================
// PRESENTATION CAROUSEL (15 slides) — Etapa 01
// ============================================================
(function () {
  const slides = document.querySelectorAll('.presentation-viewport .slide');
  if (!slides.length) return;

  const prevBtn = document.getElementById('pres-prev-btn');
  const nextBtn = document.getElementById('pres-next-btn');
  const counter = document.getElementById('pres-slide-counter');
  const dotsWrap = document.getElementById('slide-dots');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap && dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap ? dotsWrap.querySelectorAll('.slide-dot') : [];

  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    if (counter) counter.textContent = `Slide ${current + 1} de ${slides.length}`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === slides.length - 1;
  }

  function goTo(i) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    render();
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', (e) => {
    const viewport = document.querySelector('.presentation-viewport');
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  render();
})();

// ============================================================
// SCADA-CORE SIMULATOR — Fábrica de Paçoca (Forno de Torra + Rejeição)
// ============================================================
(function () {
  const sliderTT201 = document.getElementById('sim-tt201');
  if (!sliderTT201) return; // simulador não presente nesta página

  const sliderFS201 = document.getElementById('sim-fs201');
  const sliderPS402 = document.getElementById('sim-ps402');
  const sliderMT101 = document.getElementById('sim-mt101');

  const chkTS201 = document.getElementById('sim-ts201');
  const chkM201 = document.getElementById('sim-m201');
  const chkMD401 = document.getElementById('sim-md401');
  const chkESD100 = document.getElementById('sim-esd100');

  const valTT201 = document.getElementById('val-tt201');
  const valFS201 = document.getElementById('val-fs201');
  const valPS402 = document.getElementById('val-ps402');
  const valMT101 = document.getElementById('val-mt101');

  const badges = {
    t2: document.getElementById('prop-t2'),
    f2: document.getElementById('prop-f2'),
    c1: document.getElementById('prop-c1'),
    m2: document.getElementById('prop-m2'),
    e1: document.getElementById('prop-e1'),
    v1: document.getElementById('prop-v1'),
    a1: document.getElementById('prop-a1'),
    d1: document.getElementById('prop-d1'),
    pair: document.getElementById('prop-pair'),
    u1: document.getElementById('prop-u1'),
    v3: document.getElementById('prop-v3'),
    m1: document.getElementById('prop-m1'),
    m6: document.getElementById('prop-m6'),
  };

  const synFlame = document.getElementById('syn-flame');
  const synValveGas = document.getElementById('syn-valve-gas');
  const synValveGasLabel = document.getElementById('syn-valve-gas-label');
  const synEsteiraForno = document.getElementById('syn-esteira-forno');
  const synFornoBody = document.getElementById('syn-forno-body');
  const synFireCloud = document.getElementById('syn-fire-cloud');
  const synAlarmBeacon = document.getElementById('syn-alarm-beacon');
  const synMd401 = document.getElementById('syn-md401-indicator');
  const synValveRejeito = document.getElementById('syn-valve-rejeito');
  const synEsteiraEmb = document.getElementById('syn-esteira-emb');
  const synPeneira = document.getElementById('syn-peneira');

  const sisStatus = document.getElementById('scada-sis-status');
  const liveIndicator = document.querySelector('.scada-live-indicator');
  const mathProofEl = document.getElementById('scada-math-proof');
  const predicatesEl = document.getElementById('scada-predicates-status');
  const inferenceEl = document.getElementById('scada-inference-output');
  const consoleLog = document.getElementById('scada-console-log');

  let lastTrip = null;

  function log(msg, level) {
    if (!consoleLog) return;
    const now = new Date();
    const ts = now.toTimeString().split(' ')[0];
    const entry = document.createElement('div');
    entry.className = 'log-entry ' + (level || 'info');
    entry.textContent = `[${ts}] ${msg}`;
    consoleLog.appendChild(entry);
    while (consoleLog.children.length > 60) consoleLog.removeChild(consoleLog.firstChild);
    consoleLog.scrollTop = 0;
  }

  function setBadge(el, value, dangerWhenTrue) {
    if (!el) return;
    el.textContent = el.dataset.label + ': ' + (value ? '1' : '0');
    el.classList.remove('on', 'danger');
    if (value) el.classList.add(dangerWhenTrue ? 'danger' : 'on');
  }

  function computeState() {
    const tt201 = parseFloat(sliderTT201.value);
    const fs201 = parseFloat(sliderFS201.value);
    const ps402 = parseFloat(sliderPS402.value);
    const mt101 = parseFloat(sliderMT101.value);

    if (valTT201) valTT201.textContent = tt201.toFixed(0) + ' °C';
    if (valFS201) valFS201.textContent = fs201.toFixed(0) + ' %';
    if (valPS402) valPS402.textContent = ps402.toFixed(1) + ' bar';
    if (valMT101) valMT101.textContent = mt101.toFixed(1) + ' %';

    // ---- Proposições atômicas (Aula 02) ----
    const t2 = tt201 >= 160;          // sobretemperatura do forno
    const f2 = fs201 >= 40;           // fluxo de exaustão OK
    const c1 = chkTS201.checked;      // chama detectada
    const m2 = chkM201.checked;       // esteira do forno ligada
    const e1 = chkESD100.checked;     // emergência acionada
    const d1 = chkMD401.checked;      // metal detectado
    const pair = ps402 > 6;           // pressão pneumática OK
    const u1 = mt101 > 10;            // umidade acima do limite

    // ---- Regras derivadas (Aulas 03, 04, 07, 08) ----
    const fFogo = (c1 && !m2) || t2;                 // F_fogo (Aula 03-B)
    const v1 = !fFogo && f2 && !e1;                  // válvula de gás XV-201 (permissivo)
    const a1 = fFogo;                                // alarme ALM-201
    const pRejeito = d1 && pair;                     // permissivo de rejeição (Aula 03-C)
    const v3 = pRejeito;                             // válvula XV-401 abre para soprar
    const falhaEjecao = d1 && !pair;                 // R-203
    const m6 = !d1;                                  // esteira embalagem para com metal
    const m1 = !u1 && !e1;                           // motor peneira (Aula 03-A simplificada)

    // ---- Badges ----
    setBadge(badges.t2, t2, true);
    setBadge(badges.f2, !f2, true); // exibe alarme quando f2 é falso
    if (badges.f2) badges.f2.textContent = 'f2: ' + (f2 ? 1 : 0);
    if (badges.f2) { badges.f2.classList.remove('on', 'danger'); badges.f2.classList.add(f2 ? 'on' : 'danger'); }
    setBadge(badges.c1, c1, false);
    if (badges.c1) { badges.c1.classList.remove('on'); if (c1) badges.c1.classList.add(c1 && !m2 ? 'danger' : 'on'); }
    setBadge(badges.m2, !m2, false);
    if (badges.m2) { badges.m2.textContent = 'm2: ' + (m2 ? 1 : 0); badges.m2.classList.remove('on', 'danger'); badges.m2.classList.add(m2 ? 'on' : 'danger'); }
    setBadge(badges.e1, e1, true);
    setBadge(badges.v1, !v1, false);
    if (badges.v1) { badges.v1.textContent = 'v1: ' + (v1 ? 1 : 0); badges.v1.classList.remove('on', 'danger'); badges.v1.classList.add(v1 ? 'on' : 'danger'); }
    setBadge(badges.a1, a1, true);
    setBadge(badges.d1, d1, true);
    setBadge(badges.pair, !pair, false);
    if (badges.pair) { badges.pair.textContent = 'p_air: ' + (pair ? 1 : 0); badges.pair.classList.remove('on', 'danger'); badges.pair.classList.add(pair ? 'on' : 'danger'); }
    setBadge(badges.u1, u1, true);
    setBadge(badges.v3, v3, false);
    if (badges.v3) { badges.v3.classList.remove('danger'); if (v3) { badges.v3.classList.remove('on'); badges.v3.classList.add('danger'); } }
    setBadge(badges.m1, !m1, false);
    if (badges.m1) { badges.m1.textContent = 'm1: ' + (m1 ? 1 : 0); badges.m1.classList.remove('on', 'danger'); badges.m1.classList.add(m1 ? 'on' : 'danger'); }
    setBadge(badges.m6, !m6, false);
    if (badges.m6) { badges.m6.textContent = 'm6: ' + (m6 ? 1 : 0); badges.m6.classList.remove('on', 'danger'); badges.m6.classList.add(m6 ? 'on' : 'danger'); }

    // ---- Sinótico SVG ----
    if (synFlame) synFlame.style.display = c1 ? 'block' : 'none';
    if (synFornoBody) synFornoBody.setAttribute('fill', t2 ? '#7f1d1d' : '#0f2942');
    if (synValveGas) synValveGas.setAttribute('fill', v1 ? '#10b981' : '#ef4444');
    if (synValveGasLabel) synValveGasLabel.textContent = v1 ? 'ABERTA' : 'FECHADA';
    if (synEsteiraForno) synEsteiraForno.setAttribute('fill', m2 ? '#10b981' : '#64748b');
    if (synFireCloud) synFireCloud.style.display = fFogo ? 'block' : 'none';
    if (synAlarmBeacon) synAlarmBeacon.style.display = a1 ? 'inline-block' : 'none';
    if (synMd401) synMd401.setAttribute('fill', d1 ? '#ef4444' : '#10b981');
    if (synValveRejeito) synValveRejeito.setAttribute('fill', v3 ? '#f59e0b' : '#334155');
    if (synEsteiraEmb) synEsteiraEmb.setAttribute('fill', m6 ? '#10b981' : '#ef4444');
    if (synPeneira) synPeneira.setAttribute('fill', m1 ? '#10b981' : '#64748b');

    // ---- Prova formal ao vivo (Aula 03 / 07) ----
    const phi = (c1 && !m2) && v1; // Estado de risco S_risco = (c1 ∧ ¬m2 ∧ v1)
    if (mathProofEl) {
      mathProofEl.innerHTML =
        `Φ = (c1 ∧ ¬m2 ∧ v1)<br>` +
        `c1=${c1 ? 1 : 0}  ¬m2=${!m2 ? 1 : 0}  v1=${v1 ? 1 : 0}<br>` +
        `Φ ≡ <strong style="color:${phi ? '#ef4444' : '#6ee7b7'}">${phi ? 'V (VIOLAÇÃO!)' : 'F (contradição — seguro)'}</strong><br>` +
        `<span style="color:#64748b;">Regra: (c1 ∧ ¬m2) → ¬v1 é respeitada, logo Φ ≡ F sempre.</span>`;
    }
    if (predicatesEl) {
      const todosSaudaveis = !e1; // simplificação: sem falha de sensor simulada
      predicatesEl.innerHTML =
        `∀x∈Instrumentos, Saudavel(x): <strong style="color:${todosSaudaveis ? '#6ee7b7' : '#fca5a5'}">${todosSaudaveis ? 'V' : 'F'}</strong><br>` +
        `∃d∈DetectoresMetais, MetalDetectado(d): <strong style="color:${d1 ? '#fca5a5' : '#6ee7b7'}">${d1 ? 'V' : 'F'}</strong><br>` +
        `∃t∈TermometrosForno, Sobretemp(t): <strong style="color:${t2 ? '#fca5a5' : '#6ee7b7'}">${t2 ? 'V' : 'F'}</strong>`;
    }

    // ---- Motor de inferência Forward Chaining (Aulas 08/09) ----
    const fired = [];
    const superAquecimento = t2 && !m2;
    const falhaCombustao = c1 && !f2;
    const riscoIncendio = superAquecimento || falhaCombustao || fFogo;
    if (superAquecimento) fired.push(['R-101', 'SUPER_AQUECIMENTO_AMENDOIM', 'danger']);
    if (falhaCombustao) fired.push(['R-102', 'FALHA_COMBUSTAO_FORNO', 'danger']);
    if (riscoIncendio) fired.push(['R-103', 'RISCO_INCENDIO_TORRA', 'danger']);
    if (riscoIncendio) fired.push(['R-104', 'TRIP_CORTE_GAS_XV201', 'danger']);
    if (d1) fired.push(['R-201', 'LOTE_CONTAMINADO_METAL', 'warning']);
    if (d1 && pair) fired.push(['R-202', 'ACIONAMENTO_SOPRO_XV401', 'warning']);
    if (falhaEjecao) fired.push(['R-203', 'FALHA_EJECAO_PNEUMATICA', 'danger']);
    if (falhaEjecao) fired.push(['R-204', 'PARADA_EMERGENCIA_ESTEIRA_M401', 'danger']);
    if (u1) fired.push(['R-401', 'GRAO_DEGRADADO_REJEICAO', 'warning']);

    if (inferenceEl) {
      inferenceEl.innerHTML = fired.length
        ? fired.map(([id, name, level]) =>
            `<div style="margin-bottom:0.35rem;"><code style="color:${level === 'danger' ? '#fca5a5' : '#fcd34d'};">${id}</code> → ${name}</div>`
          ).join('')
        : '<span style="color:#6ee7b7;">Nenhuma regra disparada — planta em regime nominal.</span>';
    }

    // ---- Status geral e histórico ----
    const tripAtivo = riscoIncendio || falhaEjecao || e1;
    if (sisStatus) {
      sisStatus.innerHTML = tripAtivo
        ? '<span style="color:#ef4444; font-weight:bold;">🔴 TRIP ATIVO — INTERTRAVAMENTO ACIONADO</span>'
        : '<span style="color:#10b981; font-weight:bold;">🟢 PROCESSO EM REGIME NOMINAL</span>';
    }
    if (liveIndicator) liveIndicator.classList.toggle('danger', tripAtivo);

    if (lastTrip !== null && tripAtivo !== lastTrip) {
      if (tripAtivo) {
        log('INTERTRAVAMENTO ACIONADO — condição de risco detectada pelo motor de inferência.', 'danger');
      } else {
        log('Planta retornou ao regime nominal. Todos os trips foram limpos.', 'success');
      }
    }
    lastTrip = tripAtivo;
  }

  [sliderTT201, sliderFS201, sliderPS402, sliderMT101].forEach((s) => s && s.addEventListener('input', computeState));
  [chkTS201, chkM201, chkMD401, chkESD100].forEach((c) => c && c.addEventListener('change', computeState));

  const presets = {
    'preset-normal': { tt201: 145, fs201: 78, ps402: 7.2, mt101: 6.5, ts201: false, m201: true, md401: false, esd100: false, label: 'Operação Nominal' },
    'preset-fire': { tt201: 178, fs201: 78, ps402: 7.2, mt101: 6.5, ts201: true, m201: false, md401: false, esd100: false, label: 'Cenário 1: Risco de Incêndio no Forno (chama ativa + esteira parada)' },
    'preset-contam': { tt201: 145, fs201: 78, ps402: 4.2, mt101: 6.5, ts201: false, m201: true, md401: true, esd100: false, label: 'Cenário 2: Contaminação Metálica com Falha Pneumática (pressão baixa)' },
    'preset-exhaust': { tt201: 150, fs201: 15, ps402: 7.2, mt101: 6.5, ts201: true, m201: true, md401: false, esd100: false, label: 'Cenário 3: Falha de Exaustão do Forno (chama sem fluxo de ar)' },
    'preset-esd': { tt201: 145, fs201: 78, ps402: 7.2, mt101: 12.5, ts201: false, m201: true, md401: false, esd100: true, label: 'Cenário 4: Umidade Alta + Parada de Emergência (ESD-100)' },
  };

  Object.keys(presets).forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const p = presets[id];
      sliderTT201.value = p.tt201;
      sliderFS201.value = p.fs201;
      sliderPS402.value = p.ps402;
      sliderMT101.value = p.mt101;
      chkTS201.checked = p.ts201;
      chkM201.checked = p.m201;
      chkMD401.checked = p.md401;
      chkESD100.checked = p.esd100;
      computeState();
      log('Cenário injetado: ' + p.label, 'warning');
    });
  });

  computeState();
  log('SCADA-Core inicializado. Motor lógico e de inferência ativos.', 'info');
  setInterval(() => {
    log('Ciclo de varredura concluído (scan &lt; 1.5 ms).', 'info');
  }, 6000);
})();
