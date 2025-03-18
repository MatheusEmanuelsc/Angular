
```markdown
# Roteamento no Angular 19

## Standalone Components (Prioridade)

### Configuração Básica
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota padrão
  { path: 'about', component: AboutComponent }, // Rota específica
  { path: '**', redirectTo: '' } // Rota curinga
];

// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importa o necessário para roteamento
  template: `
    <nav>
      <a routerLink="/">Home</a> | <a routerLink="/about">About</a>
    </nav>
    <router-outlet></router-outlet> <!-- Renderiza o componente da rota -->
  `
})
export class AppComponent { }

// home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: '<h1>Home</h1>'
})
export class HomeComponent { }

// about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: '<h1>About</h1>'
})
export class AboutComponent { }

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Configura rotas diretamente
});
```

### Rotas com Parâmetros
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'user/:id', component: UserProfileComponent } // Parâmetro dinâmico
];

// user-profile.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [], // Não precisa importar módulos adicionais
  template: '<p>ID: {{ userId }}</p>'
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  private route = inject(ActivatedRoute); // Injeção moderna com inject()

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id'); // Pega o parâmetro 'id'
  }
}
```

### Lazy Loading
```typescript
// app.routes.ts
export const routes: Routes = [
  { 
    path: 'admin', 
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent) // Carrega standalone sob demanda
  }
];

// admin-dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: '<h1>Admin Dashboard</h1>'
})
export class AdminDashboardComponent { }
```

---

## Com Módulos (Alternativa)

### Configuração Básica
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota padrão
  { path: 'about', component: AboutComponent }, // Rota específica
  { path: '**', redirectTo: '' } // Rota curinga
];

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Configura rotas no nível raiz
  ],
  declarations: [AppComponent, HomeComponent, AboutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Rotas com Parâmetros
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'user/:id', component: UserProfileComponent } // Parâmetro dinâmico
];

// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  template: '<p>ID: {{ userId }}</p>'
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id'); // Pega o parâmetro 'id'
  }
}
```

### Lazy Loading
```typescript
// app.routes.ts
export const routes: Routes = [
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Carrega módulo sob demanda
  }
];

// admin.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)], // Rotas filhas
  declarations: [AdminDashboardComponent]
})
export class AdminModule { }
```

---

## Notas
- **Standalone**: Usa `provideRouter()` e `loadComponent()`, mais moderno e leve.
- **Módulos**: Usa `RouterModule.forRoot()` e `forChild()`, tradicional e robusto para projetos complexos.


```