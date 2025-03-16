

# 📌 Índice  
1. [Output no Angular (Maneira Moderna - Sem Decorator)](#output-no-angular-maneira-moderna---sem-decorator)  
   - 1.1 [Usando Eventos Diretos](#usando-eventos-diretos)  
   - 1.2 [Usando Signals para Output](#usando-signals-para-output)  
2. [Output no Angular (Maneira Antiga - Com `@Output`)](#output-no-angular-maneira-antiga---com-output)  

---

## 🎯 Output no Angular (Maneira Moderna - Sem Decorator)  

No Angular moderno, não é necessário usar `@Output` para comunicação entre componentes. Agora podemos emitir eventos usando **métodos públicos** e **Signals**.  

### 📌 Usando Eventos Diretos  

📂 `parent.component.html`  
```html
<app-child (onAction)="handleAction($event)"></app-child>
```

📂 `parent.component.ts`  
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <app-child (onAction)="handleAction($event)"></app-child>
  `,
})
export class ParentComponent {
  handleAction(message: string) {
    console.log('Recebido do filho:', message);
  }
}
```

📂 `child.component.ts`  
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `<button (click)="emitEvent()">Clique</button>`,
})
export class ChildComponent {
  emitEvent() {
    dispatchEvent(new CustomEvent('onAction', { detail: 'Evento disparado!' }));
  }
}
```

🔹 Aqui, **não usamos `@Output`**, mas sim `dispatchEvent`, que pode ser tratado pelo pai.  

---

### 📌 Usando Signals para Output  

📂 `child.component.ts`  
```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `<button (click)="emitEvent()">Clique</button>`,
})
export class ChildComponent {
  outputSignal = signal<string | null>(null); // Signal para emitir eventos

  emitEvent() {
    this.outputSignal.set('Evento com Signals!');
  }
}
```

📂 `parent.component.ts`  
```typescript
import { Component, effect } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `<app-child #child></app-child>`,
})
export class ParentComponent {
  constructor(child: ChildComponent) {
    effect(() => {
      if (child.outputSignal()) {
        console.log('Recebido do filho:', child.outputSignal());
      }
    });
  }
}
```

🔹 O **Signal `outputSignal`** permite que o componente pai reaja a mudanças sem precisar de `@Output`.  

---

## 🎯 Output no Angular (Maneira Antiga - Com `@Output`)  

Antes, a comunicação era feita com `@Output()` e `EventEmitter`.  

📂 `parent.component.html`  
```html
<app-child (action)="handleAction($event)"></app-child>
```

📂 `child.component.ts`  
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<button (click)="emitEvent()">Clique</button>`,
})
export class ChildComponent {
  @Output() action = new EventEmitter<string>();

  emitEvent() {
    this.action.emit('Evento disparado!');
  }
}
```

📂 `parent.component.ts`  
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<app-child (action)="handleAction($event)"></app-child>`,
})
export class ParentComponent {
  handleAction(message: string) {
    console.log('Recebido do filho:', message);
  }
}
```

🔹 O `@Output()` era a forma tradicional de emitir eventos.  

---

## 📝 Resumo  

| Método | Angular Moderno (Sem `@Output`) | Angular Antigo (`@Output`) |
|--------|---------------------------------|--------------------------|
| Sintaxe | `dispatchEvent` ou **Signals** | `@Output() event = new EventEmitter()` |
| Comunicação | `<app-child (event)="method($event)">` | `<app-child (event)="method($event)">` |
| Reatividade | Melhor com **Signals** | Apenas com `emit()` |
| Uso Atual | Recomendado | Ainda válido, mas menos moderno |

A versão moderna simplifica a emissão de eventos, removendo a necessidade de `@Output()` e aproveitando melhor **signals e eventos nativos**.  

