

# Tutorial: Consumindo uma API com Angular - `Signals` no Serviço com Template Específico

Este tutorial ajusta o componente para usar um template específico fornecido (`<h3>Get List</h3>` e sua estrutura), integrando-o a um serviço que gerencia o estado com `Signals`. Vou focar apenas nessa parte, mantendo o serviço e o componente consistentes.

## Data Atual
Data deste tutorial: **14 de Março de 2025**.

---

## Passo 1: Serviço com `Signals`

O serviço permanece o mesmo, gerenciando o estado dos posts com um `Signal`.

```typescript
// services/pratica.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

// Interface para tipagem
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PraticaService {
  #url = signal(environment.apiUrl); // URL como Signal
  #http = inject(HttpClient); // Injeção do HttpClient

  #setListTask = signal<Post[] | null>(null); // Signal privado para o estado
  public getListTask = this.#setListTask.asReadonly(); // Signal público somente leitura

  getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${this.#url()}/posts`).pipe(
      shareReplay(1), // Cache para evitar múltiplas requisições
      tap((res) => this.#setListTask.set(res)) // Atualiza o Signal
    );
  }
}
```

### Explicação do Serviço
- **`#setListTask`**: Armazena a lista de posts ou `null`.
- **`getListTask`**: Expõe o `Signal` como somente leitura.
- **`getPosts()`**: Faz a requisição e atualiza o `Signal` via `tap`.

---

## Passo 2: Componente com Template Específico

O componente usa o `Signal` do serviço e implementa o template fornecido.

```typescript
// components/post-list/post-list.component.ts
import { Component, inject } from '@angular/core';
import { PraticaService } from '../../services/pratica.service';

@Component({
  selector: 'app-post-list',
  standalone: true, // Componente standalone
  imports: [], // Não precisa de módulos adicionais
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  #pratica = inject(PraticaService);
  public getListTask = this.#pratica.getListTask; // Referência ao Signal do serviço

  ngOnInit() {
    this.#pratica.getPosts().subscribe(); // Dispara a requisição inicial
  }
}
```

### Template HTML
```html
<!-- post-list.component.html -->
<h3>Get List</h3>
@if (getListTask(); as data) {
  <ul>
    @for (item of data; track item.id) {
      <li>{{ item.id }} - {{ item.title }}</li>
    } @empty {
      <li>Sem dados carregados!</li>
    }
  </ul>
} @else {
  <li>Loading...</li>
}
```

### Explicação do Componente e Template
1. **`getListTask`**:
   - Acessa o `Signal` público do serviço, permitindo reatividade no template.

2. **`ngOnInit()`**:
   - Dispara a requisição inicial com `subscribe()` para carregar os dados no `Signal`.

3. **Template**:
   - **`<h3>Get List</h3>`**: Título fixo conforme fornecido.
   - **`@if (getListTask(); as data)`**: Verifica se o `Signal` tem valor (`Post[]`) e o alias como `data`.
   - **`@for (item of data; track item.id)`**: Itera sobre os posts, usando `id` como chave de rastreamento.
   - **`@empty`**: Exibe "Sem dados carregados!" se a lista estiver vazia.
   - **`@else`**: Mostra "Loading..." enquanto o `Signal` é `null`.

---

## Resumo
Este tutorial mostrou como:
1. Usar um serviço com `Signals` para gerenciar o estado de uma lista de posts.
2. Implementar um componente que consome o `Signal` e exibe os dados com o template específico fornecido:
   - `<h3>Get List</h3>` seguido de uma lista condicional com `@if`, `@for`, `@empty` e `@else`.

### Padrão Profissional
Essa abordagem é moderna, reativa e adequada para exibir dados dinâmicos com `Signals`. O uso de `@for` e `@if` alinha-se com as práticas mais recentes do Angular (v17+), sendo performático e declarativo.

