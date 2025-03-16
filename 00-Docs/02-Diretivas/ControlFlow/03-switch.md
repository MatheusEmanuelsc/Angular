
# Diretiva `@switch` no Angular: Uso Atual e Histórico

## Índice

* Introdução
* `@switch` (Versão Atual)
    * O que é e como funciona
    * Exemplos práticos
    * Quando usar
* `ngSwitch` (Versão Antiga)
    * O que era e como funcionava
    * Exemplos práticos
    * Diferenças em relação a `@switch`
    * Motivo da mudança
* Considerações Finais

## Introdução

A diretiva `@switch` no Angular é usada para exibir condicionalmente blocos de HTML com base em um valor de expressão. Este guia explora o uso atual da diretiva e fornece um contexto sobre a versão anterior (`ngSwitch`).

## `@switch` (Versão Atual)

### O que é e como funciona

A diretiva `@switch` é usada em conjunto com `@case` e `@default` para criar uma estrutura de controle de fluxo semelhante a uma instrução `switch` em JavaScript. Ela permite que você exiba diferentes partes do template com base no valor de uma expressão.

### Exemplos práticos

```html
<div [switch]="status">
    <div *case="'ativo'">O status está ativo.</div>
    <div *case="'inativo'">O status está inativo.</div>
    <div *default>Status desconhecido.</div>
</div>
```

* O valor da variável `status` é avaliado pela diretiva `[switch]`.
* Os blocos `*case` correspondem a valores específicos de `status`.
* O Bloco `*default` é exibido se nenhum dos blocos `*case` corresponder.

### Quando usar

Use `@switch` quando precisar exibir condicionalmente diferentes partes do template com base em um valor de expressão, especialmente quando houver vários casos possíveis.

## `ngSwitch` (Versão Antiga)

### O que era e como funcionava

`ngSwitch`, `ngSwitchCase` e `ngSwitchDefault` eram as diretivas equivalentes na versão anterior do Angular. Elas funcionavam de maneira semelhante a `@switch`, mas com uma sintaxe diferente.

### Exemplos práticos

```html
<div [ngSwitch]="status">
    <div *ngSwitchCase="'ativo'">O status está ativo.</div>
    <div *ngSwitchCase="'inativo'">O status está inativo.</div>
    <div *ngSwitchDefault>Status desconhecido.</div>
</div>
```

* A diretiva `[ngSwitch]` avalia o valor de `status`.
* `*ngSwitchCase` define os casos de correspondência.
* `*ngSwitchDefault` define o caso padrão.

### Diferenças em relação a `@switch`

* A principal diferença está na sintaxe: `ngSwitch` usava atributos em vez de diretivas estruturais (`*`).
* A nova versão com as diretivas estruturais deixa o codigo mais limpo e legivel.

### Motivo da mudança

A mudança para `@switch` e a sintaxe de diretivas estruturais visa tornar o código Angular mais conciso e consistente com outras diretivas, além de melhorar a legibilidade e a manutenção.

## Considerações Finais

* `@switch` é a forma atual e recomendada de implementar lógica de switch no Angular.
* A nova sintaxe com diretivas estruturais (`*case`, `*default`) torna o código mais limpo e legível.
* `ngSwitch` e suas diretivas associadas foram descontinuadas e não devem ser usadas em novos projetos.
* Sempre que possível, atualize o código existente para usar `@switch` para aproveitar os benefícios da nova sintaxe.
