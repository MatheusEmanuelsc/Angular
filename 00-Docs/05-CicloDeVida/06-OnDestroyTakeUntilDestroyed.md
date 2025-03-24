
```markdown
# OnDestroy e TakeUntilDestroyed no Angular 19

## Índice
1. [Resumo](#resumo)
2. [OnDestroy](#ondestroy)
3. [TakeUntilDestroyed](#takeuntildestroyed)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **OnDestroy**: Hook do ciclo de vida que executa lógica quando um componente é destruído.
- **TakeUntilDestroyed**: Operador RxJS introduzido no Angular 16 para encerrar assinaturas automaticamente ao destruir o componente.

---

## OnDestroy
- **Definição**: `ngOnDestroy` é chamado uma vez antes do Angular destruir o componente, permitindo limpar recursos (ex.: cancelar assinaturas, timers).
- **Objetivo**: Evitar vazamentos de memória ao liberar recursos associados ao componente.
- **Interface**: `OnDestroy` (de `@angular/core`).

---

## TakeUntilDestroyed
- **Definição**: `takeUntilDestroyed` é um operador RxJS que automaticamente completa observables quando o componente é destruído, eliminando a necessidade de gerenciar manualmente um `Subject` para cancelamento.
- **Objetivo**: Simplificar a limpeza de assinaturas de forma reativa.
- **Importação**: Disponível em `@angular/core/rxjs-interop` (a partir do Angular 16).

---

## Exemplos Práticos

### Standalone Components
1. **Exemplo com OnDestroy e TakeUntilDestroyed**:
   ```typescript
   // app.component.ts
   import { Component, OnDestroy } from '@angular/core';
   import { interval } from 'rxjs';
   import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

   @Component({
     selector: 'app-root',
     standalone: true,
     template: `<p>Contador: {{ counter }}</p>`
   })
   export class AppComponent implements OnDestroy {
     counter = 0;

     constructor() {
       // Usando takeUntilDestroyed para encerrar o observable automaticamente
       interval(1000)
         .pipe(takeUntilDestroyed())
         .subscribe(value => {
           this.counter = value;
           console.log('Contador atualizado:', value);
         });
     }

     ngOnDestroy() {
       console.log('Componente destruído, limpeza manual (se necessário)');
     }
   }
   ```
   - **Comportamento**:
     - `takeUntilDestroyed`: Cancela a assinatura do `interval` quando o componente é destruído.
     - `ngOnDestroy`: Loga a destruição (pode ser usado para limpezas adicionais).

---

### Com Módulos
1. **Exemplo com OnDestroy e TakeUntilDestroyed**:
   ```typescript
   // app.component.ts
   import { Component, OnDestroy } from '@angular/core';
   import { interval } from 'rxjs';
   import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

   @Component({
     selector: 'app-root',
     template: `<p>Contador: {{ counter }}</p>`
   })
   export class AppComponent implements OnDestroy {
     counter = 0;

     constructor() {
       interval(1000)
         .pipe(takeUntilDestroyed())
         .subscribe(value => {
           this.counter = value;
           console.log('Contador atualizado:', value);
         });
     }

     ngOnDestroy() {
       console.log('Componente destruído, limpeza manual (se necessário)');
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
     - Igual ao standalone: `takeUntilDestroyed` gerencia a assinatura, e `ngOnDestroy` é chamado na destruição.

---

## Notas
- **OnDestroy**:
  - Executado uma vez antes da destruição do componente.
  - Útil para limpezas manuais (ex.: `clearInterval`, unsubscribe manual).
- **TakeUntilDestroyed**:
  - Automatiza o cancelamento de observables no momento da destruição.
  - Requer Angular 16+ e importação de `@angular/core/rxjs-interop`.
  - Substitui a abordagem tradicional com `Subject` e `takeUntil`.
- **Ordem no Ciclo**:
  - `ngAfterViewChecked` → (mudanças) → `ngOnDestroy` (ao destruir).
- **Standalone**: Usa `takeUntilDestroyed` diretamente no construtor, mais simples.
- **Módulos**: Mesma lógica, mas com declaração no `NgModule`.
- **Uso prático**:
  - `OnDestroy`: Limpar recursos não reativos (ex.: eventos DOM).
  - `TakeUntilDestroyed`: Gerenciar observables de forma elegante.

