# Aula 15: Simulação de Falhas e Desvio Automático na Linha de Paçoca

## 1. Fundamentos Matemáticos: Reconfiguração Dinâmica da Linha

A linha de produção é representada como um grafo direcionado:

- **Vértices:** equipamentos, silos e pontos de transferência.
- **Arestas:** trechos de transporte entre equipamentos.
- **Pesos:** comprimento dos trechos em metros.

Na detecção de uma falha em um trecho `(u, v)`, o sistema isola essa conexão atribuindo:

`W(u, v) <- infinito`

Depois disso, o algoritmo de Dijkstra recalcula a rota de menor comprimento entre a recepção e a embalagem.

## 2. Aplicação na planta

A sequência principal modelada é:

`RECEPCAO -> LIMPEZA -> SECAGEM -> SILO -> SELECAO_OPTICA -> TORRA -> DESPEL. -> MOAGEM -> DOSAGEM -> PRENSA -> EMBALAGEM`

Foi acrescentada uma rota alternativa de transferência entre a torra e a despeliculagem:

`TORRA -> PULMAO_TORRA -> DESPEL.`

Essa rota representa um desvio físico hipotético destinado a manter a continuidade do processo quando o trecho principal de transferência estiver indisponível. Ela não elimina etapas de beneficiamento do produto.

## 3. Exemplo resolvido

### Pergunta

O que acontece se o trecho `TORRA -> DESPEL.` apresentar uma falha?

### Resolução

O trecho principal recebe peso infinito e deixa de participar do cálculo do menor caminho.

O algoritmo identifica a rota:

`RECEPCAO -> LIMPEZA -> SECAGEM -> SILO -> SELECAO_OPTICA -> TORRA -> PULMAO_TORRA -> DESPEL. -> MOAGEM -> DOSAGEM -> PRENSA -> EMBALAGEM`

Assim, o fluxo consegue continuar utilizando o desvio alternativo.

## 4. Métrica de decisão

O notebook mede `Tempo_Decisão_ms`, correspondente ao tempo gasto para isolar o trecho e recalcular a rota.

A métrica permite avaliar separadamente:

1. tempo computacional para tomada de decisão;
2. tempo físico de atuação das válvulas, inversores, esteiras ou outros atuadores;
3. tempo necessário para estabilização do processo.

O notebook mede somente o primeiro item.

## 5. Atividades de investigação

1. Altere o comprimento dos trechos e verifique como isso modifica a rota escolhida.
2. Simule a indisponibilidade simultânea dos trechos `TORRA -> DESPEL.` e `TORRA -> PULMAO_TORRA`.
3. Acrescente uma segunda rota alternativa entre `MOAGEM` e `DOSAGEM`.
4. Registre o `Tempo_Decisão_ms` em várias execuções e calcule média, mínimo e máximo.
5. Explique quais falhas da linha poderiam ser tratadas por desvio automático e quais exigiriam parada segura do processo.

## 6. Entregável

**Simulador de Falhas e Desvio Automático da Linha de Paçoca:** teste de uma falha de transferência, isolamento lógico do trecho e recálculo automático da rota até a embalagem.
