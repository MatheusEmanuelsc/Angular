
```markdown
# Custom Pipes no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Criação de Custom Pipes](#criação-de-custom-pipes)
   - [Pipe Simples](#pipe-simples)
   - [Pipe com Parâmetros](#pipe-com-parâmetros)
3. [Configuração e Uso](#configuração-e-uso)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **O que são**: Custom Pipes são pipes personalizados criados pelo desenvolvedor para transformar dados no template, além dos pipes nativos do Angular (ex.: `date`, `currency`).
- **Objetivo**: Aplicar lógica específica de formatação ou manipulação que não é coberta pelos pipes padrão.
- **Características**:
  - Implementam a interface `PipeTransform`.
  - Podem ser puros (padrão) ou impuros (`pure: false`).

---

## Criação de Custom Pipes

### Pipe Simples
- **Exemplo**: Inverte uma string.
  ```typescript
  // reverse.pipe.ts
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'reverse',
    standalone: true // Pode ser usado sem módulo
  })
  export class ReversePipe implements PipeTransform {
    transform(value: string): string {
      return value ? value.split('').reverse().join('') : '';
    }
  }
  ```

### Pipe com Parâmetros
- **Exemplo**: Multiplica um número por um fator.
  ```typescript
  // multiply.pipe.ts
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'multiply',
    standalone: true
  })
  export class MultiplyPipe implements PipeTransform {
    transform(value: number, factor: number = 1): number {
      return value * factor;
    }
  }
  ```

---

## Configuração e Uso

### Standalone Components
1. **Criação**:
   - Use o CLI: `ng g pipe reverse --standalone` ou crie manualmente como acima.

2. **Uso no Componente**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';
   import { ReversePipe } from './reverse.pipe';
   import { MultiplyPipe } from './multiply.pipe';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [ReversePipe, MultiplyPipe], // Importa os pipes
     template: `
       <p>Invertido: {{ 'Angular' | reverse }}</p>
       <p>Multiplicado: {{ 5 | multiply:3 }}</p>
     `
   })
   export class AppComponent {}
   ```
   - **Saída**:
     - Invertido: `ralugnA`
     - Multiplicado: `15`

---

### Com Módulos
1. **Criação**:
   - Use o CLI: `ng g pipe reverse` (sem `--standalone`) ou crie manualmente:
     ```typescript
     // reverse.pipe.ts
     import { Pipe, PipeTransform } from '@angular/core';

     @Pipe({
       name: 'reverse'
     })
     export class ReversePipe implements PipeTransform {
       transform(value: string): string {
         return value ? value.split('').reverse().join('') : '';
       }
     }
     ```

2. **Configuração no Módulo**:
   ```typescript
   // app.module.ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { AppComponent } from './app.component';
   import { ReversePipe } from './reverse.pipe';
   import { MultiplyPipe } from './multiply.pipe';

   @NgModule({
     imports: [BrowserModule],
     declarations: [AppComponent, ReversePipe, MultiplyPipe], // Declara os pipes
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

3. **Uso no Componente**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <p>Invertido: {{ 'Angular' | reverse }}</p>
       <p>Multiplicado: {{ 5 | multiply:3 }}</p>
     `
   })
   export class AppComponent {}
   ```
   - **Saída**:
     - Invertido: `ralugnA`
     - Multiplicado: `15`

---

## Notas
- **Pure vs. Impure**:
  - **Pure** (padrão, `pure: true`): Só recalcula se o valor ou parâmetros mudam (melhor performance).
  - **Impure** (`pure: false`): Recalcula a cada ciclo de detecção de mudanças (use com cuidado, ex.: para arrays dinâmicos).
    ```typescript
    @Pipe({ name: 'filter', pure: false })
    export class FilterPipe implements PipeTransform {
      transform(items: any[], term: string): any[] {
        return items.filter(item => item.includes(term));
      }
    }
    ```

- **Parâmetros**:
  - Adicionados após o nome do pipe com `:`, ex.: `| multiply:3`.
  - Podem ser opcionais com valor padrão no `transform`.

- **Standalone**: Ideal para projetos modernos, evita dependência de módulos.
- **Módulos**: Abordagem tradicional, exige declaração no `NgModule`.

- **Uso prático**: Formatar strings, números ou filtrar dados diretamente no template.

