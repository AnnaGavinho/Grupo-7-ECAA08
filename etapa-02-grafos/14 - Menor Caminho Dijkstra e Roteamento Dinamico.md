# Aula 14: Menor Caminho — Algoritmo de Dijkstra e Roteamento Dinâmico na Linha de Paçoca

**Disciplina:** ECAA08 — Automática (2026.2) — UNIFEI  
**Projeto:** SCADA-Core Automática / Linha de Produção de Paçoca  
**Equipe:** Grupo 7  
**Perfil:** Engenharia de Controle e Automação (Matemática Discreta & Teoria dos Grafos)  

---

## 1. Fundamentos Matemáticos: Otimização de Trajetórias por Dijkstra

Dado o dígrafo ponderado e dirigido da planta de paçoca $G = (V, E, W)$, onde $W: E \rightarrow \mathbb{R}^+$ associa a cada duto de transporte pneumático ou rosca transportadora seu comprimento físico real $L \text{ [m]}$ (ou perda de carga equivalente $\Delta P$), o **Algoritmo de Dijkstra** calcula o trajeto de custo mínimo entre uma fonte de insumos $s \in V$ e todos os equipamentos $v \in V$ em tempo:

$$O((|V| + |E|) \log |V|)$$

utilizando uma fila de prioridade baseada em Min-Heap binário.

```mermaid
graph LR
    SILO101["SILO-101 (Amendoim)"] -->|15.0m| MAN301["MAN-301 (Dosagem)"]
    SILO102["SILO-102 (Açúcar/Sal)"] -->|12.0m| MAN301
    MAN301 -->|8.0m| MOI301A["MOI-301A (Moinho A)"]
    MAN301 -->|10.0m| MOI301B["MOI-301B (Moinho B)"]
    MOI301A -->|25.0m| HOM301["HOM-301 (Homogeneizador)"]
    MOI301B -->|22.0m| HOM301
    HOM301 -->|30.0m (Direto)| PRN401["PRN-401 (Prensa)"]
    HOM301 -->|18.0m| MOE302["MOE-302 (Moega Pulmão)"]
    MOE302 -->|20.0m| PRN401
```

---

## 2. Aprofundamento Teórico

### 2.1. O Princípio de Relaxação de Arestas

O núcleo do algoritmo repousa sobre a **operação de relaxação**: para cada duto orientado $(u, v) \in E$ com peso $w(u, v)$, caso a distância acumulada provisória até $u$ somada ao comprimento do duto seja estritamente menor do que a melhor distância conhecida até $v$, o valor é atualizado e o predecessor é registrado:

$$\text{se } d[u] + w(u, v) < d[v] \implies d[v] \leftarrow d[u] + w(u, v), \quad \text{pred}[v] \leftarrow u$$

Essa operação garante monotonicidade decrescente nas estimativas de distância superior até que a solução ótima seja atingida.

---

### 2.2. Prova de Corretude e a Condição de Não-Negatividade ($W \geq 0$)

A prova da corretude da estratégia gulosa de Dijkstra apoia-se no princípio de indução finita:

* **Hipótese Indutiva:** Todo equipamento extraído do Min-Heap (marcado como resolvido/fechado) possui sua distância calculada $d[v]$ rigorosamente igual à distância física mínima $\delta(s, v)$.
* **Passo Indutivo:** Ao extrair o nó $u$ de menor $d[u]$ da fronteira do Heap, se existisse uma rota alternativa menor até $u$, esta teria que cruzar a fronteira de nós não visitados por uma aresta $(x, y)$. Como as tubulações físicas possuem comprimento real não-negativo ($w \ge 0$), temos $d[y] \le \delta(s, u) < d[u]$. Porém, isto contradiz a escolha gulosa de $u$ como o elemento mínimo no Heap. Logo, $d[u] = \delta(s, u)$. $\blacksquare$

> [!IMPORTANT]
> **Implicação na Automação Industrial:** Caso existisse ganho energético ou compensação mássica representada por pesos negativos, o algoritmo de Dijkstra falharia. Nesses cenários específicos, seria mandatória a aplicação do algoritmo de **Bellman-Ford** ($O(|V| \cdot |E|)$). Como dutos, roscas e esteiras de transporte na fábrica de paçoca possuem comprimentos físicos estritamente positivos ($L > 0$), Dijkstra garante otimalidade global com tempo de resposta determinístico.

---

### 2.3. Análise de Estruturas de Dados e Desempenho

| Estrutura de Fila de Prioridade | Complexidade Assintótica | Adequação ao SCADA de Paçoca |
| :--- | :--- | :--- |
| **Busca Linear em Vetor** | $O(\|V\|^2)$ | Ineficiente para grafos grandes, simples para matrizes pequenas. |
| **Min-Heap Binário (`heapq`)** | $O((\|V\| + \|E\|) \log \|V\|)$ | **Padrão Adotado:** Excelente equilíbrio entre simplicidade e latência sub-milissegundo. |
| **Heap de Fibonacci** | $O(\|E\| + \|V\| \log \|V\|)$ | Teórico, com sobrecarga (*overhead*) constante excessiva para plantas de processo. |

---

### 2.4. Reconstrução de Rota por Vetor de Predecessores

O algoritmo não duplica listas de caminhos durante a execução. Ele armazena um mapa de apontadores `pred: V -> V ∪ {None}`. Ao finalizar o cálculo com destino na prensa `PRN-401_Prensa`, o caminho ótimo é reconstruído por rastreamento reverso:

$$\text{PRN-401} \leftarrow \text{pred}[\text{PRN-401}] \leftarrow \dots \leftarrow \text{SILO-101}$$

e invertido em tempo linear $O(\text{comprimento do caminho})$.

---

### 2.5. Roteamento Dinâmico sob Contingência no SCADA

Quando um trecho de transporte ou moinho apresenta anomalia (por exemplo, vibração excessiva detectada no mancal do Moinho B `MOI-301B`), o SCADA atribui custo $w(u, v) = \infty$ ou insere o equipamento no conjunto de `bloqueios`. O método `RoteadorDijkstra.calcular_menor_caminho` recalcula instantaneamente a rota de contingência ideal, garantindo abastecimento ininterrupto da prensa de compactação.

---

## 3. Exemplo Resolvido: Traçado das Iterações

**Problema:** Determinar a rota nominal de menor distância entre `SILO-101_Amendoim` e `PRN-401_Prensa`.

**Rastreamento Passo a Passo:**

1. **Inicialização:**  
   $d[\text{SILO-101}] = 0.0$, todos os demais $=\infty$.  
   $\text{Heap} = \{(0.0, \text{SILO-101})\}$.

2. **Iteração 1:**  
   Extrai `SILO-101` ($d=0.0$). Relaxa para `MAN-301_Dosagem`:  
   $d[\text{MAN-301}] = 0.0 + 15.0 = 15.0$, $\text{pred} = \text{SILO-101}$.  
   $\text{Heap} = \{(15.0, \text{MAN-301})\}$.

3. **Iteração 2:**  
   Extrai `MAN-301_Dosagem` ($d=15.0$). Relaxa para os moinhos paralelos:  
   * `MOI-301A`: $d = 15.0 + 8.0 = 23.0$, $\text{pred} = \text{MAN-301}$.
   * `MOI-301B`: $d = 15.0 + 10.0 = 25.0$, $\text{pred} = \text{MAN-301}$.  
   $\text{Heap} = \{(23.0, \text{MOI-301A}), (25.0, \text{MOI-301B})\}$.

4. **Iteração 3:**  
   Extrai `MOI-301A` ($d=23.0$, menor do heap). Relaxa para `HOM-301_Massa`:  
   $d[\text{HOM-301}] = 23.0 + 25.0 = 48.0$, $\text{pred} = \text{MOI-301A}$.  
   $\text{Heap} = \{(25.0, \text{MOI-301B}), (48.0, \text{HOM-301})\}$.

5. **Iteração 4 (Momento Chave da Relaxação):**  
   Extrai `MOI-301B` ($d=25.0$). Relaxa para `HOM-301_Massa`:  
   $$\text{Nova distância} = 25.0 + 22.0 = 47.0 < 48.0$$  
   **Atualização bem-sucedida:** $d[\text{HOM-301}] = 47.0$, $\text{pred}[\text{HOM-301}] = \text{MOI-301B}$.  
   $\text{Heap} = \{(47.0, \text{HOM-301}), (48.0, \text{HOM-301}_{\text{stale}})\}$.

6. **Iteração 5:**  
   Extrai `HOM-301_Massa` ($d=47.0$). Relaxa vizinhos:  
   * `MOE-302_Pulmao`: $d = 47.0 + 18.0 = 65.0$.
   * `PRN-401_Prensa`: $d = 47.0 + 30.0 = 77.0$.  
   $\text{Heap} = \{(48.0, \text{HOM-301}_{\text{descartado}}), (65.0, \text{MOE-302}), (77.0, \text{PRN-401})\}$.

7. **Iterações 6 e 7:**  
   Descarta entrada obsoleta e processa `MOE-302` ($65.0 + 20.0 = 85.0 > 77.0$, sem alteração na prensa).

8. **Iteração Final:**  
   Extrai `PRN-401_Prensa` ($d=77.0$).  
   **Rota Ótima:**  
   $$\text{SILO-101\_Amendoim} \rightarrow \text{MAN-301\_Dosagem} \rightarrow \text{MOI-301B} \rightarrow \text{HOM-301\_Massa} \rightarrow \text{PRN-401\_Prensa}$$
   **Comprimento Total:** $\mathbf{77.0\text{ m}}$ (superando os $78.0\text{ m}$ da rota pelo Moinho A).

---

## 4. Atividades de Investigação

1. **Roteamento de Matéria Secundária:** Calcule a rota de menor custo a partir do `SILO-102_Acucar` até `PRN-401_Prensa`. A rota ótima também utiliza o Moinho B? Qual é a distância final em metros?
2. **Isolamento de Falha no Moinho B:** Simule a parada por quebra de correia no `MOI-301B`. Execute o roteador de Dijkstra. Qual passa a ser a rota nominal e qual o acréscimo percentual de percurso?
3. **Bloqueio do Duto Principal de Massa:** Bloqueie o trecho direto `HOM-301_Massa -> PRN-401_Prensa` (válvula $XV\text{-}401$ travada fechada). Qual o caminho calculado passando pela Moega Pulmão `MOE-302_Pulmao` e seu custo total?
4. **Comparativo Dijkstra vs. Floyd-Warshall:** Para a malha da fábrica com $n=8$ nós, calcule o número de operações elementares de $n$ execuções de Dijkstra versus uma execução do algoritmo de Floyd-Warshall ($O(n^3)$).

---

## 5. Entregável da Aula 14

* **Módulo `RoteadorDijkstra` em Python:** Implementação orientada a objetos com suporte a Min-Heap (`heapq`), recálculo em tempo real, suporte a bloqueio dinâmico de equipamentos e reconstrução determinística de caminhos no Jupyter Notebook complementar.
