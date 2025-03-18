Aqui está um resumo objetivo em Markdown sobre rotas com parâmetros no Angular 19, priorizando standalone components e incluindo a abordagem com módulos, com exemplos comentados.

```markdown
# Rotas com Parâmetros no Angular 19

## Standalone Components (Prioridade)

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'user/:id', component: UserProfileComponent } // :id é um parâmetro dinâmico
];

// user-profile.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [], // Não precisa de imports adicionais para roteamento básico
  template: '<p>ID do usuário: {{ userId }}</p>'
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  private route = inject(ActivatedRoute); // Injeção moderna com inject()

  ngOnInit() {
    // Pega o parâmetro 'id' da URL usando snapshot (valor fixo no carregamento)
    this.userId = this.route.snapshot.paramMap.get('id');
    // Alternativa: observable para reagir a mudanças dinâmicas
    // this.route.paramMap.subscribe(params => this.userId = params.get('id'));
  }
}

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Configura as rotas
});
```

### Uso
- Acesse `/user/123` para ver o perfil do usuário com ID 123.
- O parâmetro `:id` é capturado no componente via `ActivatedRoute`.

---

## Com Módulos (Alternativa)

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'user/:id', component: UserProfileComponent } // :id como parâmetro dinâmico
];

// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  template: '<p>ID do usuário: {{ userId }}</p>'
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {} // Injeção via construtor

  ngOnInit() {
    // Pega o parâmetro 'id' da URL usando snapshot
    this.userId = this.route.snapshot.paramMap.get('id');
    // Alternativa: observable para mudanças dinâmicas
    // this.route.paramMap.subscribe(params => this.userId = params.get('id'));
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Configura rotas no nível raiz
  ],
  declarations: [AppComponent, UserProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Uso
- Igual ao standalone: `/user/123` exibe o ID 123 no componente.

---

## Notas
- **Parâmetro Dinâmico**: Definido com `:` (ex.: `:id`) na rota.
- **Acesso**:
  - `snapshot.paramMap.get()`: Valor fixo no carregamento.
  - `paramMap.subscribe()`: Reage a mudanças no parâmetro (ex.: navegação entre `/user/123` e `/user/456` na mesma rota).
- **Standalone**: Usa `inject()` para dependências, mais moderno.
- **Módulos**: Usa injeção via construtor, abordagem tradicional.

Se precisar de mais detalhes, é só pedir!
```