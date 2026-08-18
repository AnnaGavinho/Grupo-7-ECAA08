# Modelagem de Alarmes e Intertravamentos: Setor de Processamento de Paçoca

Este documento apresenta a lógica de controle e segurança para a planta de processamento, utilizando os conceitos de lógica proposicional para garantir a integridade dos ativos e a qualidade do produto final.

## 1. Representação Simbólica das Regras de Processo

As equações abaixo descrevem o comportamento esperado do sistema de supervisão e controle (SCADA-Core) diante de estados críticos e permissivos operacionais.

### A. Alarme de Não-Conformidade na Recepção (Qualidade)
No estágio inicial de processamento (Setor 100), o sistema monitora a integridade da matéria-prima. Caso a umidade do grão ($u_1$) ou a acidez ($q_1$) excedam os limites técnicos, ou em caso de acionamento de emergência ($e_1$), o motor da peneira de entrada ($m_1$) deve ser bloqueado para evitar contaminação do silo.

*   **Condição de Falha Detectada ($F_{qualidade}$):**
    $$F_{qualidade} \equiv u_1 \lor q_1 \lor e_1$$
*   **Equação de Bloqueio Operacional:**
    $$F_{qualidade} \rightarrow \neg m_1$$

### B. Intertravamento de Segurança Térmica: Proteção do Forno
No Setor 200, a segurança contra incêndio é prioridade. Um estado crítico é definido pela detecção de chama ($c_1$) com a esteira do forno estática ($\neg m_2$) — situação que causaria a queima imediata do produto — ou pelo excesso de temperatura ($t_2$). Nestes casos, a válvula de gás ($v_1$) deve fechar e o alarme sonoro ($a_1$) deve atuar.

*   **Condição de Risco de Incêndio ($F_{fogo}$):**
    $$F_{fogo} \equiv (c_1 \land \neg m_2) \lor t_2$$
*   **Regra de Segurança:**
    $$F_{fogo} \rightarrow (\neg v_1 \land a_1)$$

### C. Lógica de Atuação do Sistema de Descarte
No Setor 400, o sistema de rejeição automática garante a padronização. A válvula de descarte ($v_3$) é acionada se houver detecção visual de defeito ($i_1$) ou detecção de metal ($d_1$), desde que haja pressão nominal no sistema pneumático ($p_{air}$) para realizar o sopro.

*   **Condição de Permissivo de Rejeição ($P_{rejeito}$):**
    $$P_{rejeito} \equiv (i_1 \lor d_1) \land p_{air}$$
*   **Regra de Operação:**
    $$P_{rejeito} \rightarrow v_3$$

---

## 2. Validação Formal por Prova Lógica (Tautologia de Segurança)

Para validar a confiabilidade do motor de intertravamento, provamos matematicamente que o **Estado de Risco** do forno é uma contradição sob as regras estabelecidas.

*   **Afirmação de Segurança:** "É logicamente impossível manter a válvula de gás aberta ($v_1$) se a chama estiver ativa ($c_1$) e a esteira estiver parada ($\neg m_2$)."
*   **Proposição do Estado de Risco ($S_{risco}$):**
    $$S_{risco} \equiv (c_1 \land \neg m_2) \land v_1$$

### Demonstração:
Dada a regra de intertravamento onde a condição crítica implica no desligamento da válvula:
$$(c_1 \land \neg m_2) \rightarrow \neg v_1$$

Pela equivalência lógica do condicional ($\mathbf{A} \rightarrow \mathbf{B} \equiv \neg \mathbf{A} \lor \mathbf{B}$):
$$\neg(c_1 \land \neg m_2) \lor \neg v_1$$

Aplicando a Lei de De Morgan:
$$(\neg c_1 \lor m_2) \lor \neg v_1$$

Testamos a conjunção do **Estado de Risco** com a **Regra de Segurança** para verificar a consistência:
$$((c_1 \land \neg m_2) \land v_1) \land (\neg c_1 \lor m_2 \lor \neg v_1)$$

**Distribuição dos termos:**
1. $((c_1 \land \neg m_2 \land v_1) \land \neg c_1) \equiv \text{FALSO}$ (Contradição entre $c_1$ e $\neg c_1$)
2. $((c_1 \land \neg m_2 \land v_1) \land m_2) \equiv \text{FALSO}$ (Contradição entre $\neg m_2$ e $m_2$)
3. $((c_1 \land \neg m_2 \land v_1) \land \neg v_1) \equiv \text{FALSO}$ (Contradição entre $v_1$ e $\neg v_1$)

**Resultado:**
$$\text{FALSO} \lor \text{FALSO} \lor \text{FALSO} \equiv \text{FALSO}$$

**Conclusão:** A prova formal demonstra que, enquanto a lógica de intertravamento for verdadeira, o estado de risco é impossível (Contradição), garantindo a segurança matemática da operação.
