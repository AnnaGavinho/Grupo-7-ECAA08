# 00 - Insumos e Definição da Planta

## 1. Definição Formal da Planta
A planta industrial atua no processamento agroindustrial e beneficiamento de grãos (amendoim) até a fabricação e embalagem automatizada de doces à base de amendoim (paçoca). O processo abrange desde a recepção, triagem, secagem, limpeza, seleção óptica, tratamento térmico (torra), moagem, dosagem, prensagem/compactação e embalagem final.

---

## 2. Insumos Primários e Matérias-Primas do Processo

### Matérias-Primas Principais (Ingredientes)
* **Amendoim (em grão/com casca e descascado):** Matéria-prima primária vegetal. Fornece a base do produto e os óleos naturais responsáveis pela liga na prensa.
* **Açúcar Refinado:** Agente adoçante e estruturante do produto final.
* **Sal de Cozinha (NaCl):** Realçador de sabor e conservante.

### Insumos Auxiliares e Energéticos do Processo
* **Ar Quente / Energia Térmica:** Utilizado nos secadores de leito/carretinha e no forno de tratamento térmico/torra (> 160 °C).
* **Ar Comprimido:** Utilizado nas pistolas de rejeição das selecionadoras ópticas e no acionamento de atuadores pneumáticos ao longo da linha.
* **Energia Elétrica:** Utilizada no acionamento de peneiras vibratórias, exaustores/sugadores, rolos despeliculadores, moinhos, prensas mecânicas e esteiras transportadoras.
* **Embalagens (Filme Plástico Flexível):** Bobinas de filme contínuo para selagem pneumática/térmica das paçocas.

---

## 3. Arquitetura Geral do SCADA (Supervisório)

### Nível 0 — Chão de Fábrica (Sensores e Atuadores)
* **Sensores:**
  * Medidores de umidade e acidez na recepção.
  * Sensores ópticos / Câmeras com IA para seleção de grãos por cor e defeitos.
  * Detectores de metais (indutivos/magnéticos).
  * Sensores de temperatura e fluxo de ar nos fornos de torra e secadores.
  * Sensores de peso/células de carga para dosagem de açúcar, sal e amendoim.
  * Sensores de presença/visão para detecção de paçocas quebradas na esteira.
* **Atuadores:**
  * Válvulas pneumáticas de jato de ar (descarte óptico).
  * Motores elétricos com inversor de frequência (esteiras, rolos lixadores, moinho e prensa).
  * Resistências elétricas e queimadores dos fornos.
  * Seladores térmicos para embalagem.

### Nível 1 — Controle Local (PLCs / CLPs)
* **CLP 01 — Recepção, Limpeza e Pré-Processamento:** Controle de peneiras, secadores e armazenagem nos silos.
* **CLP 02 — Torra e Despeliculagem:** Controle em malha fechada de temperatura (PID) e fluxo de exaustão.
* **CLP 03 — Dosagem e Moagem:** Controle de receita (pesagem exata de amendoim, açúcar e sal) e acionamento do moinho.
* **CLP 04 — Compactação e Embalagem:** Sincronismo da prensa, rejeição de produtos defeituosos/metalizados e selagem.

### Nível 2 — Supervisão e Operação (SCADA)
* **Telas HMI/SCADA:**
  * **Tela 01 - Visão Geral do Processo (P&ID Simplificado):** Fluxo do amendoim da recepção até o empacotamento.
  * **Tela 02 - Controle de Torra:** Curvas de temperatura, tempo de retenção e alarme de sobreaquecimento.
  * **Tela 03 - Dosagem de Receita:** Ajuste dos percentuais de amendoim, açúcar e sal.
  * **Tela 04 - Gestão de Alarmes e Qualidade:** Histórico de rejeições (seleção óptica, detecção de metais e peças quebradas).
