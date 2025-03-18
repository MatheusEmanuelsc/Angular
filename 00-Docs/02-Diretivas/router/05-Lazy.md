

```markdown
# Lazy Loading no Angular 19

## Índice
1. [Standalone Components - loadComponent](#standalone-components---loadcomponent)
2. [Com Módulos - loadChildren](#com-módulos---loadchildren)

---

## Standalone Components - loadComponent

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota padrão carregada imediatamente
  { 
    path: 'admin', 
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent) // Carrega o componente sob demanda
  }
];

// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav>
      <a routerLink="/">Home</a> | <a routerLink="/admin">Admin</a>
    </nav>
    <router-outlet></router-outlet> <!-- Renderiza o componente lazy -->
  `
})
export class AppComponent { }

// admin-dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: '<h1>Admin Dashboard</h1>'
})
export class AdminDashboardComponent { }

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Configura as rotas
});
```

### Como Funciona
- O componente `AdminDashboardComponent` só é carregado quando o usuário acessa `/admin`.
- Usa `loadComponent` para lazy loading de standalone components.

---

## Com Módulos - loadChildren

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota padrão carregada imediatamente
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule) // Carrega o módulo sob demanda
  }
];

// admin.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent } // Rota padrão do módulo admin
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)], // Configura rotas filhas
  declarations: [AdminDashboardComponent]
})
export class AdminModule { }

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Configura rotas raiz
  ],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### HTML
```html
<!-- app.component.html -->
<nav>
  <a routerLink="/">Home</a> | <a routerLink="/admin">Admin</a>
</nav>
<router-outlet></router-outlet> <!-- Renderiza o módulo lazy -->
```

### Como Funciona
- O módulo `AdminModule` e seus componentes só são carregados ao acessar `/admin`.
- Usa `loadChildren` para lazy loading de módulos inteiros.

---

## Notas
- **loadComponent** (Standalone): Carrega apenas um componente, ideal para simplicidade e projetos menores.
- **loadChildren** (Módulos): Carrega um módulo com várias rotas/componentes, útil para aplicações grandes.
- **Benefício**: Ambos reduzem o tamanho do bundle inicial, carregando código só quando necessário.

