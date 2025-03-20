
```markdown
# Angular Pipes no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Pipes Nativos](#pipes-nativos)
3. [Pipes Personalizados](#pipes-personalizados)
4. [Uso e Configuração](#uso-e-configuração)

---

## Resumo
- **O que são**: Pipes são funções no Angular que transformam dados no template de forma declarativa, aplicando formatação ou manipulação sem alterar o valor original.
- **Objetivo**: Simplificar a apresentação de dados (ex.: formatar datas, converter texto, filtrar listas).
- **Características**:
  - Podem ser encadeados (`| pipe1 | pipe2`).
  - Podem receber parâmetros (`| pipe:arg1:arg2`).
  - Executam transformações em tempo de renderização.

---

## Pipes Nativos
- **Principais Exemplos**:
  - **`date`**: Formata datas (ex.: `{{ '2025-03-20' | date:'dd/MM/yyyy' }}` → `20/03/2025`).
  - **`uppercase`** e **`lowercase`**: Converte texto (ex.: `{{ 'hello' | uppercase }}` → `HELLO`).
  - **`currency`**: Formata valores monetários (ex.: `{{ 1234.56 | currency:'USD' }}` → `$1,234.56`).
  - **`number`**: Formata números (ex.: `{{ 1234.567 | number:'1.2-2' }}` → `1,234.57`).
  - **`json`**: Exibe objetos como string JSON (ex.: `{{ obj | json }}`).
  - **`slice`**: Fatia arrays ou strings (ex.: `{{ [1,2,3] | slice:1:3 }}` → `[2,3]`).
  - **`async`**: Resolve Observables ou Promises (ex.: `{{ observable$ | async }}`).

---

## Pipes Personalizados
- **Criação**: Crie um pipe com o CLI ou manualmente para lógica específica.
- **Exemplo Simples**:
  ```typescript
  // reverse.pipe.ts
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'reverse',
    standalone: true
  })
  export class ReversePipe implements PipeTransform {
    transform(value: string): string {
      return value.split('').reverse().join('');
    }
  }
  ```
  - Uso: `{{ 'hello' | reverse }}` → `olleh`.

---

## Uso e Configuração
- **Uso no Template**:
  - Simples: `<p>{{ valor | pipe }}</p>`.
  - Com parâmetros: `<p>{{ data | date:'short' }}</p>`.
  - Encadeado: `<p>{{ texto | uppercase | slice:0:3 }}</p>`.

- **Configuração**:
  - **Standalone**: Pipes personalizados podem ser marcados como `standalone: true` e importados diretamente no componente.
  - **Módulos**: Declare no `declarations` do módulo (abordagem tradicional).
  ```typescript
  // app.component.ts (Standalone)
  import { Component } from '@angular/core';
  import { ReversePipe } from './reverse.pipe';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [ReversePipe],
    template: `<p>{{ 'Angular' | reverse }}</p>` // Resultado: "ralugnA"
  })
  export class AppComponent {}
  ```

- **Pure vs. Impure**:
  - **Pure** (padrão): Só recalcula se a referência do valor muda (mais performático).
  - **Impure**: Recalcula a cada ciclo de detecção de mudanças (use com cuidado, ex.: `pure: false` na anotação `@Pipe`).

---

## Notas
- **Performance**: Prefira pipes puros para evitar reprocessamento desnecessário.
- **Integração com i18n**: Pipes como `date` e `currency` se ajustam ao idioma configurado com `@angular/localize`.
- **Uso prático**: Formatação rápida no template sem lógica complexa no TS.
- **Limitações**: Não substituem filtros complexos (ex.: filtrar listas grandes deve ser feito no TS).

