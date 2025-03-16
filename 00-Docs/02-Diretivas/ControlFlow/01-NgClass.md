

```markdown
# Angular: ngClass

## O que é?
- **Definição:** Uma diretiva do Angular que aplica ou remove classes CSS de um elemento dinamicamente com base em condições ou expressões.
- **Objetivo:** Controlar a estilização de elementos no template de forma condicional ou múltipla.

## Vantagens
- Permite adicionar várias classes de uma vez.
- Flexibilidade com condições dinâmicas.
- Mais poderoso que o *class binding* simples (`[class.nome]`).

## Como Utilizar?
1. **Pré-requisito:**
   - Não precisa de módulos adicionais; `ngClass` é nativo do Angular (disponível no `CommonModule`).

2. **Sintaxe Básica:**
   - **Objeto com Condições:**
     - No template (`app.component.html`):
       ```html
       <div [ngClass]="{'ativo': isActive, 'erro': hasError}">Conteúdo</div>
       ```
     - No componente (`app.component.ts`):
       ```typescript
       export class AppComponent {
         isActive = true;
         hasError = false;
       }
       ```
       Resultado: `<div class="ativo">` (aplica apenas `ativo`).

3. **Outras Sintaxes:**
   - **Array de Classes:**
     ```html
     <div [ngClass]="['classe1', 'classe2']">Texto</div>
     ```
     Resultado: `<div class="classe1 classe2">`.
   - **String Simples:**
     ```html
     <div [ngClass]="'classe1 classe2'">Texto</div>
     ```
     Resultado: Mesmo que o array.
   - **Misturando com Variáveis:**
     ```typescript
     classes = ['base', 'destaque'];
     ```
     ```html
     <div [ngClass]="classes">Elemento</div>
     ```

4. **Condições Dinâmicas:**
   - No componente:
     ```typescript
     export class AppComponent {
       status = 'success';
     }
     ```
   - No template:
     ```html
     <div [ngClass]="{'success': status === 'success', 'error': status === 'error'}">Status</div>
     ```
     Resultado: `<div class="success">`.

## Exemplo Prático
- Toggle de classes:
  ```typescript
  export class AppComponent {
    isHighlighted = false;
    toggleHighlight() {
      this.isHighlighted = !this.isHighlighted;
    }
  }
  ```
  ```html
  <div [ngClass]="{'highlight': isHighlighted, 'normal': !isHighlighted}">
    Texto
  </div>
  <button (click)="toggleHighlight()">Toggle</button>
  ```
  ```css
  .highlight { background-color: yellow; }
  .normal { background-color: white; }
  ```
  Resultado: Alterna entre fundo amarelo e branco ao clicar.

## Resumo Rápido
- **Sintaxe:** `[ngClass]="{'classe': condição}"` ou `[ngClass]="['classe1', 'classe2']"`.
- **Direção:** Componente → Template.
- **Uso:** Aplicar classes CSS dinamicamente com base em lógica.

Use `ngClass` para estilização condicional e múltipla de elementos no Angular!
``` 

### Nota
- O `ngClass` é mais versátil que o *class binding* simples (`[class.nome]="condição"`), especialmente para múltiplas classes ou lógica complexa.
- Ele substitui todas as classes existentes no elemento, então combine com `class` fixo (ex.: `<div class="base" [ngClass]="...">`) se necessário. Se precisar de mais detalhes, é só avisar!