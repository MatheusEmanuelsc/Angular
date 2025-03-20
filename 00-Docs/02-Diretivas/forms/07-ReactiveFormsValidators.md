
```markdown
# Validators no Angular 19 (Reactive Forms)

## Índice
1. [Resumo](#resuma)
   - [O que são Validators](#o-que-são-validators)
   - [Principais Validators Integrados](#principais-validators-integrados)
2. [Standalone Components](#standalone-components)
   - [Uso Básico de Validators](#uso-básico-de-validators)
   - [Combinação de Múltiplos Validators](#combinação-de-múltiplos-validators)
   - [Validação Customizada](#validação-customizada)
3. [Com Módulos](#com-módulos)
   - [Uso Básico de Validators](#uso-básico-de-validators-1)
   - [Combinação de Múltiplos Validators](#combinação-de-múltiplos-validators-1)
   - [Validação Customizada](#validação-customizada-1)

---

## Resumo

### O que são Validators
- **Definição**: `Validators` são funções do Angular usadas para validar entradas em Reactive Forms, retornando erros se as condições não forem atendidas.
- **Objetivo**: Garantir que os dados inseridos atendam a regras específicas (ex.: obrigatório, formato de email).

### Principais Validators Integrados(Configuration)Integrados
- **`Validators.required`**: Campo obrigatório.
- **`Validators.minLength(min)`**: Comprimento mínimo.
- **`Validators.maxLength(max)`**: Comprimento máximo.
- **`Validators.pattern(regex)`**: Corresponde a uma expressão regular.
- **`Validators.email`**: Valida formato de email.
- **`Validators.min(min)`**: Valor mínimo (números).
- **`Validators.max(max)`**: Valor máximo (números).

---

## Standalone Components

### Uso Básico de Validators
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input [formControl]="nameControl" placeholder="Nome" />
    <span *ngIf="nameControl.invalid && nameControl.touched">Nome é obrigatório</span>
  `
})
export class FormComponent {
  nameControl = new FormControl('', Validators.required); // Campo obrigatório
}
```

### Combinação de Múltiplos Validators
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm">
      <label>
        Email:
        <input formControlName="email" />
        <span *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">Email inválido</span>
      </label>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder = inject(FormBuilder)) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]] // Múltiplas validações
    });
  }
}
```

### Validação Customizada
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input [formControl]="ageControl" placeholder="Idade" />
    <span *ngIf="ageControl.errors?.['adult']">Você deve ser maior de 18</span>
  `
})
export class FormComponent {
  ageControl = new FormControl('', [Validators.required, this.adultValidator]); // Validação customizada

  adultValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value >= 18 ? null : { adult: true }; // Retorna erro se menor de 18
  }
}
```

---

## Com Módulos

### Uso Básico de Validators
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <input [formControl]="nameControl" placeholder="Nome" />
    <span *ngIf="nameControl.invalid && nameControl.touched">Nome é obrigatório</span>
  `
})
export class FormComponent {
  nameControl = new FormControl('', Validators.required); // Campo obrigatório
}
```

### Combinação de Múltiplos Validators
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="userForm">
      <label>
        Email:
        <input formControlName="email" />
        <span *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">Email inválido</span>
      </label>
    </form>
  `
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]] // Múltiplas validações
    });
  }
}
```

### Validação Customizada
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <input [formControl]="ageControl" placeholder="Idade" />
    <span *ngIf="ageControl.errors?.['adult']">Você deve ser maior de 18</span>
  `
})
export class FormComponent {
  ageControl = new FormControl('', [Validators.required, this.adultValidator]); // Validação customizada

  adultValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value >= 18 ? null : { adult: true }; // Erro se menor de 18
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
- **Uso**:
  - Validators são aplicados em `FormControl` ou via `FormBuilder`.
  - Retornam `null` (válido) ou um objeto de erro (inválido).
- **Customização**: Funções personalizadas podem acessar o valor do controle e retornar erros específicos.
- **Standalone**: Usa `inject()` para `FormBuilder`; mais modular.
- **Módulos**: Requer `ReactiveFormsModule` no módulo; tradicional.
- **Exemplo prático**: Combinar `required` e `email` para validar um campo de email.

