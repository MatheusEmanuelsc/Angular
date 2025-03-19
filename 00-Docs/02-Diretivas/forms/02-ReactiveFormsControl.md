
```markdown
# Reactive Forms no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Standalone Components](#standalone-components)
   - [FormControl](#formcontrol)
   - [FormGroup](#formgroup)
   - [Tutorial Passo a Passo](#tutorial-passo-a-passo---standalone)
3. [Com Módulos](#com-módulos)
   - [FormControl](#formcontrol-1)
   - [FormGroup](#formgroup-1)
   - [Tutorial Passo a Passo](#tutorial-passo-a-passo---com-módulos)

---

## Resumo
- **O que é**: Reactive Forms são formulários baseados em código TypeScript, oferecendo controle programático, validação robusta e reatividade.
- **Características**:
  - Maior controle via TypeScript.
  - Ideal para formulários complexos e dinâmicos.
  - Usa `FormControl`, `FormGroup` e `FormArray`.
- **Vantagens**: Validação personalizada, fácil teste, reatividade com Observables.

---

## Standalone Components

### FormControl
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Importa o módulo reativo
  template: `
    <input [formControl]="nameControl" placeholder="Nome" />
    <p>Valor: {{ nameControl.value }}</p>
    <p>Válido: {{ nameControl.valid }}</p>
  `
})
export class FormComponent {
  nameControl = new FormControl('', { validators: [Validators.required] }); // Controle com validação
}
```

### FormGroup
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input formControlName="name" />
      </label>
      <label>
        Email:
        <input formControlName="email" />
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
    console.log('Formulário enviado:', this.userForm.value);
  }
}
```

### Tutorial Passo a Passo - Standalone

1. **Crie o Componente**:
   - Gere um componente: `ng g c form --standalone`.
   - Importe `ReactiveFormsModule` em `imports`.

2. **Defina o FormGroup**:
   - No TypeScript, crie um `FormGroup` com `FormControl` para cada campo.

3. **Configure o Template**:
   - Use `[formGroup]="userForm"` no `<form>`.
   - Vincule campos com `formControlName`.

4. **Adicione Validação**:
   - Aplique validadores como `Validators.required` e `Validators.email`.
   - Use `userForm.valid` para controlar o botão.

5. **Manipule o Envio**:
   - Adicione `(ngSubmit)="onSubmit()"` e acesse `userForm.value`.

6. **Teste**:
   - Adicione `<app-form></app-form>` ao `app.component.ts`.
   - Execute `ng serve` e teste.

---

## Com Módulos

### FormControl
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <input [formControl]="nameControl" placeholder="Nome" />
    <p>Valor: {{ nameControl.value }}</p>
    <p>Válido: {{ nameControl.valid }}</p>
  `
})
export class FormComponent {
  nameControl = new FormControl('', { validators: [Validators.required] }); // Controle com validação
}
```

### FormGroup
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
      </label>
      <label>
        Email:
        <input formControlName="email" />
      </label>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Dados: {{ userForm.value | json }}</p>
  `
})
export class FormComponent {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required), // Campo obrigatório
    email: new FormControl('', [Validators.required, Validators.email]) // Campo com validação
  });

  onSubmit() {
    console.log('Formulário enviado:', this.userForm.value);
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule], // Importa o módulo reativo
  declarations: [AppComponent, FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Tutorial Passo a Passo - Com Módulos

1. **Crie o Componente**:
   - Gere um componente: `ng g c form`.

2. **Configure o Módulo**:
   - No `app.module.ts`, importe `ReactiveFormsModule`.

3. **Defina o FormGroup**:
   - No `form.component.ts`, crie um `FormGroup` com `FormControl`.

4. **Configure o Template**:
   - Use `[formGroup]="userForm"` e `formControlName` no HTML.

5. **Adicione Validação**:
   - Aplique `Validators.required` e `Validators.email`.
   - Controle o botão com `userForm.valid`.

6. **Manipule o Envio**:
   - Use `(ngSubmit)="onSubmit()"` e acesse `userForm.value`.

7. **Teste**:
   - Adicione `<app-form></app-form>` ao `app.component.html`.
   - Execute `ng serve`.

---

## Notas
- **`FormControl`**: Unidade básica para um campo, com valor e validação.
- **`FormGroup`**: Agrupa múltiplos `FormControl`, permitindo validação coletiva.
- **Standalone**: Usa `ReactiveFormsModule` no componente; mais modular.
- **Módulos**: Requer `ReactiveFormsModule` no módulo; tradicional.
- **Vantagens**: Controle granular, fácil integração com serviços e testes.

