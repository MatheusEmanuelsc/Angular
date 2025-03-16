
```markdown
# Angular: Property Binding

## O que é?
- **Definição:** Um tipo de *data binding* que conecta propriedades de elementos HTML a valores do componente usando `[ ]`.
- **Objetivo:** Atualizar dinamicamente atributos ou propriedades de elementos no template.

## Vantagens
- Controle preciso sobre propriedades dos elementos.
- Mais seguro que interpolação para atributos (evita strings brutas).
- Direção única (*one-way binding*), do componente para o template.

## Como Utilizar?
1. **Sintaxe Básica:**
   - No componente (`app.component.ts`):
     ```typescript
     export class AppComponent {
       imagemUrl = 'https://exemplo.com/imagem.jpg';
       estaDesabilitado = true;
     }
     ```
   - No template (`app.component.html`):
     ```html
     <img [src]="imagemUrl">
     <button [disabled]="estaDesabilitado">Clique</button>
     ```
     Resultado: A imagem carrega do URL e o botão fica desabilitado.

2. **Expressões:**
   - Pode usar lógica simples:
     ```html
     <div [class.active]="isActive">Conteúdo</div>
     ```
   - No componente:
     ```typescript
     isActive = true; // Adiciona a classe 'active' ao div
     ```

3. **Diferença de Interpolação:**
   - Interpolação (`{{ }}`) é para texto; *property binding* (`[ ]`) é para propriedades/atributos.
   - Exemplo: `<img src="{{ imagemUrl }}">` funciona, mas `[src]="imagemUrl"` é mais idiomático.

## Exemplo Prático
- Habilitar/desabilitar um campo dinamicamente:
  ```typescript
  export class AppComponent {
    estaBloqueado = false;
    toggleBloqueio() {
      this.estaBloqueado = !this.estaBloqueado;
    }
  }
  ```
  ```html
  <input [disabled]="estaBloqueado">
  <button (click)="toggleBloqueio()">Toggle</button>
  ```
  Resultado: O input alterna entre habilitado e desabilitado ao clicar.

## Resumo Rápido
- **Sintaxe:** `[propriedade]="valor"`.
- **Direção:** Componente → Template.
- **Uso:** Controlar propriedades de elementos (ex.: `src`, `disabled`, `class`).

Use *property binding* para manipular atributos de elementos de forma dinâmica e segura no Angular!
```