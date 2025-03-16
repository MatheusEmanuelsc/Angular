

## Diretivas de Controle de Fluxo no Angular: Sintaxe Nova e Tradicional

## Índice

1.  [O que são Diretivas de Controle de Fluxo?](https://www.google.com/url?sa=E&source=gmail&q=#o-que-são-diretivas-de-controle-de-fluxo)
2.  [Nova Sintaxe de Controle de Fluxo (Angular 17+)](https://www.google.com/url?sa=E&source=gmail&q=#nova-sintaxe-de-controle-de-fluxo-angular-17)
      * [`@for`]([https://www.google.com/url?sa=E&source=gmail&q=#for](https://www.google.com/url?sa=E&source=gmail&q=#for))
      * [`@empty`]([https://www.google.com/url?sa=E&source=gmail&q=#empty](https://www.google.com/url?sa=E&source=gmail&q=#empty))
3.  [Diretiva `*ngFor` (Sintaxe Tradicional)]([https://www.google.com/url?sa=E&source=gmail&q=#diretiva-ngfor-sintaxe-tradicional](https://www.google.com/url?sa=E&source=gmail&q=#diretiva-ngfor-sintaxe-tradicional))
      * [Sintaxe Básica](https://www.google.com/url?sa=E&source=gmail&q=#sintaxe-básica)
      * [Variáveis Implícitas do `*ngFor`]([https://www.google.com/url?sa=E&source=gmail&q=#variáveis-implícitas-do-ngfor](https://www.google.com/url?sa=E&source=gmail&q=#variáveis-implícitas-do-ngfor))
      * [Rastreamento de Itens com `trackBy`]([https://www.google.com/url?sa=E&source=gmail&q=#rastreamento-de-itens-com-trackby](https://www.google.com/url?sa=E&source=gmail&q=#rastreamento-de-itens-com-trackby))
      * [Uso com Dados Assíncronos](https://www.google.com/url?sa=E&source=gmail&q=#uso-com-dados-assíncronos)
4.  [Importação Necessária](https://www.google.com/url?sa=E&source=gmail&q=#importação-necessária)
5.  [Conclusão](https://www.google.com/url?sa=E&source=gmail&q=#conclusão)

-----

## O que são Diretivas de Controle de Fluxo?

Diretivas de controle de fluxo são diretivas estruturais no Angular que permitem alterar a estrutura do DOM com base em condições lógicas. Elas controlam como e quando os elementos HTML são renderizados na interface do usuário.

-----

## Nova Sintaxe de Controle de Fluxo (Angular 17+)

A partir do Angular 17, uma nova sintaxe de controle de fluxo foi introduzida, oferecendo uma forma mais concisa e legível de escrever estruturas condicionais e loops.

### `@for`

A diretiva `@for` substitui o `*ngFor` tradicional, oferecendo uma sintaxe mais limpa e direta para iterar sobre coleções.

```html
<ul>
  @for (item of items; track $index) {
    <li>{{ item }} - Índice: {{$index}}</li>
  }
  @empty {
    <li>Nenhum item na lista.</li>
  }
</ul>
```

  * **`track $index`**: Similar ao `trackBy` do `*ngFor`, otimiza o desempenho rastreando a identidade dos itens pelo índice.
  * **`@empty`**: Exibe um bloco de conteúdo quando a coleção está vazia.

### `@empty`

O bloco `@empty` é uma novidade muito útil. Ele permite definir um conteúdo a ser exibido quando a lista que está sendo iterada está vazia.

```html
<ul>
  @for (item of items; track item.id) {
    <li>{{ item.name }}</li>
  }
  @empty {
    <li>Nenhum produto encontrado.</li>
  }
</ul>
```

Neste exemplo, se o array `items` estiver vazio, a mensagem "Nenhum produto encontrado." será exibida.

-----

## Diretiva `*ngFor` (Sintaxe Tradicional)

A diretiva `*ngFor` é usada para iterar sobre uma coleção de itens (como um array) e renderizar um elemento HTML para cada item. Ela é fundamental para exibir listas dinâmicas de dados.

### Sintaxe Básica

A sintaxe básica do `*ngFor` é a seguinte:

```html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>
```

Neste exemplo, `items` é um array no componente Angular, e `item` é uma variável que representa cada elemento do array durante a iteração.

### Variáveis Implícitas do `*ngFor`

O `*ngFor` fornece algumas variáveis implícitas que podem ser usadas dentro do template:

  * `index`: O índice atual do item na iteração (começa em 0).
  * `first`: Um booleano que indica se o item é o primeiro da iteração.
  * `last`: Um booleano que indica se o item é o último da iteração.
  * `even`: Um booleano que indica se o índice do item é par.
  * `odd`: Um booleano que indica se o índice do item é ímpar.

Exemplo de uso:

```html
<ul>
  <li *ngFor="let item of items; let i = index; let isEven = even">
    {{ i }} - {{ item }} ({{ isEven ? 'Par' : 'Ímpar' }})
  </li>
</ul>
```

### Rastreamento de Itens com `trackBy`

O atributo `trackBy` é usado para otimizar o desempenho do `*ngFor`. Ele permite que o Angular rastreie a identidade dos itens na coleção, evitando atualizações desnecessárias do DOM.

Exemplo de uso:

```typescript
trackByItems(index: number, item: any): number {
  return item.id;
}
```

```html
<ul>
  <li *ngFor="let item of items; trackBy: trackByItems">{{ item.name }}</li>
</ul>
```

### Uso com Dados Assíncronos

O `*ngFor` também pode ser usado com dados assíncronos, como Observables, em conjunto com o pipe `async`:

```html
<ul>
  <li *ngFor="let item of items$ | async">{{ item }}</li>
</ul>
```

-----

## Importação Necessária

As diretivas de controle de fluxo fazem parte do módulo `CommonModule`, que é importado por padrão no `AppModule` e em outros módulos de recursos.

-----

## Conclusão

As diretivas de controle de fluxo são ferramentas essenciais para exibir listas dinâmicas no Angular. A nova sintaxe introduzida no Angular 17 oferece uma forma mais concisa e legível de escrever loops, com recursos como `@empty` para lidar com listas vazias. O `*ngFor` tradicional continua sendo uma opção válida, com recursos como `trackBy` para otimizar o desempenho.
