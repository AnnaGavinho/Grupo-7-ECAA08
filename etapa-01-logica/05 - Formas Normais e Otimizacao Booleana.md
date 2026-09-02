# Aula 05: Formas Normais (FND/FNC) e Otimização Booleana

## 1. Fundamentos Matemáticos: Formas Normais Canônicas
Na matemática discreta e na síntese de sistemas lógicos de controle, qualquer função booleana $f : \{0, 1\}^n \rightarrow \{0, 1\}$ pode ser expressa de maneira unívoca por meio de duas formas canônicas fundamentais:

### 1.1. Forma Normal Disjuntiva (FND / Soma de Produtos - SOP)
* **Estrutura Formal:** Uma disjunção ($\lor$) de termos conjuntivos chamados **mintermos**. $\text{FND}(f) = \bigvee_{k \in M(f)} m_k = (L_{1,1} \land L_{1,2} \land \dots \land L_{1,n}) \lor (L_{2,1} \land L_{2,2} \land \dots \land L_{2,n}) \lor \dots$ onde cada literal $L_{i,j}$ é a variável proposicional $x_j$ (se no mintermo ela assume valor 1) ou sua negação $\neg x_j$ (se assume valor 0).
* **Significado Físico no SCADA:** A FND mapeia **todos os estados operacionais admissíveis** nos quais a saída do atuador deve ser energizada (1).
* **Aplicação na Automação:** Síntese de circuitos elétricos em paralelo, lógica Ladder de partida redundante e análise de múltiplos caminhos de permissivo.

### 1.2. Forma Normal Conjuntiva (FNC / Produto de Somas - POS)
* **Estrutura Formal:** Uma conjunção ($\land$) de termos disjuntivos chamados **maxtermos** (ou cláusulas). $\text{FNC}(f) = \bigwedge_{k \in C(f)} M_k = (C_{1,1} \lor C_{1,2} \lor \dots \lor C_{1,n}) \land (C_{2,1} \lor C_{2,2} \lor \dots \lor C_{2,n}) \land \dots$
* **Significado Físico no SCADA:** A FNC representa a **interseção de restrições de segurança simultâneas** que não podem ser violadas.
* **Aplicação na Automação:** Síntese de matrizes de intertravamento de segurança (*Safety Interlock Matrices*), algoritmos de prova de consistência (SAT Solvers / Algoritmo DPLL) e sistemas instrumentados de segurança (SIL/SIS).

---

## 2. Álgebra Booleana e Leis de Simplificação
Em controladores lógicos programáveis (CLPs) e no motor de supervisão SCADA-Core, funções booleanas executam periodicamente dentro do ciclo de varredura (*scan cycle*, tipicamente de 1 ms a 20 ms). Expressões com termos redundantes ou contradições elevam o consumo de CPU e atrasam a resposta a emergências.
Aplicamos as identidades fundamentais da Álgebra Booleana para simplificação:

| Lei | Formulação Disjuntiva ($\lor$) | Formulação Conjuntiva ($\land$) | Aplicação em Automação |
| :--- | :--- | :--- | :--- |
| **Identidade** | $A \lor 0 \equiv A$ | $A \land 1 \equiv A$ | Eliminação de condições neutras |
| **Dominação (Nulo)** | $A \lor 1 \equiv 1$ | $A \land 0 \equiv 0$ | Travamento forçado / Intertrava direta |
| **Idempotência** | $A \lor A \equiv A$ | $A \land A \equiv A$ | Supressão de redundância de leitura |
| **Complemento** | $A \lor \neg A \equiv 1$ | $A \land \neg A \equiv 0$ | Identificação de tautologias e contradições |
| **Dupla Negação** | $\neg(\neg A) \equiv A$ | - | Simplificação de contatos NF em série |
| **Comutatividade** | $A \lor B \equiv B \lor A$ | $A \land B \equiv B \land A$ | Reordenação de variáveis na memória |
| **Associatividade** | $(A \lor B) \lor C \equiv A \lor (B \lor C)$ | $(A \land B) \land C \equiv A \land (B \land C)$ | Agrupamento de barramentos lógicos |
| **Distributividade** | $A \lor (B \land C) \equiv (A \lor B) \land (A \lor C)$ | $A \land (B \lor C) \equiv (A \land B) \lor (A \land C)$ | Fatoração e expansão de circuitos |
| **Leis de De Morgan** | $\neg(A \land B) \equiv \neg A \lor \neg B$ | $\neg(A \lor B) \equiv \neg A \land \neg B$ | Conversão entre permissivos e alarmes (*Fail-Safe*) |
| **Absorção** | $A \lor (A \land B) \equiv A$ | $A \land (A \lor B) \equiv A$ | Eliminação de termos secundários |
| **Absorção Mista** | $\neg A \lor (A \land B) \equiv \neg A \lor B$ | $\neg A \land (A \lor B) \equiv \neg A \land B$ | Otimização de chaves de bypass e override |

---

## 3. Aplicação na Fábrica de Paçoca

### 3.1. Caso 1: Otimização da Válvula de Gás do Forno de Torra (`XV-201` / Setor 200)
No Setor 200 (Torra de Amendoim), a válvula solenóide de gás `XV-201` ($v_1$) deve ser mantida aberta com base nas seguintes variáveis de processo:
* $f_2$: Chave de fluxo de exaustão de gases OK (`FS-201`)
* $c_1$: Chama piloto do queimador detectada (`TS-201`)
* $p_{gas\_low}$: Pressostato indicando pressão baixa de gás combustível
* $\text{Bypass}$: Chave física de bypass para teste e purga de ignição

Considere a expressão lógica bruta gerada pela especificação preliminar de engenharia: 
$$v_1 = (f_2 \land c_1 \land \neg p_{gas\_low}) \lor (f_2 \land c_1 \land p_{gas\_low} \land \text{Bypass}) \lor (f_2 \land \neg f_2 \land c_1)$$

**Demonstração Analítica da Simplificação:**
1. **Identificação e Eliminação de Contradição:** O terceiro termo contém $(f_2 \land \neg f_2 \land c_1)$. Pela lei do complemento: $f_2 \land \neg f_2 \equiv 0 \implies 0 \land c_1 \equiv 0$. Portanto: $v_1 = (f_2 \land c_1 \land \neg p_{gas\_low}) \lor (f_2 \land c_1 \land p_{gas\_low} \land \text{Bypass}) \lor 0$. Pela lei da identidade ($X \lor 0 \equiv X$): $v_1 = (f_2 \land c_1 \land \neg p_{gas\_low}) \lor (f_2 \land c_1 \land p_{gas\_low} \land \text{Bypass})$
2. **Fatoração por Distributividade:** Evidenciamos a subexpressão comum $(f_2 \land c_1)$: $v_1 \equiv (f_2 \land c_1) \land (\neg p_{gas\_low} \lor (p_{gas\_low} \land \text{Bypass}))$
3. **Aplicação da Lei de Absorção Mista:** Aplicando a identidade $\neg A \lor (A \land B) \equiv \neg A \lor B$, fazendo $A = p_{gas\_low}$ e $B = \text{Bypass}$: $\neg p_{gas\_low} \lor (p_{gas\_low} \land \text{Bypass}) \equiv \neg p_{gas\_low} \lor \text{Bypass}$
4. **Expressão Canônica Otimizada Final:** $\mathbf{v_{1\_otimizado} \equiv f_2 \land c_1 \land (\neg p_{gas\_low} \lor Bypass)}$

* **Ganho de Engenharia:** Redução de 9 operações lógicas para 3 operações, reduzindo a complexidade booleana em 66.7% e eliminando falhas induzidas por termos nulos.

---

### 3.2. Caso 2: Otimização do Sistema de Descarte Pneumático (`XV-401` / Setor 400)
Na esteira de saída de paçocas compactadas, a válvula de sopro de rejeito `XV-401` ($v_3$) é acionada caso a câmera identifique produto quebrado ($i_1$) ou o detector detecte metal ($d_1$), sob pressão pneumática $p_{air}$ nominal.

Expressão expandida inicial: 
$$v_3 = (i_1 \land p_{air}) \lor (d_1 \land p_{air}) \lor (i_1 \land d_1 \land p_{air})$$

**Demonstração Analítica:**
1. Fatorando $p_{air}$: $v_3 \equiv p_{air} \land (i_1 \lor d_1 \lor (i_1 \land d_1))$
2. Pela lei da absorção ($A \lor (A \land B) \equiv A$): $i_1 \lor (i_1 \land d_1) \equiv i_1 \implies i_1 \lor d_1 \lor (i_1 \land d_1) \equiv i_1 \lor d_1$
3. Expressão simplificada: $\mathbf{v_{3\_otimizado} \equiv (i_1 \lor d_1) \land p_{air}}$
