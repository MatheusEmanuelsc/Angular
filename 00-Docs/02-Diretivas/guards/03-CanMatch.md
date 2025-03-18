
```markdown
# Guarda de Rota CanMatch no Angular 19

## Índice
1. [Standalone Components](#standalone-components)
2. [Com Módulos](#com-módulos)

---

## Standalone Components

### Configuração
```typescript
// role.guard.ts
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const roleGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('role'); // Pega o papel do usuário
  const requiredRole = route.data?.['role']; // Pega o papel exigido da rota

  if (userRole !== requiredRole) {
    router.navigate(['/access-denied']); // Redireciona se o papel não corresponder
    return false;
  }
  return true; // Permite correspondência da rota
};

// app.routes.ts
import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { roleGuard } from './role.guard';

export const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canMatch: [roleGuard], // Verifica se a rota pode ser correspondida
    data: { role: 'admin' } // Define o papel necessário
  },
  { path: 'access-denied', component: AccessDeniedComponent }
];

// admin-dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: '<p>Dashboard do Admin</p>'
})
export class AdminDashboardComponent { }

// access-denied.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  template: '<p>Acesso negado</p>'
})
export class AccessDeniedComponent { }

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
- **`CanMatchFn`**: Decide se a rota deve ser correspondida com base em condições (ex.: papel do usuário).
- **Diferença de CanActivate**: Se `false`, o roteamento tenta outras rotas ou falha; não apenas bloqueia acesso.
- **Exemplo**: `/admin` só é correspondido se o usuário for "admin"; caso contrário, vai para `/access-denied`.

---

## Com Módulos

### Configuração
```typescript
// role.guard.ts
import { Injectable } from '@angular/core';
import { CanMatch, Router, Route, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanMatch {
  constructor(private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    const userRole = localStorage.getItem('role'); // Pega o papel do usuário
    const requiredRole = route.data?.['role']; // Pega o papel exigido

    if (userRole !== requiredRole) {
      this.router.navigate(['/access-denied']); // Redireciona se não corresponder
      return false;
    }
    return true; // Permite correspondência
  }
}

// app.routes.ts
import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RoleGuard } from './role.guard';

export const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canMatch: [RoleGuard], // Verifica se a rota pode ser correspondida
    data: { role: 'admin' } // Define o papel necessário
  },
  { path: 'access-denied', component: AccessDeniedComponent }
];

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { routes } from './app.routes';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, AdminDashboardComponent, AccessDeniedComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Como Funciona
- **`CanMatch`**: Implementado como classe, com lógica semelhante ao standalone.
- **Redirecionamento**: Mesmo comportamento, mas com injeção via construtor.
- **Exemplo**: `/admin` exige papel "admin"; se não, redireciona para `/access-denied`.

---

## Notas
- **`CanMatch`**:
  - Introduzido no Angular 14, aprimorado no 19.
  - Controla se uma rota é elegível para correspondência, não apenas acesso.
  - Pode ser usado com `data` para passar metadados (ex.: `role`).
- **Standalone**: Usa função (`CanMatchFn`) com `inject()`, mais simples.
- **Módulos**: Usa classe (`Injectable`) com construtor, tradicional.
- **Uso prático**: Ideal para rotas condicionais baseadas em regras (ex.: papéis de usuário).

