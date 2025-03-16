

```markdown
# Angular: ngStyle

## O que é?
- **Definição:** Uma diretiva do Angular que aplica estilos inline a um elemento dinamicamente com base em expressões ou condições.
- **Objetivo:** Controlar propriedades de estilo CSS diretamente no template de forma programática.

## Vantagens
- Permite definir múltiplos estilos de uma vez.
- Ideal para estilos dinâmicos sem criar classes CSS separadas.
- Mais flexível que o *style binding* simples (`[style.propriedade]`).

## Como Utilizar?
1. **Pré-requisito:**
   - Não requer módulos adicionais; `ngStyle` é nativo do Angular (disponível no `CommonModule`).

2. **Sintaxe Básica:**
   - **Objeto com Estilos:**
     - No template (`app.component.html`):
       ```html
       <div [ngStyle]="{'background-color': corFundo, 'font-size': tamanhoFonte}">
         Conteúdo
       </div>
       ```
     - No componente (`app.component.ts`):
       ```typescript
       export class AppComponent {
         corFundo = 'lightblue';
         tamanhoFonte = '16px';
       }
       ```
       Resultado: `<div style="background-color: lightblue; font-size: 16px;">`.

3. **Outras Sintaxes:**
   - **Condições Dinâmicas:**
     ```html
     <div [ngStyle]="{'color': isError ? 'red' : 'black'}">Texto</div>
     ```
     No componente:
     ```typescript
     isError = false;
     ```
     Resultado: Texto preto ou vermelho dependendo de `isError`.
   - **Objeto de Variável:**
     ```typescript
     estilos = {
       'font-weight': 'bold',
       'border': '1px solid gray'
     };
     ```
     ```html
     <div [ngStyle]="estilos">Elemento</div>
     ```

4. **Unidades Específicas:**
   - Para valores numéricos com unidades:
     ```html
     <div [ngStyle]="{'width.px': largura, 'height': altura + 'px'}">
       Caixa
     </div>
     ```
     No componente:
     ```typescript
     largura = 100;
     altura = 50;
     ```
     Resultado: `<div style="width: 100px; height: 50px;">`.

## Exemplo Prático
- Estilização dinâmica com botão:
  ```typescript
  export class AppComponent {
    isHighlighted = false;
    cor = 'white';
    toggleHighlight() {
      this.isHighlighted = !this.isHighlighted;
      this.cor = this.isHighlighted ? 'yellow' : 'white';
    }
  }
  ```
  ```html
  <div [ngStyle]="{'background-color': cor, 'padding.px': 10}">
    Texto
  </div>
  <button (click)="toggleHighlight()">Toggle</button>
  ```
  Resultado: Alterna o fundo entre amarelo e branco com padding fixo.

## Resumo Rápido
- **Sintaxe:** `[ngStyle]="{'propriedade': valor}"`.
- **Direção:** Componente → Template.
- **Uso:** Aplicar estilos inline dinamicamente.

Use `ngStyle` para manipular estilos CSS de forma dinâmica e direta no Angular!
``` 

### Nota
- O `ngStyle` é mais poderoso que o *style binding* simples (`[style.propriedade]="valor"`) quando você precisa aplicar vários estilos ou lógica condicional.
- Ele sobrescreve estilos inline existentes no elemento, então use com cuidado se houver CSS fixo. Se precisar de mais exemplos ou detalhes, é só pedir!