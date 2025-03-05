# Resumo: Inputs no Angular

## Índice
1. Introdução
2. Binding de Valores nos Inputs
   - **Binding Unidirecional (`[value]`)**
   - **Binding Bidirecional (`ngModel`)**
   - **Usando Form Controls (`FormControl`)**
   - **Usando Signals (`signal`)**
3. Captura de Eventos no Input
   - **Evento `(input)`**
   - **Evento `(change)`**
   - **Evento `(keyup)` e `(keydown)`**
4. Referências Locais no Input
5. Exemplos Adicionais
6. Conclusão

---

## 1. Introdução
No Angular, os inputs são elementos fundamentais para a interação do usuário. Eles podem ser manipulados por meio de **binding de valores**, **eventos** e **formulários reativos**, permitindo maior controle sobre os dados inseridos.

---

## 2. Binding de Valores nos Inputs

### Binding Unidirecional (`[value]`)
O binding unidirecional permite definir um valor inicial no input sem que ele seja atualizado automaticamente caso a variável mude.

```html
<input type="text" [value]="nome" placeholder="Digite seu nome" />
```

Se `nome` for atualizado no TypeScript, o input **não** será alterado automaticamente.

---

### Binding Bidirecional (`ngModel`)
O `ngModel` permite a sincronização automática entre a variável e o input. Para usá-lo, é necessário importar `FormsModule` no módulo do Angular.

```html
<input type="text" [(ngModel)]="nome" placeholder="Digite seu nome" />
```

Aqui, qualquer alteração no input será refletida na variável `nome` e vice-versa.

---

### Usando Form Controls (`FormControl`)
Os `FormControl` são usados em **formulários reativos** e oferecem um controle mais avançado sobre os inputs.

```ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: '<input [formControl]="nameControl" placeholder="Digite seu nome" />'
})
export class AppComponent {
  nameControl = new FormControl('');
}
```

Este método permite validações e manipulações mais avançadas.

---

### Usando Signals (`signal`)
Os signals são uma abordagem reativa moderna para gerenciar estados no Angular.

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<input type="text" [value]="nome()" (input)="nome.set($event.target.value)" placeholder="Digite seu nome" />'
})
export class AppComponent {
  nome = signal('');
}
```

Aqui, `nome` é um signal, e sua atualização ocorre de forma reativa sem a necessidade de `ChangeDetectionStrategy.OnPush`.

---

## 3. Captura de Eventos no Input

### Evento `(input)`
O evento `(input)` é disparado sempre que o usuário digita algo no campo.

```html
<input type="text" (input)="atualizarNome($event)" />
```

```ts
atualizarNome(event: any) {
  console.log(event.target.value);
}
```

---

### Evento `(change)`
O evento `(change)` é acionado apenas quando o usuário sai do campo após alterar o valor.

```html
<input type="text" (change)="salvarNome($event)" />
```

---

### Eventos `(keyup)` e `(keydown)`
Esses eventos permitem capturar quando o usuário pressiona ou solta uma tecla.

```html
<input type="text" (keyup)="verificarTecla($event)" />
```

```ts
verificarTecla(event: KeyboardEvent) {
  console.log("Tecla pressionada:", event.key);
}
```

---

## 4. Referências Locais no Input
As referências locais (`#variavel`) permitem acessar diretamente o valor do input sem precisar de `ngModel` ou `FormControl`.

```html
<input type="text" #nomeInput />
<button (click)="mostrarNome(nomeInput.value)">Mostrar Nome</button>
```

```ts
mostrarNome(nome: string) {
  console.log("Nome digitado:", nome);
}
```

---

## 5. Exemplos Adicionais

### Exemplo com Template-Driven Forms
```html
<form #meuFormulario="ngForm">
  <input type="text" name="usuario" ngModel required />
</form>
```

### Exemplo com FormGroup (Reativo)
```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: '<form [formGroup]="form"><input formControlName="usuario" /></form>'
})
export class AppComponent {
  form = new FormGroup({
    usuario: new FormControl('')
  });
}
```

---

## 6. Conclusão
Os inputs no Angular podem ser manipulados de diversas formas, desde o simples uso de `ngModel`, passando por eventos `(input)` e `(change)`, até abordagens mais avançadas como `FormControl`, `FormGroup` e `signal`. A escolha da abordagem ideal depende da complexidade do formulário e dos requisitos do projeto.
