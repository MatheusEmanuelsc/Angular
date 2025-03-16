
```markdown
# Angular: @ViewChild e @ViewChildren

## O que é?
- **@ViewChild:** Decorador que acessa um único elemento DOM, componente ou diretiva do template no TypeScript.
- **@ViewChildren:** Decorador que acessa uma lista de elementos DOM, componentes ou diretivas do template como um `QueryList`.
- **Objetivo:** Obter referências programáticas para manipular elementos ou componentes filhos.

## Vantagens
- **@ViewChild:** Simplicidade para acessar um único item.
- **@ViewChildren:** Flexibilidade para lidar com múltiplos itens dinâmicos.
- Controle direto no código TypeScript.

## Como Utilizar?
### @ViewChild
1. **Sintaxe Básica:**
   - Template (`app.component.html`):
     ```html
     <input #meuInput>
     ```
   - Componente (`app.component.ts`):
     ```typescript
     import { Component, ViewChild, ElementRef } from '@angular/core';

     @Component({ selector: 'app-root', templateUrl: './app.component.html' })
     export class AppComponent {
       @ViewChild('meuInput') input: ElementRef;

       focar() {
         this.input.nativeElement.focus();
       }
     }
     ```
   - Resultado: Acessa e manipula um único input.

2. **Opções:**
   - `{ static: true }`: Para elementos fixos (sem `*ngIf` ou `*ngFor`).

### @ViewChildren
1. **Sintaxe Básica:**
   - Template:
     ```html
     <div *ngFor="let item of itens" #meusItens>{{ item }}</div>
     ```
   - Componente:
     ```typescript
     import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

     @Component({ selector: 'app-root', templateUrl: './app.component.html' })
     export class AppComponent {
       itens = ['Item 1', 'Item 2', 'Item 3'];
       @ViewChildren('meusItens') itensRef: QueryList<ElementRef>;

       destacar() {
         this.itensRef.forEach(item => item.nativeElement.style.color = 'red');
       }
     }
     ```
   - Resultado: Acessa e manipula todos os `div`s gerados.

2. **Com Componentes:**
   - Template:
     ```html
     <app-filho *ngFor="let i of [1, 2, 3]" #filhos></app-filho>
     ```
   - Componente:
     ```typescript
     import { ViewChildren, QueryList } from '@angular/core';
     import { FilhoComponent } from './filho/filho.component';

     export class AppComponent {
       @ViewChildren('filhos') filhos: QueryList<FilhoComponent>;

       chamarFilhos() {
         this.filhos.forEach(filho => filho.mudarMensagem());
       }
     }
     ```

3. **QueryList:**
   - `QueryList` é uma coleção dinâmica que atualiza quando os elementos mudam (ex.: `*ngFor` adiciona/remova itens).

## Exemplo Prático
- Contador de inputs:
  ```typescript
  import { Component, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: `
      <input #unicoInput>
      <input *ngFor="let i of [1, 2, 3]" #multiplosInputs>
      <button (click)="contar()">Contar</button>
    `
  })
  export class AppComponent {
    @ViewChild('unicoInput') unico: ElementRef;
    @ViewChildren('multiplosInputs') multiplos: QueryList<ElementRef>;

    contar() {
      console.log('Único:', this.unico.nativeElement);
      console.log('Múltiplos:', this.multiplos.length);
    }
  }
  ```
  Resultado: Loga o input único e a quantidade de inputs múltiplos.

## Resumo Rápido
- **@ViewChild:** `@ViewChild('seletor') prop;` – Um elemento/componente.
- **@ViewChildren:** `@ViewChildren('seletor') prop: QueryList;` – Lista de elementos/componentes.
- **Direção:** Template → Componente (acesso no TS).
- **Uso:** `@ViewChild` para um item, `@ViewChildren` para vários.

Use `@ViewChild` para um único item e `@ViewChildren` para listas dinâmicas no Angular!
``` 

### Nota
- Ambos dependem do ciclo de vida (`ngAfterViewInit`) para garantir que as referências estejam disponíveis.
- `@ViewChildren` é mais poderoso em cenários com `*ngFor` ou elementos que mudam dinamicamente. Se precisar de mais exemplos, é só pedir!