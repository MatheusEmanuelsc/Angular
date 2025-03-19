


```markdown
# FormBuilder no Angular 19 (Reactive Forms)

## Índice
1. [Resumo](#resumo)
2. [Standalone Components](#standalone-components)
3. [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: `FormBuilder` é um serviço do Angular que simplifica a criação de `FormGroup`, `FormControl` e `FormArray` em Reactive Forms, reduzindo a verbosidade do código.
- **Função**:
  - Oferece uma API fluida para configurar formulários.
  - Substitui a criação manual de instâncias com métodos como `group()`, `control()` e `array()`.
- **Uso típico**: Formulários complexos onde a legibilidade e manutenção são prioridades.

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
        <span *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">Email inválido</span>
      </label>
      <div formArrayName="phones">
        <h3>Telefones</h3>
        <div *ngFor="let phone of userForm.get('phones')?.controls; let i=index">
          <input [formControlName]="i" placeholder="Telefone {{ i + 1 }}" />
          <button type="button" (click)="removePhone(i)">Remover</button>
        </div>
        <button type="button" (click)="addPhone()">Adicionar Telefone</button>
      </div>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Dados: {{ userForm.value | json }}</p>
  `
})
export class FormComponent {
  private fb = inject(FormBuilder); // Injeta o FormBuilder
  userForm: FormGroup;

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required], // Campo com valor inicial e validação
      email: ['', [Validators.required, Validators.email]], // Campo com múltiplas validações
      phones: this.fb.array([]) // FormArray inicial vazio
    });
  }

  get phones() {
    return this.userForm.get('phones') as FormArray; // Getter para o FormArray
  }

  addPhone() {
    this.phones.push(this.fb.control('', Validators.required)); // Adiciona controle ao FormArray
  }

  removePhone(index: number) {
    this.phones.removeAt(index); // Remove controle do FormArray
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulário enviado:', this.userForm.value); // { name: string, email: string, phones: string[] }
    }
  }
}
```

### Como Funciona
- **`FormBuilder.group()`**: Cria o `FormGroup` com uma sintaxe concisa.
- **`FormBuilder.array()`**: Inicializa o `FormArray`.
- **`FormBuilder.control()`**: Adiciona controles ao `FormArray`.
- **Benefício**: Menos código repetitivo comparado à criação manual.

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
        <span *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">Email inválido</span>
      </label>
      <div formArrayName="phones">
        <h3>Telefones</h3>
        <div *ngFor="let phone of userForm.get('phones')?.controls; let i=index">
          <input [formControlName]="i" placeholder="Telefone {{ i + 1 }}" />
          <button type="button" (click)="removePhone(i)">Remover</button>
        </div>
        <button type="button" (click)="addPhone()">Adicionar Telefone</button>
      </div>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Dados: {{ userForm.value | json }}</p>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { // Injeção via construtor
    this.userForm = this.fb.group({
      name: ['', Validators.required], // Campo com validação
      email: ['', [Validators.required, Validators.email]], // Campo com validações
      phones: this.fb.array([]) // FormArray vazio
    });
  }

  get phones() {
    return this.userForm.get('phones') as FormArray; // Getter para o FormArray
  }

  addPhone() {
    this.phones.push(this.fb.control('', Validators.required)); // Adiciona controle
  }

  removePhone(index: number) {
    this.phones.removeAt(index); // Remove controle
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulário enviado:', this.userForm.value); // { name: string, email: string, phones: string[] }
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
- **`FormBuilder`**: Mesma lógica, mas com injeção via construtor.
- **`group()`**: Cria o `FormGroup` de forma simplificada.
- **`array()` e `control()`**: Gerenciam o `FormArray` dinamicamente.

---

## Notas
- **`FormBuilder`**:
  - Simplifica a sintaxe: `fb.group({ name: [''] })` vs. `new FormGroup({ name: new FormControl('') })`.
  - Suporta valores iniciais e validadores em um único objeto.
- **Standalone**: Usa `inject()` para o `FormBuilder`; mais moderno.
- **Módulos**: Usa injeção via construtor; tradicional.
- **Uso prático**: Ideal para formulários grandes ou com muitos campos dinâmicos.

