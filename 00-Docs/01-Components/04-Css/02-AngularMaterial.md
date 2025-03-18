

```markdown
# Angular: Angular Material

## O que é?
- **Definição:** Uma biblioteca oficial de componentes UI para Angular, baseada no Material Design do Google.
- **Objetivo:** Fornecer componentes prontos, estilizados e acessíveis para acelerar o desenvolvimento de interfaces.

## Vantagens
- Componentes consistentes e bem testados.
- Suporte nativo ao Angular (integração com CLI).
- Temas personalizáveis e acessibilidade embutida.

## Como Utilizar?

### Versão Moderna (Atual até Angular 18)
1. **Contexto:**
   - Até março de 2025 (Angular 18), o Angular Material é instalado via `ng add` e suporta integração com *Signals* para estado reativo, além de melhorias em performance e tree-shaking.

2. **Instalação:**
   - No terminal:
     ```bash
     ng add @angular/material
     ```
   - Escolha tema, gestos (opcional), e animações durante o processo.

3. **Sintaxe:**
   - No `app.module.ts`:
     ```typescript
     import { MatButtonModule } from '@angular/material/button';

     @NgModule({
       imports: [MatButtonModule, /* outros */],
       // ...
     })
     export class AppModule { }
     ```
   - No template (`app.component.html`):
     ```html
     <button mat-button color="primary">Clique</button>
     ```
   - Com *Signals* (opcional):
     ```typescript
     import { signal } from '@angular/core';

     export class AppComponent {
       isDisabled = signal(false);
     }
     ```
     ```html
     <button mat-button [disabled]="isDisabled()">Clique</button>
     ```

4. **Benefício:**
   - Integração com Angular CLI e suporte a recursos modernos como *deferrable views* e *Signals*.

### Versão Antiga (Inicial)
1. **Contexto:**
   - Introduzido no Angular 2+ (2016), com instalação manual e menos automação.

2. **Instalação:**
   - Manualmente:
     ```bash
     npm install @angular/material @angular/cdk @angular/animations
     ```
   - Adicionar imports e temas no `app.module.ts` e `styles.css` manualmente.

3. **Sintaxe:**
   - No `app.module.ts`:
     ```typescript
     import { MatButtonModule } from '@angular/material/button';
     import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

     @NgModule({
       imports: [MatButtonModule, BrowserAnimationsModule],
       // ...
     })
     export class AppModule { }
     ```
   - No `styles.css`:
     ```css
     @import '@angular/material/prebuilt-themes/indigo-pink.css';
     ```
   - No template:
     ```html
     <button mat-button color="primary">Clique</button>
     ```

4. **Limitação:**
   - Mais trabalho manual, sem automação do CLI.

## Exemplo Prático
- Moderna:
  ```typescript
  export class AppComponent {
    contador = 0;
    incrementar() {
      this.contador++;
    }
  }
  ```
  ```html
  <button mat-raised-button color="accent" (click)="incrementar()">
    Contar: {{ contador }}
  </button>
  ```

- Antiga:
  - Mesma sintaxe no template, mas com configuração manual de módulos e temas.

## Resumo Rápido
- **Sintaxe Moderna:** `ng add @angular/material` + `<tag mat-diretiva>`.
- **Sintaxe Antiga:** Instalação manual + configuração explícita.
- **Direção:** Biblioteca → Componentes/Template.
- **Uso:** Criar UIs rápidas com Material Design.

Use o Angular Material moderno com `ng add` para simplicidade e integração otimizada!
``` 

### Nota
- A "versão moderna" reflete a facilidade do `ng add` e a compatibilidade com Angular 18, enquanto a "antiga" é o método manual das primeiras versões. Não há uma nova sintaxe radical para os componentes em si, mas a instalação e o suporte evoluíram. Se precisar de detalhes sobre um componente específico, é só pedir!