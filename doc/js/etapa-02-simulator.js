/**
 * SCADA-Graph Logistics & Process Network Simulator — Fábrica de Paçoca
 * Etapa 02: Teoria dos Grafos Aplicada à Automação Industrial e Logística
 * UNIFEI - ECAA08 Automática (2026.2) — Grupo 7
 *
 * Algoritmos Implementados:
 * 1. Algoritmo de Dijkstra para Roteamento de Menor Caminho e Válvulas ISA-5.1
 * 2. Simulação de Falhas/Vazamentos e Desvio Automático em Tempo Real (SIS IEC 61511)
 * 3. Inspeção de Integridade Física / Corrosão via Circuito Euleriano (Algoritmo de Hierholzer)
 * 4. Roteamento do AGV de Coleta de Amostras de Qualidade via TSP (Nearest Neighbor + 2-Opt)
 * 5. Validação de Fluxo de Produção Irreversível como Grafo Acíclico Dirigido (DAG via Algoritmo de Kahn)
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // 1. MODELO TOPOLÓGICO: VÉRTICES E ARESTAS DA FÁBRICA DE PAÇOCA
  // -------------------------------------------------------------

  const NODES = {
    // Nós de Processo & Transporte (Setores 100 a 400)
    'SILO-101': { id: 'SILO-101', label: 'SILO-101 (Amendoim)', x: 75, y: 70, type: 'silo', layer: 'process', tag: 'SILO-101', desc: 'Silo Principal de Amendoim Descascado' },
    'SILO-102': { id: 'SILO-102', label: 'SILO-102 (Açúcar/Sal)', x: 75, y: 220, type: 'silo', layer: 'process', tag: 'SILO-102', desc: 'Silos de Sacarose e Sal Iodado' },
    'MAN-301':  { id: 'MAN-301',  label: 'MAN-301 (Dosagem)',    x: 220, y: 145, type: 'manifold', layer: 'process', tag: 'MAN-301', desc: 'Manifold de Dosagem Gravimétrica' },
    'MOI-301A': { id: 'MOI-301A', label: 'MOI-301A (Moinho A)',  x: 350, y: 75,  type: 'mill', layer: 'process', tag: 'MOI-301A', desc: 'Moinho de Martelos A (Principal)' },
    'MOI-301B': { id: 'MOI-301B', label: 'MOI-301B (Moinho B)',  x: 350, y: 215, type: 'mill', layer: 'process', tag: 'MOI-301B', desc: 'Moinho de Martelos B (Reserva/Otimizado)' },
    'HOM-301':  { id: 'HOM-301',  label: 'HOM-301 (Homog.)',     x: 490, y: 145, type: 'mixer', layer: 'process', tag: 'HOM-301', desc: 'Homogeneizador de Massa de Paçoca' },
    'MOE-302':  { id: 'MOE-302',  label: 'MOE-302 (Pulmão)',     x: 615, y: 65,  type: 'buffer', layer: 'process', tag: 'MOE-302', desc: 'Moega Pulmão de Alívio/Desvio' },
    'PRN-401':  { id: 'PRN-401',  label: 'PRN-401 (Prensa)',     x: 745, y: 145, type: 'press', layer: 'process', tag: 'PRN-401', desc: 'Prensa Rotativa de Compactação' },

    // Nós Logísticos & Anel Viário da Fábrica (Pátio e Galpões)
    'PORT':   { id: 'PORT',   label: 'Portaria & Balança', x: 100, y: 355, type: 'logistic', layer: 'vehicle', tag: 'PORT-01', desc: 'Controle de Entrada e Pesagem de Carretas' },
    'GALP_A': { id: 'GALP_A', label: 'Galpão A (Insumos)', x: 260, y: 355, type: 'warehouse', layer: 'vehicle', tag: 'WH-A', desc: 'Boxes Amendoim, Açúcar, Sal e Glucose' },
    'LAB':    { id: 'LAB',    label: 'Lab. Qualidade (AGV)', x: 440, y: 275, type: 'lab', layer: 'vehicle', tag: 'LAB-01', desc: 'Base de Testes e Estação Base do AGV' },
    'GALP_B': { id: 'GALP_B', label: 'Galpão B (Acabados)', x: 620, y: 355, type: 'warehouse', layer: 'vehicle', tag: 'WH-B', desc: 'Estoque Paçoca Rolha, Quadrada e Zero' },
    'DOCAS':  { id: 'DOCAS',  label: 'Docas Expedição',    x: 790, y: 355, type: 'logistic', layer: 'vehicle', tag: 'DOCK-01', desc: 'Plataforma de Embarque e Saída Fiscal' }
  };

  // Malha de Dutos e Roscas de Transporte Pneumático: Arestas Dirigidas
  const FLUID_EDGES = [
    { id: 'e1', u: 'SILO-101', v: 'MAN-301',  weight: 15.0, valve: 'XV-301',  status: 'normal', desc: 'Alimentação de Amendoim' },
    { id: 'e2', u: 'SILO-102', v: 'MAN-301',  weight: 12.0, valve: 'XV-302',  status: 'normal', desc: 'Alimentação Açúcar e Sal' },
    { id: 'e3', u: 'MAN-301',  v: 'MOI-301A', weight: 8.0,  valve: 'XV-303A', status: 'normal', desc: 'Carga Moinho de Martelos A' },
    { id: 'e4', u: 'MAN-301',  v: 'MOI-301B', weight: 10.0, valve: 'XV-303B', status: 'normal', desc: 'Carga Moinho de Martelos B' },
    { id: 'e5', u: 'MOI-301A', v: 'HOM-301',  weight: 25.0, valve: 'XV-304A', status: 'normal', desc: 'Descarga Moinho A -> Misturador' },
    { id: 'e6', u: 'MOI-301B', v: 'HOM-301',  weight: 22.0, valve: 'XV-304B', status: 'normal', desc: 'Descarga Moinho B -> Misturador' },
    { id: 'e7', u: 'HOM-301',  v: 'PRN-401',  weight: 30.0, valve: 'XV-401',  status: 'normal', desc: 'Duto Direto para Prensa' },
    { id: 'e8', u: 'HOM-301',  v: 'MOE-302',  weight: 18.0, valve: 'XV-402',  status: 'normal', desc: 'Desvio para Moega Pulmão' },
    { id: 'e9', u: 'MOE-302',  v: 'PRN-401',  weight: 20.0, valve: 'XV-403',  status: 'normal', desc: 'Descarga Pulmão para Prensa' }
  ];

  // Corredores Logísticos para Veículos e Pista Magnética do AGV: Grafo Não-Dirigido
  const LOGISTIC_EDGES = [
    { id: 'lv1', u: 'PORT',   v: 'GALP_A',  weight: 45, type: 'road',     desc: 'Acesso Pátio -> Galpão A' },
    { id: 'lv2', u: 'GALP_A', v: 'MAN-301', weight: 35, type: 'transfer', desc: 'Abastecimento Interno Insumos' },
    { id: 'lv3', u: 'LAB',    v: 'SILO-101', weight: 30, type: 'agv',      desc: 'Pista AGV Amostragem Grãos' },
    { id: 'lv4', u: 'LAB',    v: 'HOM-301',  weight: 25, type: 'agv',      desc: 'Pista AGV Amostragem Massa' },
    { id: 'lv5', u: 'LAB',    v: 'PRN-401',  weight: 40, type: 'agv',      desc: 'Pista AGV Amostragem Produto' },
    { id: 'lv6', u: 'PRN-401', v: 'GALP_B',  weight: 30, type: 'conveyor', desc: 'Esteira de Ensaque e Caixas' },
    { id: 'lv7', u: 'GALP_B', v: 'DOCAS',   weight: 25, type: 'forklift', desc: 'Movimentação Porta-Paletes' },
    { id: 'lv8', u: 'GALP_A', v: 'GALP_B',  weight: 80, type: 'road',     desc: 'Corredor Central Fabril' },
    { id: 'lv9', u: 'DOCAS',  v: 'PORT',    weight: 95, type: 'ring-road', desc: 'Anel Viário de Retorno' }
  ];

  // DAG de Precedência Física e Transformação de Materiais (Aula 18)
  const MATERIAL_DAG = [
    { u: 'PORT',     v: 'GALP_A',   label: 'Descarga de Amendoim Bruto e Sacarose' },
    { u: 'GALP_A',   v: 'SILO-101', label: 'Alimentação dos Silos Desumidificados' },
    { u: 'SILO-101', v: 'MAN-301',  label: 'Pesagem Gravimétrica de Batelada' },
    { u: 'SILO-102', v: 'MAN-301',  label: 'Dosagem Proporcional de Açúcar e Sal' },
    { u: 'MAN-301',  v: 'HOM-301',  label: 'Moagem Micronizada e Homogeneização' },
    { u: 'HOM-301',  v: 'PRN-401',  label: 'Prensagem Rotativa de Paçoca' },
    { u: 'PRN-401',  v: 'GALP_B',   label: 'Envoltório Flow-Pack e Encaixotamento' },
    { u: 'GALP_B',   v: 'DOCAS',    label: 'Paletes Conformes para Expedição' }
  ];

  // -------------------------------------------------------------
  // 2. GERENCIADOR DE ESTADO DA SIMULAÇÃO
  // -------------------------------------------------------------

  const simState = {
    activeMode: 'dijkstra', // 'dijkstra', 'failover', 'leak', 'euler', 'agv', 'dag'
    sourceNode: 'SILO-101',
    targetNode: 'PRN-401',
    blockedEdgeId: null,
    blockedNodeId: null,
    activeRoute: [],
    highlightedEdges: [],
    visitedNodes: [],
    inspectionEdges: [],
    animTimer: null,
    agvIndex: 0,
    agvTour: [],
    valves: {
      'XV-301':  'CLOSED',
      'XV-302':  'CLOSED',
      'XV-303A': 'CLOSED',
      'XV-303B': 'CLOSED',
      'XV-304A': 'CLOSED',
      'XV-304B': 'CLOSED',
      'XV-401':  'CLOSED',
      'XV-402':  'CLOSED',
      'XV-403':  'CLOSED'
    }
  };

  // -------------------------------------------------------------
  // 3. MOTORES ALGORÍTMICOS
  // -------------------------------------------------------------

  /**
   * Algoritmo de Dijkstra para Caminho Mínimo em Dígrafo com Heap
   */
  function runDijkstra(sourceId, targetId, blockedEdge = null, blockedNode = null) {
    const t0 = performance.now();

    const dist = {};
    const prev = {};
    const unvisited = [];
    const visited = new Set();

    Object.keys(NODES).forEach(id => {
      dist[id] = Infinity;
      prev[id] = null;
      unvisited.push(id);
    });

    dist[sourceId] = 0;

    // Adjacência dirigida considerando bloqueios
    const adj = {};
    Object.keys(NODES).forEach(id => { adj[id] = []; });

    FLUID_EDGES.forEach(edge => {
      const isBlocked = (edge.id === blockedEdge) ||
                        (edge.status === 'blocked') ||
                        (edge.u === blockedNode) ||
                        (edge.v === blockedNode);

      const w = isBlocked ? Infinity : edge.weight;
      if (adj[edge.u]) {
        adj[edge.u].push({ v: edge.v, weight: w, edgeId: edge.id, valve: edge.valve });
      }
    });

    while (unvisited.length > 0) {
      unvisited.sort((a, b) => dist[a] - dist[b]);
      const u = unvisited.shift();

      if (dist[u] === Infinity) break;
      if (u === targetId) break;

      visited.add(u);

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        if (visited.has(edge.v) || edge.weight === Infinity) continue;
        const alt = dist[u] + edge.weight;
        if (alt < dist[edge.v]) {
          dist[edge.v] = alt;
          prev[edge.v] = { u, edgeId: edge.edgeId, valve: edge.valve };
        }
      }
    }

    const t1 = performance.now();
    const latencyMs = Math.max(0.012, Math.round((t1 - t0) * 1000) / 1000);

    const pathNodes = [];
    const pathEdges = [];
    let curr = targetId;
    if (dist[targetId] !== Infinity) {
      while (curr) {
        pathNodes.unshift(curr);
        const p = prev[curr];
        if (p) {
          pathEdges.unshift(p.edgeId);
          curr = p.u;
        } else {
          curr = null;
        }
      }
    }

    return {
      success: dist[targetId] !== Infinity,
      distance: dist[targetId],
      pathNodes,
      pathEdges,
      latencyMs
    };
  }

  /**
   * Algoritmo de Hierholzer para Inspeção de Integridade / Corrosão (Aula 16)
   */
  function runHierholzer() {
    const t0 = performance.now();

    const adj = {};
    const edgesList = [];

    FLUID_EDGES.forEach(e => {
      if (!adj[e.u]) adj[e.u] = [];
      if (!adj[e.v]) adj[e.v] = [];
      const edgeRef = { id: e.id, u: e.u, v: e.v, used: false };
      edgesList.push(edgeRef);
      adj[e.u].push(edgeRef);
      adj[e.v].push(edgeRef);
    });

    // Identificação de vértices com grau ímpar
    const oddNodes = [];
    for (const v in adj) {
      if (adj[v].length % 2 !== 0) {
        oddNodes.push(v);
      }
    }

    const start = oddNodes.length > 0 ? oddNodes[0] : 'SILO-101';
    const stack = [start];
    const circuit = [];
    const edgeSeq = [];

    while (stack.length > 0) {
      const u = stack[stack.length - 1];
      const nextEdge = (adj[u] || []).find(e => !e.used);
      if (nextEdge) {
        nextEdge.used = true;
        const nextV = (nextEdge.u === u) ? nextEdge.v : nextEdge.u;
        stack.push(nextV);
        edgeSeq.push(nextEdge.id);
      } else {
        circuit.push(stack.pop());
      }
    }

    circuit.reverse();
    const t1 = performance.now();

    return {
      circuit,
      edgeSequence: edgeSeq,
      isPerfect: oddNodes.length === 0,
      oddNodes,
      latencyMs: Math.max(0.015, Math.round((t1 - t0) * 1000) / 1000)
    };
  }

  /**
   * Algoritmo TSP para o AGV de Amostragem de Qualidade: Nearest Neighbor + 2-Opt (Aula 17)
   */
  function runTSP() {
    const t0 = performance.now();
    const samplePoints = ['LAB', 'SILO-101', 'SILO-102', 'MAN-301', 'HOM-301', 'PRN-401'];
    const n = samplePoints.length;

    // Matriz de distâncias euclidianas aproximadas na planta
    const distM = {};
    samplePoints.forEach(u => {
      distM[u] = {};
      samplePoints.forEach(v => {
        if (u === v) {
          distM[u][v] = 0;
        } else {
          const p1 = NODES[u];
          const p2 = NODES[v];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          distM[u][v] = Math.round(Math.sqrt(dx * dx + dy * dy) * 0.45);
        }
      });
    });

    // 1. Heurística Construtiva: Vizinho Mais Próximo
    const visited = new Set();
    let curr = samplePoints[0];
    const nnTour = [curr];
    visited.add(curr);

    while (visited.size < n) {
      let nearest = null;
      let minD = Infinity;
      samplePoints.forEach(cand => {
        if (!visited.has(cand)) {
          const d = distM[curr][cand];
          if (d < minD) {
            minD = d;
            nearest = cand;
          }
        }
      });
      if (nearest) {
        nnTour.push(nearest);
        visited.add(nearest);
        curr = nearest;
      }
    }
    nnTour.push(nnTour[0]); // Retorno ao laboratório

    function tourDistance(tour) {
      let tot = 0;
      for (let i = 0; i < tour.length - 1; i++) {
        tot += distM[tour[i]][tour[i + 1]];
      }
      return tot;
    }

    const initialCost = tourDistance(nnTour);

    // 2. Busca Local de Refinamento: 2-Opt
    let bestTour = [...nnTour];
    let improved = true;
    let iter = 0;

    while (improved && iter < 50) {
      improved = false;
      iter++;
      for (let i = 1; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          const candidateTour = [
            ...bestTour.slice(0, i),
            ...bestTour.slice(i, j + 1).reverse(),
            ...bestTour.slice(j + 1)
          ];
          const cost = tourDistance(candidateTour);
          if (cost < tourDistance(bestTour)) {
            bestTour = candidateTour;
            improved = true;
          }
        }
      }
    }

    const optimizedCost = tourDistance(bestTour);
    const t1 = performance.now();

    return {
      initialTour: nnTour,
      initialCost,
      optimizedTour: bestTour,
      optimizedCost,
      iterations: iter,
      latencyMs: Math.max(0.025, Math.round((t1 - t0) * 1000) / 1000)
    };
  }

  /**
   * Algoritmo de Kahn para Ordenação Topológica de DAG de Produção (Aula 18)
   */
  function runDAGValidation() {
    const t0 = performance.now();

    const inDegree = {};
    const adj = {};
    const allNodes = new Set();

    MATERIAL_DAG.forEach(edge => {
      allNodes.add(edge.u);
      allNodes.add(edge.v);
      if (!adj[edge.u]) adj[edge.u] = [];
      adj[edge.u].push(edge.v);
      inDegree[edge.u] = inDegree[edge.u] || 0;
      inDegree[edge.v] = (inDegree[edge.v] || 0) + 1;
    });

    const queue = [];
    allNodes.forEach(node => {
      if ((inDegree[node] || 0) === 0) {
        queue.push(node);
      }
    });

    const topoOrder = [];
    while (queue.length > 0) {
      const u = queue.shift();
      topoOrder.push(u);

      const neighbors = adj[u] || [];
      for (const v of neighbors) {
        inDegree[v]--;
        if (inDegree[v] === 0) {
          queue.push(v);
        }
      }
    }

    const isDAG = topoOrder.length === allNodes.size;
    const t1 = performance.now();

    return {
      isDAG,
      totalNodes: allNodes.size,
      order: topoOrder,
      latencyMs: Math.max(0.010, Math.round((t1 - t0) * 1000) / 1000)
    };
  }

  // -------------------------------------------------------------
  // 4. RENDERIZAÇÃO GRÁFICA EM SVG SINÓTICO
  // -------------------------------------------------------------

  function renderSynoptic() {
    const svg = document.getElementById('scada-graph-svg');
    if (!svg) return;

    svg.innerHTML = '';

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38bdf8" />
      </marker>
      <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
      </marker>
      <marker id="arrow-fail" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#ef4444" />
      </marker>
      <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    `;
    svg.appendChild(defs);

    // 1. Desenhar Corredores Logísticos e Pista de AGV (Linhas tracejadas no fundo)
    LOGISTIC_EDGES.forEach(le => {
      const u = NODES[le.u];
      const v = NODES[le.v];
      if (!u || !v) return;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      path.setAttribute('x1', u.x);
      path.setAttribute('y1', u.y);
      path.setAttribute('x2', v.x);
      path.setAttribute('y2', v.y);
      path.setAttribute('stroke', '#1e293b');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-dasharray', le.type === 'agv' ? '4 4' : '6 3');
      svg.appendChild(path);
    });

    // 2. Desenhar Tubulações e Roscas de Transporte de Processo
    FLUID_EDGES.forEach(fe => {
      const u = NODES[fe.u];
      const v = NODES[fe.v];
      if (!u || !v) return;

      const isActive = simState.highlightedEdges.includes(fe.id);
      const isBlocked = (fe.id === simState.blockedEdgeId) || (fe.status === 'blocked');

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => toggleEdgeBlock(fe.id));

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', u.x);
      line.setAttribute('y1', u.y);
      line.setAttribute('x2', v.x);
      line.setAttribute('y2', v.y);

      let strokeColor = '#334155';
      let strokeWidth = '3';
      let marker = 'url(#arrow)';

      if (isBlocked) {
        strokeColor = '#ef4444';
        strokeWidth = '4';
        marker = 'url(#arrow-fail)';
      } else if (isActive) {
        strokeColor = '#10b981';
        strokeWidth = '5';
        marker = 'url(#arrow-active)';
        line.setAttribute('filter', 'url(#glow-teal)');
      }

      line.setAttribute('stroke', strokeColor);
      line.setAttribute('stroke-width', strokeWidth);
      line.setAttribute('marker-end', marker);
      g.appendChild(line);

      // Rótulo da Válvula / Tag ISA-5.1
      const mx = (u.x + v.x) / 2;
      const my = (u.y + v.y) / 2 - 8;

      const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      textBg.setAttribute('x', mx - 28);
      textBg.setAttribute('y', my - 8);
      textBg.setAttribute('width', '56');
      textBg.setAttribute('height', '14');
      textBg.setAttribute('rx', '3');
      textBg.setAttribute('fill', isBlocked ? '#450a0a' : (isActive ? '#064e3b' : '#0f172a'));
      textBg.setAttribute('stroke', isBlocked ? '#ef4444' : (isActive ? '#10b981' : '#334155'));
      textBg.setAttribute('stroke-width', '1');
      g.appendChild(textBg);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', mx);
      label.setAttribute('y', my + 3);
      label.setAttribute('fill', isBlocked ? '#fca5a5' : (isActive ? '#6ee7b7' : '#94a3b8'));
      label.setAttribute('font-size', '8px');
      label.setAttribute('font-family', 'JetBrains Mono, monospace');
      label.setAttribute('text-anchor', 'middle');
      label.textContent = `${fe.valve} (${fe.weight}m)`;
      g.appendChild(label);

      svg.appendChild(g);
    });

    // 3. Desenhar Nós (Equipamentos, Tanques e Galpões)
    Object.values(NODES).forEach(node => {
      const isRoute = simState.activeRoute.includes(node.id);
      const isBlocked = (node.id === simState.blockedNodeId);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => handleNodeClick(node.id));

      let fillColor = '#0f172a';
      let strokeColor = '#38bdf8';
      let icon = '⚙️';

      if (node.type === 'silo') { icon = '🌾'; strokeColor = '#f59e0b'; }
      else if (node.type === 'mill') { icon = '⚙️'; strokeColor = '#ec4899'; }
      else if (node.type === 'mixer') { icon = '🥣'; strokeColor = '#8b5cf6'; }
      else if (node.type === 'press') { icon = '📦'; strokeColor = '#10b981'; }
      else if (node.type === 'buffer') { icon = '⏳'; strokeColor = '#06b6d4'; }
      else if (node.type === 'warehouse') { icon = '🏭'; strokeColor = '#eab308'; }
      else if (node.type === 'lab') { icon = '🔬'; strokeColor = '#a855f7'; }
      else if (node.type === 'logistic') { icon = '🚛'; strokeColor = '#64748b'; }

      if (isBlocked) {
        fillColor = '#450a0a';
        strokeColor = '#ef4444';
      } else if (isRoute) {
        fillColor = '#064e3b';
        strokeColor = '#34d399';
      }

      // Caixa do Equipamento
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const w = 90;
      const h = 42;
      rect.setAttribute('x', node.x - w / 2);
      rect.setAttribute('y', node.y - h / 2);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', fillColor);
      rect.setAttribute('stroke', strokeColor);
      rect.setAttribute('stroke-width', isRoute ? '3' : '1.5');
      if (isRoute) rect.setAttribute('filter', 'url(#glow-teal)');
      g.appendChild(rect);

      // Ícone + Rótulo do Equipamento
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x);
      text.setAttribute('y', node.y - 2);
      text.setAttribute('fill', '#f8fafc');
      text.setAttribute('font-size', '9px');
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('font-family', 'Inter, sans-serif');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = `${icon} ${node.id}`;
      g.appendChild(text);

      // Subtítulo do Nó
      const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sub.setAttribute('x', node.x);
      sub.setAttribute('y', node.y + 11);
      sub.setAttribute('fill', isRoute ? '#6ee7b7' : '#94a3b8');
      sub.setAttribute('font-size', '7.5px');
      sub.setAttribute('font-family', 'JetBrains Mono, monospace');
      sub.setAttribute('text-anchor', 'middle');
      sub.textContent = node.tag;
      g.appendChild(sub);

      svg.appendChild(g);
    });

    // 4. Desenhar Marcador Dinâmico do AGV caso em Rota
    if (simState.activeMode === 'agv' && simState.agvTour.length > 0) {
      const currNodeId = simState.agvTour[simState.agvIndex % simState.agvTour.length];
      const agvNode = NODES[currNodeId];
      if (agvNode) {
        const agvMarker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        agvMarker.setAttribute('cx', agvNode.x);
        agvMarker.setAttribute('cy', agvNode.y + 26);
        agvMarker.setAttribute('r', '8');
        agvMarker.setAttribute('fill', '#f59e0b');
        agvMarker.setAttribute('stroke', '#ffffff');
        agvMarker.setAttribute('stroke-width', '2');
        svg.appendChild(agvMarker);

        const agvText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        agvText.setAttribute('x', agvNode.x);
        agvText.setAttribute('y', agvNode.y + 29);
        agvText.setAttribute('fill', '#000000');
        agvText.setAttribute('font-size', '7px');
        agvText.setAttribute('font-weight', 'bold');
        agvText.setAttribute('text-anchor', 'middle');
        agvText.textContent = 'AGV';
        svg.appendChild(agvText);
      }
    }
  }

  // -------------------------------------------------------------
  // 5. ATUALIZAÇÃO DO PAINEL DE VÁLVULAS SOLENOIDES ISA-5.1
  // -------------------------------------------------------------

  function updateValvesDisplay() {
    const container = document.getElementById('scada-valves-display');
    if (!container) return;

    container.innerHTML = '';
    Object.entries(simState.valves).forEach(([valve, state]) => {
      const badge = document.createElement('div');
      badge.style.display = 'inline-flex';
      badge.style.alignItems = 'center';
      badge.style.padding = '2px 7px';
      badge.style.borderRadius = '4px';
      badge.style.fontSize = '0.72rem';
      badge.style.fontFamily = 'var(--font-mono)';
      badge.style.fontWeight = 'bold';
      badge.style.border = '1px solid';

      if (state === 'OPEN') {
        badge.style.background = 'rgba(16, 185, 129, 0.15)';
        badge.style.borderColor = '#10b981';
        badge.style.color = '#34d399';
        badge.textContent = `🟢 ${valve}: ABERTA`;
      } else if (state === 'TRIPPED') {
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.borderColor = '#ef4444';
        badge.style.color = '#fca5a5';
        badge.textContent = `🚨 ${valve}: BLOQ`;
      } else {
        badge.style.background = 'rgba(100, 116, 139, 0.1)';
        badge.style.borderColor = '#334155';
        badge.style.color = '#64748b';
        badge.textContent = `⚪ ${valve}: FECHADA`;
      }

      container.appendChild(badge);
    });
  }

  function setValvesForEdges(activeEdgeIds) {
    Object.keys(simState.valves).forEach(v => {
      simState.valves[v] = 'CLOSED';
    });

    if (simState.blockedEdgeId) {
      const blockedEdge = FLUID_EDGES.find(e => e.id === simState.blockedEdgeId);
      if (blockedEdge) {
        simState.valves[blockedEdge.valve] = 'TRIPPED';
      }
    }

    activeEdgeIds.forEach(id => {
      const edge = FLUID_EDGES.find(e => e.id === id);
      if (edge && simState.valves[edge.valve] !== 'TRIPPED') {
        simState.valves[edge.valve] = 'OPEN';
      }
    });

    updateValvesDisplay();
  }

  // -------------------------------------------------------------
  // 6. LOGGER HISTORIAN & STATUS
  // -------------------------------------------------------------

  function logEvent(msg, type = 'info') {
    const consoleEl = document.getElementById('scada-console-log');
    if (!consoleEl) return;

    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${time}] ${msg}`;
    consoleEl.appendChild(entry);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function setBanner(text, type = 'info') {
    const banner = document.getElementById('scada-status-banner');
    if (!banner) return;

    banner.className = `callout callout-${type}`;
    banner.textContent = text;
  }

  // -------------------------------------------------------------
  // 7. CENÁRIOS OPERACIONAIS DIDÁTICOS
  // -------------------------------------------------------------

  function applyScenarioNominal() {
    clearInterval(simState.animTimer);
    simState.activeMode = 'dijkstra';
    simState.blockedEdgeId = null;
    simState.blockedNodeId = null;

    const res = runDijkstra('SILO-101', 'PRN-401');
    simState.activeRoute = res.pathNodes;
    simState.highlightedEdges = res.pathEdges;

    setValvesForEdges(res.pathEdges);
    renderSynoptic();

    document.getElementById('kpi-distance').textContent = `${res.distance.toFixed(1)} m`;
    document.getElementById('kpi-latency').textContent = `${res.latencyMs.toFixed(3)} ms`;
    document.getElementById('kpi-route').textContent = res.pathNodes.join(' ➔ ');

    setBanner('🟢 CENÁRIO 1 ATIVO: Operação Nominal Ótima (Amendoim ➔ Manifold ➔ Moinho B ➔ Homogeneizador ➔ Prensa: 77.0m).', 'success');
    logEvent(`[DIJKSTRA] Rota nominal ativada: ${res.pathNodes.join(' -> ')} | Distância: ${res.distance}m | Latência: ${res.latencyMs}ms`, 'success');
  }

  function applyScenarioFailoverMill() {
    clearInterval(simState.animTimer);
    simState.activeMode = 'failover';
    simState.blockedNodeId = 'MOI-301B';
    simState.blockedEdgeId = null;

    const res = runDijkstra('SILO-101', 'PRN-401', null, 'MOI-301B');
    simState.activeRoute = res.pathNodes;
    simState.highlightedEdges = res.pathEdges;

    setValvesForEdges(res.pathEdges);
    renderSynoptic();

    document.getElementById('kpi-distance').textContent = `${res.distance.toFixed(1)} m`;
    document.getElementById('kpi-latency').textContent = `${res.latencyMs.toFixed(3)} ms`;
    document.getElementById('kpi-route').textContent = res.pathNodes.join(' ➔ ');

    setBanner('⚡ CENÁRIO 2 ATIVO: Sobrecarga Térmica no Moinho B (MOI-301B). Failover automático comutou fluxo para Moinho A (MOI-301A: 78.0m).', 'warning');
    logEvent(`[INTERTRAVAMENTO] Moinho B bloqueado por desarme térmico. Rota recalculada via Moinho A em ${res.latencyMs}ms.`, 'warning');
  }

  function applyScenarioDirectPipeJam() {
    clearInterval(simState.animTimer);
    simState.activeMode = 'leak';
    simState.blockedEdgeId = 'e7'; // HOM-301 -> PRN-401
    simState.blockedNodeId = null;

    const res = runDijkstra('SILO-101', 'PRN-401', 'e7');
    simState.activeRoute = res.pathNodes;
    simState.highlightedEdges = res.pathEdges;

    setValvesForEdges(res.pathEdges);
    renderSynoptic();

    document.getElementById('kpi-distance').textContent = `${res.distance.toFixed(1)} m`;
    document.getElementById('kpi-latency').textContent = `${res.latencyMs.toFixed(3)} ms`;
    document.getElementById('kpi-route').textContent = res.pathNodes.join(' ➔ ');

    setBanner('🚨 CENÁRIO 3 ATIVO: Obstrução mecânica no Duto Direto XV-401. Válvula isolada (W=∞). Desvio autônomo ativado via Moega Pulmão MOE-302 (85.0m).', 'danger');
    logEvent(`[SIS IEC 61511] Falha de duto direto detectada. Punição W(HOM, PRN)=∞. Bypass ativo por MOE-302 em ${res.latencyMs}ms.`, 'danger');
  }

  function applyScenarioAGVQualityTour() {
    clearInterval(simState.animTimer);
    simState.activeMode = 'agv';
    simState.blockedEdgeId = null;
    simState.blockedNodeId = null;

    const tsp = runTSP();
    simState.agvTour = tsp.optimizedTour;
    simState.activeRoute = tsp.optimizedTour;
    simState.highlightedEdges = [];
    simState.agvIndex = 0;

    renderSynoptic();

    document.getElementById('kpi-distance').textContent = `${tsp.optimizedCost} m (NN: ${tsp.initialCost}m)`;
    document.getElementById('kpi-latency').textContent = `${tsp.latencyMs.toFixed(3)} ms`;
    document.getElementById('kpi-route').textContent = tsp.optimizedTour.join(' ➔ ');

    setBanner(`🚜 CENÁRIO 4 ATIVO: Roteamento do AGV de Qualidade (TSP). Heurística 2-Opt reduziu percurso de ${tsp.initialCost}m para ${tsp.optimizedCost}m (${tsp.iterations} iterações).`, 'info');
    logEvent(`[AGV TSP] Ciclo Hamiltoniano otimizado gerado em ${tsp.latencyMs}ms: ${tsp.optimizedTour.join(' -> ')}`, 'info');

    // Animar deslocamento do AGV entre pontos de coleta
    simState.animTimer = setInterval(() => {
      simState.agvIndex++;
      renderSynoptic();
      const currStation = simState.agvTour[simState.agvIndex % simState.agvTour.length];
      logEvent(`[AGV TELEMETRIA] AGV atracado na estação: ${currStation} para coleta de alíquota.`, 'info');
    }, 1800);
  }

  function applyScenarioHierholzerInspection() {
    clearInterval(simState.animTimer);
    simState.activeMode = 'euler';
    simState.blockedEdgeId = null;
    simState.blockedNodeId = null;

    const res = runHierholzer();
    simState.activeRoute = res.circuit;
    simState.highlightedEdges = res.edgeSequence;

    renderSynoptic();

    document.getElementById('kpi-distance').textContent = `${res.edgeSequence.length} trechos inspecionados`;
    document.getElementById('kpi-latency').textContent = `${res.latencyMs.toFixed(3)} ms`;
    document.getElementById('kpi-route').textContent = res.circuit.join(' ➔ ');

    setBanner('🔍 CENÁRIO 5 ATIVO: Varredura de Corrosão e Integridade via Circuito Euleriano (Algoritmo de Hierholzer percorre 100% dos dutos sem repetição).', 'info');
    logEvent(`[HIERHOLZER] Malha de tubulações inspecionada em tempo O(|E|). Rota: ${res.circuit.join(' -> ')}`, 'info');
  }

  function applyScenarioDAGValidation() {
    clearInterval(simState.animTimer);
    simState.activeMode = 'dag';
    simState.blockedEdgeId = null;
    simState.blockedNodeId = null;

    const res = runDAGValidation();
    simState.activeRoute = res.order;
    simState.highlightedEdges = [];

    renderSynoptic();

    document.getElementById('kpi-distance').textContent = `${res.totalNodes} estágios ordenados`;
    document.getElementById('kpi-latency').textContent = `${res.latencyMs.toFixed(3)} ms`;
    document.getElementById('kpi-route').textContent = res.order.join(' ➔ ');

    setBanner('📦 CENÁRIO 6 ATIVO: Validação de Sequenciamento de Bateladas em Grafo Acíclico Dirigido (DAG via Algoritmo de Kahn - Sem ciclos irreversíveis).', 'success');
    logEvent(`[KAHN DAG] Auditoria de produção confirmada: ordenação topológica [${res.order.join(' -> ')}] computada em ${res.latencyMs}ms.`, 'success');
  }

  function toggleEdgeBlock(edgeId) {
    if (simState.blockedEdgeId === edgeId) {
      simState.blockedEdgeId = null;
      logEvent(`[MANOBRA] Duto ${edgeId} desobstruído manualmente pelo operador.`, 'info');
    } else {
      simState.blockedEdgeId = edgeId;
      logEvent(`[MANOBRA] Duto ${edgeId} bloqueado manualmente para simulação de falha.`, 'warning');
    }

    const res = runDijkstra(simState.sourceNode, simState.targetNode, simState.blockedEdgeId, simState.blockedNodeId);
    simState.activeRoute = res.pathNodes;
    simState.highlightedEdges = res.pathEdges;

    setValvesForEdges(res.pathEdges);
    renderSynoptic();

    document.getElementById('kpi-distance').textContent = res.success ? `${res.distance.toFixed(1)} m` : 'SEM ROTA';
    document.getElementById('kpi-latency').textContent = `${res.latencyMs.toFixed(3)} ms`;
    document.getElementById('kpi-route').textContent = res.success ? res.pathNodes.join(' ➔ ') : 'BLOQUEIO TOTAL';
  }

  function handleNodeClick(nodeId) {
    logEvent(`[TELEMETRIA NÓ] Selecionado nó ${nodeId}: ${NODES[nodeId].desc} (${NODES[nodeId].tag})`, 'info');
  }

  // -------------------------------------------------------------
  // 8. BINDING DE CONTROLES E INICIALIZAÇÃO
  // -------------------------------------------------------------

  function bindUI() {
    const btnNominal = document.getElementById('preset-g2-nominal');
    const btnLeak = document.getElementById('preset-g2-leak');
    const btnPump = document.getElementById('preset-g2-pump-fail');
    const btnAgv = document.getElementById('preset-g2-agv');
    const btnEuler = document.getElementById('preset-g2-euler');

    const btnRunDijkstra = document.getElementById('btn-run-dijkstra');
    const btnInjectLeak = document.getElementById('btn-inject-leak');
    const btnTSP = document.getElementById('btn-tsp');
    const btnHierholzer = document.getElementById('btn-hierholzer');
    const btnDAG = document.getElementById('btn-dag');
    const btnReset = document.getElementById('btn-reset-sim');

    if (btnNominal) btnNominal.addEventListener('click', applyScenarioNominal);
    if (btnLeak) btnLeak.addEventListener('click', applyScenarioDirectPipeJam);
    if (btnPump) btnPump.addEventListener('click', applyScenarioFailoverMill);
    if (btnAgv) btnAgv.addEventListener('click', applyScenarioAGVQualityTour);
    if (btnEuler) btnEuler.addEventListener('click', applyScenarioHierholzerInspection);

    if (btnRunDijkstra) btnRunDijkstra.addEventListener('click', applyScenarioNominal);
    if (btnInjectLeak) btnInjectLeak.addEventListener('click', applyScenarioDirectPipeJam);
    if (btnTSP) btnTSP.addEventListener('click', applyScenarioAGVQualityTour);
    if (btnHierholzer) btnHierholzer.addEventListener('click', applyScenarioHierholzerInspection);
    if (btnDAG) btnDAG.addEventListener('click', applyScenarioDAGValidation);
    if (btnReset) btnReset.addEventListener('click', applyScenarioNominal);
  }

  // Inicialização quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bindUI();
      applyScenarioNominal();
    });
  } else {
    bindUI();
    applyScenarioNominal();
  }

})();
