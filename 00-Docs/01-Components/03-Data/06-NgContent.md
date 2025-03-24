
```markdown
# ng-content no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Uso Básico](#uso-básico)
3. [Seleção de Conteúdo](#seleção-de-conteúdo)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: `ng-content` é uma diretiva do Angular que permite a projeção de conteúdo (content projection) de um componente pai para dentro de um componente filho, tornando os componentes mais reutilizáveis e flexíveis.
- **Objetivo**: Passar HTML ou outros componentes dinamicamente para dentro de um componente sem hardcoding.
- **Características**:
  - Suporta projeção simples ou seletiva (com `select`).
  - Alternativa ao uso de `@Input` para conteúdo estático ou complexo.

---

## Uso Básico
- **Funcionamento**: O conteúdo colocado entre as tags de abertura e fechamento de um componente é projetado onde `<ng-content>` está no template do componente filho.
- **Sintaxe**: `<ng-content></ng-content>`.

---

## Seleção de Conteúdo
- **Atributo `select`**: Permite projetar apenas partes específicas do conteúdo com base em seletores CSS (ex.: tags, classes, atributos).
- **Exemplo**:
  - `select="p"`: Projeta apenas elementos `<p>`.
  - `select=".header"`: Projeta elementos com a classe `header`.

---

## Exemplos Práticos

### Standalone Components
1. **Componente Filho**:
   ```typescript
   // card.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-card',
     standalone: true,
     template: `
       <div class="card">
         <ng-content></ng-content> <!-- Projeta todo o conteúdo -->
       </div>
     `,
     styles: [`.card { border: 1px solid #ccc; padding: 10px; }`]
   })
   export class CardComponent {}
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
         <h1>Título</h1>
         <p>Este é o conteúdo do card.</p>
       </app-card>
     `
   })
   export class AppComponent {}
   ```
   - **Saída**: Um card com `<h1>` e `<p>` projetados dentro dele.

3. **Com Seleção**:
   ```typescript
   // card.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-card',
     standalone: true,
     template: `
       <div class="card">
         <ng-content select=".header"></ng-content> <!-- Apenas .header -->
         <ng-content select="p"></ng-content> <!-- Apenas <p> -->
       </div>
     `,
     styles: [`.card { border: 1px solid #ccc; padding: 10px; }`]
   })
   export class CardComponent {}
   ```

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
         <div class="header">Cabeçalho</div>
         <p>Conteúdo</p>
         <span>Ignorado</span>
       </app-card>
     `
   })
   export class AppComponent {}
   ```
   - **Saída**: Apenas `<div class="header">` e `<p>` são projetados, `<span>` é ignorado.

---

### Com Módulos
1. **Componente Filho**:
   ```typescript
   // card.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-card',
     template: `
       <div class="card">
         <ng-content></ng-content>
       </div>
     `,
     styles: [`.card { border: 1px solid #ccc; padding: 10px; }`]
   })
   export class CardComponent {}
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
         <h1>Título</h1>
         <p>Este é o conteúdo do card.</p>
       </app-card>
     `
   })
   export class AppComponent {}
   ```
   - **Saída**: Igual ao standalone, um card com `<h1>` e `<p>` projetados.

---

## Notas
- **Vantagens**:
  - Flexibilidade para passar conteúdo dinâmico ou estruturado.
  - Reutilização de componentes com layouts personalizáveis.
- **Limitações**:
  - Não passa dados reativos (use `@Input` para isso).
  - Todo o conteúdo não projetado é descartado se não houver `<ng-content>` correspondente.
- **Seleção**:
  - Use `select` para projeção condicional, mas evite seletores muito complexos (ex.: pseudo-classes não funcionam).
- **Standalone**: Mais moderno, importa diretamente no componente pai.
- **Módulos**: Declaração tradicional no `NgModule`.

