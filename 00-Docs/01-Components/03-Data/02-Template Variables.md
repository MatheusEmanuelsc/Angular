

```markdown
# Angular: Template Variables

## O que é?
- **Definição:** Variáveis definidas no template com a sintaxe `#nomeDaVariavel` para referenciar elementos DOM ou componentes diretamente no HTML.
- **Objetivo:** Facilitar o acesso a propriedades ou métodos de elementos sem precisar de referências no código TypeScript.

## Vantagens
- Acesso rápido a elementos ou valores no template.
- Reduz a necessidade de `@ViewChild` em casos simples.
- Útil para interações locais no template.

## Como Utilizar?
1. **Sintaxe Básica:**
   - No template (`app.component.html`):
     ```html
     <input #meuInput>
     <button (click)="meuInput.focus()">Focar</button>
     ```
     Resultado: Clicar no botão foca o input, usando a variável `#meuInput` para acessar o elemento DOM.

2. **Acessando Propriedades:**
   - Exemplo com valor:
     ```html
     <input #texto type="text">
     <p>Você digitou: {{ texto.value }}</p>
     ```
     Resultado: Mostra o valor digitado no input em tempo real.

3. **Com Componentes ou Diretivas:**
   - No template:
     ```html
     <input [(ngModel)]="nome" #modelo="ngModel">
     <p>Input válido? {{ modelo.valid }}</p>
     ```
     No componente:
     ```typescript
     nome = '';
     ```
     Resultado: `#modelo="ngModel"` expõe propriedades do `ngModel` (ex.: `valid`, `dirty`).

4. **Passando para Métodos:**
   - No template:
     ```html
     <input #meuInput>
     <button (click)="mostrarValor(meuInput.value)">Mostrar</button>
     ```
     No componente:
     ```typescript
     mostrarValor(valor: string) {
       console.log(valor);
     }
     ```
     Resultado: Ao clicar, loga o valor do input.

## Exemplo Prático
- Formulário com validação local:
  ```typescript
  export class AppComponent {
    usuario = '';
  }
  ```
  ```html
  <form #meuForm="ngForm">
    <input name="usuario" [(ngModel)]="usuario" #usuarioInput="ngModel" required>
    <button (click)="enviar(meuForm.valid)">Enviar</button>
    <p>Form válido? {{ meuForm.valid }}</p>
  </form>
  ```
  No componente:
  ```typescript
  enviar(valido: boolean) {
    if (valido) console.log('Formulário enviado!');
  }
  ```
  Resultado: O botão só envia se o input estiver preenchido, usando `#meuForm` e `#usuarioInput`.

## Resumo Rápido
- **Sintaxe:** `#nomeDaVariavel` ou `#nome="diretiva"`.
- **Direção:** Local ao template.
- **Uso:** Referenciar elementos DOM, componentes ou diretivas diretamente no HTML.

Use *template variables* para interações simples e locais no template do Angular!
``` 

### Nota
As *template variables* são poderosas para cenários rápidos, mas para lógica mais complexa ou reutilizável, considere usar `@ViewChild` ou `@ViewChildren` no componente. Se precisar de mais exemplos ou detalhes, é só pedir!