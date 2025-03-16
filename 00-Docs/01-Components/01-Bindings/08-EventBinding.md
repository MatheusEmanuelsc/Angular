
```markdown
# Angular: Event Binding

## O que é?
- **Definição:** Um tipo de *data binding* que conecta eventos do DOM a métodos do componente usando `( )`.
- **Objetivo:** Responder a ações do usuário ou eventos do navegador no código do componente.

## Vantagens
- Integração direta entre eventos do template e lógica do componente.
- Suporte a eventos nativos do HTML e eventos customizados.
- Direção única (*one-way binding*), do template para o componente.

## Como Utilizar?
1. **Sintaxe Básica:**
   - No componente (`app.component.ts`):
     ```typescript
     export class AppComponent {
       mensagem = '';
       mostrarMensagem() {
         this.mensagem = 'Botão clicado!';
       }
     }
     ```
   - No template (`app.component.html`):
     ```html
     <button (click)="mostrarMensagem()">Clique aqui</button>
     <p>{{ mensagem }}</p>
     ```
     Resultado: Ao clicar, exibe "Botão clicado!".

2. **Com Dados do Evento:**
   - Use `$event` para capturar informações:
     ```html
     <input (input)="digitar($event)" placeholder="Digite algo">
     ```
     No componente:
     ```typescript
     digitar(evento: Event) {
       this.mensagem = (evento.target as HTMLInputElement).value;
     }
     ```

3. **Lista de Eventos Comuns:**
   - **Mouse:**
     - `(click)`: Dispara ao clicar em um elemento.
     - `(dblclick)`: Dispara ao dar um duplo clique.
     - `(mouseover)`: Dispara quando o mouse entra no elemento.
     - `(mouseout)`: Dispara quando o mouse sai do elemento.
     - `(mousedown)`: Dispara ao pressionar o botão do mouse.
     - `(mouseup)`: Dispara ao soltar o botão do mouse.
     - `(mousemove)`: Dispara enquanto o mouse se move sobre o elemento.
   - **Teclado:**
     - `(keydown)`: Dispara ao pressionar uma tecla.
     - `(keyup)`: Dispara ao soltar uma tecla.
     - `(keypress)`: Dispara ao pressionar uma tecla que produz um caractere (menos usado hoje).
   - **Formulário:**
     - `(input)`: Dispara a cada alteração no valor de um campo (ex.: digitação).
     - `(change)`: Dispara quando o valor muda e o campo perde o foco.
     - `(submit)`: Dispara ao enviar um formulário.
     - `(focus)`: Dispara quando o elemento ganha foco.
     - `(blur)`: Dispara quando o elemento perde foco.
   - **Janela/Documento:**
     - `(scroll)`: Dispara ao rolar a página ou um elemento.
     - `(resize)`: Dispara ao redimensionar a janela.
     - `(load)`: Dispara quando o elemento ou página termina de carregar.
   - Exemplo:
     ```html
     <button (click)="onClick()">Clique</button>
     <input (keyup)="onKeyUp($event)">Tecla</input>
     ```

## Exemplo Prático
- Contador com eventos:
  ```typescript
  export class AppComponent {
    contador = 0;
    incrementar() {
      this.contador++;
    }
    decrementar() {
      this.contador--;
    }
  }
  ```
  ```html
  <button (click)="incrementar()">+</button>
  <span>{{ contador }}</span>
  <button (click)="decrementar()">-</button>
  ```
  Resultado: Clicar nos botões altera o contador.

## Resumo Rápido
- **Sintaxe:** `(evento)="metodo()"`.
- **Direção:** Template → Componente.
- **Uso:** Reagir a ações do usuário ou eventos do DOM.

Use *event binding* para capturar e responder a interações específicas no Angular!
``` 

