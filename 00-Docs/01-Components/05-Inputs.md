## Resumo sobre Inputs no Angular com Signals

Este resumo detalha o uso de inputs no Angular, focando na integração com Signals, uma forma crucial de comunicação entre componentes pai e filho.

**Índice:**

1.  **O que são Inputs e Signals?**
2.  **Sintaxe e Uso Básico com Signals (Versão Moderna)**
3.  **Sintaxe e Uso Básico (Versão Antiga)**
4.  **Tipos de Dados e Binding com Signals**
5.  **Exemplos Práticos com Signals**
6.  **Considerações Adicionais sobre Signals e Inputs**

**1. O que são Inputs e Signals?**

* **Inputs:** Mecanismos que permitem passar dados de um componente pai para um componente filho, estabelecendo uma comunicação unidirecional.
* **Signals:** Um sistema de reatividade granular que notifica automaticamente os consumidores quando os valores mudam. No contexto de inputs, Signals otimizam a detecção de mudanças e melhoram o desempenho.

**2. Sintaxe e Uso Básico com Signals (Versão Moderna)**

A versão moderna do Angular, com Signals, utiliza a função `input()` para declarar inputs, sem o decorador `@Input()`. Essa abordagem se integra perfeitamente com a reatividade dos Signals.

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-filho',
  templateUrl: './filho.component.html',
  styleUrls: ['./filho.component.css']
})
export class FilhoComponent {
  mensagem = input<string>(); // Declara o input 'mensagem' como um Signal de string
}
```

No componente pai, a passagem de valores permanece a mesma:

```html
<app-filho [mensagem]="valorDoPai"></app-filho>
```

**3. Sintaxe e Uso Básico (Versão Antiga)**

Na versão antiga, os inputs são declarados com o decorador `@Input()`.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filho',
  templateUrl: './filho.component.html',
  styleUrls: ['./filho.component.css']
})
export class FilhoComponent {
  @Input() mensagem: string; // Declara o input 'mensagem'
}
```

**4. Tipos de Dados e Binding com Signals**

Inputs com Signals podem receber qualquer tipo de dado. O binding de propriedade (`[]`) permite passar valores dinâmicos do componente pai, e as mudanças nesses valores são rastreadas pelos Signals, otimizando a atualização da UI.

**5. Exemplos Práticos com Signals**

**Exemplo 1: Passando uma string (Versão Moderna com Signals)**

```typescript
// filho.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-filho',
  template: '<p>{{ mensagem() }}</p>' // Acessa o valor do input como um Signal
})
export class FilhoComponent {
  mensagem = input<string>();
}

// pai.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-pai',
  template: '<app-filho [mensagem]="textoDoPai"></app-filho>'
})
export class PaiComponent {
  textoDoPai = 'Olá do componente pai!';
}
```

**Exemplo 2: Passando um objeto (Versão Antiga)**

```typescript
// filho.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filho',
  template: '<p>Nome: {{ pessoa.nome }}, Idade: {{ pessoa.idade }}</p>'
})
export class FilhoComponent {
  @Input() pessoa: { nome: string, idade: number };
}

// pai.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-pai',
  template: '<app-filho [pessoa]="dadosPessoa"></app-filho>'
})
export class PaiComponent {
  dadosPessoa = { nome: 'João', idade: 30 };
}
```

**6. Considerações Adicionais sobre Signals e Inputs**

* **Desempenho Otimizado:** Signals melhoram a detecção de mudanças, reduzindo renderizações desnecessárias e otimizando o desempenho.
* **Reatividade Granular:** Signals permitem que o Angular rastreie mudanças em valores individuais, em vez de componentes inteiros.
* **Sintaxe Simplificada:** A função `input()` torna a declaração de inputs mais concisa e legível.
* **Integração com Outros Signals:** Inputs como Signals podem ser combinados com outros Signals para criar lógica reativa complexa.
* Ao usar inputs com signals, não existe mais a necessidade de utilizar o ngOnChanges, pois a detecção de mudança é feita de forma automatica.

Ao adotar Inputs com Signals, você aproveita os benefícios da reatividade moderna do Angular, resultando em aplicações mais eficientes e responsivas.
