
```markdown
# Angular: Class e Style Binding

## O que é?
- **Class Binding:** Um tipo de *data binding* que adiciona ou remove classes CSS de um elemento usando `[class]`.
- **Style Binding:** Um tipo de *data binding* que aplica estilos inline diretamente a um elemento usando `[style]`.
- **Objetivo:** Controlar dinamicamente a aparência de elementos no template.

## Vantagens
- Permite aplicar estilos condicionalmente sem lógica no CSS.
- Fácil integração com dados do componente.

## Como Utilizar?
### Class Binding
1. **Sintaxe Básica:**
   - No componente (`app.component.ts`):
     ```typescript
     export class AppComponent {
       isActive = true;
     }
     ```
   - No template (`app.component.html`):
     ```html
     <div [class.active]="isActive">Conteúdo</div>
     ```
     Resultado: `<div class="active">` se `isActive` for `true`.

2. **Múltiplas Classes:**
   - Usando `[ngClass]`:
     ```html
     <div [ngClass]="{'ativo': isActive, 'erro': hasError}">Texto</div>
     ```
     No componente:
     ```typescript
     isActive = true;
     hasError = false;
     ```
     Resultado: `<div class="ativo">`.

### Style Binding
1. **Sintaxe Básica:**
   - No componente:
     ```typescript
     export class AppComponent {
       corFundo = 'lightblue';
       tamanhoFonte = '16px';
     }
     ```
   - No template:
     ```html
     <p [style.background-color]="corFundo" [style.font-size]="tamanhoFonte">Parágrafo</p>
     ```
     Resultado: `<p style="background-color: lightblue; font-size: 16px;">`.

2. **Múltiplos Estilos:**
   - Usando `[ngStyle]`:
     ```html
     <div [ngStyle]="{'color': corTexto, 'font-weight': pesoFonte}">Texto</div>
     ```
     No componente:
     ```typescript
     corTexto = 'red';
     pesoFonte = 'bold';
     ```

## Exemplo Prático
- Alternar estilo e classe com botão:
  ```typescript
  export class AppComponent {
    isDestacado = false;
    toggleDestaque() {
      this.isDestacado = !this.isDestacado;
    }
  }
  ```
  ```html
  <div [class.destacado]="isDestacado" [style.border]="isDestacado ? '2px solid blue' : 'none'">
    Conteúdo
  </div>
  <button (click)="toggleDestaque()">Toggle</button>
  ```
  Resultado: Aplica a classe `destacado` e uma borda azul ao clicar.

## Resumo Rápido
- **Class Binding:** `[class.nome]="condição"` ou `[ngClass]="{ 'classe': condição }"`.
- **Style Binding:** `[style.propriedade]="valor"` ou `[ngStyle]="{ 'propriedade': valor }"`.
- **Direção:** Componente → Template.
- **Uso:** Controlar classes e estilos dinamicamente.

Use *class* e *style binding* para estilização dinâmica e condicional no Angular!
```