# Local Storage no Angular com Effects e Arrays de Objetos

## Índice

1. [O que é Local Storage e Effects?](#o-que-e-local-storage-e-effects)
2. [Sintaxe e Uso Básico com Effects](#sintaxe-e-uso-basico-com-effects)
3. [Manipulação de Arrays de Objetos](#manipulacao-de-arrays-de-objetos)
4. [Casos de Uso Aprimorados](#casos-de-uso-aprimorados)
5. [Exemplos Práticos com Effects e Arrays](#exemplos-praticos-com-effects-e-arrays)
6. [Considerações Adicionais](#consideracoes-adicionais)

---

## O que é Local Storage e Effects?

### Local Storage
O `localStorage` permite armazenar dados localmente no navegador, mesmo após o recarregamento da página.

### Effects
Os `effects` no Angular permitem reagir a mudanças de estado e executar efeitos colaterais, como salvar dados automaticamente no `localStorage`.

---

## Sintaxe e Uso Básico com Effects

Podemos utilizar `effect()` para monitorar mudanças no estado e atualizar automaticamente o `localStorage`.

```typescript
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-exemplo',
  template: '<p>{{ valor() }}</p><button (click)="atualizar()">Atualizar</button>'
})
export class ExemploComponent {
  valor = signal(localStorage.getItem('minhaChave') || 'valor inicial');

  constructor() {
    effect(() => {
      localStorage.setItem('minhaChave', this.valor());
    });
  }

  atualizar() {
    this.valor.set('novo valor');
  }
}
```

---

## Manipulação de Arrays de Objetos

Ao armazenar arrays de objetos no `localStorage`, devemos usar `JSON.stringify()` para salvar e `JSON.parse()` para recuperar os dados.

```typescript
// Armazenar array de objetos
const objetos = [{ nome: 'A', valor: 1 }, { nome: 'B', valor: 2 }];
localStorage.setItem('meusObjetos', JSON.stringify(objetos));

// Recuperar array de objetos
const objetosRecuperados = JSON.parse(localStorage.getItem('meusObjetos'));
```

---

## Casos de Uso Aprimorados

* **Listas de tarefas:** Persistência de tarefas em um to-do list.
* **Carrinhos de compras:** Armazenamento de itens do carrinho.
* **Histórico de navegação:** Manutenção de histórico localmente.

---

## Exemplos Práticos com Effects e Arrays

### Exemplo 1: Persistindo uma Lista de Tarefas

```typescript
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-lista-tarefas',
  template: `<ul>
    <li *ngFor="let tarefa of tarefas()">{{ tarefa.descricao }}</li>
  </ul>
  <input type="text" #novaTarefa>
  <button (click)="adicionarTarefa(novaTarefa.value); novaTarefa.value = ''">Adicionar</button>`
})
export class ListaTarefasComponent {
  tarefas = signal(JSON.parse(localStorage.getItem('tarefas')) || []);

  constructor() {
    effect(() => {
      localStorage.setItem('tarefas', JSON.stringify(this.tarefas()));
    });
  }

  adicionarTarefa(descricao: string) {
    this.tarefas.update(tarefas => [...tarefas, { descricao }]);
  }
}
```

### Exemplo 2: Carrinho de Compras

```typescript
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  template: `<ul>
    <li *ngFor="let item of carrinho()">{{ item.produto.nome }} - {{ item.quantidade }}</li>
  </ul>
  <button (click)="adicionarItem()">Adicionar Item</button>`
})
export class CarrinhoComponent {
  carrinho = signal(JSON.parse(localStorage.getItem('carrinho')) || []);

  constructor() {
    effect(() => {
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho()));
    });
  }

  adicionarItem() {
    this.carrinho.update(carrinho => [...carrinho, { produto: { nome: 'Produto X' }, quantidade: 1 }]);
  }
}
```

---

## Considerações Adicionais

* Evite loops infinitos ao utilizar `effect()` com `localStorage`.
* Sempre trate erros ao usar `JSON.parse()`.
* Não armazene dados sensíveis no `localStorage`.
* Considere usar serviços para centralizar a lógica de persistência.

---

## Resumo

Este documento apresentou uma abordagem estruturada para utilizar o `localStorage` no Angular com `effects` e manipulação de arrays de objetos. Exploramos a sintaxe básica, casos de uso práticos e boas práticas para evitar problemas comuns. Essas técnicas são útis para persistir informações no navegador de forma eficiente e reativa.

