
```markdown
# DoCheck no Angular 19

## Índice
1. [Resumo](#resumo)
2. [DoCheck](#docheck)
3. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: `DoCheck` é um hook do ciclo de vida do Angular que permite executar lógica personalizada a cada ciclo de detecção de mudanças, mesmo quando o Angular não detecta alterações automáticas em propriedades vinculadas.
- **Objetivo**: Monitorar mudanças em dados complexos (ex.: objetos, arrays) que não são detectadas automaticamente pelo mecanismo de change detection do Angular.
- **Interface**: `DoCheck` (importada de `@angular/core`).

---

## DoCheck
- **Definição**: `ngDoCheck` é chamado a cada ciclo de detecção de mudanças, após `ngOnChanges` e antes de `ngAfterContentChecked`, permitindo verificar manualmente o estado do componente.
- **Características**:
  - Executado frequentemente, o que pode impactar a performance se não otimizado.
  - Útil para objetos ou arrays cujo conteúdo interno muda sem alterar a referência.
- **Atenção**: Use com cuidado, pois é mais custoso que `OnChanges` ou `OnInit`.

---

## Exemplos Práticos

### Standalone Components
1. **Componente com DoCheck**:
   ```typescript
   // child.component.ts
   import { Component, Input, DoCheck } from '@angular/core';

   @Component({
     selector: 'app-child',
     standalone: true,
     template: `<p>Item: {{ item.name }}</p>`
   })
   export class ChildComponent implements DoCheck {
     @Input() item: { name: string } = { name: '' };
     private previousName: string = '';

     ngDoCheck() {
       if (this.item.name !== this.previousName) {
         console.log('Mudança detectada em item.name:', this.item.name);
         this.previousName = this.item.name; // Atualiza o valor anterior
       }
     }
   }
   ```

2. **Componente Pai**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';
   import { ChildComponent } from './child.component';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [ChildComponent],
     template: `
       <input [(ngModel)]="data.name" placeholder="Digite o nome" />
       <app-child [item]="data"></app-child>
     `
   })
   export class AppComponent {
     data = { name: 'Inicial' };
   }
   ```
   - **Comportamento**:
     - `ngDoCheck` detecta mudanças em `data.name` mesmo que a referência de `data` não mude.
     - Loga toda vez que o valor de `name` é alterado no input.

---

### Com Módulos
1. **Componente com DoCheck**:
   ```typescript
   // child.component.ts
   import { Component, Input, DoCheck } from '@angular/core';

   @Component({
     selector: 'app-child',
     template: `<p>Item: {{ item.name }}</p>`
   })
   export class ChildComponent implements DoCheck {
     @Input() item: { name: string } = { name: '' };
     private previousName: string = '';

     ngDoCheck() {
       if (this.item.name !== this.previousName) {
         console.log('Mudança detectada em item.name:', this.item.name);
         this.previousName = this.item.name;
       }
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
   import { ChildComponent } from './child.component';

   @NgModule({
     imports: [BrowserModule, FormsModule], // FormsModule para ngModel
     declarations: [AppComponent, ChildComponent],
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
       <input [(ngModel)]="data.name" placeholder="Digite o nome" />
       <app-child [item]="data"></app-child>
     `
   })
   export class AppComponent {
     data = { name: 'Inicial' };
   }
   ```
   - **Comportamento**:
     - Igual ao standalone: `ngDoCheck` monitora mudanças em `data.name` e loga as alterações.

---

## Notas
- **DoCheck**:
  - Executado a cada ciclo de detecção de mudanças, mesmo sem alterações em `@Input`.
  - Ideal para casos onde `OnChanges` não detecta mudanças (ex.: mutação de objeto interno).
- **Performance**:
  - Pode ser custoso; evite lógica pesada ou use com variáveis de controle (como `previousName` no exemplo).
- **Comparação com OnChanges**:
  - `OnChanges`: Detecta apenas mudanças na referência de `@Input`.
  - `DoCheck`: Detecta qualquer mudança, mas exige verificação manual.
- **Standalone**: Configuração simples, importa direto no componente pai.
- **Módulos**: Requer declaração no `NgModule`.
- **Uso prático**: Monitorar mudanças em estruturas complexas ou estados não reativos.


```