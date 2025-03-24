
```markdown
# AfterViewInit e ViewChild no Angular 19

## Índice
1. [Resumo](#resumo)
2. [AfterViewInit](#afterviewinit)
3. [ViewChild](#viewchild)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **AfterViewInit**: Hook do ciclo de vida que executa lógica após a view do componente e seus filhos estarem completamente inicializados.
- **ViewChild**: Decorador que permite acessar elementos DOM ou componentes filhos no template do componente pai.

---

## AfterViewInit
- **Definição**: `ngAfterViewInit` é chamado uma vez após a renderização inicial da view do componente e suas views filhas (incluindo elementos acessados por `@ViewChild`).
- **Objetivo**: Realizar ações que dependem da view estar pronta (ex.: manipular DOM, inicializar bibliotecas).
- **Interface**: `AfterViewInit` (de `@angular/core`).

---

## ViewChild
- **Definição**: `@ViewChild` acessa um elemento ou componente filho no template, retornando uma referência para manipulação.
- **Sintaxe**: `@ViewChild('referencia' | Tipo, { static: boolean })`.
  - `static: true`: Resolve antes da detecção de mudanças (elementos estáticos).
  - `static: false` (padrão): Resolve após a view ser inicializada (elementos dinâmicos).
- **Objetivo**: Interagir diretamente com elementos filhos (ex.: focar em um input, chamar métodos de um componente).

---

## Exemplos Práticos

### Standalone Components
1. **Exemplo com AfterViewInit e ViewChild**:
   ```typescript
   // app.component.ts
   import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
   import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [CommonModule],
     template: `
       <input #inputRef placeholder="Digite algo" />
       <button (click)="logInputValue()">Logar Valor</button>
     `
   })
   export class AppComponent implements AfterViewInit {
     @ViewChild('inputRef', { static: false }) inputElement!: ElementRef<HTMLInputElement>;

     ngAfterViewInit() {
       console.log('View inicializada, input acessível:', this.inputElement.nativeElement);
       this.inputElement.nativeElement.focus(); // Foca no input após inicialização
     }

     logInputValue() {
       console.log('Valor do input:', this.inputElement.nativeElement.value);
     }
   }
   ```
   - **Comportamento**:
     - `ngAfterViewInit`: Foca no input ao carregar.
     - `@ViewChild`: Permite acessar o `<input>` para logar seu valor ao clicar no botão.

---

### Com Módulos
1. **Exemplo com AfterViewInit e ViewChild**:
   ```typescript
   // app.component.ts
   import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <input #inputRef placeholder="Digite algo" />
       <button (click)="logInputValue()">Logar Valor</button>
     `
   })
   export class AppComponent implements AfterViewInit {
     @ViewChild('inputRef', { static: false }) inputElement!: ElementRef<HTMLInputElement>;

     ngAfterViewInit() {
       console.log('View inicializada, input acessível:', this.inputElement.nativeElement);
       this.inputElement.nativeElement.focus();
     }

     logInputValue() {
       console.log('Valor do input:', this.inputElement.nativeElement.value);
     }
   }
   ```

2. **Módulo**:
   ```typescript
   // app.module.ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { AppComponent } from './app.component';

   @NgModule({
     imports: [BrowserModule],
     declarations: [AppComponent],
     bootstrap: [AppComponent]
   })
   export class AppModule {}
   ```
   - **Comportamento**:
     - Igual ao standalone: foca no input em `AfterViewInit` e loga o valor com `ViewChild`.

---

## Notas
- **AfterViewInit**:
  - Executado uma vez após a view estar pronta.
  - Perfeito para inicializações que dependem do DOM ou de componentes filhos.
- **ViewChild**:
  - Retorna `undefined` antes de `ngAfterViewInit` se `static: false`.
  - Pode acessar componentes filhos (ex.: `@ViewChild(ChildComponent) child: ChildComponent`).
- **Ordem no Ciclo**:
  - `ngOnInit` → `ngAfterViewInit` → (`ngAfterViewChecked` a cada mudança).
- **Standalone**: Importa módulos diretamente, mais modular.
- **Módulos**: Requer declaração no `NgModule`, tradicional.
- **Uso prático**:
  - `AfterViewInit`: Configurar elementos DOM ou bibliotecas JS.
  - `ViewChild`: Manipular elementos ou chamar métodos de componentes filhos.

