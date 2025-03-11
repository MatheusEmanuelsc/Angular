# Deferred Views no Angular: Carregamento Sob Demanda

## Índice
1. [Introdução](#introducao)
2. [Deferred Views no Angular 17+](#deferred-views-no-angular-17)
   - [O que são e como funcionam](#o-que-sao-e-como-funcionam)
   - [Parâmetros Detalhados](#parametros-detalhados)
   - [Exemplos práticos](#exemplos-praticos)
   - [Quando usar](#quando-usar)
3. [Versões Anteriores e Alternativas](#versoes-anteriores-e-alternativas)
   - [Abordagens tradicionais](#abordagens-tradicionais)
   - [Diferenças e motivações](#diferencas-e-motivacoes)
4. [Considerações Finais](#consideracoes-finais)

---

## Introdução

Deferred Views no Angular representam uma técnica de carregamento sob demanda que permite adiar a renderização de partes da interface do usuário até que sejam necessárias. Isso melhora o desempenho inicial e a experiência do usuário, especialmente em aplicações grandes e complexas.

---

## Deferred Views no Angular 17+

### O que são e como funcionam

Deferred Views permitem que você defina blocos de template que serão carregados apenas quando certas condições forem atendidas. Essas condições podem incluir:

* Interação do usuário (por exemplo, clique em um botão).
* Visibilidade do elemento na tela.
* Tempo ocioso do navegador.
* Condições imperativas.

### Parâmetros Detalhados

- **`on` (Acionadores)**: Define quando o conteúdo diferido será carregado. Opções disponíveis:
  - `idle`, `timer`, `viewport`, `interaction`, `hover`, `immediate`, `prefetch`.
  - Vários `on` são combinados com lógica OR.
- **`prefetch` (Pré-carregamento)**: Inicia o carregamento em segundo plano, sem renderizar imediatamente.
- **`placeholder` (Espaço Reservado)**: Exibe um espaço antes do carregamento iniciar.
- **`loading` (Carregamento)**: Mostra um conteúdo temporário enquanto o carregamento ocorre.
  - Pode usar `minimum` para definir um tempo mínimo antes de sumir.
- **`error` (Erro)**: Define um conteúdo a ser exibido se o carregamento falhar.
- **`when` (Condição Imperativa)**: Permite condicionar o carregamento a uma expressão booleana.
  - Misturado com `on`, ambos são combinados com lógica OR.
- **`after` (Atraso no Carregamento)**: Garante que o `loading` só seja exibido após um tempo específico.
- **`minimum` (Tempo Mínimo de Carregamento)**: Evita oscilações rápidas no conteúdo do espaço reservado.

### Exemplos práticos

```html
<button #trigger>Carregar Conteúdo</button>

@defer (on interaction(trigger); prefetch on viewport; when condicao; after 1s) {
  <app-componente-pesado></app-componente-pesado>
  @placeholder {
   <p>Carregando...</p>
  }
  @loading (minimum 1s){
   <p>Carregando um pouco mais...</p>
  }
  @error {
   <p>Falha no carregamento</p>
  }
}
```

**Explicação:**
- O conteúdo de `<app-componente-pesado>` será carregado quando:
  - O usuário interagir com o botão `trigger`.
  - O elemento entrar no viewport (`prefetch`).
  - A variável `condicao` for verdadeira.
- O `loading` só será exibido se o carregamento durar mais de 1 segundo.
- `placeholder` e `error` fornecem feedback visual adicional.

### Quando usar

Use Deferred Views quando:
- Tiver componentes pesados que não são necessários imediatamente.
- Quiser melhorar o tempo de carregamento inicial da aplicação.
- Precisar carregar conteúdo sob demanda com base na interação do usuário ou outras condições.

---

## Versões Anteriores e Alternativas

### Abordagens tradicionais

Antes das Deferred Views, os desenvolvedores usavam técnicas como:
- `*ngIf`: Renderiza componentes condicionalmente, mas sem carregamento sob demanda otimizado.
- Lazy loading de módulos: Carrega módulos inteiros sob demanda, mas não componentes individuais.

**Exemplo pré-Angular 17 (usando `ngIf`):**

```html
<div *ngIf="isVisible">
  <app-large-component></app-large-component>
</div>
```

**Limitações:**
- O componente não é carregado de forma otimizada.
- Não há controle nativo de `loading`, `error` ou `placeholder`.

### Diferenças e motivações

| Versão | Suporte a Deferred Views |
|--------|-------------------------|
| Angular 16 ou anterior | ❌ Não suportado nativamente |
| Angular 17+ | ✅ Suporte a `@defer` |

* Deferred Views oferecem um controle mais granular sobre o carregamento de componentes individuais.
* Simplificam o código e tornam o carregamento sob demanda mais declarativo.
* Melhoram o desempenho e a experiência do usuário, especialmente em aplicações complexas.

---

## Considerações Finais

- Deferred Views são uma ferramenta poderosa para otimizar o desempenho do Angular.
- Permitem carregar componentes sob demanda com base em diversas condições.
- Diferente do lazy loading de módulos, Deferred Views focam no carregamento de componentes individuais.
- Essa nova abordagem permite um melhor controle de como e quando os componentes são carregados.

