

```markdown
# Angular: Text Interpolation

## O que é?
- **Definição:** Uma forma de *data binding* que exibe valores ou expressões do componente no template usando `{{ }}`.
- **Objetivo:** Mostrar dados dinâmicos no HTML de maneira simples.

## Vantagens
- Fácil de usar e entender.
- Ideal para exibir texto ou valores calculados.
- Direção única (*one-way binding*), do componente para o template.

## Como Utilizar?
1. **Sintaxe Básica:**
   - No componente (`app.component.ts`):
     ```typescript
     export class AppComponent {
       nome = 'João';
     }
     ```
   - No template (`app.component.html`):
     ```html
     <p>Olá, {{ nome }}</p>
     ```
     Resultado: "Olá, João".

2. **Expressões:**
   - Pode usar cálculos ou chamadas simples:
     ```html
     <p>Idade: {{ idade + 1 }}</p>
     <p>Primeiro nome: {{ getPrimeiroNome() }}</p>
     ```
   - No componente:
     ```typescript
     idade = 25;
     getPrimeiroNome() { return 'Ana'; }
     ```

3. **Limitações:**
   - Só exibe valores, não altera propriedades de elementos.
   - Evite lógica complexa dentro de `{{ }}` (use métodos no componente).

## Exemplo Prático
- Mostrar uma saudação dinâmica:
  ```typescript
  export class AppComponent {
    usuario = 'Maria';
    hora = new Date().getHours();
  }
  ```
  ```html
  <p>{{ hora < 12 ? 'Bom dia' : 'Boa tarde' }}, {{ usuario }}!</p>
  ```
  Resultado: "Bom dia, Maria!" (se antes do meio-dia).

## Resumo Rápido
- **Sintaxe:** `{{ expressão }}`.
- **Direção:** Componente → Template.
- **Uso:** Exibir dados ou resultados simples.

Use *text interpolation* para textos dinâmicos rápidos e fáceis no Angular!
```