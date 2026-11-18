# Aula 24: Árvore de Atingibilidade e Árvore de Cobertura em Redes de Petri — Fábrica de Paçoca

**Disciplina:** ECAA08 — Automática (2026.2) — UNIFEI  
**Projeto:** SCADA-Core Automática / Linha de Produção de Paçoca  
**Equipe:** Grupo 7  
**Perfil:** Engenharia de Controle e Automação (Matemática Discreta & Sistemas a Eventos Discretos)  

---

## 1. Por que Redes de Petri na Fábrica de Paçoca

Na Etapa 01 provamos, com lógica proposicional, que certas **combinações** de sinais são impossíveis (ex.: gás aberto sem chama). Mas a lógica proposicional avalia um instante de cada vez; ela não responde perguntas sobre **sequências de eventos**, como:

* "Depois de um *trip* do forno, é possível religar o queimador sem refazer a purga?"
* "Se a prensa ficar mais lenta que os moinhos, a moega pulmão transborda?"
* "Os dois moinhos redundantes chegam a trabalhar ao mesmo tempo, ou a lógica os serializa?"

Essas perguntas envolvem **concorrência** (três balanças dosando em paralelo, dois moinhos), **recursos compartilhados** (homogeneizador, moega) e **ordem de eventos** (purga antes da ignição). As Redes de Petri representam isso de forma compacta, e as **árvores de atingibilidade e de cobertura** permitem verificar as propriedades **antes** de programar o CLP.

Escolhemos dois subsistemas da nossa planta com naturezas diferentes:

| Subsistema | CLP | Natureza | Árvore usada |
| :--- | :---: | :--- | :--- |
| Queimador do forno de torra | CLP 02 | Sequência de segurança, 1 ficha | Atingibilidade (finita) |
| Linha de massa: dosagem → moinhos → `HOM-301` → `MOE-302` → `PRN-401` | CLP 03 / CLP 04 | Concorrência e acúmulo | Cobertura (com $\omega$) e depois atingibilidade |

---

## 2. Fundamentos Matemáticos

### 2.1. Rede de Petri marcada

$$N = (P, T, Pre, Post, M_0)$$

* $P$: lugares (condições, estados de equipamentos, recursos, capacidade livre);
* $T$: transições (eventos e ações de controle), $P \cap T = \emptyset$;
* $Pre, Post: P \times T \to \mathbb{N}$: pesos dos arcos de entrada e de saída;
* $M_0: P \to \mathbb{N}$: marcação inicial.

A **matriz de incidência** é $C = Post - Pre$. A transição $t_j$ está **habilitada** em $M$ se $M(p) \ge Pre(p, t_j)$ para todo $p$, e o disparo produz

$$M' = M + C\,\vec{e}_j.$$

### 2.2. Árvore de atingibilidade

Raiz $M_0$; cada filho é a marcação obtida pelo disparo de uma transição habilitada. Um nó cuja marcação já apareceu é **duplicado** (folha); um nó sem transições habilitadas é **terminal (deadlock)**. Só é finita se a rede for **limitada**.

### 2.3. Árvore de cobertura (Karp-Miller)

Se ao gerar $M'$ existir um **ancestral no mesmo ramo** $M$ com $M' \ge M$ e $M' \ne M$, a sequência que levou de $M$ a $M'$ pode ser repetida para sempre. As coordenadas em que $M'(p) > M(p)$ recebem o símbolo $\omega$, com $\omega \pm k = \omega$ e $\omega > n$ para todo $n \in \mathbb{N}$. A árvore resultante é sempre finita.

**Leitura de engenharia:** um $\omega$ no lugar que representa um tanque, moega ou equipamento é uma **prova formal de que não existe limite superior** para o acúmulo naquele ponto.

### 2.4. Invariantes de lugar

Um vetor $y \in \mathbb{Z}^{|P|}$ com

$$y^T C = 0$$

é um **invariante de lugar (P-invariante)**. Multiplicando a equação de estado por $y^T$:

$$y^T M' = y^T M + y^T C\,\vec{e}_j = y^T M \;\Rightarrow\; y^T M = y^T M_0 \quad \forall M \in R(N, M_0).$$

É uma lei de conservação provada **só pela estrutura**, sem enumerar estados. No notebook, a base desses vetores é calculada por eliminação de Gauss-Jordan sobre $C^T$ com frações exatas.

### 2.5. Propriedades verificadas

| Propriedade | Definição | Significado na fábrica |
| :--- | :--- | :--- |
| Limitação ($k$-limitada) | $M(p) \le k$ em toda marcação alcançável | Nenhum equipamento recebe mais produto do que comporta |
| Segurança (1-limitada) | $k = 1$ | Estados de equipamento são binários |
| Ausência de deadlock | Toda marcação alcançável tem transição habilitada | A linha nunca trava esperando um recurso |
| Reversibilidade | De qualquer marcação alcançável é possível voltar a $M_0$ | Sempre existe caminho de volta ao estado seguro inicial |
| Vivacidade (L4) | Toda transição pode voltar a disparar a partir de qualquer marcação | Nenhuma operação fica permanentemente impossível |

---

## 3. Parte A — Gerenciamento do Queimador do Forno de Torra (CLP 02)

### 3.1. Modelo

O forno de torra é o ponto de maior risco da planta (gás, 160–180 °C, poeira e óleo de amendoim). A lógica segue o princípio clássico de queimadores: **purgar a câmara com ar antes de qualquer ignição** e **repetir a purga após qualquer bloqueio**, para eliminar gás residual.

| Lugar | Significado | Instrumentos | $M_0$ |
| :--- | :--- | :--- | :---: |
| `P1_DESLIGADO` | Forno parado, gás fechado | — | 1 |
| `P2_PURGA` | Purga com ar em andamento | exaustor, `FS-201` | 0 |
| `P3_PRONTO_IGNICAO` | Purga concluída | — | 0 |
| `P4_TORRANDO` | Chama estável, esteira ligada | `TS-201`, `TT-201`, `M-201` | 0 |
| `P5_LOCKOUT` | Bloqueio de segurança, alarme | `ALM-201` | 0 |
| `P6_EXAUSTOR_ON` | Exaustão com fluxo OK | `FS-201` | 0 |
| `P7_GAS_ABERTO` | Válvula de corte de gás aberta | `XV-201` | 0 |

| Transição | Pré-condições | Pós-condições | Evento |
| :--- | :--- | :--- | :--- |
| `T1_INICIAR_PURGA` | P1 | P2, P6 | Liga exaustor e temporizador de purga |
| `T2_FIM_PURGA` | P2 | P3 | Purga cumprida com `FS-201` OK |
| `T3_IGNICAO_OK` | P3 | P4, P7 | Abre `XV-201`, `TS-201` confirma chama |
| `T4_FALHA_IGNICAO` | P3 | P5 | Chama não confirmada no tempo de segurança |
| `T5_TRIP` | P4, P7 | P5 | Sobretemperatura `TT-201`, perda de chama ou de exaustão |
| `T6_DESLIGAR` | P4, P7, P6 | P1 | Parada normal |
| `T7_RESET` | P5, P6 | P1 | Reset manual após inspeção |

Diferente de um autômato simples, `P6_EXAUSTOR_ON` e `P7_GAS_ABERTO` são lugares **separados** do estado do forno: assim as condições físicas "exaustor ligado" e "gás aberto" ficam explícitas e podem ser verificadas.

### 3.2. Árvore de atingibilidade

```
                       N0: {DESLIGADO}
                              | T1
                N1: {PURGA, EXAUSTOR_ON}
                              | T2
            N2: {PRONTO_IGNICAO, EXAUSTOR_ON}
                    /                     \
               T3  /                       \  T4
                  v                         v
 N3: {TORRANDO, EXAUSTOR_ON, GAS_ABERTO}   N4: {LOCKOUT, EXAUSTOR_ON}
          /                \                        | T7
     T5  /                  \  T6                   v
        v                    v                N7: {DESLIGADO}
N5: {LOCKOUT, EXAUSTOR_ON}  N6: {DESLIGADO}       (duplicado)
     (duplicado)            (duplicado)
```

O conjunto alcançável tem **5 marcações** distintas. A rede é **1-limitada, livre de deadlock, reversível e viva**. O nó N2 é um **conflito estrutural**: a ignição pode dar certo (T3) ou falhar (T4), e as duas saídas foram tratadas.

### 3.3. Propriedades de segurança verificadas exaustivamente

| Código | Propriedade | Resultado |
| :--- | :--- | :---: |
| S1 | $M(P7) = 1 \Rightarrow M(P6) = 1$ — gás só com exaustão | OK |
| S2 | $M(P7) = 1 \Rightarrow M(P4) = 1$ — gás só com chama confirmada | OK |
| S3 | $\neg(M(P5) = 1 \land M(P7) = 1)$ — *lockout* sempre com gás fechado | OK |
| S4 | Todo caminho de um *lockout* até uma marcação de torra passa por `P2_PURGA` | OK |

S4 é uma **propriedade de caminho**, que a lógica proposicional da Etapa 01 não consegue expressar. Ela é verificada removendo do grafo de atingibilidade todas as marcações com purga em andamento e mostrando que, no grafo restante, nenhuma marcação de *lockout* alcança `P4_TORRANDO`.

### 3.4. Invariantes de lugar

A base calculada automaticamente coincide com três leis físicas:

$$M(P1) + M(P2) + M(P3) + M(P4) + M(P5) = 1 \quad \text{(o forno está em exatamente um estado)}$$

$$M(P4) - M(P7) = 0 \quad \text{(gás aberto} \Leftrightarrow \text{torrando)}$$

$$M(P1) + M(P6) = 1 \quad \text{(exaustor ligado} \Leftrightarrow \text{forno fora de DESLIGADO)}$$

O segundo invariante prova S2 e S3 estruturalmente, sem precisar da árvore.

### 3.5. Detecção de erro de programação

Simulamos uma alteração "para agilizar a retomada": o reset leva o forno direto a `P3_PRONTO_IGNICAO`. S1, S2 e S3 continuam válidas, mas **S4 é violada**, e o verificador devolve o contraexemplo: do *lockout* é possível chegar a `{TORRANDO, EXAUSTOR_ON, GAS_ABERTO}` sem purgar. Esse é exatamente o tipo de erro que passa despercebido em teste manual e causa explosões em fornos a gás.

---

## 4. Parte B — Linha de Massa sem Controle de Capacidade (Árvore de Cobertura)

### 4.1. Modelo com concorrência

O fluxo segue a rede de tubulações da Aula 11 (`MAN-301` → `MOI-301A/B` → `HOM-301` → `MOE-302` → `PRN-401`), agora vista como sequência de eventos discretos:

| Lugar | Significado | $M_0$ |
| :--- | :--- | :---: |
| `P1_DOSADORA_LIVRE` | Manifold de dosagem livre | 1 |
| `P2/P3/P4_DOS_*` | Balanças `WT-301` (amendoim), `WT-302` (açúcar), `WT-303` (sal) dosando | 0 |
| `P5/P6/P7_*_OK` | Peso-alvo atingido em cada balança | 0 |
| `P8_MOINHO_LIVRE` | Moinhos disponíveis (`MOI-301A`, `MOI-301B`) | **2** |
| `P9_MOENDO` | Bateladas em moagem | 0 |
| `P10_HOM301` | Bateladas no homogeneizador | 0 |
| `P11_MOE302` | Bateladas na moega pulmão | 0 |

| Transição | Efeito |
| :--- | :--- |
| `T1_INICIAR_BATELADA` | **Fork**: abre as três balanças em paralelo |
| `T2/T3/T4_WT30x_OK` | Cada balança atinge o peso de forma independente |
| `T5_DESCARGA_XV301` | **Join**: só descarrega quando as três pesagens terminaram e há moinho livre; a dosadora fica livre para a próxima batelada |
| `T6_FIM_MOAGEM` | Moinho libera e entrega a massa ao `HOM-301` |
| `T7_HOM_PARA_MOEGA` | Massa homogeneizada vai para a `MOE-302` |
| `T8_PRENSAR_PRN401` | Prensa consome uma batelada da moega |

O *fork/join* garante, por construção, a regra de receita da Etapa 01 (descarga `XV-301` só com `WT-301`, `WT-302` e `WT-303` OK).

### 4.2. Resultado da árvore de cobertura

* 460 nós, 144 marcações distintas, $\omega$ presente.
* $\omega$ aparece primeiro em `P10_HOM301` e depois em `P11_MOE302`.
* `P9_MOENDO` e `P8_MOINHO_LIVRE` ficam limitados a 2: os moinhos já são protegidos pelas fichas de recurso.

Exemplo do primeiro ramo acelerado: após um ciclo completo dosagem → moagem, a marcação $\{DOSADORA\_LIVRE, MOINHO\_LIVRE=2, HOM301=1\}$ cobre estritamente a raiz $\{DOSADORA\_LIVRE, MOINHO\_LIVRE=2\}$; como só `P10_HOM301` cresceu, ele recebe $\omega$.

### 4.3. Interpretação física

A rede **permite** que o homogeneizador receba uma segunda batelada antes de esvaziar e que a moega acumule massa sem limite sempre que a prensa estiver mais lenta (troca de matriz rolha/quadrada, ajuste de pressão `PS-401`). Na fábrica isso significa:

* `HOM-301` com duas bateladas: proporção fora da receita e sobrecarga do eixo helicoidal;
* `MOE-302` transbordando: perda de produto e massa exposta (não conformidade de BPF/HACCP);
* massa parada e aquecida libera óleo de amendoim e empasta, dificultando a limpeza.

---

## 5. Parte C — Correção por Lugares Complementares

### 5.1. Modificação

| Novo lugar | $M_0$ | Arcos | Intertravamento equivalente no CLP |
| :--- | :---: | :--- | :--- |
| `P12_HOM_LIVRE` | $K_{HOM} = 1$ | consumido por `T6`, devolvido por `T7` | Moinho só descarrega com homogeneizador vazio |
| `P13_MOE_VAGAS` | $K_{MOE} = 3$ | consumido por `T7`, devolvido por `T8` | Nível alto da moega bloqueia a transferência |

As capacidades $K_{HOM} = 1$ e $K_{MOE} = 3$ bateladas são premissas de projeto do grupo.

### 5.2. Resultado

* Árvore de atingibilidade com 644 nós e **216 marcações distintas, sem nenhum $\omega$**.
* Máximos: `P10_HOM301` = 1, `P11_MOE302` = 3, `P9_MOENDO` = 2 — exatamente as capacidades físicas.
* **0 deadlocks**, rede **reversível** e **viva (L4)**.

A base de invariantes calculada contém seis leis de conservação, todas com significado direto:

| Invariante | Significado |
| :--- | :--- |
| $M(P8) + M(P9) = 2$ | Dois moinhos: livres + ocupados |
| $M(P10) + M(P12) = 1$ | Homogeneizador ocupado ou livre |
| $M(P11) + M(P13) = 3$ | Moega: bateladas + vagas = capacidade |
| $M(P1) + M(P2) + M(P5) = 1$ | *Fork/join* do amendoim |
| $M(P1) + M(P3) + M(P6) = 1$ | *Fork/join* do açúcar |
| $M(P1) + M(P4) + M(P7) = 1$ | *Fork/join* do sal |

### 5.3. A redundância dos moinhos é aproveitada?

Uma rede pode ser segura e viva e ainda desperdiçar equipamento. Comparamos a Parte C com uma lógica "conservadora", em que a descarga da dosadora já reserva o homogeneizador:

| Lógica de intertravamento | Marcações | Máx. de moinhos simultâneos |
| :--- | :---: | :---: |
| Parte C (capacidade no `HOM-301` e na `MOE-302`) | 216 | **2** |
| Conservadora (reserva o `HOM-301` na descarga) | 108 | 1 |

A versão conservadora parece mais segura, mas **serializa a linha**: o moinho reserva nunca trabalha em paralelo. A árvore de atingibilidade mostra isso de forma objetiva pelo limite de `P9_MOENDO`.

---

## 6. Comparativo para o Projeto de Automação

| Critério | Árvore de Atingibilidade | Árvore de Cobertura |
| :--- | :--- | :--- |
| Aplicabilidade | Redes limitadas | Qualquer rede |
| Representação | Exata ($\mathbb{N}$) | Aproximada com $\omega$ |
| O que decide | Todas as propriedades comportamentais, inclusive de caminho | Limitação e cobertura de marcações |
| Uso na fábrica de paçoca | Forno de torra (S1–S4) e linha corrigida (capacidade, paralelismo dos moinhos) | Detecção do risco de sobrecarga do `HOM-301` e transbordo da `MOE-302` |

---

## 7. Exemplo Resolvido

**Pergunta:** Prove, sem construir a árvore, que na rede do forno é impossível ter gás aberto com o forno em *lockout*.

**Resolução:** O vetor $y$ com $y(P4) = 1$, $y(P7) = -1$ e zero nos demais lugares satisfaz $y^T C = 0$: as únicas transições que alteram P4 ou P7 são T3 (+1 em ambos), T5 (−1 em ambos) e T6 (−1 em ambos), e em todas elas a contribuição se cancela. Como $y^T M_0 = 0$, vale $M(P4) = M(P7)$ em toda marcação alcançável. Do primeiro invariante, $M(P4) + M(P5) \le 1$; se $M(P5) = 1$, então $M(P4) = 0$ e, portanto, $M(P7) = 0$. Logo *lockout* e gás aberto nunca coexistem. $\blacksquare$

---

## 8. Atividades de Investigação

1. Inclua na Parte A uma **pós-purga** obrigatória na parada normal (`T6` vai para um novo lugar `P8_POS_PURGA` antes de `P1`). Recalcule a árvore e os invariantes. Algum dos três invariantes muda?
2. Na Parte C, reduza $K_{MOE}$ para 1. A rede continua livre de deadlock? O máximo de moinhos simultâneos continua 2? Explique o resultado pelo invariante $M(P11) + M(P13) = K_{MOE}$.
3. Modele o **retorno de paçocas quebradas** detectadas pelo `VS-401` para o `HOM-301` (reprocessamento citado na Aula 11). Em que condição esse laço cria um deadlock? Verifique com a árvore.
4. Explique por que a Árvore de Cobertura da Parte B não permite concluir se a rede é reversível, e por que o notebook informa "indecidível com $\omega$" nesse caso.

---

## 9. Entregável da Aula 24

* **Classe `RedeDePetri`** com matrizes $Pre$, $Post$, $C$ e regra de disparo com aritmética de $\omega$.
* **Construtor de árvore de cobertura (Karp-Miller)**, que gera a árvore de atingibilidade quando a rede é limitada.
* **Auditor de propriedades** (limitação, deadlock, reversibilidade, vivacidade), **verificador de segurança do forno** (S1–S4) e **cálculo de invariantes de lugar** por Gauss-Jordan.
* **Modelos validados** do queimador do forno de torra e da linha de massa da fábrica de paçoca, antes e depois da correção por lugares complementares.
