# Mapeamento de Variáveis de Processo para Proposições Lógicas

Na automação industrial (norma ISA-5.1), instrumentos e atuadores emitem e recebem sinais discretos (binários: $0$ = Falso / $1$ = Verdadeiro).

<img width="1046" height="1001" alt="Captura de tela 2026-08-17 151735" src="https://github.com/user-attachments/assets/70cda424-d42d-4a96-a4bc-0b8e90d9b546" />

Abaixo, as variáveis da planta industrial alimentícia (Processamento de Amendoim e Fabricação de Paçoca) são discretizadas em proposições lógicas, divididas por setores de controle local (CLPs):

---

## Setor 100: Recepção, Limpeza e Pré-Processamento (CLP 01)

| Tag Instrumento | Tipo de Dispositivo | Variável Física | Proposição Lógica | Estado 1 |
| :--- | :--- | :--- | :---: | :--- |
| **MT-101** | Transmissor de Umidade | Umidade do Amendoim | $u_1$ | Umidade do grão excede limite seguro ($U > 10\%$) |
| **AT-101** | Detector de Acidez | Acidez dos Grãos (FFA) | $q_1$ | Acidez excede o parâmetro de qualidade aceitável |
| **LT-101** | Transmissor de Nível | Nível do Silo de Espera | $l_{low1}$ | Nível do silo abaixo do limite mínimo de operação |
| **LT-101** | Transmissor de Nível | Nível do Silo de Espera | $l_{high1}$ | Nível do silo em capacidade máxima de transbordamento |
| **TT-101** | Transmissor Temp. | Temp. Ar de Secagem | $t_1$ | Temperatura do ar do secador em nível nominal |
| **FS-101** | Chave de Fluxo | Fluxo Ar do Secador | $f_1$ | Fluxo de ar do exaustor OK (acima do mínimo) |
| **M-101** | Contator de Motor | Peneira Vibratória | $m_1$ | Peneira vibratória de limpeza LIGADA |
| **ESD-100** | Botão Físico | Parada de Emergência | $e_1$ | Emergência do setor de recepção ACIONADA |

---

## Setor 200: Torra e Despeliculagem (CLP 02)

| Tag Instrumento | Tipo de Dispositivo | Variável Física | Proposição Lógica | Estado 1 |
| :--- | :--- | :--- | :---: | :--- |
| **TT-201** | Transmissor Temp. | Temp. Forno de Torra | $t_2$ | Temperatura de torra excede limite de segurança ($T > 160^\circ\text{C}$) |
| **TS-201** | Termostato / Sensor | Chama do Queimador | $c_1$ | Chama do queimador do forno DETECTADA |
| **FS-201** | Chave de Fluxo | Exaustão do Forno | $f_2$ | Fluxo de exaustão de gases e vapores OK |
| **XV-201** | Válvula Corte Rápido | Gás do Queimador | $v_1$ | Válvula de alimentação de combustível ABERTA |
| **M-201** | Inversor / Contator | Esteira do Forno | $m_2$ | Esteira do forno de torra LIGADA |
| **M-202** | Contator de Motor | Rolos Despeliculadores | $m_3$ | Rolos lixadores/despeliculadores LIGADOS |
| **ALM-201** | Sinaleiro / Buzzer | Alarme Temp. Torra | $a_1$ | Alarme de sobreaquecimento do forno ATIVADO |

---

## Setor 300: Dosagem e Moagem (CLP 03)

| Tag Instrumento | Tipo de Dispositivo | Variável Física | Proposição Lógica | Estado 1 |
| :--- | :--- | :--- | :---: | :--- |
| **WT-301** | Célula de Carga | Peso Amendoim Torrado | $w_1$ | Dosagem alvo de amendoim atingida na moega |
| **WT-302** | Célula de Carga | Peso Açúcar Refinado | $w_2$ | Dosagem alvo de açúcar refinado atingida |
| **WT-303** | Célula de Carga | Peso Sal de Cozinha | $w_3$ | Dosagem alvo de sal (NaCl) atingida |
| **XV-301** | Válvula Pneumática | Descarga da Receita | $v_2$ | Válvula de dosagem/descarga de ingredientes ABERTA |
| **M-301** | Contator / Inversor | Motor do Moinho | $m_4$ | Moinho de amendoim LIGADO e em rotação nominal |
| **M-302** | Inversor de Frequência | Transportador de Massa | $m_5$ | Rosca transportadora da mistura LIGADA |

---

## Setor 400: Compactação, Seleção e Embalagem (CLP 04)

| Tag Instrumento | Tipo de Dispositivo | Variável Física | Proposição Lógica | Estado 1 |
| :--- | :--- | :--- | :---: | :--- |
| **PS-401** | Pressostato | Pressão de Prensagem | $p_1$ | Pressão da prensa mecânica/hidráulica nominal atingida |
| **PS-402** | Pressostato | Pressão Ar Comprimido | $p_{air}$ | Pressão da linha pneumática OK ($P > 6\text{ bar}$) |
| **VS-401** | Câmera Óptica / IA | Formato e Cor da Paçoca | $i_1$ | Produto defeituoso ou paçoca quebrada DETECTADA |
| **MD-401** | Detector de Metais | Contaminação Metálica | $d_1$ | Partícula ou contaminante metálico DETECTADO |
| **SE-401** | Sensor de Presença | Posicionamento do Doce | $s_1$ | Paçoca detectada na posição de embalagem/selagem |
| **TT-401** | Transmissor Temp. | Selador Térmico | $t_3$ | Temperatura das barras de selagem térmica OK |
| **XV-401** | Válvula Pneumática | Jato de Rejeição | $v_3$ | Válvula de ar de descarte/rejeição ABERTA |
| **M-401** | Contator de Motor | Esteira de Embalagem | $m_6$ | Esteira de embalagem automatizada LIGADA |
| **ESD-400** | Botão Físico | Parada de Emergência | $e_2$ | Parada de emergência do setor 400 ACIONADA |
