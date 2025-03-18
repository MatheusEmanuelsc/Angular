
```markdown
# Guardas de Rota no Angular 19 - CanActivate e CanActivateChild

## Índice
1. [Standalone Components](#standalone-components)
   - [CanActivate](#canactivate)
   - [CanActivateChild](#canactivatechild)
2. [Com Módulos](#com-módulos)
   - [CanActivate](#canactivate-1)
   - [CanActivateChild](#canactivatechild-1)

---

## Standalone Components

### CanActivate
```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // Verifica autenticação

  if (!isLoggedIn) {
    router.navigate(['/login']); // Redireciona se não autenticado
    return false;
  }
  return true; // Permite acesso
};

// app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] } // Protege a rota
];

// profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: '<p>Perfil do usuário</p>'
})
export class ProfileComponent { }
```

### CanActivateChild
```typescript
// child-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const childAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const isAdmin = localStorage.getItem('role') === 'admin'; // Verifica permissão

  if (!isAdmin) {
    router.navigate(['/profile']); // Redireciona se não for admin
    return false;
  }
  return true; // Permite acesso às rotas filhas
};

// app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { authGuard } from './auth.guard';
import { childAuthGuard } from './child-auth.guard';

export const routes: Routes = [
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [authGuard], // Protege a rota pai
    children: [
      { path: 'settings', component: SettingsComponent } // Rota filha
    ],
    canActivateChild: [childAuthGuard] // Protege todas as rotas filhas
  }
];

// settings.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: '<p>Configurações (admin apenas)</p>'
})
export class SettingsComponent { }
```

### Como Funciona
- **`CanActivate`**: Protege a rota principal (`/profile`).
- **`CanActivateChild`**: Protege as rotas filhas (`/profile/settings`), aplicado ao pai.

---

## Com Módulos

### CanActivate
```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Verifica autenticação
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redireciona
      return false;
    }
    return true; // Permite acesso
  }
}

// app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] } // Protege a rota
];
```

### CanActivateChild
```typescript
// child-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChildAuthGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(): boolean {
    const isAdmin = localStorage.getItem('role') === 'admin'; // Verifica permissão
    if (!isAdmin) {
      this.router.navigate(['/profile']); // Redireciona
      return false;
    }
    return true; // Permite acesso às rotas filhas
  }
}

// app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { ChildAuthGuard } from './child-auth.guard';

export const routes: Routes = [
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard], // Protege a rota pai
    children: [
      { path: 'settings', component: SettingsComponent } // Rota filha
    ],
    canActivateChild: [ChildAuthGuard] // Protege as rotas filhas
  }
];

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { routes } from './app.routes';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, ProfileComponent, SettingsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Como Funciona
- **`CanActivate`**: Protege a rota principal (`/profile`).
- **`CanActivateChild`**: Protege as rotas filhas (`/profile/settings`).

---

## Notas
- **`CanActivate`**: Controla o acesso à rota pai; executado antes de carregar o componente.
- **`CanActivateChild`**: Controla o acesso às rotas filhas; executado após `CanActivate` do pai.
- **Standalone**: Usa funções (`CanActivateFn`, `CanActivateChildFn`) com `inject()`.
- **Módulos**: Usa classes (`Injectable`) com construtor.
- **Exemplo prático**:
  - `/profile`: Requer login.
  - `/profile/settings`: Requer login e ser admin.

