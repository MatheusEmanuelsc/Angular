

```markdown
# FormGroup no Angular 19 (Reactive Forms)

## Índice
1. [Resumo](#resumo)
2. [Standalone Components](#standalone-components)
3. [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: `FormGroup` é uma classe do Angular que agrupa múltiplos `FormControl` (ou outros `FormGroup`) para gerenciar um formulário ou subseção dele de forma reativa.
- **Função**:
  - Organiza dados em uma estrutura hierárquica.
  - Fornece estado coletivo (ex.: `valid`, `dirty`) e valores agrupados.
- **Uso típico**: Formulários complexos com validação interdependente.

---

## Standalone Components

### Exemplo
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Necessário para Reactive Forms
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input formControlName="name" />
        <span *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">Nome é obrigatório</span>
      </label>
      <label>
        Email:
        <input formControlName="email" />
        <span *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">Email inválido</span>
      </label>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Dados: {{ userForm.value | json }}</p>
  `
})
export class FormComponent {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required), // Campo com validação obrigatória
    email: new FormControl('', [Validators.required, Validators.email]) // Campo com validação de email
  });

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulário enviado:', this.userForm.value); // { name: string, email: string }
    }
  }
}
```

### Como Funciona
- **`FormGroup`**: Agrupa `name` e `email` como `FormControl`.
- **Template**: Usa `formControlName` para vincular cada controle ao grupo.
- **Validação**: Exibe mensagens de erro com base no estado (`invalid`, `touched`).

---

## Com Módulos

### Exemplo
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input formControlName="name" />
        <span *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">Nome é obrigatório</span>
      </label>
      <label>
        Email:
        <input formControlName="email" />
        <span *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">Email inválido</span>
      </label>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Dados: {{ userForm.value | json }}</p>
  `
})
export class FormComponent {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required), // Campo obrigatório
    email: new FormControl('', [Validators.required, Validators.email]) // Campo com validação de email
  });

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulário enviado:', this.userForm.value); // { name: string, email: string }
    }
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule], // Importa ReactiveFormsModule
  declarations: [AppComponent, FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Como Funciona
- **`FormGroup`**: Mesma lógica, agrupando `name` e `email`.
- **Template**: Igual ao standalone, usando `formControlName`.
- **Validação**: Mesma abordagem com mensagens condicionais.

---

## Notas
- **`FormGroup`**:
  - Pode conter outros `FormGroup` (aninhamento) ou `FormArray`.
  - Métodos úteis: `get('name')` (acessa controle), `value` (dados), `valid` (estado).
- **Standalone**: Declara `ReactiveFormsModule` no componente; mais modular.
- **Módulos**: Requer `ReactiveFormsModule` no módulo; tradicional.
- **Uso prático**: Ideal para formulários com lógica complexa ou validação cruzada.

