Aqui está o resumo em Markdown sobre **Two-Way Binding** no Angular, seguindo o padrão dos resumos anteriores:

```markdown
# Angular: Two-Way Binding

## O que é?
- **Definição:** Um tipo de *data binding* que sincroniza dados entre o componente e o template em ambas as direções usando `[( )]`.
- **Objetivo:** Manter o valor de uma propriedade do componente e o elemento HTML atualizados automaticamente.

## Vantagens
- Reduz código manual para sincronizar dados.
- Ideal para formulários e interações bidirecionais.
- Combina *property binding* (`[ ]`) e *event binding* (`( )`).

## Como Utilizar?
1. **Pré-requisito:**
   - Importe o módulo `FormsModule` no `app.module.ts`:
     ```typescript
     import { NgModule } from '@angular/core';
     import { FormsModule } from '@angular/forms';
     import { AppComponent } from './app.component';

     @NgModule({
       imports: [FormsModule],
       declarations: [AppComponent],
       bootstrap: [AppComponent]
     })
     export class AppModule { }
     ```

2. **Sintaxe Básica:**
   - No componente (`app.component.ts`):
     ```typescript
     export class AppComponent {
       nome = 'João';
     }
     ```
   - No template (`app.component.html`):
     ```html
     <input [(ngModel)]="nome">
     <p>Você digitou: {{ nome }}</p>
     ```
     Resultado: Alterar o input atualiza `nome`, e mudar `nome` no código atualiza o input.

3. **Como Funciona:**
   - `[(ngModel)]` é um açúcar sintático para:
     ```html
     <input [ngModel]="nome" (ngModelChange)="nome = $event">
     ```
   - `[ngModel]` define o valor inicial (componente → template).
   - `(ngModelChange)` atualiza o componente quando o valor muda (template → componente).

## Exemplo Prático
- Formulário simples:
  ```typescript
  export class AppComponent {
    usuario = 'Maria';
    atualizarUsuario(novoValor: string) {
      this.usuario = novoValor;
    }
  }
  ```
  ```html
  <input [(ngModel)]="usuario">
  <button (click)="atualizarUsuario('Pedro')">Mudar para Pedro</button>
  <p>Usuário: {{ usuario }}</p>
  ```
  Resultado: Digitar no input ou clicar no botão atualiza `usuario` em tempo real.

## Resumo Rápido
- **Sintaxe:** `[(ngModel)]="propriedade"`.
- **Direção:** Componente ↔ Template (bidirecional).
- **Uso:** Sincronizar dados em formulários ou entradas do usuário.

Use *two-way binding* com `ngModel` para criar interações bidirecionais simples e eficazes no Angular!
``` 

### Nota
O *two-way binding* depende do `FormsModule` para funcionar com `ngModel`. Ele é amplamente usado em formulários reativos simples, mas para projetos maiores, o Angular recomenda o uso de *Reactive Forms* (que não usam `[(ngModel)]`). Se precisar de mais detalhes, é só avisar!