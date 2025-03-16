

## Angular RouterLink - Resumo Completo

## Índice

1.  [O que é RouterLink?](https://www.google.com/url?sa=E&source=gmail&q=#o-que-é-routerlink)
2.  [Diferença entre RouterLink e sua Sintaxe](https://www.google.com/url?sa=E&source=gmail&q=#diferença-entre-routerlink-e-sua-sintaxe)
3.  [Uso do RouterLink](#uso-do-routerlink)
4.  [RouterLinkActive](#routerlinkactive)
5.  [RouterLinkOptions](#routerlinkoptions)
6.  [Importação Necessária](https://www.google.com/url?sa=E&source=gmail&q=#importação-necessária)
7.  [queryParamsHandling](https://www.google.com/url?sa=E&source=gmail&q=#queryparamshandling)
8.  [Conclusão](https://www.google.com/url?sa=E&source=gmail&q=#conclusão)

-----

## O que é RouterLink?

O **RouterLink** é uma diretiva do Angular usada para criar links internos dentro da aplicação, permitindo navegação sem recarregar a página. Ele substitui o uso tradicional do atributo `href` em `<a>`, proporcionando uma navegação mais rápida e eficiente em aplicações de página única (SPAs).

-----

## Diferença entre RouterLink e sua Sintaxe

Existem duas formas principais de utilizar `RouterLink` no Angular:

1.  **Sintaxe Simples (String)**:

      * Utilizada quando o caminho da rota é fixo.
      * Escrito diretamente como um atributo.

    <!-- end list -->

    ```html
    <a routerLink="/home">Ir para Home</a>
    ```

2.  **Sintaxe com Array (`[routerLink]`)**:

      * Utilizada quando é necessário construir o caminho dinamicamente.
      * Requer um array para definir os segmentos da URL.

    <!-- end list -->

    ```html
    <a [routerLink]="['/user', userId]">Ver Perfil</a>
    ```

> **Diferença:** A versão string é mais simples e direta, enquanto a versão com array permite concatenar segmentos dinamicamente, facilitando a passagem de parâmetros e a construção de URLs complexas.

-----

## Uso do RouterLink

O `RouterLink` pode ser utilizado para navegação entre páginas dentro do HTML:

```html
<a routerLink="/dashboard">Dashboard</a>
<a [routerLink]="['/profile', userId]">Meu Perfil</a>
```

-----

## RouterLinkActive

O **RouterLinkActive** permite adicionar classes CSS automaticamente quando a rota está ativa:

```html
<a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
```

> **Dica:** A classe CSS "active" pode ser definida no seu CSS para estilizar o link ativo, destacando a página atual.

Para rotas filhas, utilize `routerLinkActiveOptions`:

```html
<a [routerLink]="['/admin']" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Admin</a>
```

> **`exact: true`** garante que a classe ativa seja aplicada apenas se a URL for exatamente igual à rota especificada, evitando conflitos com rotas filhas.

-----

## RouterLinkOptions

O `RouterLink` pode receber opções adicionais, como `queryParams`, `fragment` e `queryParamsHandling`:

```html
<a [routerLink]="['/products']" [queryParams]="{ category: 'electronics' }">Produtos Eletrônicos</a>
```

Exemplo com fragmento de URL:

```html
<a [routerLink]="['/about']" fragment="contact">Ir para Contato</a>
```

-----

## Importação Necessária

Para usar `RouterLink`, importe o `RouterModule` no módulo principal:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'user/:id', component: UserComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
```

-----

## queryParamsHandling

O atributo `queryParamsHandling` permite controlar como os parâmetros de consulta (query parameters) são mesclados durante a navegação. As opções são:

  * **`merge`**: Mescla os novos parâmetros de consulta com os parâmetros existentes na URL.
  * **`preserve`**: Mantém os parâmetros de consulta existentes na URL e ignora os novos parâmetros.

<!-- end list -->

```html
<a [routerLink]="['/products']" [queryParams]="{ page: 2 }" queryParamsHandling="merge">Próxima Página</a>
```

-----

## Conclusão

O **RouterLink** é a principal ferramenta para navegação entre páginas no Angular. Ele pode ser usado de diferentes formas:

  * **Com string** (`routerLink="/home"`) para caminhos fixos.
  * **Com array** (`[routerLink]="['/user', userId]"`) para caminhos dinâmicos.
  * **Com opções adicionais** como `queryParams`, `fragment` e `queryParamsHandling`.
  * **Com RouterLinkActive** para adicionar estilos ao link ativo, com controle preciso através de `routerLinkActiveOptions`.

Escolha a abordagem que melhor se adequa ao seu cenário, considerando a complexidade da navegação e a necessidade de passar parâmetros dinamicamente.
