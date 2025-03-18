
```markdown
# Router.navigate no Angular 19

## Índice
1. [Standalone Components](#standalone-components)
2. [Com Módulos](#com-módulos)

---

## Standalone Components

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota padrão
  { path: 'user/:id', component: UserProfileComponent } // Rota com parâmetro
];

// home.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <button (click)="goToUser(123)">Ir para Usuário 123</button>
    <button (click)="goToUserWithQuery()">Ir com Query</button>
  `
})
export class HomeComponent {
  private router = inject(Router); // Injeção moderna

  goToUser(userId: number) {
    // Navega para uma rota com parâmetro
    this.router.navigate(['/user', userId]);
  }

  goToUserWithQuery() {
    // Navega com query params
    this.router.navigate(['/user', 456], { queryParams: { tab: 'profile' } });
  }
}

// user-profile.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  template: '<p>ID: {{ userId }} | Tab: {{ tab }}</p>'
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  tab: string | null = null;
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id'); // Pega o parâmetro
    this.tab = this.route.snapshot.queryParamMap.get('tab'); // Pega o query param
  }
}

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

### Como Funciona
- **`navigate(pathArray, options)`**: 
  - `pathArray`: Caminho como array (ex.: `['/user', 123]`).
  - `options`: Configurações como `queryParams`.
- **Exemplos**:
  - `/user/123`: Navegação com parâmetro.
  - `/user/456?tab=profile`: Navegação com query params.

---

## Com Módulos

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota padrão
  { path: 'user/:id', component: UserProfileComponent } // Rota com parâmetro
];

// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <button (click)="goToUser(123)">Ir para Usuário 123</button>
    <button (click)="goToUserWithQuery()">Ir com Query</button>
  `
})
export class HomeComponent {
  constructor(private router: Router) {} // Injeção via construtor

  goToUser(userId: number) {
    // Navega para uma rota com parâmetro
    this.router.navigate(['/user', userId]);
  }

  goToUserWithQuery() {
    // Navega com query params
    this.router.navigate(['/user', 456], { queryParams: { tab: 'profile' } });
  }
}

// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  template: '<p>ID: {{ userId }} | Tab: {{ tab }}</p>'
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  tab: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id'); // Pega o parâmetro
    this.tab = this.route.snapshot.queryParamMap.get('tab'); // Pega o query param
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { routes } from './app.routes';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, HomeComponent, UserProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Como Funciona
- Igual ao standalone, mas com estrutura modular.
- **`navigate`**: Mesmo comportamento, usando injeção via construtor.

---

## Notas
- **Sintaxe**: `navigate()` aceita um array de segmentos de caminho e um objeto opcional de opções.
- **Opções**:
  - `queryParams`: Adiciona parâmetros de consulta.
  - `relativeTo`: Navega relativamente à rota atual (ex.: `this.router.navigate(['../'], { relativeTo: this.route })`).
- **Standalone**: Usa `inject()` para injeção.
- **Módulos**: Usa construtor, abordagem tradicional.


```