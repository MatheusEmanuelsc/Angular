

# Tutorial: Usando `HttpHeaders` e `HttpParams` em Requisições HTTP no Angular

Este tutorial explica como usar `HttpHeaders` e `HttpParams` para personalizar requisições HTTP em Angular, incluindo cabeçalhos personalizados e parâmetros de consulta. Vamos criar exemplos práticos e detalhar sua aplicação.

## Data Atual
Data deste tutorial: **14 de Março de 2025**.

## Índice
1. [Passo 1: Entendendo `HttpHeaders` e `HttpParams`](#passo-1-entendendo-httpheaders-e-httpparams)
2. [Passo 2: Implementando em um Serviço](#passo-2-implementando-em-um-serviço)
3. [Passo 3: Exemplos Práticos](#passo-3-exemplos-práticos)
4. [Resumo](#resumo)

---

## Passo 1: Entendendo `HttpHeaders` e `HttpParams`

### 1.1 `HttpHeaders`
- **O que é**: Uma classe imutável que representa cabeçalhos HTTP a serem enviados em uma requisição.
- **Uso**: Define metadados como tipo de conteúdo, autenticação ou cabeçalhos customizados.
- **Característica**: Cada modificação cria uma nova instância (imutabilidade).

### 1.2 `HttpParams`
- **O que é**: Uma classe imutável que representa parâmetros de consulta (query string) em uma URL.
- **Uso**: Passa dados como filtros, paginação ou busca na requisição.
- **Característica**: Também imutável, cada alteração gera uma nova instância.

### Explicação
- Ambos são usados com `HttpClient` para personalizar requisições.
- São opcionais e passados no objeto de opções da requisição (ex.: `{ headers, params }`).

---

## Passo 2: Implementando em um Serviço

Vamos criar um serviço que usa `HttpHeaders` e `HttpParams` em requisições HTTP.

```typescript
// services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #http = inject(HttpClient);
  #baseUrl = 'https://jsonplaceholder.typicode.com';

  // GET com parâmetros de consulta
  getPosts(page: number = 1, limit: number = 10): Observable<any[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-custom-header', 'myApp'); // Cabeçalho customizado

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString()); // Parâmetros de consulta

    return this.#http.get<any[]>(`${this.#baseUrl}/posts`, { headers, params });
  }

  // POST com cabeçalhos
  createPost(title: string, body: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer my-token'); // Exemplo de autenticação

    const postData = { title, body, userId: 1 };
    return this.#http.post<any>(`${this.#baseUrl}/posts`, postData, { headers });
  }
}
```

### Explicação do Serviço
1. **`getPosts`**:
   - Usa `HttpHeaders` para definir o tipo de conteúdo e um cabeçalho customizado.
   - Usa `HttpParams` para adicionar parâmetros de consulta (`page` e `limit`).

2. **`createPost`**:
   - Usa `HttpHeaders` para definir o tipo de conteúdo e um token de autenticação fictício.
   - Envia os dados no corpo da requisição com `post`.

3. **Imutabilidade**:
   - Cada `.set()` em `HttpHeaders` ou `HttpParams` retorna uma nova instância, mantendo a original intacta.

---

## Passo 3: Exemplos Práticos

### 3.1 Exemplo Básico: Listagem com Parâmetros
```typescript
// components/post-list/post-list.component.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let post of posts">{{ post.id }} - {{ post.title }}</li>
    </ul>
    <button (click)="loadMore()">Carregar mais</button>
  `,
})
export class PostListComponent {
  #api = inject(ApiService);
  posts: any[] = [];
  page = 1;

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.#api.getPosts(this.page, 5).subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Erro:', err),
    });
  }

  loadMore() {
    this.page++;
    this.loadPosts();
  }
}
```
**Resultado**: 
- A requisição inclui cabeçalhos (`x-custom-header`) e parâmetros (`page=1&limit=5`).
- O botão "Carregar mais" incrementa a página e refaz a requisição.

### 3.2 Exemplo Avançado: Criação com Autenticação
```typescript
// components/post-create/post-create.component.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  template: `
    <input #title placeholder="Título" />
    <input #body placeholder="Conteúdo" />
    <button (click)="createPost(title.value, body.value)">Criar</button>
    <p *ngIf="response">{{ response.title }} criado!</p>
  `,
})
export class PostCreateComponent {
  #api = inject(ApiService);
  response: any = null;

  createPost(title: string, body: string) {
    this.#api.createPost(title, body).subscribe({
      next: (data) => (this.response = data),
      error: (err) => console.error('Erro ao criar:', err),
    });
  }
}
```
**Resultado**: 
- A requisição POST inclui cabeçalhos como `Authorization` e `Content-Type`.
- O corpo da requisição é enviado como JSON.

### 3.3 Exemplo com Múltiplos Parâmetros e Cabeçalhos
```typescript
// services/api.service.ts (método adicional)
getFilteredPosts(filter: string, userId?: number): Observable<any[]> {
  let headers = new HttpHeaders().set('Accept', 'application/json');
  let params = new HttpParams().set('q', filter);

  if (userId) {
    params = params.set('userId', userId.toString());
    headers = headers.set('x-filtered-by', 'user');
  }

  return this.#http.get<any[]>(`${this.#baseUrl}/posts`, { headers, params });
}
```

```typescript
// components/post-filter/post-filter.component.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input #filter placeholder="Filtrar por título" />
    <input #userId placeholder="ID do usuário (opcional)" type="number" />
    <button (click)="filterPosts(filter.value, userId.value)">Filtrar</button>
    <ul>
      <li *ngFor="let post of posts">{{ post.title }} (User: {{ post.userId }})</li>
    </ul>
  `,
})
export class PostFilterComponent {
  #api = inject(ApiService);
  posts: any[] = [];

  filterPosts(filter: string, userId: string) {
    const id = userId ? parseInt(userId) : undefined;
    this.#api.getFilteredPosts(filter, id).subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Erro:', err),
    });
  }
}
```
**Resultado**: 
- A requisição inclui parâmetros dinâmicos (`q=filter&userId=1`) e cabeçalhos condicionais.

---

## Resumo
Este tutorial mostrou como:
1. Usar `HttpHeaders` para adicionar cabeçalhos personalizados (ex.: `Content-Type`, `Authorization`) em requisições.
2. Usar `HttpParams` para definir parâmetros de consulta (ex.: `page`, `limit`, `q`) em URLs.
3. Aplicar ambos em um serviço e consumi-los em componentes com exemplos práticos (listagem, criação e filtragem).

### Padrão Profissional
`HttpHeaders` e `HttpParams` são essenciais para personalizar requisições HTTP de forma segura e imutável. Combine com interceptors para cabeçalhos globais ou parâmetros comuns, mantendo a lógica específica nos serviços.

---

