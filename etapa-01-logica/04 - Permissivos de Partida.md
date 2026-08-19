# Aula 04: Lógica Proposicional — Conectivos e Blocos de Permissivos

## 1. Fundamentos Matemáticos: Conectivos Lógicos
Na matemática discreta, uma proposição é uma sentença declarativa que assume um e apenas um valor-verdade: Verdadeiro ($1$) ou Falso ($0$).

As operações sobre variáveis proposicionais são definidas por operadores lógicos:
* **Negação ($\neg A$):** Inverte o valor-verdade[cite: 10].
* **Conjunção ($A \land B$):** Verdadeira se ambos os operandos forem verdadeiros. Modela condições em série[cite: 10].
* **Disjunção ($A \lor B$):** Verdadeira se ao menos um dos operandos for verdadeiro. Modela falhas em paralelo[cite: 10].
* **Disjunção Exclusiva ($A \oplus B$):** Verdadeira se exatamente um dos operandos for verdadeiro. Usada em seletores de modo[cite: 10].

## 2. Aplicação em Engenharia: Permissivos de Partida

Um permissivo de partida (*Start Permissive*) é uma condição booleana que deve ser estritamente satisfeita para que um atuador receba o comando[cite: 10].

### 2.1. Permissivo do Forno de Torra ($P_{\text{Forno}}$)
O acionamento do queimador do forno requer:
* Exaustão de ar operante: $f_1$
* Nível de gás adequado: $g_{ok}$
* Temperatura inicial segura: $\neg t_1$
* Ausência de botão de emergência: $\neg e_1$
* Modo operacional definido: $\text{Auto} \oplus \text{Manual}$

$$P_{\text{Forno}} \equiv f_1 \land g_{ok} \land \neg t_1 \land \neg e_1 \land (\text{Auto} \oplus \text{Manual})$$

```mermaid
graph LR
    L1["f_1 (Exaustão OK)"] --> AND["Bloco AND (Conjunção)"]
    L2["g_ok (Nível Gás OK)"] --> AND
    L3["¬ t_1 (Temp OK)"] --> AND
    L4["¬ e_1 (Sem Emergência)"] --> AND
    L5["Auto XOR Manual"] --> AND
    AND --> Permissivo["Permissivo Forno (True/False)"]
