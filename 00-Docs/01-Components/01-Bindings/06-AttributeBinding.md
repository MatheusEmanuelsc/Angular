
```markdown
# Angular: Attribute Binding

## O que é?
- **Definição:** Um tipo de *data binding* que define valores de atributos HTML (não propriedades DOM) usando `[attr.]`.
- **Objetivo:** Atualizar atributos HTML estáticos que não têm uma propriedade DOM correspondente.

## Vantagens
- Permite manipular atributos HTML personalizados ou específicos.
- Útil quando o Angular não mapeia um atributo diretamente para uma propriedade.

## Como Utilizar?
1. **Sintaxe Básica:**
   - No componente (`app.component.ts`):
     ```typescript
     export class AppComponent {
       cor = 'blue';
       meuAtributo = 'valor-dinamico';
     }
     ```
   - No template (`app.component.html`):
     ```html
     <div [attr.data-cor]="cor">Conteúdo</div>
     <div [attr.meus-dados]="meuAtributo">Outro</div>
     ```
     Resultado: `<div data-cor="blue">` e `<div meus-dados="valor-dinamico">`.

2. **Quando Usar:**
   - Atributos HTML como `data-*`, `aria-*` ou atributos customizados.
   - Exemplo com ARIA:
     ```html
     <button [attr.aria-label]="rotulo">Clique</button>
     ```
     No componente:
     ```typescript
     rotulo = 'Botão de ação';
     ```

3. **Diferença de Property Binding:**
   - *Property Binding* (`[propriedade]`) atualiza propriedades do DOM (ex.: `[disabled]`).
   - *Attribute Binding* (`[attr.atributo]`) atualiza atributos HTML (ex.: `[attr.data-id]`).

## Exemplo Prático
- Adicionar um atributo dinâmico para acessibilidade:
  ```typescript
  export class AppComponent {
    nivelAcessibilidade = 'alto';
  }
  ```
  ```html
  <section [attr.aria-level]="nivelAcessibilidade">Seção</section>
  ```
  Resultado: `<section aria-level="alto">`.

## Resumo Rápido
- **Sintaxe:** `[attr.nome]="valor"`.
- **Direção:** Componente → Template.
- **Uso:** Definir atributos HTML (não propriedades DOM).

Use *attribute binding* quando precisar controlar atributos HTML específicos ou personalizados no Angular!
``` 

