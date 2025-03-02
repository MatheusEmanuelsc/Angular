

## Diretiva `ngClass` no Angular: Sintaxe Nova e Tradicional

## Índice

1.  [O que é `ngClass`?]([https://www.google.com/url?sa=E&source=gmail&q=](https://www.google.com/url?sa=E&source=gmail&q=)[[https://www.google.com/url?sa=E%26source=gmail%26q=#o-que-é-ngclass](https://www.google.com/url?sa=E%26source=gmail%26q=#o-que-é-ngclass)]\([https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23o-que-%C3%A9-ngclass](https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23o-que-%C3%A9-ngclass)\))
2.  [Nova Sintaxe de `ngClass` (Angular 17+)]([https://www.google.com/url?sa=E&source=gmail&q=](https://www.google.com/url?sa=E&source=gmail&q=)[https://www.google.com/url?sa=E%26source=gmail%26q=#nova-sintaxe-de-ngclass-angular-17]\(https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23nova-sintaxe-de-ngclass-angular-17\))
      * [Sintaxe com Objeto Inline](https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23sintaxe-com-objeto-inline)
      * [Sintaxe com Expressões Booleanas](https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23sintaxe-com-express%C3%B5es-booleanas)
3.  [Diretiva `ngClass` (Sintaxe Tradicional)]([https://www.google.com/url?sa=E&source=gmail&q=](https://www.google.com/url?sa=E&source=gmail&q=)[https://www.google.com/url?sa=E%26source=gmail%26q=#diretiva-ngclass-sintaxe-tradicional]\(https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23diretiva-ngclass-sintaxe-tradicional\))
      * [Sintaxe com String](https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23sintaxe-com-string)
      * [Sintaxe com Array](https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23sintaxe-com-array)
      * [Sintaxe com Objeto](https://www.google.com/search?q=https://www.google.com/url%3Fsa%3DE%26source%3Dgmail%26q%3D%23sintaxe-com-objeto)
4.  [Importação Necessária](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#importação-necessária)
5.  [Conclusão](https://www.google.com/url?sa=E&source=gmail&q=https://www.google.com/url?sa=E%26source=gmail%26q=#conclusão)

-----

## O que é `ngClass`?

A diretiva `ngClass` é usada para adicionar ou remover classes CSS dinamicamente em elementos HTML, com base em condições lógicas. Ela permite controlar a aparência dos elementos de forma reativa.

-----

## Nova Sintaxe de `ngClass` (Angular 17+)

A partir do Angular 17, a diretiva `ngClass` foi simplificada, permitindo uma sintaxe mais concisa e legível.

### Sintaxe com Objeto Inline

```html
<div [class]="{ 'active': isActive, 'error': hasError }">Conteúdo</div>
```

Neste exemplo, as classes "active" e "error" são adicionadas ou removidas com base nos valores das variáveis `isActive` e `hasError` no componente.

### Sintaxe com Expressões Booleanas

```html
<div [class.active]="isActive" [class.error]="hasError">Conteúdo</div>
```

Esta sintaxe é ainda mais direta. As classes "active" e "error" são adicionadas quando as expressões `isActive` e `hasError` são verdadeiras.

-----

## Diretiva `ngClass` (Sintaxe Tradicional)

A diretiva `ngClass` tradicional oferece várias formas de adicionar classes dinamicamente.

### Sintaxe com String

```html
<div [ngClass]="'active'">Conteúdo</div>
```

Neste caso, a classe "active" é sempre adicionada.

### Sintaxe com Array

```html
<div [ngClass]="['active', 'error']">Conteúdo</div>
```

As classes "active" e "error" são sempre adicionadas.

### Sintaxe com Objeto

```html
<div [ngClass]="{ 'active': isActive, 'error': hasError }">Conteúdo</div>
```

As classes "active" e "error" são adicionadas ou removidas com base nos valores das variáveis `isActive` e `hasError` no componente.

-----

## Importação Necessária

A diretiva `ngClass` faz parte do módulo `CommonModule`, que é importado por padrão no `AppModule` e em outros módulos de recursos.

-----

## Conclusão

A diretiva `ngClass` é uma ferramenta essencial para controlar a aparência dos elementos HTML dinamicamente. A nova sintaxe do Angular 17+ simplifica o uso da diretiva, tornando-a mais concisa e legível. A sintaxe tradicional continua sendo uma opção válida, oferecendo flexibilidade e compatibilidade com projetos existentes.
