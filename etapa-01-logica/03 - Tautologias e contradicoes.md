# Validação Formal por Prova Lógica (Tautologia de Segurança)

Este documento apresenta a demonstração matemática de segurança da planta, assumindo as equações de intertravamento elaboradas na etapa anterior. O objetivo é provar ao SCADA-Core que combinações operacionais catastróficas são logicamente impossíveis.

## Prova de Segurança do Forno de Torra

Para garantir a integridade da planta, devemos provar que o sistema de segurança impede o agravamento de um superaquecimento.

* **Afirmação de Segurança:** "Sob as lógicas implementadas, é impossível o forno entrar em estado de sobretemperatura ($t_1$) e o queimador de gás permanecer ativo ($v_1$)."
* **Proposição do Estado de Risco ($S_{risco}$):**

$$
S_{risco} \equiv t_1 \land v_1
$$

### Premissa do Intertravamento (Aguardando definição da etapa 3)

*Nota para a Pessoa 3: Para que esta prova seja válida, o mapeamento de intertravamentos deverá conter uma regra de trip de emergência (falha) que inclua o sensor de temperatura ($t_1$) forçando o desligamento da válvula ($v_1$). Assumo aqui a regra básica:*

$$
t_1 \rightarrow \neg v_1
$$

### Demonstração Algébrica

Iniciamos convertendo a condicional do controlador para sua equivalência lógica básica ($\mathbf{A} \rightarrow \mathbf{B} \equiv \neg \mathbf{A} \lor \mathbf{B}$):

$$
t_1 \rightarrow \neg v_1 \equiv \neg t_1 \lor \neg v_1
$$

O sistema operacional garante que esta regra é estritamente VERDADEIRA. Portanto, aplicamos a regra de proteção ao nosso suposto estado de risco via conjunção ($\land$):

$$
S_{risco} \land (\text{Regra de Proteção})
$$

$$
S_{risco} \land (\neg t_1 \lor \neg v_1)
$$

Substituímos o estado de risco pela sua proposição:

$$
(t_1 \land v_1) \land (\neg t_1 \lor \neg v_1)
$$

Aplicamos a propriedade distributiva da conjunção sobre a disjunção:

$$
\big((t_1 \land v_1) \land \neg t_1\big) \lor \big((t_1 \land v_1) \land \neg v_1\big)
$$

Pela propriedade comutativa e associativa, podemos agrupar os termos opostos:

$$
(t_1 \land \neg t_1 \land v_1) \lor (t_1 \land v_1 \land \neg v_1)
$$

Pela Lei da Contradição (uma variável e sua negação não podem ser verdadeiras simultaneamente, $A \land \neg A = \text{Falso}$):

$$
(\text{Falso} \land v_1) \lor (t_1 \land \text{Falso})
$$

Pela Lei da Anulação (qualquer termo em conjunção com Falso resulta em Falso):

$$
\text{Falso} \lor \text{Falso} \equiv \text{FALSO}
$$

**Conclusão:** O estado de risco ($S_{risco}$) avaliado sob as regras de intertravamento resulta em uma contradição insatisfatível (FALSO). A fábrica jamais operará sob essa combinação crítica de variáveis.
