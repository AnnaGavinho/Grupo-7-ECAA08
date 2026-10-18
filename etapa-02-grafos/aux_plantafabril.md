# Memorial Descritivo de Layout Fabril e Corredores Logísticos — Fábrica de Paçoca

**Disciplina:** ECAA08 — Automática (2026.2) — UNIFEI  
**Projeto:** SCADA-Core Automática / Linha de Produção de Paçoca  
**Equipe:** Grupo 7  
**Perfil:** Engenharia de Controle e Automação (Matemática Discreta & Teoria dos Grafos)  

---

## 1. Visão Geral do Layout Fabril

O complexo agroindustrial do Grupo 7 é projetado de acordo com as Boas Práticas de Fabricação (BPF), normas sanitárias de alimentos (HACCP/APPCC), segregação de matérias-primas e fluxo linear unidirecional (*Forward Flow*), impedindo contaminações cruzadas entre a recepção de grãos brutos do campo e as áreas limpas de envase do produto final.

```
                  [ PORTARIA / BALANÇA RODOVIÁRIA ENTRADA ]
                                     │
      ┌──────────────────────────────┴──────────────────────────────┐
      │                                                             │
      ▼                                                             ▼
┌─────────────────────────┐                               ┌─────────────────────────┐
│  ARMAZENAMENTO DE       │                               │  ARMAZENAMENTO DE       │
│  INSUMOS / MATÉRIAS-PRI.│                               │  PRODUTOS ACABADOS      │
│  (Galpão A - Entrada)   │                               │  (Galpão B - Saída)     │
│  - Boxes de Amendoim    │                               │  - Paçoca Tradicional   │
│  - Silos de Açúcar/Sal  │                               │  - Paçoca Zero Açúcar   │
│  - Tanque de Glucose    │                               │  - Paçoca Premium       │
│  - Bobinas de Filme     │                               │  - Docas de Expedição   │
└────────────┬────────────┘                               └────────────▲────────────┘
             │                                                         │
             ▼                                                         │
┌──────────────────────────────────────────────────────────────────────┴────────────┐
│                    NÚCLEO FABRIL DE PROCESSAMENTO & ENVASE                        │
│                                                                                   │
│  [S100: Recepção/Limpeza] ➔ [S200: Torra/Despel.] ➔ [S300: Dosagem/Moagem]       │
│                                      │                                            │
│                                      ▼                                            │
│                         [S400: Prensagem/Embalagem] ➔ [Ensaque/Paletização]       │
└───────────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
                  [ BALANÇA RODOVIÁRIA SAÍDA / GUICHE FISCAL ]
```

---

## 2. Detalhamento dos Setores e Ativos Físicos

### 2.1. Setor de Recebimento e Armazenamento de Insumos (Galpão A)
Área dimensionada para receber grãos agrícolas e matérias-primas com controle rígido de umidade e atmosfera:
* **Boxes de Armazenagem de Amendoim:** Divisórias modulares em concreto armado impermeabilizado:
  * *Box 01:* Amendoim em vagem/casca (para processamento inicial).
  * *Box 02:* Amendoim pré-descascado em grão cru selecionado.
* **Silos Verticais de Sacarose e Sal:** Silos metálicos em aço inox AISI 304 com desumidificação por injeção de ar seco e filtros de manga para contenção de finos.
* **Tanque de Insumos Líquidos (Glucose):** Reservatório encamisado com agitação lenta para xarope de glicose de milho (utilizado como aglutinante na formulação de paçocas moldadas).
* **Almoxarifado de Embalagens:** Espaço fechado e climatizado para bobinas de filme flexível bi-orientado (BOPP/PE) e caixas display de papelão ondulado.
* **Moega de Recepção Rodoviária:** Sistema basculador pneumático para descarregamento de carretas graneleiras com roscas helicoidais de alimentação.

---

### 2.2. Núcleo Fabril de Processamento (Setores 100 a 400)
Operação contínua, estanque e automatizada por malha de CLPs integrados via protocolo industrial PROFINET/Modbus:

* **Setor 100 — Recepção e Pré-Tratamento:**
  * Peneiras vibratórias excêntricas de 3 estágios (`M-101`) para remoção de talos, folhas e pedregulhos.
  * Secadores rotativos de leito fluidizado com aquecimento a vapor e exaustão de ar úmido (`TT-101`, `FS-101`).
* **Setor 200 — Tratamento Térmico e Limpeza Fina:**
  * Selecionadora óptica de alta velocidade com câmeras RGB lineares e banco de 64 ejetores pneumáticos de descarte de grãos imperfeitos ou com manchas escuras.
  * Forno Contínuo de Torra a gás GN/GLP com controle PID de 3 zonas térmicas independentes ($160^\circ\text{C}$ a $180^\circ\text{C}$) e intertravamento redundante de chama (`TS-201`, `XV-201`).
  * Cilindros de rolos emborrachados despeliculadores (`M-202`) e ciclone de sucção para extração da película avermelhada.
* **Setor 300 — Dosagem, Moagem e Homogeneização:**
  * Manifold dosador gravimétrico com balanças dosadoras de células de carga de alta exatidão (`WT-301/302/303`).
  * Linha de moagem redundante em paralelo com Moinho de Martelos A (`MOI-301A`) e Moinho B reserva (`MOI-301B`) com camisas de arrefecimento para controle de liberação do óleo de amendoim.
  * Misturador Homogeneizador horizontal de duplo eixo helicoidal (`HOM-301`) para incorporação perfeita de amendoim moído, açúcar e sal.
* **Setor 400 — Compactação e Envasamento:**
  * Moega Pulmão intermediária (`MOE-302_Pulmao`) de alívio e desacoplamento dinâmico de produção.
  * Prensas Rotativas de Alta Pressão (`PRN-401`) com matrizes para formato cilíndrico ("rolha") e formato prismático ("quadrada").
  * Sistema de Visão Computacional para detecção de peças trincadas ou com peso desconforme, acoplado a detector magnético/indutivo de partículas metálicas (`MD-401`).
  * Embaladoras horizontais *Flow-Pack* automatizadas com injeção de gás inerte ($N_2$) para proteção contra oxidação lipídica.

---

### 2.3. Setor de Armazenamento e Expedição de Produtos Acabados (Galpão B)
Galpão com piso industrial em resina epóxi, climatizado e dotado de estruturas porta-paletes verticais:
* **Área de Encaixotamento e Paletização:** Robô cartesiano de empacotamento em caixas de embarque e envolvedora automática de filme *stretch*.
* **Áreas Demarcadas de Estoque (Endereçamento WMS):**
  * *Rua 1:* Paçoca Tradicional Cilíndrica (Rolha).
  * *Rua 2:* Paçoca Tradicional Quadrada / Caseira.
  * *Rua 3:* Linha Diet / Zero Açúcar (com maltitol/estévia).
  * *Rua 4:* Paçoca Gourmet / Coberta com Chocolate.
* **Plataforma de Expedição (Docas):** 4 docas com niveladores eletro-hidráulicos e cortinas de ar para carregamento acelerado de carretas baú.

---

## 3. Roteamento Logístico, Frota de AGVs e Anel Viário

A planta opera sob um conceito de **Rede Multicamada**:
1. **Camada de Materiais ($G_M$ — DAG):** Fluxo acíclico irreversível que transforma grãos de amendoim e insumos em paçocas paletizadas.
2. **Camada de Veículos ($G_V$ — Dígrafo com Ciclos):** Anel viário periférico de sentido único que conecta a portaria, o pátio de manobras, o Galpão A, o núcleo fabril, o Galpão B e as docas, retornando à balança de saída e portaria fiscal.
3. **Camada de Amostragem Autônoma (AGV):** Veículo Guiado Automaticamente guiado por sensores magnéticos no piso fabril. O AGV parte do Laboratório de Qualidade Central (`Lab`), coleta periodicamente alíquotas de matéria-prima nos silos, amendoim torrado no Forno, massa moída no Homogeneizador e paçocas compactadas na Prensa, retornando ao laboratório para análises de atividade de água ($a_w$), índice de peróxidos e microbiologia, resolvendo em tempo real o Problema do Caixeiro-Viajante (TSP) com a heurística NN + 2-Opt.

---

## 4. Normas Técnicas e Padrões Industriais Adotados

| Norma / Padrão | Escopo de Aplicação na Fábrica de Paçoca |
| :--- | :--- |
| **ISA-5.1** | Identificação alfanumérica de tags de instrumentação (ex: `TT-201`, `XV-301`, `WT-301`). |
| **ISA-95** | Integração em 4 níveis da pirâmide de automação (Chão de fábrica $\leftrightarrow$ CLP $\leftrightarrow$ SCADA $\leftrightarrow$ MES/ERP). |
| **IEC 61508 / IEC 61511** | Segurança Funcional e Sistemas Instrumentados de Segurança (SIS) para corte rápido de combustível no Forno de Torra. |
| **HACCP / RDC 275 ANVISA** | Boas Práticas de Fabricação de Alimentos e Pontos Críticos de Controle (PCC). |
