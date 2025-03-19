

```markdown
# Template-Driven Forms no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Standalone Components](#standalone-components)
   - [Tutorial Passo a Passo](#tutorial-passo-a-passo---standalone)
3. [Com Módulos](#com-módulos)
   - [Tutorial Passo a Passo](#tutorial-passo-a-passo---com-módulos)

---

## Resumo
- **O que é**: Template-Driven Forms são formulários no Angular baseados no template HTML, usando diretivas como `ngModel` para vincular dados bidirecionalmente.
- **Características**:
  - Simples e intuitivo para formulários básicos.
  - Menos código TypeScript, mais lógica no HTML.
  - Ideal para cenários com validação simples.
- **Diretivas principais**:
  - `ngModel`: Vincula dados e rastreia alterações.
  - `ngForm`: Agrupa o formulário e fornece estado (ex.: `valid`, `dirty`).

---

## Standalone Components

### Configuração Básica
```typescript
// form.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule], // Importa o módulo de formulários
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input type="text" name="name" [(ngModel)]="user.name" required>
      </label>
      <label>
        Email:
        <input type="email" name="email" [(ngModel)]="user.email" required email>
      </label>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Dados: {{ user | json }}</p>
  `
})
export class FormComponent {
  user = { name: '', email: '' }; // Modelo inicial

  onSubmit() {
    console.log('Formulário enviado:', this.user);
  }
}
```

### Tutorial Passo a Passo - Standalone

1. **Crie o Componente**:
   - Gere um novo componente standalone: `ng g c form --standalone`.
   - Certifique-se de importar `FormsModule` em `imports`.

2. **Configure o Template**:
   - Adicione um `<form>` com a diretiva `#userForm="ngForm"` para referenciar o formulário.
   - Use `[(ngModel)]` para vincular campos ao modelo (`user`).

3. **Adicione Validação**:
   - Use atributos HTML como `required` e `email` para validação básica.
   - Desative o botão com `[disabled]="!userForm.valid"`.

4. **Manipule o Envio**:
   - Adicione `(ngSubmit)="onSubmit()"` ao formulário.
   - No método `onSubmit()`, acesse os dados via `this.user`.

5. **Teste**:
   - Adicione `<app-form></app-form>` ao `app.component.ts`.
   - Execute `ng serve` e preencha o formulário.

---

## Com Módulos

### Configuração Básica
```typescript
// form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input type="text" name="name" [(ngModel)]="user.name" required>
      </label>
      <label>
        Email:
        <input type="email" name="email" [(ngModel)]="user.email" required email>
      </label>
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    <p>Dados: {{ user | json }}</p>
  `
})
export class FormComponent {
  user = { name: '', email: '' }; // Modelo inicial

  onSubmit() {
    console.log('Formulário enviado:', this.user);
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [BrowserModule, FormsModule], // Importa FormsModule no módulo
  declarations: [AppComponent, FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Tutorial Passo a Passo - Com Módulos

1. **Crie o Componente**:
   - Gere um componente: `ng g c form`.
   - Não precisa de `standalone`, pois depende do módulo.

2. **Configure o Módulo**:
   - No `app.module.ts`, importe `FormsModule` em `imports`.

3. **Configure o Template**:
   - No `form.component.html`, adicione o `<form>` com `#userForm="ngForm"`.
   - Use `[(ngModel)]` para vincular ao modelo (`user`).

4. **Adicione Validação**:
   - Adicione `required` e `email` aos campos.
   - Use `[disabled]="!userForm.valid"` no botão.

5. **Manipule o Envio**:
   - Adicione `(ngSubmit)="onSubmit()"` ao formulário.
   - No `form.component.ts`, implemente `onSubmit()`.

6. **Teste**:
   - Adicione `<app-form></app-form>` ao `app.component.html`.
   - Execute `ng serve` e teste o formulário.

---

## Notas
- **Vantagens**:
  - Simplicidade para formulários pequenos.
  - Validação integrada com atributos HTML.
- **Limitações**:
  - Menos controle em TypeScript comparado a Reactive Forms.
  - Difícil de escalar para formulários complexos.
- **Standalone**: Usa `imports` no componente; mais leve.
- **Módulos**: Requer `FormsModule` no módulo; tradicional.


```