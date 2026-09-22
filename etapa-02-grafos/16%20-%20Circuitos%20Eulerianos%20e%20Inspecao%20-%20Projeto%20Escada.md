# Aula 16: Circuitos Eulerianos e Inspeção da Infraestrutura da Linha de Paçoca

## 1. Fundamentos Matemáticos

A malha de inspeção é representada por um grafo não direcionado.

- **Vértices:** equipamentos e pontos de acesso da planta.
- **Arestas:** trechos físicos que podem ser percorridos pelo robô de inspeção.
- **Grau do vértice:** quantidade de trechos conectados ao ponto.

Um grafo conectado é Euleriano quando todos os seus vértices possuem grau par. Nesse caso, existe um circuito que começa e termina no mesmo ponto e percorre cada aresta exatamente uma vez.

## 2. Aplicação na planta

A malha considera os seguintes pontos:

`BASE_INSPECAO, RECEPCAO, LIMPEZA, SECAGEM, SILO, SELECAO_OPTICA, TORRA, DESPEL., MOAGEM, DOSAGEM, PRENSA, EMBALAGEM`

A estrutura principal forma um circuito fechado. Ramais adicionais entre `SILO`, `TORRA`, `MOAGEM` e `PRENSA` completam a malha e mantêm os graus dos vértices pares.

## 3. Algoritmo de Hierholzer

O algoritmo de Hierholzer é utilizado para construir o circuito Euleriano.

A lógica utilizada no notebook é:

1. iniciar o robô em `BASE_INSPECAO`;
2. selecionar um trecho ainda não percorrido;
3. avançar para o próximo equipamento;
4. remover o trecho utilizado da cópia do grafo;
5. continuar até retornar a um vértice sem trechos disponíveis;
6. inserir os subcircuitos encontrados na rota final.

## 4. Exemplo resolvido

### Pergunta

A malha de inspeção da planta permite um circuito Euleriano?

### Resolução

O notebook calcula o grau de cada vértice e identifica os vértices de grau ímpar.

Como todos os vértices da malha construída possuem grau par, o resultado esperado é:

`Grafo é Euleriano: True`

Em seguida, o Algoritmo de Hierholzer produz uma rota de inspeção que percorre os trechos da malha sem repetir uma aresta.

## 5. Relação com a manutenção

Uma rota Euleriana pode ser utilizada como referência para inspeções sistemáticas de:

- esteiras transportadoras;
- pontos de transferência;
- silos;
- equipamentos de torra;
- despeliculadores;
- moinhos;
- dosadores;
- prensa;
- embalagem.

O objetivo computacional é reduzir a necessidade de repetir trechos de deslocamento quando a infraestrutura física permite uma malha adequada.

## 6. Atividades de investigação

1. Remova um trecho da malha e verifique quais vértices passam a ter grau ímpar.
2. Acrescente um novo ponto de inspeção próximo à selecionadora óptica.
3. Analise se a nova estrutura continua Euleriana.
4. Compare uma rota Euleriana com uma rota que obrigue o robô a repetir trechos.
5. Identifique quais trechos da planta deveriam receber maior prioridade de inspeção e justifique com base no processo.

## 7. Entregável

**Rota Autônoma de Inspeção da Planta:** verificação da condição Euleriana da malha e geração automática do circuito de inspeção pelo Algoritmo de Hierholzer.
