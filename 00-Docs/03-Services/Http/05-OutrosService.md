

# Tutorial: Consumindo uma API com Angular - `Signals` e CRUD Completo

Este tutorial apresenta um serviço que usa `Signals` para gerenciar estado e erros de operações CRUD (Create, Read, Update, Delete) em uma API, junto com um componente que consome esses `Signals` e exibe os dados com um template específico.

## Data Atual
Data deste tutorial: **14 de Março de 2025**.

## Índice
1. [Passo 1: Serviço com `Signals` e Operações CRUD](#passo-1-serviço-com-signals-e-operações-crud)
2. [Passo 2: Componente com Consumo de `Signals` e Template](#passo-2-componente-com-consumo-de-signals-e-template)
3. [Resumo](#resumo)

---

## Passo 1: Serviço com `Signals` e Operações CRUD

O serviço gerencia o estado e os erros das operações HTTP usando `Signals`.

```typescript
// services/api.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap, throwError } from 'rxjs';

// Interface para tipagem
interface ITask {
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Propriedade de exemplo (Signal e BehaviorSubject)
  public name = signal('Dener Troquatte');
  public name$ = new BehaviorSubject('Dener Troquatte $');

  // HTTP
  #http = inject(HttpClient);
  #url = signal(environment.apiTask); // URL base como Signal

  // Estado da lista de tarefas
  #setTaskList = signal<ITask[] | null>(null);
  get getTaskList() {
    return this.#setTaskList.asReadonly();
  }

  #setTaskListError = signal<string | null>(null); // Ajustado para string
  get getTaskListError() {
    return this.#setTaskListError.asReadonly();
  }

  public httpTaskList$(): Observable<ITask[]> {
    const params = new HttpParams().set('page', '1').set('previous_page', '1');
    this.#setTaskList.set(null); // Reseta o estado
    this.#setTaskListError.set(null); // Reseta o erro

    return this.#http.get<ITask[]>(this.#url(), { params }).pipe(
      tap((res) => this.#setTaskList.set(res)), // Atualiza o Signal com a lista
      catchError((error: HttpErrorResponse) => {
        this.#setTaskListError.set(error.error?.message || 'Erro ao carregar lista');
        return throwError(() => error);
      })
    );
  }

  // Estado de uma tarefa por ID
  #setTaskId = signal<ITask | null>(null);
  get getTaskId() {
    return this.#setTaskId.asReadonly();
  }

  #setTaskIdError = signal<string | null>(null); // Ajustado para string
  get getTaskIdError() {
    return this.#setTaskIdError.asReadonly();
  }

  public httpTaskId$(id: string): Observable<ITask> {
    this.#setTaskId.set(null); // Reseta o estado
    this.#setTaskIdError.set(null); // Reseta o erro

    return this.#http.get<ITask>(`${this.#url()}/${id}`).pipe(
      tap((res) => this.#setTaskId.set(res)), // Atualiza o Signal com a tarefa
      catchError((error: HttpErrorResponse) => {
        this.#setTaskIdError.set(error.error?.message || 'Erro ao carregar tarefa');
        return throwError(() => error);
      })
    );
  }

  // Estado de criação de tarefa
  #setTaskCreateError = signal<string | null>(null); // Ajustado para string
  get getTaskCreateError() {
    return this.#setTaskCreateError.asReadonly();
  }

  public httpTaskCreate$(title: string): Observable<ITask> {
    this.#setTaskCreateError.set(null); // Reseta o erro

    return this.#http.post<ITask>(this.#url(), { title }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.#setTaskCreateError.set(error.error?.message || 'Erro ao criar tarefa');
        return throwError(() => error);
      })
    );
  }

  // Estado de atualização de tarefa
  #setTaskUpdateError = signal<string | null>(null); // Ajustado para string
  get getTaskUpdateError() {
    return this.#setTaskUpdateError.asReadonly();
  }

  public httpTaskUpdate$(id: string, title: string): Observable<ITask> {
    this.#setTaskUpdateError.set(null); // Reseta o erro

    return this.#http.patch<ITask>(`${this.#url()}/${id}`, { title }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.#setTaskUpdateError.set(error.error?.message || 'Erro ao atualizar tarefa');
        return throwError(() => error);
      })
    );
  }

  // Estado de deleção de tarefa
  #setTaskDeleteError = signal<string | null>(null); // Ajustado para string
  get getTaskDeleteError() {
    return this.#setTaskDeleteError.asReadonly();
  }

  public httpTaskDelete$(id: string): Observable<void> {
    this.#setTaskDeleteError.set(null); // Reseta o erro

    return this.#http.delete<void>(`${this.#url()}/${id}`).pipe(
      tap(() => {
        const currentList = this.#setTaskList();
        if (currentList) {
          this.#setTaskList.set(currentList.filter(task => task.id !== id)); // Atualiza a lista
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.#setTaskDeleteError.set(error.error?.message || 'Erro ao deletar tarefa');
        return throwError(() => error);
      })
    );
  }
}
```

### Explicação do Serviço
1. **`name` e `name$`**:
   - Exemplos de `Signal` e `BehaviorSubject`, não usados diretamente aqui, mas mostram opções de estado reativo.

2. **`#url`**:
   - Um `Signal` com a URL base da API (`environment.apiTask`).

3. **`#setTaskList` e `#setTaskListError`**:
   - Gerenciam a lista de tarefas e erros de carregamento, expostos como `getTaskList` e `getTaskListError`.

4. **`httpTaskList$()`**:
   - Faz um GET com parâmetros e atualiza o `Signal` da lista ou define um erro.

5. **`httpTaskId$(id)`**:
   - Busca uma tarefa por ID e atualiza o `Signal` correspondente.

6. **`httpTaskCreate$(title)`**:
   - Cria uma nova tarefa via POST, gerenciando erros.

7. **`httpTaskUpdate$(id, title)`**:
   - Atualiza uma tarefa via PATCH, gerenciando erros.

8. **`httpTaskDelete$(id)`**:
   - Deleta uma tarefa via DELETE e atualiza a lista localmente com `tap`.

9. **Correções**:
   - Ajustei os tipos dos `Signals` de erro para `string | null` (eram `ITask[] | null` ou `ITask | null`, o que não fazia sentido para mensagens de erro).
   - Adicionei atualização da lista no `httpTaskDelete$` para refletir a deleção.

---

## Passo 2: Componente com Consumo de `Signals` e Template

O componente consome os `Signals` do serviço e implementa o template específico.

```typescript
// components/consume-service/consume-service.component.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-consume-service',
  standalone: true,
  imports: [CommonModule], // Necessário para diretivas como *ngIf
  templateUrl: './consume-service.component.html',
  styleUrls: ['./consume-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Otimização de performance
})
export class ConsumeServiceComponent implements OnInit {
  #apiService = inject(ApiService);

  // Sinais expostos do serviço
  public getTaskList = this.#apiService.getTaskList;
  public getTaskId = this.#apiService.getTaskId;
  public getTaskListError = this.#apiService.getTaskListError;
  public getTaskIdError = this.#apiService.getTaskIdError;
  public getTaskCreateError = this.#apiService.getTaskCreateError;
  public getTaskUpdateError = this.#apiService.getTaskUpdateError;
  public getTaskDeleteError = this.#apiService.getTaskDeleteError;

  ngOnInit(): void {
    this.#apiService.httpTaskList$().subscribe(); // Carrega a lista inicial
    this.#apiService.httpTaskId$('EwrhBJPLYHTAACz4AeWI').subscribe(); // Carrega um item por ID
  }

  public httpTaskCreate(title: string) {
    this.#apiService
      .httpTaskCreate$(title)
      .pipe(concatMap(() => this.#apiService.httpTaskList$())) // Atualiza a lista após criar
      .subscribe();
  }

  public httpTaskUpdate(id: string, title: string) {
    this.#apiService
      .httpTaskUpdate$(id, title)
      .pipe(concatMap(() => this.#apiService.httpTaskList$())) // Atualiza a lista após atualizar
      .subscribe();
  }

  public httpTaskDelete(id: string) {
    this.#apiService
      .httpTaskDelete$(id)
      .pipe(concatMap(() => this.#apiService.httpTaskList$())) // Atualiza a lista após deletar
      .subscribe();
  }
}
```

### Template HTML
```html
<!-- consume-service.component.html -->
<h2>Services</h2>

<h3>Get List</h3>
@if (getTaskList(); as data) {
  <ul>
    @for (item of data; track item.id) {
      <li>{{ item.id }} - {{ item.title }} - <button (click)="httpTaskDelete(item.id)">delete</button></li>
    } @empty {
      <li>Sem dados carregados!</li>
    }
  </ul>
} @else {
  <li>Loading...</li>
}

@if (getTaskListError()) {
  <p>{{ getTaskListError() }}</p>
}

<h3>Get item Id</h3>
@if (getTaskId(); as data) {
  <p>Get por ID: {{ data.id }} - {{ data.title }}</p>
} @else {
  <p>{{ getTaskIdError() || 'Carregando...' }}</p>
}

<h3>Post create</h3>
<input type="text" #createTitle placeholder="Add title" />
<button (click)="httpTaskCreate(createTitle.value)">Create</button>
@if (getTaskCreateError()) {
  <p>{{ getTaskCreateError() }}</p>
}

<h3>Patch Update</h3>
<input type="text" #updateId placeholder="Add id" />
<input type="text" #updateTitle placeholder="Add title" />
<button (click)="httpTaskUpdate(updateId.value, updateTitle.value)">Update</button>
@if (getTaskUpdateError()) {
  <p>{{ getTaskUpdateError() }}</p>
}

@if (getTaskDeleteError()) {
  <p>{{ getTaskDeleteError() }}</p>
}
```

### Explicação do Componente e Template
1. **`getTaskList` e outros `Signals`**:
   - Expõem os `Signals` do serviço para uso reativo no template.

2. **`ngOnInit()`**:
   - Dispara as requisições iniciais para carregar a lista e uma tarefa específica.

3. **Métodos CRUD**:
   - **`httpTaskCreate`**: Cria uma tarefa e atualiza a lista com `concatMap`.
   - **`httpTaskUpdate`**: Atualiza uma tarefa e recarrega a lista.
   - **`httpTaskDelete`**: Deleta uma tarefa e recarrega a lista (embora o serviço já atualize localmente).

4. **Template**:
   - **`<h3>Get List</h3>`**: Exibe a lista com `@for`, incluindo botão de deleção.
   - **`@if` e `@else`**: Gerenciam estados de carregamento e erro para cada operação.
   - **Inputs e Botões**: Permitem criar e atualizar tarefas com valores dinâmicos.

5. **Correções**:
   - Adicionei `CommonModule` ao `imports` para suportar diretivas como `@if`.
   - Ajustei mensagens de erro no template para serem mais amigáveis.

---

## Resumo
Este tutorial mostrou como:
1. Criar um serviço com `Signals` para gerenciar estado e erros de operações CRUD (GET lista, GET por ID, POST, PATCH, DELETE).
2. Implementar um componente que consome esses `Signals`, exibe a lista com `<h3>Get List</h3>` e oferece interações CRUD completas via template.
3. Usar `concatMap` para atualizar a lista após operações, complementando a atualização local no `delete`.

### Padrão Profissional
Essa abordagem combina `Signals` para reatividade com RxJS para operações assíncronas, sendo robusta e escalável. Para projetos maiores, considere centralizar mais lógica no serviço ou usar uma loja de estado como NgRx.

