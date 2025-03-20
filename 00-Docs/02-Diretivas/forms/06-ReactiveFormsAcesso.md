
```markdown
# Acessando Value, Valid, Touched e Dirty no Angular 19 (Reactive Forms)

## Índice
1. [Resumo](#resumo)
2. [Standalone Components](#standalone-components)
3. [Com Módulos](#com-módulos)

---

## Resumo
- **`value`**: Retorna os valores atuais do formulário ou controle.
- **`valid`**: Indica se o formulário/controle atende às validações (true/false).
- **`touched`**: Indica se o campo foi interagido pelo usuário (true após foco/desfoco).
- **`dirty`**: Indica se o campo foi modificado pelo usuário (true após alteração).
- **Uso**: Esses estados são usados para validação, feedback visual e lógica de envio.

---

## Standalone Components

### Exemplo
```typescript
// form.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
        <span *ngIf="userForm.get('email')?.invalid && (userForm.get('email')?.dirty || userForm.get('email')?.touched)">
          Email inválido
        </span>
      </label>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Valor: {{ userForm.value | json }}</p>
    <p>Válido: {{ userForm.valid }}</p>
    <p>Touched: {{ userForm.touched }}</p>
    <p>Dirty: {{ userForm.dirty }}</p>
  `
})
export class FormComponent {
  private fb = inject(FormBuilder); // Injeta FormBuilder
  userForm: FormGroup;

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required], // Campo com validação obrigatória
      email: ['', [Validators.required, Validators.email]] // Campo com validação de email
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Valor:', this.userForm.value); // Ex.: { name: "João", email: "joao@email.com" }
      console.log('Válido:', this.userForm.valid); // true se válido
      console.log('Touched:', this.userForm.touched); // true se algum campo foi tocado
      console.log('Dirty:', this.userForm.dirty); // true se algum campo foi alterado
    }
  }
}
```

### Como Funciona
- **`value`**: Acessado via `userForm.value`, retorna um objeto com os valores atuais.
- **`valid`**: `userForm.valid` é `true` se todas as validações passam.
- **`touched`**: `userForm.touched` ou `userForm.get('name')?.touched` verifica interação.
- **`dirty`**: `userForm.dirty` ou `userForm.get('email')?.dirty` verifica modificação.

---

## Com Módulos

### Exemplo
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        <span *ngIf="userForm.get('email')?.invalid && (userForm.get('email')?.dirty || userForm.get('email')?.touched)">
          Email inválido
        </span>
      </label>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Valor: {{ userForm.value | json }}</p>
    <p>Válido: {{ userForm.valid }}</p>
    <p>Touched: {{ userForm.touched }}</p>
    <p>Dirty: {{ userForm.dirty }}</p>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { // Injeção via construtor
    this.userForm = this.fb.group({
      name: ['', Validators.required], // Campo obrigatório
      email: ['', [Validators.required, Validators.email]] // Campo com validação de email
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Valor:', this.userForm.value); // Ex.: { name: "João", email: "joao@email.com" }
      console.log('Válido:', this.userForm.valid); // true se válido
      console.log('Touched:', this.userForm.touched); // true se tocado
      console.log('Dirty:', this.userForm.dirty); // true se alterado
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
- **`value`**: `userForm.value` retorna os dados do formulário.
- **`valid`**: `userForm.valid` verifica a validade geral.
- **`touched`**: `userForm.touched` ou por controle específico com `get()`.
- **`dirty`**: `userForm.dirty` ou por controle com `get()`.

---

## Notas
- **Acesso**:
  - `value`: Objeto com valores atuais (ex.: `{ name: "", email: "" }`).
  - `valid`: `true` se todas as regras de validação são atendidas.
  - `touched`: `true` após interação (foco/desfoco).
  - `dirty`: `true` após modificação do valor inicial.
- **Nível**:
  - Pode ser acessado no `FormGroup` (nível formulário) ou em um `FormControl` específico com `get('nome')`.
- **Standalone**: Usa `inject()` para `FormBuilder`; mais modular.
- **Módulos**: Usa construtor; tradicional.
- **Uso prático**: Feedback em tempo real, controle de envio e validação condicional.

