

```markdown
# Submit em Reactive Forms no Angular 19

## Índice
1. [Resumo](#resumo)
   - [O que é o Submit](#o-que-é-o-submit)
   - [Evento ngSubmit](#evento-ngsubmit)
2. [Standalone Components](#standalone-components)
   - [Submit Básico](#submit-básico)
   - [Submit com Validação](#submit-com-validação)
   - [Submit com Reset](#submit-com-reset)
3. [Com Módulos](#com-módulos)
   - [Submit Básico](#submit-básico-1)
   - [Submit com Validação](#submit-com-validação-1)
   - [Submit com Reset](#submit-com-reset-1)

---

## Resumo

### O que é o Submit
- **Definição**: O "submit" é o processo de enviar os dados de um formulário, geralmente disparado por um botão tipo `submit` dentro de um `<form>`.
- **Objetivo**: Capturar os valores do formulário e processá-los (ex.: enviar ao backend, salvar localmente).

### Evento ngSubmit
- **Descrição**: O evento `(ngSubmit)` é uma diretiva do Angular que captura o envio do formulário, evitando o comportamento padrão de recarregar a página.
- **Uso**: Vinculado a uma função no componente para manipular os dados.

---

## Standalone Components

### Submit Básico
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Nome" />
      <button type="submit">Enviar</button>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder = inject(FormBuilder)) {
    this.userForm = this.fb.group({
      name: ['']
    });
  }

  onSubmit() {
    console.log('Dados enviados:', this.userForm.value); // Ex.: { name: "João" }
  }
}
```

### Submit com Validação
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Nome" />
      <span *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">Nome é obrigatório</span>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder = inject(FormBuilder)) {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Dados enviados:', this.userForm.value); // Só executa se válido
    }
  }
}
```

### Submit com Reset
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Nome" />
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder = inject(FormBuilder)) {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Dados enviados:', this.userForm.value);
      this.userForm.reset(); // Reseta o formulário após envio
    }
  }
}
```

---

## Com Módulos

### Submit Básico
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Nome" />
      <button type="submit">Enviar</button>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['']
    });
  }

  onSubmit() {
    console.log('Dados enviados:', this.userForm.value); // Ex.: { name: "João" }
  }
}
```

### Submit com Validação
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Nome" />
      <span *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">Nome é obrigatório</span>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Dados enviados:', this.userForm.value); // Só executa se válido
    }
  }
}
```

### Submit com Reset
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Nome" />
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Dados enviados:', this.userForm.value);
      this.userForm.reset(); // Reseta o formulário após envio
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
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## Notas
- **Submit**:
  - `(ngSubmit)` captura o evento de envio sem recarregar a página.
  - `userForm.value` fornece os dados do formulário.
- **Validação**: Use `userForm.valid` para condicionar o envio ou desativar o botão.
- **Reset**: `reset()` limpa os valores e estados (ex.: `touched`, `dirty`).
- **Standalone**: Usa `inject()` para `FormBuilder`; mais modular.
- **Módulos**: Usa construtor; tradicional.
- **Uso prático**: Enviar dados ao backend ou processar localmente após validação.

