
```markdown
# FormArray no Angular 19 (Reactive Forms)

## Índice
1. [Resumo](#resumo)
2. [Standalone Components](#standalone-components)
3. [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: `FormArray` é uma classe do Angular que gerencia uma lista dinâmica de `FormControl`, `FormGroup` ou outros `FormArray` dentro de um formulário reativo.
- **Função**:
  - Permite adicionar ou remover controles dinamicamente.
  - Ideal para listas ou coleções (ex.: lista de telefones, itens de pedido).
- **Uso típico**: Campos repetitivos ou editáveis em quantidade variável.

---

## Standalone Components

### Exemplo
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Necessário para Reactive Forms
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input formControlName="name" />
      </label>
      <div formArrayName="phones">
        <h3>Telefones</h3>
        <div *ngFor="let phone of phones.controls; let i=index">
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
  userForm = new FormGroup({
    name: new FormControl('', Validators.required), // Campo fixo
    phones: new FormArray([]) // Array dinâmico de telefones
  });

  // Getter para acessar o FormArray
  get phones() {
    return this.userForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(new FormControl('', Validators.required)); // Adiciona novo controle
  }

  removePhone(index: number) {
    this.phones.removeAt(index); // Remove controle pelo índice
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulário enviado:', this.userForm.value); // { name: string, phones: string[] }
    }
  }
}
```

### Como Funciona
- **`FormArray`**: Gerencia uma lista de `FormControl` em `phones`.
- **Template**: Usa `formArrayName` e um `*ngFor` para renderizar cada controle.
- **Métodos**: `addPhone()` e `removePhone()` manipulam a lista dinamicamente.

---

## Com Módulos

### Exemplo
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input formControlName="name" />
      </label>
      <div formArrayName="phones">
        <h3>Telefones</h3>
        <div *ngFor="let phone of phones.controls; let i=index">
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
  userForm = new FormGroup({
    name: new FormControl('', Validators.required), // Campo fixo
    phones: new FormArray([]) // Array dinâmico
  });

  // Getter para acessar o FormArray
  get phones() {
    return this.userForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(new FormControl('', Validators.required)); // Adiciona novo controle
  }

  removePhone(index: number) {
    this.phones.removeAt(index); // Remove controle
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulário enviado:', this.userForm.value); // { name: string, phones: string[] }
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
- **`FormArray`**: Mesma lógica, gerenciando a lista de telefones.
- **Template**: Igual ao standalone, com `formArrayName` e `*ngFor`.
- **Métodos**: `addPhone()` e `removePhone()` para manipulação dinâmica.

---

## Notas
- **`FormArray`**:
  - Contém uma coleção de controles (pode ser `FormControl`, `FormGroup`, ou outro `FormArray`).
  - Métodos úteis: `push()` (adiciona), `removeAt()` (remove), `controls` (lista de controles).
- **Standalone**: Declara `ReactiveFormsModule` no componente; mais modular.
- **Módulos**: Requer `ReactiveFormsModule` no módulo; tradicional.
- **Uso prático**: Perfeito para listas editáveis como endereços, itens ou contatos.

