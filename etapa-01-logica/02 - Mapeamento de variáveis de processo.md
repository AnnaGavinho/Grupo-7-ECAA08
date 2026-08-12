# Mapeamento de Variáveis de Processo para Proposições Lógicas

Na automação industrial (norma ISA-5.1), instrumentos e atuadores emitem e recebem sinais discretos (binários: $0$ = Falso / $1$ = Verdadeiro).

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1980 1300" width="1980" height="1300">
<rect x="0" y="0" width="100%" height="100%" fill="white"/>
<defs>
<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M2 1L8 5L2 9" fill="none" stroke="black" stroke-width="1"/></marker>
<marker id="bigarrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
<path d="M1 1L9 5L1 9 Z" fill="black"/></marker>
</defs>
<text x="990.0" y="35" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">PLANTA DE PROCESSAMENTO DE AMENDOIM E FABRICAÇÃO DE PAÇOCA</text>
<text x="990.0" y="55" font-family="Arial" font-size="13" text-anchor="middle">Diagrama de instrumentação simplificado (P&amp;ID) — mapeamento de variáveis de processo (ISA-5.1)</text>
<rect x="30" y="70" width="920" height="520" fill="white" stroke="black" stroke-width="1" stroke-dasharray="6,4"/>
<text x="490.0" y="92" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">SETOR 100: Recepção, Limpeza e Pré-Processamento (CLP 01)</text>
<line x1="40" y1="100" x2="940" y2="100" stroke="black" stroke-width="1"/>
<rect x="115.0" y="307.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="190.0" y="334.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Recepção / Silo</text>
<text x="190.0" y="346.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">de Grãos</text>
<rect x="315.0" y="307.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="390.0" y="334.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Peneira</text>
<text x="390.0" y="346.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Vibratória</text>
<rect x="515.0" y="307.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="590.0" y="334.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Secador de</text>
<text x="590.0" y="346.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Grãos</text>
<rect x="715.0" y="307.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="790.0" y="340.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Silo de Espera</text>
<line x1="265.0" y1="340.0" x2="311.0" y2="340.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="465.0" y1="340.0" x2="511.0" y2="340.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="665.0" y1="340.0" x2="711.0" y2="340.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<circle cx="155.0" cy="170" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="129.0" y1="170" x2="181.0" y2="170" stroke="black" stroke-width="0.8"/>
<text x="155.0" y="164" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">MT-101</text>
<text x="155.0" y="181" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">u₁</text>
<line x1="155.0" y1="196" x2="190.0" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="225.0" cy="170" r="20" fill="#f5c4c4" stroke="black" stroke-width="1.5"/>
<text x="225.0" y="174" font-family="Arial" font-size="8" font-weight="bold" font-style="normal" text-anchor="middle">STOP</text>
<text x="225.0" y="142" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">ESD-100</text>
<text x="225.0" y="204" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">e₁</text>
<line x1="225.0" y1="196" x2="190.0" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="190.0" cy="530" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="164.0" y1="530" x2="216.0" y2="530" stroke="black" stroke-width="0.8"/>
<text x="190.0" y="524" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">AT-101</text>
<text x="190.0" y="541" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">q₁</text>
<line x1="190.0" y1="504" x2="190.0" y2="373.0" stroke="black" stroke-width="0.8"/>
<circle cx="390.0" cy="170" r="20" fill="white" stroke="black" stroke-width="1.2"/>
<text x="390.0" y="174" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">M</text>
<text x="390.0" y="142" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">M-101</text>
<text x="390.0" y="204" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">m₁</text>
<line x1="390.0" y1="196" x2="390.0" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="590.0" cy="170" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="564.0" y1="170" x2="616.0" y2="170" stroke="black" stroke-width="0.8"/>
<text x="590.0" y="164" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TT-101</text>
<text x="590.0" y="181" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">t₁</text>
<line x1="590.0" y1="196" x2="590.0" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="590.0" cy="530" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="564.0" y1="530" x2="616.0" y2="530" stroke="black" stroke-width="0.8"/>
<text x="590.0" y="524" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">FS-101</text>
<text x="590.0" y="541" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">f₁</text>
<line x1="590.0" y1="504" x2="590.0" y2="373.0" stroke="black" stroke-width="0.8"/>
<circle cx="790.0" cy="170" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="764.0" y1="170" x2="816.0" y2="170" stroke="black" stroke-width="0.8"/>
<text x="790.0" y="164" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">LT-101</text>
<text x="790.0" y="181" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">l_low1 / l_high1</text>
<line x1="790.0" y1="196" x2="790.0" y2="307.0" stroke="black" stroke-width="0.8"/>
<rect x="1010" y="70" width="920" height="520" fill="white" stroke="black" stroke-width="1" stroke-dasharray="6,4"/>
<text x="1470.0" y="92" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">SETOR 200: Torra e Despeliculagem (CLP 02)</text>
<line x1="1020" y1="100" x2="1920" y2="100" stroke="black" stroke-width="1"/>
<rect x="1128.3333333333333" y="307.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1203.3333333333333" y="340.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Forno de Torra</text>
<rect x="1395.0" y="307.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1470.0" y="334.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Esteira do</text>
<text x="1470.0" y="346.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Forno</text>
<rect x="1661.6666666666667" y="307.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1736.6666666666667" y="334.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Rolos</text>
<text x="1736.6666666666667" y="346.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Despeliculadores</text>
<line x1="1278.3333333333333" y1="340.0" x2="1391.0" y2="340.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="1545.0" y1="340.0" x2="1657.6666666666667" y2="340.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<circle cx="1133.3333333333333" cy="170" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1107.3333333333333" y1="170" x2="1159.3333333333333" y2="170" stroke="black" stroke-width="0.8"/>
<text x="1133.3333333333333" y="164" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TT-201</text>
<text x="1133.3333333333333" y="181" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">t₂</text>
<line x1="1133.3333333333333" y1="196" x2="1203.3333333333333" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="1203.3333333333333" cy="170" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1177.3333333333333" y1="170" x2="1229.3333333333333" y2="170" stroke="black" stroke-width="0.8"/>
<text x="1203.3333333333333" y="164" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">FS-201</text>
<text x="1203.3333333333333" y="181" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">f₂</text>
<line x1="1203.3333333333333" y1="196" x2="1203.3333333333333" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="1273.3333333333333" cy="170" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1247.3333333333333" y1="170" x2="1299.3333333333333" y2="170" stroke="black" stroke-width="0.8"/>
<text x="1273.3333333333333" y="164" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">ALM-201</text>
<text x="1273.3333333333333" y="181" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">a₁</text>
<line x1="1273.3333333333333" y1="196" x2="1203.3333333333333" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="1168.3333333333333" cy="530" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1142.3333333333333" y1="530" x2="1194.3333333333333" y2="530" stroke="black" stroke-width="0.8"/>
<text x="1168.3333333333333" y="524" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TS-201</text>
<text x="1168.3333333333333" y="541" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">c₁</text>
<line x1="1168.3333333333333" y1="504" x2="1203.3333333333333" y2="373.0" stroke="black" stroke-width="0.8"/>
<polygon points="1222.3333333333333,520.0 1238.3333333333333,530 1222.3333333333333,540.0" fill="white" stroke="black" stroke-width="1.2"/>
<polygon points="1254.3333333333333,520.0 1238.3333333333333,530 1254.3333333333333,540.0" fill="white" stroke="black" stroke-width="1.2"/>
<text x="1238.3333333333333" y="506" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">XV-201</text>
<text x="1238.3333333333333" y="560" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">v₁</text>
<line x1="1238.3333333333333" y1="504" x2="1203.3333333333333" y2="373.0" stroke="black" stroke-width="0.8"/>
<circle cx="1470.0" cy="170" r="20" fill="white" stroke="black" stroke-width="1.2"/>
<text x="1470.0" y="174" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">M</text>
<text x="1470.0" y="142" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">M-201</text>
<text x="1470.0" y="204" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">m₂</text>
<line x1="1470.0" y1="196" x2="1470.0" y2="307.0" stroke="black" stroke-width="0.8"/>
<circle cx="1736.6666666666667" cy="170" r="20" fill="white" stroke="black" stroke-width="1.2"/>
<text x="1736.6666666666667" y="174" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">M</text>
<text x="1736.6666666666667" y="142" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">M-202</text>
<text x="1736.6666666666667" y="204" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">m₃</text>
<line x1="1736.6666666666667" y1="196" x2="1736.6666666666667" y2="307.0" stroke="black" stroke-width="0.8"/>
<rect x="30" y="650" width="920" height="520" fill="white" stroke="black" stroke-width="1" stroke-dasharray="6,4"/>
<text x="490.0" y="672" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">SETOR 300: Dosagem e Moagem (CLP 03)</text>
<line x1="40" y1="680" x2="940" y2="680" stroke="black" stroke-width="1"/>
<rect x="115.0" y="887.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="190.0" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Moega de</text>
<text x="190.0" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Dosagem</text>
<rect x="315.0" y="887.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="390.0" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Válvula de</text>
<text x="390.0" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Descarga</text>
<rect x="515.0" y="887.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="590.0" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Moinho de</text>
<text x="590.0" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Amendoim</text>
<rect x="715.0" y="887.0" width="150" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="790.0" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Transportador</text>
<text x="790.0" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">de Massa</text>
<line x1="265.0" y1="920.0" x2="311.0" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="465.0" y1="920.0" x2="511.0" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="665.0" y1="920.0" x2="711.0" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<circle cx="155.0" cy="750" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="129.0" y1="750" x2="181.0" y2="750" stroke="black" stroke-width="0.8"/>
<text x="155.0" y="744" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">WT-301</text>
<text x="155.0" y="761" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">w₁</text>
<line x1="155.0" y1="776" x2="190.0" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="225.0" cy="750" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="199.0" y1="750" x2="251.0" y2="750" stroke="black" stroke-width="0.8"/>
<text x="225.0" y="744" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">WT-303</text>
<text x="225.0" y="761" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">w₃</text>
<line x1="225.0" y1="776" x2="190.0" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="190.0" cy="1110" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="164.0" y1="1110" x2="216.0" y2="1110" stroke="black" stroke-width="0.8"/>
<text x="190.0" y="1104" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">WT-302</text>
<text x="190.0" y="1121" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">w₂</text>
<line x1="190.0" y1="1084" x2="190.0" y2="953.0" stroke="black" stroke-width="0.8"/>
<polygon points="374.0,740.0 390.0,750 374.0,760.0" fill="white" stroke="black" stroke-width="1.2"/>
<polygon points="406.0,740.0 390.0,750 406.0,760.0" fill="white" stroke="black" stroke-width="1.2"/>
<text x="390.0" y="726" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">XV-301</text>
<text x="390.0" y="780" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">v₂</text>
<line x1="390.0" y1="776" x2="390.0" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="590.0" cy="750" r="20" fill="white" stroke="black" stroke-width="1.2"/>
<text x="590.0" y="754" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">M</text>
<text x="590.0" y="722" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">M-301</text>
<text x="590.0" y="784" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">m₄</text>
<line x1="590.0" y1="776" x2="590.0" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="790.0" cy="750" r="20" fill="white" stroke="black" stroke-width="1.2"/>
<text x="790.0" y="754" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">M</text>
<text x="790.0" y="722" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">M-302</text>
<text x="790.0" y="784" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">m₅</text>
<line x1="790.0" y1="776" x2="790.0" y2="887.0" stroke="black" stroke-width="0.8"/>
<rect x="1010" y="650" width="920" height="520" fill="white" stroke="black" stroke-width="1" stroke-dasharray="6,4"/>
<text x="1470.0" y="672" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">SETOR 400: Compactação, Seleção e Embalagem (CLP 04)</text>
<line x1="1020" y1="680" x2="1920" y2="680" stroke="black" stroke-width="1"/>
<rect x="1085.0" y="887.0" width="103.33333333333334" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1136.6666666666667" y="920.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Prensa Mecânica</text>
<rect x="1218.3333333333333" y="887.0" width="103.33333333333334" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1270.0" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Câmera Óptica /</text>
<text x="1270.0" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">IA</text>
<rect x="1351.6666666666667" y="887.0" width="103.33333333333334" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1403.3333333333335" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Detector de</text>
<text x="1403.3333333333335" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Metais</text>
<rect x="1485.0" y="887.0" width="103.33333333333334" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1536.6666666666667" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Rejeição /</text>
<text x="1536.6666666666667" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Posição</text>
<rect x="1618.3333333333335" y="887.0" width="103.33333333333334" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1670.0000000000002" y="914.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Seladora</text>
<text x="1670.0000000000002" y="926.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Térmica</text>
<rect x="1751.6666666666667" y="887.0" width="103.33333333333334" height="66" fill="white" stroke="black" stroke-width="1.5" rx="3"/>
<text x="1803.3333333333335" y="920.0" font-family="Arial" font-size="10.5" font-weight="bold" font-style="normal" text-anchor="middle">Saída Embalagem</text>
<line x1="1188.3333333333335" y1="920.0" x2="1214.3333333333333" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="1321.6666666666667" y1="920.0" x2="1347.6666666666667" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="1455.0000000000002" y1="920.0" x2="1481.0" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="1588.3333333333335" y1="920.0" x2="1614.3333333333335" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<line x1="1721.666666666667" y1="920.0" x2="1747.6666666666667" y2="920.0" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<circle cx="1136.6666666666667" cy="750" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1110.6666666666667" y1="750" x2="1162.6666666666667" y2="750" stroke="black" stroke-width="0.8"/>
<text x="1136.6666666666667" y="744" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">PS-401</text>
<text x="1136.6666666666667" y="761" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">p₁</text>
<line x1="1136.6666666666667" y1="776" x2="1136.6666666666667" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="1136.6666666666667" cy="1110" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1110.6666666666667" y1="1110" x2="1162.6666666666667" y2="1110" stroke="black" stroke-width="0.8"/>
<text x="1136.6666666666667" y="1104" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">PS-402</text>
<text x="1136.6666666666667" y="1121" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">p_air</text>
<line x1="1136.6666666666667" y1="1084" x2="1136.6666666666667" y2="953.0" stroke="black" stroke-width="0.8"/>
<circle cx="1270.0" cy="750" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1244.0" y1="750" x2="1296.0" y2="750" stroke="black" stroke-width="0.8"/>
<text x="1270.0" y="744" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">VS-401</text>
<text x="1270.0" y="761" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">i₁</text>
<line x1="1270.0" y1="776" x2="1270.0" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="1403.3333333333335" cy="750" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1377.3333333333335" y1="750" x2="1429.3333333333335" y2="750" stroke="black" stroke-width="0.8"/>
<text x="1403.3333333333335" y="744" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">MD-401</text>
<text x="1403.3333333333335" y="761" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">d₁</text>
<line x1="1403.3333333333335" y1="776" x2="1403.3333333333335" y2="887.0" stroke="black" stroke-width="0.8"/>
<polygon points="1520.6666666666667,740.0 1536.6666666666667,750 1520.6666666666667,760.0" fill="white" stroke="black" stroke-width="1.2"/>
<polygon points="1552.6666666666667,740.0 1536.6666666666667,750 1552.6666666666667,760.0" fill="white" stroke="black" stroke-width="1.2"/>
<text x="1536.6666666666667" y="726" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">XV-401</text>
<text x="1536.6666666666667" y="780" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">v₃</text>
<line x1="1536.6666666666667" y1="776" x2="1536.6666666666667" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="1536.6666666666667" cy="1110" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1510.6666666666667" y1="1110" x2="1562.6666666666667" y2="1110" stroke="black" stroke-width="0.8"/>
<text x="1536.6666666666667" y="1104" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">SE-401</text>
<text x="1536.6666666666667" y="1121" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">s₁</text>
<line x1="1536.6666666666667" y1="1084" x2="1536.6666666666667" y2="953.0" stroke="black" stroke-width="0.8"/>
<circle cx="1670.0000000000002" cy="750" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="1644.0000000000002" y1="750" x2="1696.0000000000002" y2="750" stroke="black" stroke-width="0.8"/>
<text x="1670.0000000000002" y="744" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TT-401</text>
<text x="1670.0000000000002" y="761" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">t₃</text>
<line x1="1670.0000000000002" y1="776" x2="1670.0000000000002" y2="887.0" stroke="black" stroke-width="0.8"/>
<circle cx="1670.0000000000002" cy="1110" r="20" fill="white" stroke="black" stroke-width="1.2"/>
<text x="1670.0000000000002" y="1114" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">M</text>
<text x="1670.0000000000002" y="1082" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">M-401</text>
<text x="1670.0000000000002" y="1144" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">m₆</text>
<line x1="1670.0000000000002" y1="1084" x2="1670.0000000000002" y2="953.0" stroke="black" stroke-width="0.8"/>
<circle cx="1803.3333333333335" cy="750" r="20" fill="#f5c4c4" stroke="black" stroke-width="1.5"/>
<text x="1803.3333333333335" y="754" font-family="Arial" font-size="8" font-weight="bold" font-style="normal" text-anchor="middle">STOP</text>
<text x="1803.3333333333335" y="722" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">ESD-400</text>
<text x="1803.3333333333335" y="784" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">e₂</text>
<line x1="1803.3333333333335" y1="776" x2="1803.3333333333335" y2="887.0" stroke="black" stroke-width="0.8"/>
<rect x="30" y="1200" width="1920" height="90" fill="white" stroke="black" stroke-width="1"/>
<text x="50" y="1220" font-family="Arial" font-size="12" font-weight="bold" font-style="normal" text-anchor="start">LEGENDA:</text>
<circle cx="75" cy="1255" r="26" fill="white" stroke="black" stroke-width="1.2"/>
<line x1="49" y1="1255" x2="101" y2="1255" stroke="black" stroke-width="0.8"/>
<text x="75" y="1249" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TAG</text>
<text x="75" y="1266" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">x</text>
<text x="75" y="1280" font-family="Arial" font-size="9" font-weight="normal" font-style="normal" text-anchor="middle">Instrumento</text>
<polygon points="174,1245.0 190,1255 174,1265.0" fill="white" stroke="black" stroke-width="1.2"/>
<polygon points="206,1245.0 190,1255 206,1265.0" fill="white" stroke="black" stroke-width="1.2"/>
<text x="190" y="1231" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TAG</text>
<text x="190" y="1285" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">x</text>
<text x="190" y="1280" font-family="Arial" font-size="9" font-weight="normal" font-style="normal" text-anchor="middle">Válvula</text>
<circle cx="300" cy="1255" r="20" fill="white" stroke="black" stroke-width="1.2"/>
<text x="300" y="1259" font-family="Arial" font-size="13" font-weight="bold" font-style="normal" text-anchor="middle">M</text>
<text x="300" y="1227" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TAG</text>
<text x="300" y="1289" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">x</text>
<text x="300" y="1280" font-family="Arial" font-size="9" font-weight="normal" font-style="normal" text-anchor="middle">Motor</text>
<circle cx="410" cy="1255" r="20" fill="#f5c4c4" stroke="black" stroke-width="1.5"/>
<text x="410" y="1259" font-family="Arial" font-size="8" font-weight="bold" font-style="normal" text-anchor="middle">STOP</text>
<text x="410" y="1227" font-family="Arial" font-size="9" font-weight="bold" font-style="normal" text-anchor="middle">TAG</text>
<text x="410" y="1289" font-family="Arial" font-size="9" font-weight="normal" font-style="italic" text-anchor="middle">x</text>
<text x="410" y="1280" font-family="Arial" font-size="9" font-weight="normal" font-style="normal" text-anchor="middle">Parada Emergência</text>
<line x1="480" y1="1255" x2="560" y2="1255" stroke="black" stroke-width="3"/>
<line x1="480" y1="1255" x2="560" y2="1255" stroke="black" stroke-width="3" marker-end="url(#bigarrow)"/>
<text x="520" y="1280" font-family="Arial" font-size="9" font-weight="normal" font-style="normal" text-anchor="middle">Fluxo de processo</text>
<line x1="600" y1="1255" x2="680" y2="1255" stroke="black" stroke-width="0.8"/>
<text x="640" y="1280" font-family="Arial" font-size="9" font-weight="normal" font-style="normal" text-anchor="middle">Sinal de instrumentação</text>
</svg>

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
