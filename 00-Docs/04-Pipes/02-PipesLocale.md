
```markdown
# Angular Pipes com Locale Global no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Pipes Sensíveis a Locale](#pipes-sensíveis-a-locale)
3. [Configuração de Locale Global](#configuração-de-locale-global)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: Angular Pipes como `date`, `currency` e `number` podem se adaptar automaticamente a um locale global configurado, ajustando formatos de data, moeda e números com base no idioma/país.
- **Objetivo**: Garantir que a apresentação de dados reflita convenções regionais (ex.: `dd/MM/yyyy` no Brasil, `MM/dd/yyyy` nos EUA).
- **Integração**: Funciona em conjunto com `@angular/localize` para internacionalização nativa.

---

## Pipes Sensíveis a Locale
- **Principais Pipes**:
  - **`date`**: Formata datas (ex.: `{{ '2025-03-20' | date:'medium' }}` → `20 de mar. de 2025` em `pt-BR`).
  - **`currency`**: Formata moedas (ex.: `{{ 1234.56 | currency }}` → `R$ 1.234,56` em `pt-BR`).
  - **`number`**: Formata números decimais (ex.: `{{ 1234.567 | number:'1.2-2' }}` → `1.234,57` em `pt-BR`).
- **Comportamento**: Esses pipes usam o locale padrão do Angular (`en-US`) ou o configurado globalmente.

---

## Configuração de Locale Global

### Standalone Components
1. **Configuração no `main.ts`**:
   ```typescript
   // main.ts
   import { bootstrapApplication } from '@angular/platform-browser';
   import { AppComponent } from './app.component';
   import { LOCALE_ID } from '@angular/core';
   import localePt from '@angular/common/locales/pt'; // Importa locale pt-BR
   import { registerLocaleData } from '@angular/common';

   registerLocaleData(localePt); // Registra o locale pt-BR

   bootstrapApplication(AppComponent, {
     providers: [
       { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale global
     ]
   });
   ```

2. **Uso no Componente**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';
   import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [CommonModule], // Necessário para pipes nativos
     template: `
       <p>Data: {{ today | date:'fullDate' }}</p>
       <p>Moeda: {{ 1234.56 | currency }}</p>
       <p>Número: {{ 1234.567 | number:'1.2-2' }}</p>
     `
   })
   export class AppComponent {
     today = new Date();
   }
   ```
   - **Saída (pt-BR)**:
     - Data: `quinta-feira, 20 de março de 2025`
     - Moeda: `R$ 1.234,56`
     - Número: `1.234,57`

---

### Com Módulos
1. **Configuração no `app.module.ts`**:
   ```typescript
   // app.module.ts
   import { NgModule, LOCALE_ID } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { AppComponent } from './app.component';
   import localePt from '@angular/common/locales/pt';
   import { registerLocaleData } from '@angular/common';

   registerLocaleData(localePt); // Registra o locale pt-BR

   @NgModule({
     imports: [BrowserModule],
     declarations: [AppComponent],
     providers: [
       { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale global
     ],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

2. **Uso no Componente**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <p>Data: {{ today | date:'fullDate' }}</p>
       <p>Moeda: {{ 1234.56 | currency }}</p>
       <p>Número: {{ 1234.567 | number:'1.2-2' }}</p>
     `
   })
   export class AppComponent {
     today = new Date();
   }
   ```
   - **Saída (pt-BR)**:
     - Data: `quinta-feira, 20 de março de 2025`
     - Moeda: `R$ 1.234,56`
     - Número: `1.234,57`

---

## Notas
- **Locale Global**:
  - Definido via `LOCALE_ID` no bootstrap ou módulo.
  - Requer o registro do locale específico com `registerLocaleData`.
- **Arquivos de Locale**:
  - Localizados em `@angular/common/locales/` (ex.: `pt` para pt-BR, `es` para espanhol).
  - Devem ser importados manualmente.
- **Integração com i18n**:
  - Se usado com `@angular/localize`, o locale do build (`angular.json`) sobrepõe o `LOCALE_ID` em runtime.
- **Uso prático**: Formatar dados automaticamente para o idioma/região do usuário sem ajustes manuais por pipe.
- **Limitações**: Um único locale global por build; para múltiplos idiomas, use builds separados com `@angular/localize`.

