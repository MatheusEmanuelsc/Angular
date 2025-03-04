# HashRouter no Angular

## Índice
1. [Introdução](#introdução)
2. [Diferentes Tipos de Roteamento no Angular](#diferentes-tipos-de-roteamento-no-angular)
3. [Habilitando HashRouter](#habilitando-hashrouter)
4. [Exemplo de Implementação](#exemplo-de-implementação)
5. [Considerações Finais](#considerações-finais)

## Introdução
No Angular, o roteamento é utilizado para navegar entre diferentes componentes sem recarregar a página. O **HashRouter** é uma abordagem que utiliza o caractere `#` na URL para separar a rota do restante do endereço, garantindo compatibilidade com servidores que não suportam o roteamento baseado em histórico.

## Diferentes Tipos de Roteamento no Angular
O Angular suporta dois tipos principais de roteamento:

| Estratégia | Descrição | Vantagens | Desvantagens |
|------------|-------------|------------|--------------|
| **Path Location Strategy** (Default - HTML5 Mode) | Utiliza URLs sem `#`, como `/home` ou `/about`. | URLs mais limpas, melhor para SEO. | Requer configuração extra no servidor. |
| **Hash Location Strategy (HashRouter)** | Utiliza `#` nas URLs, como `/#/home`. | Funciona sem configuração extra no servidor. | URLs menos amigáveis, pior para SEO. |

## Habilitando HashRouter
Para ativar o **HashRouter**, é necessário configurar o provedor de localização no módulo de roteamento do Angular:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
```

## Exemplo de Implementação
Com o **HashRouter** ativado, o Angular adicionará `#` antes das rotas, garantindo que a navegação funcione corretamente sem precisar de configurações extras no servidor.

Exemplo de uma navegação básica:

```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet></router-outlet>
```

Se o usuário acessar `/about`, a URL será exibida como:
```
http://localhost:4200/#/about
```

## Considerações Finais
- O **HashRouter** é útil quando não se pode configurar o servidor para suportar roteamento baseado em histórico.
- Ele pode ser necessário para aplicações hospedadas em **GitHub Pages** ou servidores estáticos.
- No entanto, para aplicações modernas, o **Path Location Strategy** é recomendado, pois fornece URLs mais limpas e melhora a experiência do usuário.

---

Esse resumo apresenta uma explicação detalhada sobre o **HashRouter no Angular**, além de um exemplo prático para melhor compreensão.
