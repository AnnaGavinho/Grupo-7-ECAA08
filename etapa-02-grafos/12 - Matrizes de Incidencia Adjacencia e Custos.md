# Aula 12: Matrizes de Incidência, Adjacência e Balanço de Massa Matricial

**Disciplina:** ECAA08 — Automática (2026.2) — UNIFEI  
**Projeto:** SCADA-Core Automática / Linha de Produção de Paçoca  
**Equipe:** Grupo 7  
**Perfil:** Engenharia de Controle e Automação (Matemática Discreta & Teoria dos Grafos)  

---

## 1. Fundamentos Matemáticos: A Matriz de Incidência Vértice-Aresta ($B$)

Seja um dígrafo $G = (V, E)$ com $|V| = n$ vértices e $|E| = m$ arestas dirigidas. A **Matriz de Incidência** $B \in \{-1, 0, 1\}^{n \times m}$ é definida formalmente por:

$$B[i, j] = \begin{cases} -1, & \text{se a aresta } e_j \text{ sai do nó } v_i \text{ (origem)} \\ +1, & \text{se a aresta } e_j \text{ entra no nó } v_i \text{ (destino)} \\ 0, & \text{se o nó } v_i \text{ não incide na aresta } e_j \end{cases}$$

### Propriedades Formais:
1. **Soma por Coluna Nula:** Para toda coluna $j$, $\sum_{i=1}^n B[i, j] = 0$.
2. **Balanço de Massa em Regime Permanente:** $B \cdot \vec{Q} = \vec{S}$.

---

## 2. Aprofundamento Teórico

### 2.1. Interpretação Física da Propriedade da Soma Nula

A propriedade $\sum_{i=1}^n B[i, j] = 0$ decorre diretamente da topologia orientada: cada aresta $e_j = (u, v)$ contribui com exatamente um $-1$ (na linha do equipamento de origem $u$) e um $+1$ (na linha do equipamento de destino $v$), e $0$ em todas as demais linhas. 

Essa identidade é a versão discreta e matricial da **Primeira Lei de Kirchhoff** (conservação de corrente e massa em nós de processo), aplicada aqui às vazões mássicas de amendoim, açúcar e massa triturada ao invés de corrente elétrica. A mesma matemática que rege redes de circuitos elétricos governa a dinâmica do escoamento de insumos e matérias-primas na linha de produção da fábrica de paçoca.

---

### 2.2. Matriz de Incidência vs. Matriz de Adjacência

| Aspecto | Matriz de Incidência $B$ | Matriz de Adjacência $A$ |
| --- | --- | --- |
| **Dimensão** | $n \times m$ (vértices × arestas) | $n \times n$ (vértices × vértices) |
| **Entradas** | $\{-1, 0, +1\}$ (estrutural) | pesos reais ou $\{0, 1\}$ |
| **Uso principal** | Balanço de massa, análise de ciclos e espaço de cortes | Busca de caminhos, roteamento e caminhos mínimos |
| **Relação algébrica** | $B B^T$ é a **matriz Laplaciana** $L$ do grafo | $A$ não determina diretamente conservação de fluxo |

A relação $L = B B^T$ (Laplaciano) estabelece a ponte algébrica entre as duas representações: seus autovalores revelam a conectividade algébrica e os modos fundamentais da rede, justificando por que a matriz de incidência é mandatória em problemas de **fluxo em redes** (*network flow* e balanço estequiométrico), enquanto a matriz de adjacência é a estrutura ideal para **busca de caminhos** (Aulas 13 e 14).

---

### 2.3. Posto (Rank) da Matriz de Incidência e o Espaço de Ciclos

Para um grafo conexo com $n$ vértices e $m$ arestas, o posto da matriz de incidência sobre $\mathbb{R}$ é igual a $n - 1$. A dimensão do **núcleo** (espaço nulo à direita) de $B$ é dada por:

$$\dim(\ker(B)) = m - (n - 1) = m - n + 1$$

Esse valor expressa o número exato de **ciclos independentes** (ciclos fundamentais) presentes na rede.

Para a malha nuclear da fábrica de paçoca ($n = 8$ equipamentos e $m = 9$ dutos de transporte):

$$\dim(\ker(B)) = 9 - 8 + 1 = 2$$

Esses dois graus de liberdade topológicos correspondem diretamente a:
1. **Ciclo da Linha de Moagem:** As rotas alternativas em paralelo via Moinho A (`MOI-301A`) ou Moinho B reserva (`MOI-301B`).
2. **Ciclo da Linha de Estocagem:** O desvio direto do Homogeneizador (`HOM-301_Massa`) para a Prensa (`PRN-401_Prensa`) versus a rota amortecida via Moega Pulmão (`MOE-302_Pulmao`).

---

### 2.4. Balanço de Massa como Sistema Linear

A conservação de matéria na linha de produção de paçoca é expressa pelo sistema linear:

$$B \cdot \vec{Q} = \vec{S}$$

Onde:
* $\vec{Q} \in \mathbb{R}^m$ é o vetor de vazões operacionais em cada duto ou transportador (em $\text{kg/h}$);
* $\vec{S} \in \mathbb{R}^n$ é o vetor de balanço líquido em cada equipamento (negativo para fontes/alimentadores externos, positivo para consumo/sumidouro final e nulo para unidades intermediárias).

Para nós intermediários sem acúmulo contínuo (regime permanente), a vazão de entrada iguala a de saída, resultando em balanço líquido $0.0\text{ kg/h}$ (`MAN-301_Dosagem`, `MOI-301A`, `MOI-301B`, `HOM-301_Massa` e `MOE-302_Pulmao`). Os silos de insumo (`SILO-101_Amendoim` e `SILO-102_Acucar`) operam como fontes puras (balanço negativo), enquanto a prensa `PRN-401_Prensa` opera como sumidouro de produto acabado (balanço positivo).

---

### 2.5. Matriz de Custos (Adjacência Ponderada) Revisitada

A matriz de custos $W \in (\mathbb{R}^+ \cup \{\infty\})^{n \times n}$ generaliza a matriz de adjacência ao armazenar os comprimentos físicos reais em metros (ou perdas de carga/tempos) e $\infty$ nas células sem duto direto. 

Essa é a estrutura de dados primária consumida pelo **Algoritmo de Dijkstra** (Aula 14) para roteamento de menor custo a partir de uma fonte, e pelo **Algoritmo de Floyd-Warshall**, que computa o menor percurso entre todos os pares de equipamentos em complexidade $O(n^3)$.

---

## 3. Exemplo Resolvido

**Pergunta:** Verifique manualmente a coluna $e_5$ (duto de transporte `MOI-301A -> HOM-301_Massa`) da matriz de incidência $B$ e confirme a propriedade da soma nula.

**Resolução:**  
A aresta $e_5$ parte do moinho `MOI-301A` e incide no homogeneizador `HOM-301_Massa`. Portanto, na coluna $e_5$:
* Linha do nó `MOI-301A` (origem): $-1$
* Linha do nó `HOM-301_Massa` (destino): $+1$
* Todas as demais linhas: $0$

Somando todos os elementos da coluna $e_5$:
$$\sum_{i=1}^8 B[i, 5] = (-1) + (+1) + 0 \times 6 = 0$$

A propriedade da soma nula se confirma rigorosamente.

---

## 4. Atividades de Investigação

1. Calcule manualmente $B \cdot \vec{Q}$ para um vetor hipotético $\vec{Q}$ em que todas as tubulações ativas operam a $120.0\,\text{kg/h}$, exceto a tubulação `MOE-302_Pulmao -> PRN-401_Prensa` ($e_9$), que opera a $150.0\,\text{kg/h}$. O nó `MOE-302_Pulmao` permanece balanceado? O que essa violação representa fisicamente no processo de compactação?
2. Demonstre analiticamente que o produto $B B^T$ para o grafo não-dirigido subjacente coincide com a matriz Laplaciana $L = D - A$, onde $D$ é a matriz diagonal dos graus dos equipamentos e $A$ é a matriz de adjacência booleana.
3. Usando a fórmula da dimensão do espaço de ciclos ($\dim(\ker(B)) = m - n + 1$), determine quantos ciclos independentes passariam a existir na fábrica se fosse construída uma décima tubulação interligando a saída de descarte da `PRN-401_Prensa` de volta à entrada do `HOM-301_Massa` (linha de reciclo de paçocas quebradas).
4. Compare a complexidade computacional para calcular a matriz de menores distâncias entre todos os pares de equipamentos comparando: (a) o algoritmo de Dijkstra executado $n$ vezes (uma para cada nó de origem), versus (b) o algoritmo de Floyd-Warshall executado globalmente. Em que condições de densidade de tubulação da planta ($m$ em relação a $n$) cada método é mais eficiente?

---

## 5. Entregável da Aula 12

* **Motor Matricial de Balanço de Massa:** Geração automatizada da Matriz de Incidência $B \in \mathbb{R}^{n \times m}$ e validação da equação de conservação $B \cdot \vec{Q} = \vec{S}$ no Jupyter Notebook complementar.
