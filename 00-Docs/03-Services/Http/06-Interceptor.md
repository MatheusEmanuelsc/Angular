

# Tutorial: Configurando e Usando Interceptors HTTP em Angular - Passo a Passo

Este tutorial oferece um guia passo a passo para implementar interceptors HTTP em Angular, adicionando cabeçalhos personalizados e tratando erros globalmente. Inclui exemplos práticos e boas práticas baseados no código inicial fornecido, ajustado para consistência.

## Data Atual
Data deste tutorial: **14 de Março de 2025**.

## Índice
1. [Passo 1: Criando o Interceptor](#passo-1-criando-o-interceptor)
2. [Passo 2: Configurando o Interceptor no Projeto](#passo-2-configurando-o-interceptor-no-projeto)
3. [Passo 3: Exemplos Práticos](#passo-3-exemplos-práticos)
4. [Resumo](#resumo)

---

## Passo 1: Criando o Interceptor

Vamos criar um interceptor funcional que adiciona um cabeçalho personalizado e trata erros globalmente.

```typescript
// interceptors/http.interceptor.ts
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

// Interceptor básico
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // Adiciona um cabeçalho personalizado
  const headers = new HttpHeaders().set('x-vida-full-stack', 'dev');
  const reqClone = req.clone({ headers });

  // Executa a requisição com retry e tratamento de erro
  return next(reqClone).pipe(
    retry({ count: 2, delay: 1000 }), // Tenta novamente 2 vezes com 1s de atraso
    catchError((error: HttpErrorResponse) => {
      console.error(`Erro HTTP: ${error.status} - ${error.message}`);
      return throwError(() => error); // Propaga o erro para o consumidor
    })
  );
};
```

### Explicação do Código
1. **`HttpInterceptorFn`**:
   - Define um interceptor funcional, introduzido no Angular 14+, mais leve que a abordagem baseada em classes.

2. **Cabeçalhos**:
   - `headers.set('x-vida-full-stack', 'dev')`: Adiciona um cabeçalho customizado a todas as requisições.
   - `req.clone({ headers })`: Clona a requisição com os novos cabeçalhos.

3. **`retry`**:
   - Reexecuta a requisição em caso de falha (ex.: 2 tentativas com 1s de intervalo).

4. **`catchError`**:
   - Captura erros HTTP e os trata globalmente (aqui, apenas com um log básico).

5. **Correção**:
   - O `shareReplay` foi removido do código original, pois não é apropriado em interceptors (ele cacheia respostas, o que pode levar a resultados inesperados em requisições únicas).

---

## Passo 2: Configurando o Interceptor no Projeto

O interceptor precisa ser registrado na aplicação. Há duas abordagens, dependendo da estrutura do projeto.

### 2.1 Configuração para Standalone Components
Se você usa componentes standalone (recomendado no Angular moderno):

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpInterceptor } from './interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpInterceptor]) // Registra o interceptor
    ),
  ],
};
```

### 2.2 Configuração para NgModules
Se você usa a abordagem tradicional baseada em módulos:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { httpInterceptor } from './interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: httpInterceptor,
      multi: true, // Suporta múltiplos interceptors
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Explicação da Configuração
- **Standalone**: Usa `withInterceptors` no `provideHttpClient`, ideal para projetos modernos.
- **NgModule**: Usa `HTTP_INTERCEPTORS` com `multi: true`, permitindo vários interceptors em sequência.
- **Ordem**: Os interceptors são executados na ordem de registro (primeiro a entrar, último a sair).

---

## Passo 3: Exemplos Práticos

Aqui estão exemplos práticos de como usar e expandir o interceptor.

### 3.1 Exemplo Básico: Serviço Consumindo a API
```typescript
// services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #http = inject(HttpClient);
  #url = 'https://jsonplaceholder.typicode.com';

  getPosts(): Observable<any[]> {
    return this.#http.get<any[]>(`${this.#url}/posts`);
  }
}
```

```typescript
// components/post-list/post-list.component.ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  template: `<ul><li *ngFor="let post of posts">{{ post.title }}</li></ul>`,
})
export class PostListComponent {
  #api = inject(ApiService);
  posts: any[] = [];

  ngOnInit() {
    this.#api.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.log('Erro capturado no componente:', err),
    });
  }
}
```
**Resultado**: O interceptor adiciona o cabeçalho `x-vida-full-stack: dev` e tenta a requisição até 2 vezes em caso de falha.

### 3.2 Exemplo Avançado: Tratamento de Erros Global
Um interceptor mais robusto com tratamento de erros específico:

```typescript
// interceptors/http.interceptor.ts (versão avançada)
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Injeta o Router para redirecionamento
  const headers = new HttpHeaders().set('x-vida-full-stack', 'dev');
  const reqClone = req.clone({ headers });

  return next(reqClone).pipe(
    retry({ count: 2, delay: 1000 }),
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          console.error('Não autorizado, redirecionando para login...');
          router.navigate(['/login']); // Redireciona para login
          break;
        case 403:
          console.error('Acesso negado:', error.message);
          break;
        case 500:
          console.error('Erro interno do servidor:', error.message);
          // Exemplo: exibir notificação global
          break;
        default:
          console.error('Erro não tratado:', error.message);
      }
      return throwError(() => error); // Propaga o erro
    })
  );
};
```

**Uso**:
- Adicione um serviço de notificação (ex.: `ToastService`) para alertas visuais:
```typescript
// interceptors/http.interceptor.ts (com notificação)
import { ToastService } from '../services/toast.service'; // Serviço fictício

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService); // Injeta serviço de notificação
  const headers = new HttpHeaders().set('x-vida-full-stack', 'dev');
  const reqClone = req.clone({ headers });

  return next(reqClone).pipe(
    retry({ count: 2, delay: 1000 }),
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          toast.show('Sessão expirada, faça login novamente.');
          router.navigate(['/login']);
          break;
        case 403:
          toast.show('Acesso negado!');
          break;
        case 500:
          toast.show('Erro no servidor, tente novamente mais tarde.');
          break;
        default:
          toast.show('Ocorreu um erro inesperado.');
      }
      return throwError(() => error);
    })
  );
};
```

### 3.3 Configuração com Múltiplos Interceptors
Se precisar de mais de um interceptor (ex.: autenticação e log):

```typescript
// interceptors/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') || '';
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(authReq);
};
```

```typescript
// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './interceptors/http.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, httpInterceptor]) // Ordem importa!
    ),
    // Outros providers
  ],
};
```

**Explicação**: `authInterceptor` adiciona o token antes de `httpInterceptor` adicionar o cabeçalho customizado e tratar erros.

---

## Resumo
Este tutorial mostrou como:
1. Criar um interceptor funcional para adicionar cabeçalhos e tratar erros com `retry` e `catchError`.
2. Configurar o interceptor em projetos standalone (`app.config.ts`) ou NgModule (`app.module.ts`).
3. Aplicar exemplos práticos, desde um uso básico até tratamento avançado com redirecionamento e notificações.

### Padrão Profissional
Interceptors funcionais são uma prática moderna no Angular (v14+), perfeitos para centralizar lógica de cabeçalhos, autenticação e erros. Combine com serviços como `Router` ou `ToastService` para uma experiência robusta.

