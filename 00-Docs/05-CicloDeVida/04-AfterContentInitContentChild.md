
```markdown
# AfterContentInit e ContentChild no Angular 19

## Índice
1. [Resumo](#resumo)
2. [AfterContentInit](#aftercontentinit)
3. [ContentChild](#contentchild)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **AfterContentInit**: Hook do ciclo de vida que executa lógica após o conteúdo projetado (via `<ng-content>`) ser inicializado.
- **ContentChild**: Decorador que permite acessar um elemento ou componente projetado dentro de `<ng-content>` no componente pai.

---

## AfterContentInit
- **Definição**: `ngAfterContentInit` é chamado uma vez após o Angular inicializar o conteúdo projetado no componente (via `<ng-content>`), antes de `ngAfterViewInit`.
- **Objetivo**: Realizar ações que dependem do conteúdo projetado estar disponível (ex.: manipular elementos filhos projetados).
- **Interface**: `AfterContentInit` (de `@angular/core`).

---

## ContentChild
- **Definição**: `@ContentChild` acessa um elemento ou componente específico dentro do conteúdo projetado pelo `<ng-content>`.
- **Sintaxe**: `@ContentChild('referencia' | Tipo, { static: boolean })`.
  - `static: true`: Resolve antes da detecção de mudanças (conteúdo estático).
  - `static: false` (padrão): Resolve após o conteúdo ser projetado.
- **Objetivo**: Interagir diretamente com elementos ou componentes projetados.

---

## Exemplos Práticos

### Standalone Components
1. **Componente Filho com AfterContentInit e ContentChild**:
   ```typescript
   // card.component.ts
   import { Component, ContentChild, AfterContentInit, ElementRef } from '@angular/core';

   @Component({
     selector: 'app-card',
     standalone: true,
     template: `
       <div class="card">
         <ng-content></ng-content>
       </div>
     `,
     styles: [`.card { border: 1px solid #ccc; padding: 10px; }`]
   })
   export class CardComponent implements AfterContentInit {
     @ContentChild('headerRef', { static: false }) headerElement!: ElementRef;

     ngAfterContentInit() {
       console.log('Conteúdo projetado inicializado:', this.headerElement);
       if (this.headerElement) {
         this.headerElement.nativeElement.style.color = 'blue'; // Altera estilo do header projetado
       }
     }
   }
   ```

2. **Componente Pai**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';
   import { CardComponent } from './card.component';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [CardComponent],
     template: `
       <app-card>
         <h1 #headerRef>Header Projetado</h1>
         <p>Conteúdo do card</p>
       </app-card>
     `
   })
   export class AppComponent {}
   ```
   - **Comportamento**:
     - `ngAfterContentInit`: Loga o elemento `<h1>` projetado e muda sua cor para azul.
     - `@ContentChild`: Acessa o `<h1>` com a referência `#headerRef`.

---

### Com Módulos
1. **Componente Filho com AfterContentInit e ContentChild**:
   ```typescript
   // card.component.ts
   import { Component, ContentChild, AfterContentInit, ElementRef } from '@angular/core';

   @Component({
     selector: 'app-card',
     template: `
       <div class="card">
         <ng-content></ng-content>
       </div>
     `,
     styles: [`.card { border: 1px solid #ccc; padding: 10px; }`]
   })
   export class CardComponent implements AfterContentInit {
     @ContentChild('headerRef', { static: false }) headerElement!: ElementRef;

     ngAfterContentInit() {
       console.log('Conteúdo projetado inicializado:', this.headerElement);
       if (this.headerElement) {
         this.headerElement.nativeElement.style.color = 'blue';
       }
     }
   }
   ```

2. **Módulo**:
   ```typescript
   // app.module.ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { AppComponent } from './app.component';
   import { CardComponent } from './card.component';

   @NgModule({
     imports: [BrowserModule],
     declarations: [AppComponent, CardComponent],
     bootstrap: [AppComponent]
   })
   export class AppModule {}
   ```

3. **Componente Pai**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <app-card>
         <h1 #headerRef>Header Projetado</h1>
         <p>Conteúdo do card</p>
       </app-card>
     `
   })
   export class AppComponent {}
   ```
   - **Comportamento**:
     - Igual ao standalone: `ngAfterContentInit` manipula o `<h1>` projetado via `@ContentChild`.

---

## Notas
- **AfterContentInit**:
  - Executado uma vez após o conteúdo projetado estar disponível.
  - Ideal para inicializar lógica baseada em `<ng-content>`.
- **ContentChild**:
  - Retorna `undefined` antes de `ngAfterContentInit` se `static: false`.
  - Pode acessar componentes filhos projetados (ex.: `@ContentChild(ChildComponent) child`).
- **Ordem no Ciclo**:
  - `ngOnInit` → `ngAfterContentInit` → `ngAfterViewInit`.
- **Standalone**: Importa direto no componente pai, mais modular.
- **Módulos**: Requer declaração no `NgModule`, tradicional.
- **Uso prático**:
  - `AfterContentInit`: Configurar conteúdo projetado.
  - `ContentChild`: Manipular elementos específicos dentro de `<ng-content>`.

