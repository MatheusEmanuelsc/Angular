
```markdown
# Query Parameters no Angular 19

## Índice
1. [Standalone Components](#standalone-components)
2. [Com Módulos](#com-módulos)

---

## Standalone Components

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: 'search', component: SearchComponent } // Rota simples para query params
];

// search.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  template: `
    <p>Busca: {{ query }}</p>
    <button (click)="updateQuery()">Atualizar Query</button>
  `
})
export class SearchComponent implements OnInit {
  query: string | null = null;
  private route = inject(ActivatedRoute); // Injeção moderna
  private router = inject(Router);

  ngOnInit() {
    // Pega o query param 'q' da URL (ex.: /search?q=angular)
    this.query = this.route.snapshot.queryParamMap.get('q');
    // Alternativa: observable para mudanças dinâmicas
    // this.route.queryParamMap.subscribe(params => this.query = params.get('q'));
  }

  updateQuery() {
    // Navega atualizando o query param
    this.router.navigate(['/search'], { queryParams: { q: 'novo-valor' } });
  }
}

// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/search" [queryParams]="{ q: 'angular' }">Buscar Angular</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }

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
- **Acesso**: `/search?q=angular` define `q` como "angular".
- **Leitura**: Usa `queryParamMap.get()` para pegar valores.
- **Atualização**: `router.navigate()` com `queryParams` modifica a URL.

---

## Com Módulos

### Configuração
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: 'search', component: SearchComponent } // Rota simples para query params
];

// search.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  template: `
    <p>Busca: {{ query }}</p>
    <button (click)="updateQuery()">Atualizar Query</button>
  `
})
export class SearchComponent implements OnInit {
  query: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {} // Injeção via construtor

  ngOnInit() {
    // Pega o query param 'q' da URL
    this.query = this.route.snapshot.queryParamMap.get('q');
    // Alternativa: observable para mudanças
    // this.route.queryParamMap.subscribe(params => this.query = params.get('q'));
  }

  updateQuery() {
    // Navega atualizando o query param
    this.router.navigate(['/search'], { queryParams: { q: 'novo-valor' } });
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [AppComponent, SearchComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### HTML
```html
<!-- app.component.html -->
<nav>
  <a routerLink="/search" [queryParams]="{ q: 'angular' }">Buscar Angular</a>
</nav>
<router-outlet></router-outlet>
```

### Como Funciona
- Igual ao standalone, mas com estrutura modular.
- **Acesso**: `/search?q=angular`.
- **Leitura**: `queryParamMap.get()`.
- **Atualização**: `router.navigate()`.

---

## Notas
- **Query Params**: Adicionados após `?` na URL (ex.: `?q=valor`).
- **Snapshot**: Valor fixo no carregamento.
- **Observable**: Reage a mudanças dinâmicas.
- **Standalone**: Usa `inject()`; mais leve.
- **Módulos**: Usa construtor; tradicional.

