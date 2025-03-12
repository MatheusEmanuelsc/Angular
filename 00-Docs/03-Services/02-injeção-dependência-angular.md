

```markdown
# Injeção de Dependência no Angular: Resumo e Tutorial

## Resumo sobre Injeção de Dependência no Angular

A **injeção de dependência (DI)** é um dos pilares do Angular, permitindo que serviços e outros recursos sejam fornecidos às classes de maneira desacoplada e gerenciada pelo framework. O Angular oferece diferentes formas de realizar DI, evoluindo ao longo das versões para maior flexibilidade e modernidade. As principais formas são:

1. **`inject()` com `#` (Private Fields)**: Introduzida no Angular 14, combina a função `inject()` com campos privados do JavaScript (ES2022). É a mais moderna, segura e recomendada para projetos novos.
2. **`inject()` sem `#`**: Também do Angular 14, permite injeção fora do construtor, mas sem o encapsulamento estrito dos campos privados.
3. **Construtor (Constructor Injection)**: Método tradicional desde o Angular 2, amplamente utilizado, mas menos flexível e mais verboso.

Este tutorial apresenta as três abordagens com exemplos comentados, começando pela mais recomendada.

---

## Tutorial: Formas de Injeção de Dependência no Angular

### Índice
1. [Injeção com `inject()` e `#` (Mais Recomendada)](#1-injeção-com-inject-e---mais-recomendada)  
2. [Injeção com `inject()` sem `#`](#2-injeção-com-inject-sem-)  
3. [Injeção via Construtor (Menos Recomendada)](#3-injeção-via-construtor-menos-recomendada)  

---

### 1. Injeção com `inject()` e `#` (Mais Recomendada)

Essa abordagem usa a função `inject()` do Angular 14+ combinada com campos privados (`#`) do JavaScript moderno, garantindo encapsulamento total.

#### Exemplo
```typescript
// arquivo: data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Serviço disponível em toda a aplicação
})
export class DataService {
  getData() {
    return 'Dados do serviço!';
  }
}

// arquivo: data.component.ts
import { Component, inject } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-data',
  template: '<p>{{ mensagem }}</p>'
})
export class DataComponent {
  // Injeta o serviço com `inject()` e usa `#` para torná-lo privado
  #dataService = inject(DataService);

  // Usa o serviço diretamente na inicialização da propriedade
  mensagem = this.#dataService.getData();

  ngOnInit(): void {
    // O serviço só é acessível dentro da classe devido ao `#`
    console.log(this.#dataService.getData());
  }
}
```

#### Resumo
- **Vantagens**: Encapsulamento estrito (o serviço não pode ser acessado fora da classe), código conciso, suporta injeção fora do construtor.
- **Quando usar**: Projetos novos com Angular 14+ e necessidade de segurança no encapsulamento.
- **Requisitos**: Angular 14+ e suporte ao ES2022 no TypeScript.
- **Contexto**: Deve ser usado dentro de um contexto de injeção (como propriedades ou `ngOnInit`).

---

### 2. Injeção com `inject()` sem `#`

Essa forma utiliza apenas a função `inject()`, sem o modificador `#`, permitindo flexibilidade, mas sem o encapsulamento estrito.

#### Exemplo
```typescript
// arquivo: logger.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Serviço singleton na aplicação
})
export class LoggerService {
  log(mensagem: string) {
    console.log(`Log: ${mensagem}`);
  }
}

// arquivo: logger.component.ts
import { Component, inject } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-logger',
  template: '<button (click)="logMessage()">Log</button>'
})
export class LoggerComponent {
  // Injeta o serviço com `inject()`, mas sem `#`, permitindo acesso externo se não for private
  private loggerService = inject(LoggerService);

  logMessage() {
    // Usa o serviço para registrar uma mensagem
    this.loggerService.log('Botão clicado!');
  }
}
```

#### Resumo
- **Vantagens**: Flexível (pode ser usado em qualquer lugar no contexto de DI), menos verboso que o construtor.
- **Quando usar**: Projetos Angular 14+ onde o encapsulamento estrito não é necessário.
- **Requisitos**: Angular 14+.
- **Contexto**: Requer um contexto de injeção, mas a propriedade pode ser pública ou privada dependendo do modificador.

---

### 3. Injeção via Construtor (Menos Recomendada)

Método tradicional do Angular, onde as dependências são injetadas diretamente no construtor da classe.

#### Exemplo
```typescript
// arquivo: auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Disponível em toda a aplicação
})
export class AuthService {
  getUser() {
    return 'Usuário autenticado';
  }
}

// arquivo: auth.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  template: '<p>{{ usuario }}</p>'
})
export class AuthComponent {
  usuario: string;

  // Injeção clássica via construtor
  constructor(private authService: AuthService) {
    // Atribui o resultado do serviço a uma propriedade no construtor
    this.usuario = this.authService.getUser();
  }
}
```

#### Resumo
- **Vantagens**: Compatível com todas as versões do Angular, amplamente conhecido, fácil de testar.
- **Quando usar**: Projetos legados, versões antigas do Angular ou quando a simplicidade é priorizada.
- **Desvantagens**: Menos flexível (só no construtor), pode ficar verboso com muitas dependências.
- **Requisitos**: Nenhum além do Angular básico.

---

## Conclusão

A escolha da forma de injeção depende do contexto do projeto:
- **`inject()` com `#`**: Mais moderna, segura e recomendada para novos projetos (Angular 14+).
- **`inject()` sem `#`**: Boa alternativa moderna com flexibilidade, mas sem encapsulamento estrito.
- **Construtor**: Tradicional, confiável, mas menos alinhada às práticas atuais.

Para projetos iniciados em 2025, opte por **`inject()` com `#`** sempre que possível, aproveitando os benefícios de modernidade e encapsulamento.
```

