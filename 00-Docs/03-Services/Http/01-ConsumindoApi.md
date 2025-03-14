
# Tutorial: Consumindo uma API com Angular

Este tutorial explica como consumir uma API em Angular de forma profissional, seguindo boas práticas e padrões modernos. Vamos configurar o ambiente, criar um serviço para chamadas HTTP, tipar os dados, e exibir as informações em um componente. O exemplo usa a API pública `https://jsonplaceholder.typicode.com`.

## Data Atual
Data deste tutorial: **14 de Março de 2025**.

## Passo 1: Configuração do `HttpClient` no Projeto

Primeiro, precisamos habilitar o `HttpClient` no módulo principal da aplicação. Isso é feito no arquivo `app.config.ts`.

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Importação necessária para chamadas HTTP

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Otimização de mudanças
    provideRouter(routes), // Configuração de rotas
    provideHttpClient(), // Habilita o HttpClient para toda a aplicação
    provideClientHydration(withEventReplay()), // Suporte a hidratação no lado do cliente
  ],
};
```

### Explicação
- **`provideHttpClient()`**: Registra o `HttpClient` como um provedor global, permitindo injeção de dependência em serviços e componentes.
- **Boa Prática**: Não há necessidade de configurações adicionais aqui, a menos que você precise de interceptores ou opções específicas (ex.: `withFetch()`).

---

## Passo 2: Configuração do Ambiente (`environments`)

Defina as URLs da API nos arquivos de ambiente. Isso permite alternar entre ambientes de desenvolvimento e produção.

```typescript
// environments/environment.ts (Desenvolvimento)
export const environment = {
  production: false,
  apiUrl: 'https://jsonplaceholder.typicode.com', // URL base para desenvolvimento
};
```

```typescript
// environments/environment.prod.ts (Produção)
export const environment = {
  production: true,
  apiUrl: 'https://api.minhaapp.com', // URL base para produção (exemplo fictício)
};
```

### Observações
- **Boa Prática**: Use apenas um arquivo `environment.ts` para desenvolvimento e outro `environment.prod.ts` para produção. O Angular substitui automaticamente o arquivo correto durante o build (`ng build --prod`).
- **Correção**: Não é necessário repetir o mesmo código duas vezes com a mesma URL, como no exemplo original. Use URLs distintas para cada ambiente em um cenário real.

---

## Passo 3: Criando o Serviço (`PraticaService`)

Crie um serviço para encapsular as chamadas à API.

```typescript
// services/pratica.service.ts
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment'; // Importa o ambiente
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para tipagem (boa prática)
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root', // Escopo global, injetável em qualquer lugar
})
export class PraticaService {
  #url = environment.apiUrl; // Propriedade privada com URL base
  #http = inject(HttpClient); // Injeção moderna com `inject()`

  // Método para buscar posts sem parâmetros
  getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${this.#url}/posts`);
  }

  // Método com parâmetro (exemplo)
  getPostById(id: number): Observable<Post> {
    return this.#http.get<Post>(`${this.#url}/posts/${id}`);
  }
}
```

### Explicações e Boas Práticas
1. **`#` (Private Fields)**:
   - O uso de `#` torna as propriedades verdadeiramente privadas (suportado em TypeScript moderno). Isso é uma boa prática para encapsulamento.
   - Alternativa: Usar `private` (ex.: `private url`), mas `#` é mais rigoroso.

2. **`inject()` vs Construtor`**:
   - **Forma Moderna (usada acima)**:
     ```typescript
     #http = inject(HttpClient);
     ```
   - **Forma Tradicional (construtor)**:
     ```typescript
     constructor(private http: HttpClient) {}
     ```
   - **Boa Prática**: Use `inject()` em serviços simples para código mais limpo. Use o construtor se precisar de lógica adicional na inicialização.

3. **Tipagem**:
   - Substituímos `any[]` por `Post[]` usando uma interface. Isso é altamente recomendado para evitar erros e melhorar a manutenção.
   - Ferramenta sugerida: Use sites como [Quicktype](https://app.quicktype.io/) para converter JSON em interfaces TypeScript.

4. **Uso de `$` em Observables**:
   - O símbolo `$` é uma convenção comum para indicar que uma variável é um `Observable` (ex.: `posts$`), mas **não é necessário** em métodos que retornam Observables diretamente.
   - **Recomendação**: Use `$` apenas em variáveis que armazenam Observables no componente, não em métodos ou serviços.

---

## Passo 4: Consumindo o Serviço no Componente

Agora, usaremos o serviço em um componente para exibir os dados.

```typescript
// components/post-list/post-list.component.ts
import { Component, inject } from '@angular/core';
import { PraticaService } from '../../services/pratica.service';
import { CommonModule } from '@angular/common'; // Para *ngFor

@Component({
  selector: 'app-post-list',
  standalone: true, // Componente standalone (padrão moderno)
  imports: [CommonModule], // Importa diretivas como *ngFor
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  #pratica = inject(PraticaService); // Injeção do serviço
  posts: any[] = []; // Array para armazenar os posts (poderia ser Post[] com tipagem)

  // Ciclo de vida: carrega os posts ao inicializar
  ngOnInit() {
    this.loadPosts();
  }

  // Método para carregar posts
  loadPosts() {
    this.#pratica.getPosts().subscribe({
      next: (data) => {
        this.posts = data; // Atribui os dados recebidos
      },
      error: (err) => {
        console.error('Erro ao carregar posts:', err); // Tratamento de erro
      },
    });
  }

  // Método com parâmetro (exemplo adicional)
  loadPostById(id: number) {
    this.#pratica.getPostById(id).subscribe({
      next: (post) => {
        console.log('Post carregado:', post); // Exemplo de uso
      },
      error: (err) => {
        console.error('Erro ao carregar post:', err);
      },
    });
  }
}
```

### Template HTML
```html
<!-- post-list.component.html -->
<ul>
  <li *ngFor="let post of posts">
    {{ post.title }}
  </li>
</ul>
```

### Explicações
1. **`subscribe`**:
   - O método `subscribe` é usado para "ouvir" os dados emitidos pelo `Observable` retornado pelo serviço.
   - Ele possui três callbacks opcionais:
     - `next`: Recebe os dados quando a requisição é bem-sucedida.
     - `error`: Trata erros da requisição.
     - `complete`: Executado quando o Observable é concluído (não usado aqui).
   - **Boa Prática**: Sempre trate erros com `error` para evitar falhas silenciosas.

2. **Uso de `$` no Componente**:
   - Se você armazenasse o `Observable` diretamente (ex.: `posts$ = this.#pratica.getPosts()`), usaria `$` e o pipe `async` no template:
     ```typescript
     posts$ = this.#pratica.getPosts();
     ```
     ```html
     <ul>
       <li *ngFor="let post of posts$ | async">{{ post.title }}</li>
     </ul>
     ```
   - **Recomendação**: Use o pipe `async` para evitar gerenciar assinaturas manualmente, mas o exemplo com `subscribe` é válido para cenários simples.

3. **Padrão de Projeto**:
   - O código segue o padrão **Service-Component**, amplamente utilizado em Angular:
     - **Serviço**: Encapsula a lógica de comunicação com a API.
     - **Componente**: Gerencia a exibição e interação com o usuário.
   - Isso promove **separação de responsabilidades** e **reutilização**.

---

## Verificação de Boas Práticas
1. **Tipagem**: O exemplo original usava `any`, corrigido com a interface `Post`.
2. **Encapsulamento**: Uso de `#` para propriedades privadas é moderno e recomendado.
3. **Gerenciamento de Estado**: O uso de `subscribe` é simples, mas em aplicações maiores, considere o pipe `async` ou bibliotecas como NgRx.
4. **Tratamento de Erros**: Adicionado no componente para robustez.
5. **Modularidade**: O serviço é injetável globalmente (`providedIn: 'root'`), adequado para APIs compartilhadas.

---

## Resumo
Este tutorial demonstrou como:
1. Configurar o `HttpClient` no Angular.
2. Definir ambientes para URLs de API.
3. Criar um serviço tipado para chamadas HTTP com métodos parametrizados e não parametrizados.
4. Consumir o serviço em um componente standalone, exibindo os dados com `subscribe`.

### Padrão Profissional
O código segue práticas modernas do Angular (standalone components, `inject()`, tipagem) e é escalável para projetos reais. Para cenários mais complexos, adicione:
- Interceptores HTTP para autenticação.
- Gerenciamento de estado com NgRx ou Signals.
- Tratamento avançado de erros com serviços dedicados.

