# Aula 06: LÃ³gica de Predicados, Quantificadores e Varredura Global de Sensores

## 1. Fundamentos MatemÃ¡ticos: LÃ³gica de Predicados e Quantificadores

Nas etapas iniciais do projeto (Aulas 02 a 05), as condiÃ§Ãµes de seguranÃ§a e intertravamento foram tratadas atravÃ©s da **LÃ³gica Proposicional**, na qual cada sinal de sensor ou atuador Ã© discretizado em uma variÃ¡vel booleana fixa ($0$ ou $1$).

Contudo, uma planta industrial agroalimentÃ­cia automatizada â€” como a linha de fabricaÃ§Ã£o contÃ­nua de paÃ§oca â€” possui dezenas de instrumentos distribuÃ­dos entre recepÃ§Ã£o, torra, moagem, prensagem e embalagem. Tratar cada sensor individualmente em equaÃ§Ãµes estÃ¡ticas torna o software supervisÃ³rio rÃ­gido, nÃ£o escalÃ¡vel e sujeito a erros na manutenÃ§Ã£o de cÃ³digo.

Para superar essa limitaÃ§Ã£o, emprega-se a **LÃ³gica de Primeira Ordem (LPO)** ou **LÃ³gica de Predicados**.

### 1.1. Universo de Discurso e Predicados

* **Universo de Discurso ($\mathcal{U}$):** Conjunto de todos os elementos sob supervisÃ£o. Na arquitetura proposta, $\mathcal{U}$ pode ser o conjunto de todos os instrumentos ($\mathcal{I}$), setores de controle ($\mathcal{S}$), atuadores/vÃ¡lvulas ($\mathcal{V}$) ou motores/acionamentos ($\mathcal{M}$).

* **Predicado $P(x)$:** FunÃ§Ã£o proposicional parametrizada que mapeia um elemento $x \in \mathcal{U}$ em um valor-verdade $\{\text{Verdadeiro}, \text{Falso}\}$.

  * Exemplo: $\text{IsOnline}(x) \in \{0, 1\}$ indica se o instrumento $x$ estÃ¡ comunicando ativamente na rede industrial (Profinet/Modbus TCP).

  * Exemplo: $\text{IsCalibrado}(x) \in \{0, 1\}$ indica se o instrumento $x$ estÃ¡ com laudo metrolÃ³gico vÃ¡lido.

  * Exemplo: $\text{SobreTemp}(x, T_{\text{max}}) \in \{0, 1\}$ indica se o termÃ´metro $x$ superou o limite seguro.

### 1.2. Quantificador Universal ($\forall$)

O quantificador universal estabelece que uma propriedade lÃ³gica Ã© satisfeita por **todos** os elementos do universo de discurso:

$$
\forall x \in \mathcal{U}, P(x)
$$

Em um domÃ­nio finito de instrumentos $\mathcal{U} = \{i_1, i_2, \dots, i_n\}$, a quantificaÃ§Ã£o universal equivale Ã  **conjunÃ§Ã£o generalizada**:

$$
\forall x \in \mathcal{U}, P(x)
\iff
P(i_1) \land P(i_2) \land \dots \land P(i_n)
$$

* **CritÃ©rio de Curto-Circuito (Falsidade):** Basta a ocorrÃªncia de um Ãºnico elemento $k \in \mathcal{U}$ tal que $P(k) = \text{Falso}$ (denominado **contraexemplo**) para invalidar imediatamente toda a proposiÃ§Ã£o $\forall x P(x)$.

### 1.3. Quantificador Existencial ($\exists$)

O quantificador existencial expressa que uma propriedade Ã© satisfeita por **pelo menos um** elemento do domÃ­nio:

$$
\exists x \in \mathcal{U}, Q(x)
$$

Para um universo finito $\mathcal{U} = \{i_1, i_2, \dots, i_n\}$, a quantificaÃ§Ã£o existencial equivale Ã  **disjunÃ§Ã£o generalizada**:

$$
\exists x \in \mathcal{U}, Q(x)
\iff
Q(i_1) \lor Q(i_2) \lor \dots \lor Q(i_n)
$$

* **CritÃ©rio de Curto-Circuito (Veracidade):** Basta identificar uma Ãºnica **testemunha** (*witness*) $k \in \mathcal{U}$ tal que $Q(k) = \text{Verdadeiro}$ para validar imediatamente a proposiÃ§Ã£o $\exists x Q(x)$.

### 1.4. QuantificaÃ§Ã£o sobre SubdomÃ­nios Restritos (Predicado GuardiÃ£o)

Na engenharia de automaÃ§Ã£o, comumente quantifica-se apenas sobre uma classe restrita de instrumentos, por exemplo, apenas transmissores de temperatura do Forno de Torra ou apenas detectores de metais.

1. **Universal com DomÃ­nio Restrito (Exige ImplicaÃ§Ã£o $\rightarrow$):**

$$
\forall x \in \mathcal{S}, P(x)
\iff
\forall x (\text{PertenceAoSetor}(x, \mathcal{S}) \rightarrow P(x))
$$

2. **Existencial com DomÃ­nio Restrito (Exige ConjunÃ§Ã£o $\land$):**

$$
\exists x \in \mathcal{S}, Q(x)
\iff
\exists x (\text{PertenceAoSetor}(x, \mathcal{S}) \land Q(x))
$$

> **IMPORTANT**
>
> A implicaÃ§Ã£o lÃ³gica ($\rightarrow$) Ã© indispensÃ¡vel no quantificador universal para assegurar que elementos fora do subconjunto nÃ£o falseiem a avaliaÃ§Ã£o por vacuidade:
>
> $$
> F \rightarrow P(x) \equiv V
> $$
>
> No existencial, a conjunÃ§Ã£o ($\land$) garante que a testemunha de fato pertenÃ§a ao subdomÃ­nio alvo.

### 1.5. Leis de De Morgan para Quantificadores (Dualidade LÃ³gica)

A negaÃ§Ã£o formal de quantificadores Ã© o fundamento matemÃ¡tico para a engenharia de seguranÃ§a *Fail-Safe* e sÃ­ntese de alarmes:

$$
\neg (\forall x P(x)) \equiv \exists x (\neg P(x))
$$

$$
\neg (\exists x Q(x)) \equiv \forall x (\neg Q(x))
$$

**InterpretaÃ§Ã£o na FÃ¡brica de PaÃ§oca:**

* *"NÃ£o Ã© verdade que todos os instrumentos estÃ£o calibrados e comunicando"* $\iff$ *"Existe ao menos um instrumento offline ou descalibrado"*.

* *"NÃ£o existe contaminaÃ§Ã£o metÃ¡lica ou produto quebrado na linha"* $\iff$ *"Todos os sensores de qualidade atestam produto conforme"*.

---

## 2. AplicaÃ§Ã£o em Engenharia: Motor de Varredura Global (SCADA-Core)

No ciclo de varredura (*scan cycle*) do SCADA-Core, o motor de diagnÃ³stico supervisiona periodicamente o ecossistema de instrumentos da planta de paÃ§oca.

```mermaid
graph TD
    A["InÃ­cio do Scan Cycle SCADA"] --> B["Amostragem dos Barramentos e Tags"]
    B --> C{"âˆ€ x âˆˆ Instrumentos: Online(x) âˆ§ Calibrado(x)?"}
    
    C -- "Sim (True)" --> D["ProntidÃ£o Global de InstrumentaÃ§Ã£o: OK"]
    C -- "NÃ£o (False) [âˆƒ x: Â¬Online(x)]" --> E["Alarme: Falha de Instrumento / ComunicaÃ§Ã£o"]
    
    D --> F{"âˆƒ x âˆˆ DetectoresMetais: MetalDetectado(x)?"}
    F -- "Sim (True) [ContaminaÃ§Ã£o]" --> G["INTERTRAVAMENTO CRÃTICO: Parada da Esteira M-401"]
    F -- "NÃ£o (False) [âˆ€ x: Â¬Metal(x)]" --> H["VerificaÃ§Ã£o de AlÃ­vio TÃ©rmico e Permissivos"]
    
    H --> I{"âˆƒ t âˆˆ Termometros_Forno: Temp(t) > 160Â°C?"}
    I -- "Sim (True)" --> J["TRIP FORNO: Corte de GÃ¡s XV-201 + Alarme ALM-201"]
    I -- "NÃ£o (False)" --> K["Permissivo de ProduÃ§Ã£o Liberado"]
```

---

## 3. Modelagem de Predicados da FÃ¡brica de PaÃ§oca (Grupo 7)

Conforme o mapeamento formal de variÃ¡veis definido no catÃ¡logo ISA-5.1 da fÃ¡brica (Setores 100, 200, 300 e 400):

### 3.1. Tabela de Predicados Operacionais

| **Predicado** | **NotaÃ§Ã£o** | **DescriÃ§Ã£o FÃ­sica no Processo** |
|---|---|---|
| $\text{IsOnline}(x)$ | $O(x)$ | O instrumento $x$ responde no barramento de campo sem timeout |
| $\text{IsCalibrado}(x)$ | $C(x)$ | O instrumento $x$ estÃ¡ dentro da validade de calibraÃ§Ã£o metrolÃ³gica |
| $\text{IsSaudavel}(x)$ | $S(x)$ | $O(x) \land C(x)$ (Integridade completa do canal de sinal) |
| $\text{IsSobretemperatura}(x)$ | $T_{\text{hi}}(x)$ | O transmissor de temperatura $x \in \mathcal{T}$ reporta $T > T_{\text{max}}$ (ex: Forno $> 160^\circ\text{C}$) |
| $\text{IsMetalDetectado}(x)$ | $D_{\text{met}}(x)$ | O detector $x \in \mathcal{D}_{\text{met}}$ detecta fragmento ferroso/nÃ£o-ferroso |
| $\text{IsDefeitoOptico}(x)$ | $I_{\text{vis}}(x)$ | A cÃ¢mera de IA $x \in \mathcal{V}_{\text{vis}}$ detecta paÃ§oca quebrada ou coloraÃ§Ã£o anÃ´mala |
| $\text{IsPressaoArOK}(x)$ | $P_{\text{air}}(x)$ | O pressostato $x \in \mathcal{P}$ mede pressÃ£o da rede pneumÃ¡tica $> 6\text{ bar}$ |
| $\text{IsValvulaAberta}(x)$ | $V_{\text{op}}(x)$ | A vÃ¡lvula $x \in \mathcal{V}$ confirma sensor de fim de curso em estado ABERTA |
| $\text{IsMotorLigado}(x)$ | $M_{\text{on}}(x)$ | O contator/inversor do motor $x \in \mathcal{M}$ reporta confirmaÃ§Ã£o de giro |
| $\text{IsEmergenciaAtiva}(x)$ | $E_{\text{act}}(x)$ | O botÃ£o de emergÃªncia fÃ­sico $x \in \mathcal{E}$ estÃ¡ pressionado |

### 3.2. EquaÃ§Ãµes LÃ³gicas Globais de SupervisÃ£o

1. **ProntidÃ£o Geral da Planta para Partida ($\text{PlantReadiness}$):**

$$
\text{PlantReadiness}
\iff
(\forall x \in \mathcal{I}, \text{IsSaudavel}(x))
\land
(\neg \exists e \in \mathcal{E}, \text{IsEmergenciaAtiva}(e))
$$

2. **Intertrava CrÃ­tica de SeguranÃ§a Alimentar ($\text{QualityTrip}$):**

$$
\text{QualityTrip}
\iff
(\exists d \in \mathcal{D}_{\text{met}}, \text{IsMetalDetectado}(d))
\lor
(\exists v \in \mathcal{V}_{\text{vis}}, \text{IsDefeitoOptico}(v))
$$

3. **Intertravamento de AlÃ­vio TÃ©rmico do Forno de Torra ($\text{ThermalTrip}_{\text{Forno}}$):**

$$
\text{ThermalTrip}_{\text{Forno}}
\iff
\exists t \in \mathcal{T}_{\text{Forno}},
\text{IsSobretemperatura}(t)
$$

4. **Permissivo de Rota e Embalagem ($\text{Perm}_{\text{Embalagem}}$):**

$$
\text{Perm}_{\text{Embalagem}}
\iff
(\forall p \in \mathcal{P}_{\text{Pneum}}, \text{IsPressaoArOK}(p))
\land
(\forall v \in \mathcal{V}_{\text{Linha}}, \text{IsValvulaAberta}(v))
\land
(\exists m \in \mathcal{M}_{\text{Esteiras}}, \text{IsMotorLigado}(m))
$$


