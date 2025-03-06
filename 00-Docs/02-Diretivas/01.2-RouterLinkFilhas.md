# Angular Router: RouterLink, Routes e Child Routes

## Índice
1. [Introdução ao Angular Router](#introducao)
2. [Configuração de Rotas](#configuracao-rotas)
3. [RouterLink - Navegação no Angular](#routerlink)
4. [Rotas Filhas (Child Routes)](#rotas-filhas)
5. [Mudanças antes e depois da versão 16](#angular16)
6. [Resumo](#resumo)

---

## 1. Introdução ao Angular Router {#introducao}
O Angular Router é um módulo que permite a navegação entre componentes em uma aplicação SPA (Single Page Application). Ele gerencia o histórico de navegação e permite definir rotas e sub-rotas.

---

## 2. Configuração de Rotas {#configuracao-rotas}
As rotas são configuradas em um array de objetos `Routes` e registradas no módulo da aplicação.

### Exemplo de configuração básica de rotas:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota raiz
  { path: 'about', component: AboutComponent } // Rota /about
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
**Explicação:**
- `RouterModule.forRoot(routes)`: Configura as rotas principais da aplicação.
- `path: ''`: Define a rota inicial.
- `path: 'about'`: Define a rota que leva ao componente About.

---

## 3. RouterLink - Navegação no Angular {#routerlink}
O **RouterLink** permite navegação sem recarregar a página.

### Exemplo de uso:
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>
```
**Explicação:**
- `routerLink` substitui `href` para evitar recarregar a página.
- A navegação é gerenciada pelo Angular Router.

**Navegação programática:**
```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToAbout() {
  this.router.navigate(['/about']);
}
```
---

## 4. Rotas Filhas (Child Routes) {#rotas-filhas}
Rotas filhas são úteis para módulos aninhados dentro de um layout pai.

### Exemplo:
```typescript
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
```
**Explicação:**
- `children` define as rotas que fazem parte da `dashboard`.
- `/dashboard/profile` e `/dashboard/settings` renderizarão dentro de `DashboardComponent`.

No template do `DashboardComponent`, é necessário adicionar:
```html
<router-outlet></router-outlet>
```
Isso permite que os componentes filhos sejam renderizados no local correto.

---

## 5. Mudanças antes e depois da versão 16 {#angular16}
Antes do Angular 16, o roteamento dependia fortemente do conceito de **NgModules**. Com a introdução dos **Standalone Components**, tornou-se opcional o uso de módulos para configuração de rotas.

### Antes do Angular 16 (usando módulos):
```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

### Depois do Angular 16 (Standalone Components):
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

### Diferenças principais:
1. **Standalone Components eliminam a necessidade de módulos (`NgModule`)**, reduzindo a complexidade do código.
2. **`provideRouter(routes)` substitui `RouterModule.forRoot(routes)`**, tornando a configuração mais direta.
3. **Melhor desempenho**, pois o Angular carrega apenas os serviços necessários.

---

## 6. Resumo {#resumo}
O Angular Router é essencial para navegação em SPAs. Ele permite:
- Configurar rotas e sub-rotas.
- Usar `RouterLink` para navegação declarativa.
- Implementar navegação programática com `Router.navigate()`.
- Trabalhar com rotas filhas.
- **Antes do Angular 16**, utilizava-se `NgModule` para definir rotas.
- **A partir do Angular 16**, é possível configurar rotas sem `NgModules`, usando `provideRouter()` e `bootstrapApplication()`.

Com isso, a navegação em aplicações Angular fica mais estruturada e eficiente!
