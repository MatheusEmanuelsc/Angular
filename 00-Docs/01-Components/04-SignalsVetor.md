## Signals no Angular: Gerenciamento Reativo de Dados

## Índice

1.  [O que são Signals?](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#o-que-são-signals)
2.  [Criação de Signals](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#criação-de-signals)
3.  [Leitura e Atualização de Signals](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#leitura-e-atualização-de-signals)
4.  [Signals com \*ngFor](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#signals-com-ngfor)
5.  [Mutação de Signals](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#mutação-de-signals)
6.  [Importação Necessária](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#importação-necessária)
7.  [Quando usar `mutate()`?]([https://www.google.com/url?sa=E&source=gmail&q=](https://www.google.com/url?sa=E&source=gmail&q=)[[https://www.google.com/url?sa=E%26source=gmail%26q=#quando-usar-mutate](https://www.google.com/url?sa=E%26source=gmail%26q=#quando-usar-mutate)]\([https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23quando-usar-mutate](https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23quando-usar-mutate)\))
8.  [Conclusão](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#conclusão)

-----

## O que são Signals?

Signals são uma forma de reatividade no Angular, permitindo que os componentes reajam a mudanças de estado de forma eficiente. Eles são valores reativos que notificam automaticamente seus consumidores quando mudam, evitando a necessidade de detecção de mudanças manual.

-----

## Criação de Signals

Para criar um Signal, utilize a função `signal()`:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent {
  itens = signal(['Item 1', 'Item 2', 'Item 3']);
}
```

-----

## Leitura e Atualização de Signals

Para ler o valor de um Signal, chame-o como uma função:

```typescript
console.log(this.itens()); // ['Item 1', 'Item 2', 'Item 3']
```

Para atualizar o valor de um Signal, utilize os métodos `set()`, `update()` ou `mutate()`:

```typescript
this.itens.set(['Novo Item 1', 'Novo Item 2']);

this.itens.update(itens => [...itens, 'Novo Item 3']);
```

-----

## Signals com \*ngFor

Signals são ideais para listas dinâmicas com `*ngFor`:

```html
<ul>
  <li *ngFor="let item of itens()">{{ item }}</li>
</ul>
```

Qualquer mudança no Signal `itens` atualizará automaticamente a lista na interface.

-----

## Mutação de Signals

O método `mutate()` permite modificar o valor de um Signal sem criar um novo objeto:

```typescript
this.itens.mutate(itens => itens.push('Novo Item'));
```

Isso é útil para otimizar o desempenho, especialmente com arrays e objetos grandes.

-----

## Importação Necessária

Para usar Signals, importe `signal` do pacote `@angular/core`:

```typescript
import { Component, signal } from '@angular/core';
```

-----

## Quando usar `mutate()`?

O método `mutate()` é especialmente indicado para os seguintes cenários:

1.  **Arrays grandes**: Ao adicionar, remover ou modificar elementos em um array grande, `mutate()` evita a criação de um novo array, melhorando o desempenho.
2.  **Objetos complexos**: Se você precisar atualizar propriedades de um objeto complexo, `mutate()` permite modificar o objeto existente sem criar uma nova instância.
3.  **Atualizações frequentes**: Em situações em que um Signal é atualizado com alta frequência, `mutate()` reduz a sobrecarga de memória e melhora a responsividade da aplicação.
4.  **Otimização de desempenho**: Quando o desempenho é crítico e você precisa evitar a criação de novas instâncias de objetos/arrays, `mutate()` é a melhor opção.
5.  **Manipulação de dados mutáveis**: Se você estiver trabalhando com dados mutáveis e precisar refletir as mudanças na interface de forma eficiente, `mutate()` é a ferramenta ideal.

Em resumo, `mutate()` é uma ferramenta poderosa para otimizar o desempenho ao trabalhar com Signals que contêm arrays ou objetos grandes. Ele permite modificar os dados diretamente, evitando a criação de novas instâncias e melhorando a eficiência da aplicação.

-----

## Conclusão

Signals são uma ferramenta poderosa para gerenciamento reativo de dados no Angular. Eles simplificam a atualização da interface com base em mudanças de estado, especialmente com listas dinâmicas e a diretiva `*ngFor`. O método `mutate()` é uma adição valiosa para otimizar o desempenho em cenários específicos, como manipulação de arrays e objetos grandes.
