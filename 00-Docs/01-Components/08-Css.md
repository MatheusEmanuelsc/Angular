

# Seletores de Estilo no Angular: `:host`, `:host-context` e `::part`

## Índice

* Introdução
* `:host`
    * O que é e como funciona
    * Exemplos práticos
    * Quando usar
* `:host-context`
    * O que é e como funciona
    * Exemplos práticos
    * Quando usar
* `::part`
    * O que é e como funciona
    * Exemplos praticos
    * Quando usar e alternativas
* Seletores Descontinuados: `::ng-deep` e `/deep/`
    * O que eram e por que foram descontinuados
    * Alternativas recomendadas
* Considerações Finais

## Introdução

No Angular, os seletores de estilo desempenham papéis cruciais no encapsulamento e na estilização de componentes. Este guia explora os seletores atuais e fornece um contexto sobre os antigos, esclarecendo quando e como utilizá-los.

## `:host`

### O que é e como funciona

O seletor `:host` permite estilizar o próprio elemento do componente. Ele é útil para aplicar estilos que dependem do estado do componente ou para definir estilos básicos para o componente.

### Exemplos práticos

```css
:host {
    display: block;
    border: 1px solid black;
    padding: 10px;
}

:host(.ativo) {
    background-color: lightblue;
}
```

* O primeiro bloco de estilo define estilos básicos para o componente.
* O segundo bloco aplica um estilo de fundo quando o componente possui a classe `ativo`.

### Quando usar

Use `:host` quando precisar estilizar o próprio elemento do componente, especialmente quando os estilos dependem do estado do componente.

## `:host-context`

### O que é e como funciona

O seletor `:host-context` permite aplicar estilos ao componente com base em seletores de contexto pai. Isso é útil para estilizar componentes de forma diferente, dependendo do contexto em que são usados.

### Exemplos práticos

```css
:host-context(.tema-escuro) {
    background-color: darkgray;
    color: white;
}
```

* Este bloco de estilo aplica um tema escuro ao componente quando um elemento pai possui a classe `tema-escuro`.

### Quando usar

Use `:host-context` quando precisar estilizar um componente com base no contexto pai, como ao implementar temas.

## `::part`

### O que é e como funciona

O seletor `::part` permite estilizar partes específicas de um componente que foram expostas pelo autor do componente. Isso é especialmente útil para componentes que utilizam Shadow DOM.

### Exemplos praticos

Caso um componente possua a seguinte estrutura:

```html
<button>
    <span part="texto-botao">Click me</span>
</button>
```

Podemos estilizar essa parte especifica do componente dessa forma:

```css
:host button::part(texto-botao){
    font-size: 1.2rem;
    font-weight: bold;
}
```

### Quando usar e alternativas

Use `::part` para estilizar partes específicas de um componente que foram explicitamente expostas para estilização externa. Essa é a maneira recomendada de estilizar componentes que utilizam Shadow DOM, mantendo o encapsulamento.

## Seletores Descontinuados: `::ng-deep` e `/deep/`

### O que eram e por que foram descontinuados

* `::ng-deep` e `/deep/` eram seletores que permitiam forçar estilos a descerem pela árvore DOM e afetarem elementos filhos, quebrando o encapsulamento de estilos do Angular.
* Eles foram descontinuados porque comprometiam o encapsulamento de estilos, dificultando a manutenção e a previsibilidade dos estilos em aplicações complexas.

### Alternativas recomendadas

* **Compartilhar estilos por meio de classes CSS:** Defina classes CSS globais que podem ser usadas em vários componentes.
* **Usar o seletor de sombra `::part()`:** permite que um componente exponha partes específicas do seu DOM para estilização externa.
* **Comunicação entre componentes**: Use o `@Input()` e `@Output()` para enviar dados entre componentes, e assim mudar os estilos com base nesses dados.

## Considerações Finais

* `:host` e `:host-context` continuam sendo ferramentas essenciais para a estilização de componentes no Angular.
* `::part` é a forma atual para estilizar elementos filhos que estão dentro de Shadow DOM.
* `::ng-deep` e `/deep/` foram descontinuados e devem ser evitados.
* Sempre que possível, prefira alternativas a seletores descontinuados para manter o encapsulamento e a organização dos estilos.
