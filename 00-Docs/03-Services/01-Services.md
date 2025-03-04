## Resumo sobre Serviços no Angular

Este resumo detalha o uso de serviços no Angular, uma forma crucial de organizar e compartilhar lógica entre componentes.

**Índice:**

1.  **O que são Serviços?**
2.  **Sintaxe e Uso Básico (Versão Moderna com `inject`)**
3.  **Sintaxe e Uso Básico (Versão Antiga com Injeção de Dependência)**
4.  **Tipos de Serviços e Injeção de Dependência**
5.  **Exemplos Práticos**
6.  **Considerações Adicionais**

**1. O que são Serviços?**

Serviços no Angular são classes que encapsulam lógica de negócios, dados ou funcionalidades que podem ser compartilhadas entre vários componentes. Eles promovem a reutilização de código, a separação de responsabilidades e a organização da aplicação.

**2. Sintaxe e Uso Básico (Versão Moderna com `inject`)**

A versão moderna do Angular introduziu a função `inject()`, que permite injetar dependências diretamente nos componentes ou outros serviços, simplificando a injeção de dependência.

```typescript
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root' // Disponibiliza o serviço em toda a aplicação
})
export class MeuServico {
  realizarTarefa() {
    return 'Tarefa realizada pelo serviço!';
  }
}

// Componente que usa o serviço
import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-componente',
  template: '<p>{{ mensagem }}</p>'
})
export class MeuComponente {
  private meuServico = inject(MeuServico); // Injeta o serviço usando inject()
  mensagem = this.meuServico.realizarTarefa();
}
```

**3. Sintaxe e Uso Básico (Versão Antiga com Injeção de Dependência)**

Na versão antiga, a injeção de dependência era feita através do construtor da classe.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeuServico {
  realizarTarefa() {
    return 'Tarefa realizada pelo serviço!';
  }
}

// Componente que usa o serviço
import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-componente',
  template: '<p>{{ mensagem }}</p>'
})
export class MeuComponente {
  mensagem: string;
  constructor(private meuServico: MeuServico) { // Injeta o serviço no construtor
    this.mensagem = this.meuServico.realizarTarefa();
  }
}
```

**4. Tipos de Serviços e Injeção de Dependência**

* **Tipos de Serviços:** Serviços podem realizar diversas tarefas, como requisições HTTP, manipulação de dados, lógica de negócios, etc.
* **Injeção de Dependência:** O Angular utiliza injeção de dependência para fornecer instâncias de serviços aos componentes e outros serviços que os necessitam.
* `providedIn: 'root'` disponibiliza o serviço em toda a aplicação, também é possível disponibilizar o serviço apenas em um modulo.

**5. Exemplos Práticos**

**Exemplo 1: Serviço de Log (Versão Moderna com `inject`)**

```typescript
// log.service.ts
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  log(mensagem: string) {
    console.log(`[Log]: ${mensagem}`);
  }
}

// meu-componente.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-componente',
  template: '<button (click)="registrarLog()">Registrar Log</button>'
})
export class MeuComponente {
  private logService = inject(LogService);
  registrarLog() {
    this.logService.log('Botão clicado!');
  }
}
```

**Exemplo 2: Serviço de Dados (Versão Antiga)**

```typescript
// dados.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  obterDados() {
    return ['Dado 1', 'Dado 2', 'Dado 3'];
  }
}

// meu-componente.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-componente',
  template: '<ul><li *ngFor="let dado of dados">{{ dado }}</li></ul>'
})
export class MeuComponente {
  dados: string[];
  constructor(private dadosService: DadosService) {
    this.dados = this.dadosService.obterDados();
  }
}
```

**6. Considerações Adicionais**

* Serviços promovem a reutilização de código e a organização da aplicação.
* A injeção de dependência simplifica o gerenciamento de dependências.
* Serviços podem ser utilizados para diversas finalidades, como requisições HTTP, manipulação de dados, lógica de negócios, etc.
* A versão moderna com `inject()` simplifica a injeção de dependência.
