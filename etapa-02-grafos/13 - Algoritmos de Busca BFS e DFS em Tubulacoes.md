# Aula 13: Algoritmos de Busca (BFS e DFS) em Redes de Transporte da Fábrica de Paçoca

**Disciplina:** ECAA08 — Automática (2026.2) — UNIFEI  
**Projeto:** SCADA-Core Automática / Linha de Produção de Paçoca  
**Equipe:** Grupo 7  
**Perfil:** Engenharia de Controle e Automação (Matemática Discreta & Teoria dos Grafos)  

---

## 1. Fundamentos Matemáticos: Travessia em Grafos Industriais

Na automação de processos agroindustriais de sólidos a granel e transporte pneumático, a busca em grafos permite determinar trajetórias físicas viáveis entre pontos de estocagem de matéria-prima (silos) e os estágios finais de homogeneização e prensagem.

1. **Busca em Largura (BFS — *Breadth-First Search*):** Utiliza fila FIFO (*First-In, First-Out*). Determina a rota com o **menor número de arestas/válvulas de bloqueio** em complexidade de tempo $O(|V| + |E|)$. Na engenharia de automação, minimizar o número de válvulas a comutar reduz o risco operacional de emperramento de atuadores e a latência de pressurização pneumática.
2. **Busca em Profundidade (DFS — *Depth-First Search*):** Utiliza pilha LIFO (*Last-In, First-Out*) ou recursão. Permite detectar ciclos de reciclo e enumerar **todas as rotas alternativas de contingência** para subsidiar planos de desvio automático no SCADA.

```mermaid
graph LR
    SILO101["SILO-101 (Amendoim)"] -->|XV-301| MAN301["MAN-301 (Dosagem)"]
    SILO102["SILO-102 (Açúcar/Sal)"] -->|XV-302| MAN301
    MAN301 -->|XV-303A| MOI301A["MOI-301A (Moinho A)"]
    MAN301 -->|XV-303B| MOI301B["MOI-301B (Moinho B)"]
    MOI301A -->|XV-304A| HOM301["HOM-301 (Homogeneizador)"]
    MOI301B -->|XV-304B| HOM301
    HOM301 -->|XV-401 (Direto)| PRN401["PRN-401 (Prensa)"]
    HOM301 -->|XV-402| MOE302["MOE-302 (Moega Pulmão)"]
    MOE302 -->|XV-403| PRN401
```

---

## 2. Aprofundamento Teórico

### 2.1. Busca em Largura (BFS) — Definição Formal e Invariante

O algoritmo BFS explora o grafo **por camadas concêntricas de distância topológica**: a partir de um vértice de partida $s \in V$ (por exemplo, `SILO-101_Amendoim`), visita primeiro todos os nós a distância de $1$ aresta, em seguida todos os nós a distância de $2$ arestas, e assim sucessivamente.

Formalmente, seja $d(s, v)$ a distância mínima (medida em número de arestas/válvulas) entre a origem $s$ e o nó $v$. Durante a execução do BFS com uma fila FIFO $Q$, a seguinte propriedade invariante é rigorosamente mantida:

$$\text{Se o nó } v \text{ é desenfileirado antes do nó } u, \text{ então } d(s, v) \leq d(s, u).$$

Essa invariante garante que **o primeiro caminho descoberto até qualquer equipamento destino é estritamente o de menor número de arestas**. Na operação da linha de produção de paçoca, esse critério seleciona a rota que exige o menor número de acionamentos de válvulas borboleta/guilhotina pneumáticas ($XV$), minimizando o risco de falha mecânica de abertura em partida a frio.

**Complexidade Computacional:**
* **Tempo:** $O(|V| + |E|)$, pois cada equipamento é enfileirado no máximo uma vez ($O(|V|)$) e cada duto de transporte é inspecionado uma única vez ($O(|E|)$).
* **Espaço:** $O(|V|)$ no pior caso (armazenamento da fila $Q$ e do conjunto de visitados).

---

### 2.2. Busca em Profundidade (DFS) e Classificação de Arestas

O algoritmo DFS explora cada ramal da linha de transporte até o ponto mais profundo antes de executar o retrocesso (*backtracking*). Em um dígrafo de processo $G=(V, E)$, a travessia DFS classifica cada duto em uma de quatro categorias topológicas:

| Tipo de Aresta | Definição Topológica | Interpretação no Processo de Paçoca |
| :--- | :--- | :--- |
| **Aresta de Árvore** (*Tree Edge*) | Aponta para um equipamento ainda não descoberto. | Trecho principal da rota produtiva explorada. |
| **Aresta de Retorno** (*Back Edge*) | Aponta para um nó ancestral na árvore de busca. | Indica a existência de um **ciclo** (ex: retorno de massa não conforme). |
| **Aresta de Avanço** (*Forward Edge*) | Aponta para um nó descendente já finalizado. | Atalho direto entre etapas não adjacentes (by-pass). |
| **Aresta de Cruzamento** (*Cross Edge*) | Aponta para um nó em outro ramo da árvore. | Interconexão entre linhas paralelas (ex: entre ramos de moinhos redundantes). |

A detecção de **arestas de retorno** é o critério formal para provar se a malha de dutos contém laços fechados. Na malha nominal modelada na Aula 11, a ausência de arestas de retorno prova que a rede de transporte é um **Grafo Acíclico Dirigido (DAG)**, assegurando escoamento unidirecional contínuo da matéria-prima até a prensa.

---

### 2.3. Comparativo de Engenharia: BFS vs. DFS

| Critério Operacional | Busca em Largura (BFS) | Busca em Profundidade (DFS) |
| :--- | :--- | :--- |
| **Garantia de Caminho Mínimo** | Sim (em número de válvulas/arestas). | Não (depende da ordem de expansão). |
| **Consumo de Memória** | Proporcional à largura máxima do nível ($O(\|V\|)$). | Proporcional à profundidade máxima ($O(h)$). |
| **Enumeração de Contingências** | Ineficiente para listar todas as rotas. | **Excelente:** lista todas as alternativas viáveis via *backtracking*. |
| **Detecção de Ciclos de Processo** | Indireta. | Direta e formal via arestas de retorno. |
| **Aplicação Típica no SCADA** | Partida rápida com mínimo de comutações de válvulas pneumáticas. | Engenharia de confiabilidade: mapeamento de todas as rotas de contingência da fábrica. |

---

### 2.4. Bloqueio Dinâmico de Vértices para Simulação de Falha

Na classe `NavegadorGrafos`, os métodos aceitam um conjunto de `nos_bloqueados` ($V_{\text{bloq}} \subset V$). Quando um equipamento entra em estado de falha (por exemplo, sobretemperatura no motor do Moinho A `MOI-301A` detectada pelo CLP 03), o SCADA injeta esse nó no conjunto de bloqueios.

Durante a exploração dos vizinhos:
$$\text{Se } v \in V_{\text{bloq}}, \quad \text{o duto } (u, v) \text{ é ignorado na busca}.$$

Essa estratégia preserva a complexidade assintótica linear $O(|V| + |E|)$ (com tempo $O(1)$ para consulta de pertinência em tabela hash `set`), permitindo reconfigurar a malha produtiva em frações de milissegundo.

---

## 3. Exemplo Resolvido

**Pergunta de Engenharia:**  
Por que a BFS iniciada em `SILO-101_Amendoim` com destino a `PRN-401_Prensa` seleciona a rota direta via Homogeneizador (`HOM-301_Massa -> PRN-401_Prensa`, 4 arestas), em vez da rota que passa pela Moega Pulmão (`HOM-301_Massa -> MOE-302_Pulmao -> PRN-401_Prensa`, 5 arestas)?

**Resolução Formal:**
1. A partir de `SILO-101_Amendoim` (camada $0$), o BFS visita `MAN-301_Dosagem` (camada $1$).
2. A partir de `MAN-301_Dosagem`, expande os moinhos paralelos `MOI-301A` e `MOI-301B` (camada $2$).
3. A partir dos moinhos, ambos convergem para `HOM-301_Massa` (camada $3$).
4. A partir de `HOM-301_Massa`, os vizinhos são `PRN-401_Prensa` e `MOE-302_Pulmao` (ambos na camada $4$).
5. Ao encontrar `PRN-401_Prensa` na camada $4$, o BFS encerra imediatamente a busca com o caminho de comprimento $4$:
   $$\text{SILO-101\_Amendoim} \xrightarrow{XV\text{-}301} \text{MAN-301} \xrightarrow{XV\text{-}303A} \text{MOI-301A} \xrightarrow{XV\text{-}304A} \text{HOM-301} \xrightarrow{XV\text{-}401} \text{PRN-401}$$
6. A rota passando pela moega pulmão exige transitar por `MOE-302_Pulmao` (camada $4$) e somente atinge `PRN-401_Prensa` na camada $5$ ($5$ arestas/válvulas).

**Conclusão de Operação:** A BFS minimizou as transições de válvulas ($4$ contra $5$), reduzindo o número de atuadores submetidos a desgaste mecânico durante a transferência de batelada.

---

## 4. Atividades de Investigação

1. **Rastreamento Manual:** Execute passo a passo o algoritmo BFS partindo do `SILO-102_Acucar` até `PRN-401_Prensa`. Indique a camada topológica de cada nó e o caminho mínimo em número de válvulas retornado.
2. **Enumeração via DFS:** Utilizando a árvore DFS, enumere formalmente os $4$ caminhos possíveis entre `SILO-101_Amendoim` e `PRN-401_Prensa`. Calcule o número de válvulas de cada alternativa.
3. **Simulação de Falha Simultânea:** Bloqueie simultaneamente o Moinho A (`MOI-301A`) e a Moega Pulmão (`MOE-302_Pulmao`). Execute o BFS a partir de `SILO-101_Amendoim` até `PRN-401_Prensa`. O sistema ainda encontra rota viável? Qual é o caminho resultante?
4. **Análise de Intertravamento Total:** Bloqueie ambos os moinhos (`MOI-301A` e `MOI-301B`). Qual é o retorno do BFS e qual ação de segurança de processo (Interlock) o CLP 03 deve acionar na fábrica?

---

## 5. Entregável da Aula 13

* **Módulo de Navegação Topológica em Python:** Implementação da classe `NavegadorGrafos` contendo os métodos `bfs_menor_numero_valvulas` e `dfs_todos_os_caminhos` com suporte a isolamento dinâmico de falhas (`nos_bloqueados`), validado no Jupyter Notebook complementar.
