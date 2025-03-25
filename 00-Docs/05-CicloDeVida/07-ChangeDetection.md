
```markdown
# Change Detection no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Como Funciona](#como-funciona)
3. [Estratégias de Change Detection](#estratégias-de-change-detection)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: Change Detection é o mecanismo do Angular que detecta mudanças nos dados do componente e atualiza a view automaticamente.
- **Objetivo**: Garantir que a interface reflita o estado atual do modelo de dados sem intervenção manual.
- **Características**: Baseado em zonas (Zone.js) e pode ser ajustado com estratégias específicas.

---

## Como Funciona
- **Zone.js**: O Angular usa Zone.js para monitorar eventos assíncronos (ex.: cliques, timeouts, HTTP) e disparar ciclos de detecção de mudanças.
- **Ciclo**:
  1. Um evento dispara a detecção (ex.: clique, mudança de `@Input`).
  2. O Angular verifica todos os componentes na árvore, comparando valores atuais com anteriores.
  3. Atualiza o DOM se necessário.
- **Frequência**: Executado automaticamente a cada evento, mas pode ser controlado manualmente.

---

## Estratégias de Change Detection
- **Default (Padrão)**:
  - Verifica todos os componentes a cada ciclo.
  - Eficiente para a maioria dos casos, mas pode ser custoso em aplicações grandes.
- **OnPush**:
  - Só verifica o componente se:
    - Uma propriedade `@Input` mudou (referência diferente).
    - Um evento DOM foi disparado dentro do componente.
    - Mudanças são marcadas manualmente (via `ChangeDetectorRef`).
  - Melhora a performance em componentes com dados imutáveis.

---

## Exemplos Práticos

### Standalone Components
1. **Default Strategy**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     standalone: true,
     template: `
       <p>Contador: {{ counter }}</p>
       <button (click)="increment()">Incrementar</button>
     `
   })
   export class AppComponent {
     counter = 0;

     increment() {
       this.counter++;
       console.log('Change detection disparado automaticamente');
     }
   }
   ```
   - **Comportamento**: Cada clique atualiza a view automaticamente (estratégia Default).

2. **OnPush Strategy**:
   ```typescript
   // child.component.ts
   import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

   @Component({
     selector: 'app-child',
     standalone: true,
     changeDetection: ChangeDetectionStrategy.OnPush,
     template: `<p>Valor: {{ value.name }}</p>`
   })
   export class ChildComponent {
     @Input() value: { name: string } = { name: '' };
   }
   ```

   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';
   import { ChildComponent } from './child.component';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [ChildComponent],
     template: `
       <button (click)="update()">Atualizar</button>
       <app-child [value]="data"></app-child>
     `
   })
   export class AppComponent {
     data = { name: 'Inicial' };

     update() {
       this.data.name = 'Novo'; // Não atualiza a view (referência não mudou)
       console.log('OnPush: view não atualiza sem mudança de referência');
     }
   }
   ```
   - **Comportamento**: A view não atualiza porque `data` mantém a mesma referência. Para atualizar, seria necessário uma nova referência (ex.: `this.data = { name: 'Novo' }`).

---

### Com Módulos
1. **Default Strategy**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <p>Contador: {{ counter }}</p>
       <button (click)="increment()">Incrementar</button>
     `
   })
   export class AppComponent {
     counter = 0;

     increment() {
       this.counter++;
       console.log('Change detection disparado automaticamente');
     }
   }
   ```

2. **OnPush Strategy**:
   ```typescript
   // child.component.ts
   import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

   @Component({
     selector: 'app-child',
     template: `<p>Valor: {{ value.name }}</p>`,
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   export class ChildComponent {
     @Input() value: { name: string } = { name: '' };
   }
   ```

   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <button (click)="update()">Atualizar</button>
       <app-child [value]="data"></app-child>
     `
   })
   export class AppComponent {
     data = { name: 'Inicial' };

     update() {
       this.data.name = 'Novo'; // Não atualiza a view
       console.log('OnPush: view não atualiza sem mudança de referência');
     }
   }
   ```

   ```typescript
   // app.module.ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { AppComponent } from './app.component';
   import { ChildComponent } from './child.component';

   @NgModule({
     imports: [BrowserModule],
     declarations: [AppComponent, ChildComponent],
     bootstrap: [AppComponent]
   })
   export class AppModule {}
   ```

---

## Notas
- **Default**:
  - Simples, mas pode ser ineficiente em árvores grandes de componentes.
- **OnPush**:
  - Otimiza performance ao reduzir verificações.
  - Requer dados imutáveis ou uso de `ChangeDetectorRef` para forçar atualizações (ex.: `detectChanges()`).
- **ChangeDetectorRef**:
  - Métodos úteis:
    - `detectChanges()`: Força a detecção manual.
    - `detach()`: Desativa a detecção para o componente.
    - `reattach()`: Reativa a detecção.
- **Standalone**: Configuração direta no componente.
- **Módulos**: Declaração tradicional no `NgModule`.
- **Uso prático**:
  - `Default`: Pequenas aplicações ou componentes simples.
  - `OnPush`: Aplicações grandes com muitos componentes estáticos.

