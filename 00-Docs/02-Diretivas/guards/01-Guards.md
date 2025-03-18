
```markdown
# Guardas de Rota no Angular 19

## Índice
1. [Standalone Components](#standalone-components)
2. [Com Módulos](#com-módulos)

---

## Standalone Components

### Configuração
```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injeção moderna com inject()
  const isLoggedIn = !!localStorage.getItem('token'); // Verifica se está autenticado

  if (!isLoggedIn) {
    router.navigate(['/login']); // Redireciona se não autenticado
    return false;
  }
  return true; // Permite acesso se autenticado
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
- **`CanActivateFn`**: Função que decide se a rota pode ser acessada.
- **Redirecionamento**: Usa `router.navigate()` para redirecionar se a condição falhar.
- **Exemplo**: Só acessa `/profile` se `token` estiver no `localStorage`.

---

## Com Módulos

### Configuração
```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Disponível em toda a aplicação
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {} // Injeção via construtor

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Verifica autenticação
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redireciona se não autenticado
      return false;
    }
    return true; // Permite acesso se autenticado
  }
}

// app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] } // Protege a rota
];

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { routes } from './app.routes';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Como Funciona
- **`CanActivate`**: Interface implementada pela classe do guarda.
- **Redirecionamento**: Mesmo comportamento, mas com injeção via construtor.
- **Exemplo**: Protege `/profile` com a mesma lógica de autenticação.

---

## Notas
- **Tipos de Guardas**:
  - `CanActivate`: Controla acesso à rota.
  - `CanDeactivate`: Controla saída da rota (ex.: confirmação de saída).
  - `CanLoad`: Controla carregamento lazy de módulos.
- **Standalone**: Usa função (`CanActivateFn`) e `inject()`, mais moderno e leve.
- **Módulos**: Usa classe (`Injectable`) e construtor, abordagem tradicional.
- **Uso**: Aplica-se em `canActivate` (ou outros) no array de rotas.

