

# Tutorial: Consumindo uma API com Angular - Usando `Signals`

Este tutorial apresenta uma alternativa para consumir APIs em Angular utilizando `Signals`, uma funcionalidade reativa introduzida no Angular 16+. Vou converter o código fornecido, explicar o uso de `toSignal`, e comparar essa abordagem com as anteriores (`subscribe` e `AsyncPipe`).

## Data Atual
Data deste tutorial: **14 de Março de 2025**.

---

## Passo 1: Ajustando o Serviço (Reutilizando o Existente)

O serviço permanece o mesmo do tutorial anterior, já que ele retorna um `Observable` que será convertido para `Signal` no componente.

```typescript
// services/pratica.service.ts
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

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
  #url = environment.apiUrl;
  #http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${this.#url}/posts`).pipe(
      shareReplay(1) // Cache para evitar múltiplas requisições
    );
  }
}
```

### Explicação
- O `shareReplay(1)` continua essencial para evitar múltiplas requisições HTTP, já que o `Observable` será convertido em `Signal`.

---

## Passo 2: Convertendo para `Signals` no Componente

O componente foi ajustado para usar `toSignal` e renderizar os dados com a sintaxe `@for` no template.

```typescript
// components/post-list/post-list.component.ts
import { Component, inject } from '@angular/core';
import { PraticaService } from '../../services/pratica.service';
import { toSignal } from '@angular/core/rxjs-interop'; // Importação necessária para toSignal

@Component({
  selector: 'app-post-list',
  standalone: true, // Componente standalone
  imports: [], // Não precisamos de AsyncPipe ou CommonModule
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  #pratica = inject(PraticaService);
  public posts = toSignal(this.#pratica.getPosts(), { initialValue: [] }); // Converte Observable para Signal
}
```

### Template HTML
```html
<!-- post-list.component.html -->
<h1>Posts</h1>
<ul>
  @for (post of posts(); track post.id) {
    <li>{{ post.title }}</li>
  }
</ul>
```

### Explicações e Correções
1. **`toSignal`**:
   - Converte um `Observable` em um `Signal`, uma estrutura reativa que substitui assinaturas manuais ou o `AsyncPipe`.
   - O parâmetro `{ initialValue: [] }` define um valor inicial (array vazio) enquanto a requisição HTTP não é concluída, evitando erros de renderização.

2. **Correções no Código Original**:
   - Removi `AsyncPipe` do `imports`, pois não é necessário com `Signals`.
   - Removi `ngOnInit`, pois `toSignal` gerencia a subscrição automaticamente.
   - Renomeei `getTask` para `posts` para maior clareza e consistência.
   - Não precisamos de `CommonModule`, pois a diretiva `@for` é nativa em componentes standalone com `Signals`.

3. **Sintaxe `@for`**:
   - Substitui `*ngFor`, sendo mais performática e alinhada ao uso de `Signals`.
   - O `track post.id` é usado para otimizar a renderização, identificando itens únicos.

---

## Comparação: `subscribe` vs `AsyncPipe` vs `Signals`

### Abordagem 1: Usando `subscribe` (Tutorial Anterior)
```typescript
export class PostListComponent {
  #pratica = inject(PraticaService);
  posts: Post[] = [];

  ngOnInit() {
    this.#pratica.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error(err),
    });
  }
}
```
**Template:**
```html
<ul>
  <li *ngFor="let post of posts">{{ post.title }}</li>
</ul>
```

### Abordagem 2: Usando `AsyncPipe` (Tutorial Anterior)
```typescript
export class PostListComponent {
  #pratica = inject(PraticaService);
  public posts$ = this.#pratica.getPosts();
}
```
**Template:**
```html
<ul>
  <li *ngFor="let post of posts$ | async">{{ post.title }}</li>
</ul>
```

### Abordagem 3: Usando `Signals` (Este Tutorial)
```typescript
export class PostListComponent {
  #pratica = inject(PraticaService);
  public posts = toSignal(this.#pratica.getPosts(), { initialValue: [] });
}
```
**Template:**
```html
<ul>
  @for (post of posts(); track post.id) {
    <li>{{ post.title }}</li>
  }
</ul>
```

### Vantagens e Desvantagens

| Critério                | `subscribe`                          | `AsyncPipe`                         | `Signals`                          |
|-------------------------|--------------------------------------|-------------------------------------|------------------------------------|
| **Gerenciamento de Assinaturas** | Manual (risco de memory leaks) | Automático (sem risco de leaks) | Automático (integrado ao Signal) |
| **Complexidade**        | Mais código (métodos e ciclos) | Menos código (template-driven) | Mínimo (declarativo e direto) |
| **Flexibilidade**       | Alta (lógica personalizada) | Média (limitado ao Observable) | Alta (pode combinar com RxJS) |
| **Performance**         | Manualmente otimizável | Otimizada pelo Angular | Melhor (reatividade granular) |
| **Manutenção**          | Propensa a erros | Segura e declarativa | Moderna e escalável |
| **Casos de Uso**        | Lógica complexa | Exibição direta | Projetos reativos modernos |

---

## Outra Forma de Implementação (Bônus)

Podemos usar `Signals` com transformações diretamente no componente:

```typescript
// components/post-list/post-list.component.ts
import { Component, inject, computed } from '@angular/core';
import { PraticaService } from '../../services/pratica.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  #pratica = inject(PraticaService);
  private posts = toSignal(this.#pratica.getPosts(), { initialValue: [] });
  public titles = computed(() => this.posts().map(post => post.title)); // Signal derivado
}
```

**Template:**
```html
<ul>
  @for (title of titles(); track $index) {
    <li>{{ title }}</li>
  }
</ul>
```

### Vantagem
- Usa `computed` para criar um `Signal` derivado, permitindo transformações reativas sem alterar o serviço.

---

## Resumo
Este tutorial mostrou como:
1. Reutilizar o serviço com `pipe` e `shareReplay`.
2. Converter um `Observable` em `Signal` com `toSignal` e usar `@for` no template.
3. Comparar `subscribe`, `AsyncPipe` e `Signals`, destacando que:
   - `subscribe`: Flexível, mas trabalhoso.
   - `AsyncPipe`: Simples e seguro para templates.
   - `Signals`: Moderna, performática e alinhada ao futuro do Angular.

### Padrão Profissional
A abordagem com `Signals` é a mais recente e recomendada para projetos Angular modernos (a partir da v16+), oferecendo reatividade granular e integração com RxJS via `toSignal`. É ideal para aplicações escaláveis e performáticas.

---

Se precisar de mais ajustes ou exemplos, é só avisar!