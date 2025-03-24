
```markdown
# AfterContentChecked e AfterViewChecked no Angular 19

## Índice
1. [Resumo](#resumo)
2. [AfterContentChecked](#aftercontentchecked)
3. [AfterViewChecked](#afterviewchecked)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **AfterContentChecked**: Hook que executa lógica após cada verificação do conteúdo projetado (via `<ng-content>`).
- **AfterViewChecked**: Hook que executa lógica após cada verificação da view do componente e suas views filhas.

---

## AfterContentChecked
- **Definição**: `ngAfterContentChecked` é chamado a cada ciclo de detecção de mudanças após o Angular verificar o conteúdo projetado no componente (via `<ng-content>`), logo após `ngAfterContentInit`.
- **Objetivo**: Monitorar ou reagir a mudanças no conteúdo projetado após sua atualização.
- **Interface**: `AfterContentChecked` (de `@angular/core`).
- **Atenção**: Executado frequentemente, pode impactar performance se não otimizado.

---

## AfterViewChecked
- **Definição**: `ngAfterViewChecked` é chamado a cada ciclo de detecção de mudanças após o Angular verificar a view do componente e suas views filhas, logo após `ngAfterViewInit`.
- **Objetivo**: Monitorar ou reagir a mudanças na view após sua atualização.
- **Interface**: `AfterViewChecked` (de `@angular/core`).
- **Atenção**: Similar a `AfterContentChecked`, exige cuidado para evitar sobrecarga.

---

## Exemplos Práticos

### Standalone Components
1. **Componente com AfterContentChecked e AfterViewChecked**:
   ```typescript
   // card.component.ts
   import { Component, AfterContentChecked, AfterViewChecked } from '@angular/core';

   @Component({
     selector: 'app-card',
     standalone: true,
     template: `
       <div class="card">
         <ng-content></ng-content>
         <p>Conteúdo interno</p>
       </div>
     `,
     styles: [`.card { border: 1px solid #ccc; padding: 10px; }`]
   })
   export class CardComponent implements AfterContentChecked, AfterViewChecked {
     ngAfterContentChecked() {
       console.log('Conteúdo projetado verificado');
     }

     ngAfterViewChecked() {
       console.log('View do componente verificada');
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
       <input [(ngModel)]="text" placeholder="Digite algo" />
       <app-card>{{ text }}</app-card>
     `
   })
   export class AppComponent {
     text = 'Conteúdo inicial';
   }
   ```
   - **Comportamento**:
     - `ngAfterContentChecked`: Loga a cada mudança no conteúdo projetado (ex.: ao digitar no input).
     - `ngAfterViewChecked`: Loga a cada mudança na view, incluindo o `<p>` interno.

---

### Com Módulos
1. **Componente com AfterContentChecked e AfterViewChecked**:
   ```typescript
   // card.component.ts
   import { Component, AfterContentChecked, AfterViewChecked } from '@angular/core';

   @Component({
     selector: 'app-card',
     template: `
       <div class="card">
         <ng-content></ng-content>
         <p>Conteúdo interno</p>
       </div>
     `,
     styles: [`.card { border: 1px solid #ccc; padding: 10px; }`]
   })
   export class CardComponent implements AfterContentChecked, AfterViewChecked {
     ngAfterContentChecked() {
       console.log('Conteúdo projetado verificado');
     }

     ngAfterViewChecked() {
       console.log('View do componente verificada');
     }
   }
   ```

2. **Módulo**:
   ```typescript
   // app.module.ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { FormsModule } from '@angular/forms';
   import { AppComponent } from './app.component';
   import { CardComponent } from './card.component';

   @NgModule({
     imports: [BrowserModule, FormsModule],
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
       <input [(ngModel)]="text" placeholder="Digite algo" />
       <app-card>{{ text }}</app-card>
     `
   })
   export class AppComponent {
     text = 'Conteúdo inicial';
   }
   ```
   - **Comportamento**:
     - Igual ao standalone: logs em `AfterContentChecked` para o conteúdo projetado e em `AfterViewChecked` para a view completa.

---

## Notas
- **AfterContentChecked**:
  - Executado após cada verificação do conteúdo projetado.
  - Útil para reagir a mudanças dinâmicas em `<ng-content>`.
- **AfterViewChecked**:
  - Executado após cada verificação da view inteira (incluindo conteúdo projetado e template).
  - Ideal para ajustes finais na UI após atualizações.
- **Ordem no Ciclo**:
  - `ngAfterContentInit` → `ngAfterContentChecked` → `ngAfterViewInit` → `ngAfterViewChecked`.
- **Performance**:
  - Ambos são chamados frequentemente; evite lógica pesada para não sobrecarregar o ciclo de detecção de mudanças.
- **Standalone**: Importa direto no componente pai, mais modular.
- **Módulos**: Requer declaração no `NgModule`, tradicional.
- **Uso prático**:
  - `AfterContentChecked`: Verificar estado do conteúdo projetado.
  - `AfterViewChecked`: Ajustar a view após renderização.


```