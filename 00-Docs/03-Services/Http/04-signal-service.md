

# Tutorial: Consumindo uma API com Angular - Usando `Signals` no Serviço

Este tutorial explica o código fornecido, que utiliza `Signals` diretamente no serviço para gerenciar o estado da lista de posts, combinando `Observable` com reatividade. Vou corrigir os erros detectados e explicar cada parte.

## Data Atual
Data deste tutorial: **14 de Março de 2025**.

---

## Passo 1: Análise e Correção do Serviço



```typescript
// services/pratica.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators'; // Correção nos imports

// Interface para tipagem (boa prática)
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
  #url = signal(environment.apiUrl); // Signal para a URL base
  #http = inject(HttpClient); // Injeção do HttpClient

  #setListTask = signal<Post[] | null>(null); // Signal privado para o estado
  public getListTask = this.#setListTask.asReadonly(); // Signal público somente leitura

  getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${this.#url()}/posts`).pipe(
      shareReplay(1), // Cache para evitar múltiplas requisições
      tap((res) => this.#setListTask.set(res)) // Atualiza o Signal com a resposta
    );
  }
}
```

### Explicação do Serviço
1. **`#url = signal(environment.apiUrl)`**:
   - Define a URL como um `Signal`, permitindo reatividade se ela mudar (embora neste caso seja estática).

2. **`#setListTask = signal<Post[] | null>(null)`**:
   - Um `Signal` privado que armazena a lista de posts ou `null` como valor inicial.
   - Tipado como `Post[] | null` para refletir o estado antes e depois da requisição.

3. **`getListTask = this.#setListTask.asReadonly()`**:
   - Expõe o `Signal` como somente leitura para consumidores externos (como o componente).
   - O método `.asReadonly()` impede que o `Signal` seja modificado fora do serviço.

4. **`getPosts(): Observable<Post[]>`**:
   - Retorna um `Observable` que faz a requisição HTTP.
   - Usa `${this.#url()}` para acessar o valor do `Signal` da URL (note os parênteses `()`).
   - **Operadores RxJS**:
     - `shareReplay(1)`: Cacheia o resultado para evitar múltiplas requisições.
     - `tap((res) => this.#setListTask.set(res))`: Atualiza o `Signal` com os dados recebidos, sem alterar o fluxo do `Observable`.



## Passo 2: Análise e Correção do Componente



```typescript
// components/post-list/post-list.component.ts
import { Component, inject } from '@angular/core';
import { PraticaService } from '../../services/pratica.service';

@Component({
  selector: 'app-post-list',
  standalone: true, // Componente standalone
  imports: [], // Não precisamos de AsyncPipe ou outros módulos
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  #pratica = inject(PraticaService);
  public getListTask = this.#pratica.getListTask; // Referência ao Signal do serviço

  ngOnInit() {
    this.#pratica.getPosts().subscribe(); // Dispara a requisição
  }
}
```

### Template HTML
```html
<!-- post-list.component.html -->
<h1>Posts</h1>
<ul>
  @for (post of getListTask(); track post.id) {
    <li>{{ post.title }}</li>
  } @empty {
    <li>Nenhum post carregado ainda</li>
  }
</ul>
```

### Explicação do Componente
1. **`public getListTask = this.#pratica.getListTask`**:
   - O componente acessa o `Signal` público do serviço diretamente.
   - Como é um `Signal` somente leitura, o componente só pode lê-lo, não modificá-lo.

2. **`ngOnInit()`**:
   - Chama `getPosts().subscribe()` para disparar a requisição HTTP.
   - O `subscribe()` é necessário porque o `Observable` é "frio" (cold) e só executa a requisição quando assinado.
   - O `tap` no serviço atualiza o `Signal` automaticamente após a resposta.

3. **Template com `@for`**:
   - Usa a sintaxe `@for` para iterar sobre os valores do `Signal` (`getListTask()`).
   - `track post.id` otimiza a renderização identificando itens únicos.
   - Adicionei `@empty` para tratar o caso em que `getListTask()` é `null` ou vazio.




## Comparação com Abordagens Anteriores

### Abordagem Atual: `Signals` no Serviço
- **Serviço**: Gerencia o estado com `Signal` e atualiza via `tap`.
- **Componente**: Consome o `Signal` diretamente e dispara a requisição.

### Vantagens e Desvantagens
| Critério                | `Signals` no Serviço                 |
|-------------------------|--------------------------------------|
| **Gerenciamento de Estado** | Centralizado no serviço (reativo) |
| **Complexidade**        | Moderada (combina RxJS e Signals) |
| **Flexibilidade**       | Alta (estado acessível globalmente) |
| **Performance**         | Excelente (reatividade nativa) |
| **Manutenção**          | Boa (estado único, mas requer subscrição inicial) |
| **Casos de Uso**        | Gerenciamento de estado compartilhado |

---

## Resumo
Este tutorial explicou e corrigiu o código que:
1. Usa `Signals` no serviço para gerenciar o estado dos posts.
2. Combina `Observable` (com `tap` e `shareReplay`) para atualizar o `Signal`.
3. Consome o `Signal` no componente com `@for`, disparando a requisição via `subscribe`.

### Padrão Profissional
Essa abordagem é moderna e poderosa para gerenciar estado reativo no serviço, ideal para cenários onde o estado precisa ser compartilhado entre componentes. Para projetos maiores, considere combinar com uma loja de estado como NgRx.

