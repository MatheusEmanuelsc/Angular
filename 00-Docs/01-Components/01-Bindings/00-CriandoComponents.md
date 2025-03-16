# Angular Components

## Índice
1. [O que são Components?](#o-que-são-components)
2. [Criando um Componente](#criando-um-componente)
3. [Estrutura Básica de um Componente](#estrutura-básica-de-um-componente)
4. [Usando Models](#usando-models)
5. [Exibindo um Componente como Página](#exibindo-um-componente-como-página)

## O que são Components?
Os **components** são a base de qualquer aplicação Angular. Eles representam partes reutilizáveis da interface do usuário e controlam a exibição e a lógica dessa parte específica da aplicação.

Cada component no Angular é composto por:
- Um **template** (HTML) para a interface gráfica
- Um **arquivo TypeScript** que contém a lógica do componente
- Um **arquivo CSS** para estilos específicos

## Criando um Componente
Para criar um componente, usamos o **Angular CLI**:
```sh
ng generate component nome-do-componente
```
Ou de forma abreviada:
```sh
ng g c nome-do-componente
```
Isso cria automaticamente os arquivos:
- `nome-do-componente.component.ts`
- `nome-do-componente.component.html`
- `nome-do-componente.component.css`

## Estrutura Básica de um Componente
```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.css']
})
export class ExemploComponent {
  titulo = signal('Olá, Angular!'); // Signal usado para armazenar o título da página
}
```

**Template (`exemplo.component.html`)**:
```html
<h1>{{ titulo() }}</h1>
```
O uso de `{{ }}` (interpolação) permite a exibição de valores dinâmicos dentro do HTML.

## Usando Models
Os **models** ajudam a organizar os dados em classes:
```typescript
export class Usuario {
  constructor(public nome: string, public idade: number) {}
}
```
No componente:
```typescript
usuario = signal(new Usuario('João', 25)); // Signal armazenando um objeto do tipo Usuario
```
No template:
```html
<p>Nome: {{ usuario().nome }}</p>
<p>Idade: {{ usuario().idade }}</p>
```
Aqui, `usuario()` retorna o valor atual do signal e exibe os dados no HTML.

## Exibindo um Componente como Página
Para exibir um componente como uma página, é necessário configurar o roteamento no **Angular**. 

No arquivo `app-routing.module.ts`, adicione:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExemploComponent } from './exemplo/exemplo.component';

const routes: Routes = [
  { path: 'exemplo', component: ExemploComponent } // Define a rota para o componente
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

No template principal `app.component.html`:
```html
<router-outlet></router-outlet>
```
Isso garante que o Angular carregue o componente `ExemploComponent` quando o usuário acessar `http://localhost:4200/exemplo`.

## Resumo
- **Components** são a estrutura principal de uma aplicação Angular.
- A interpolação `{{ }}` exibe valores dinâmicos do TypeScript no HTML.
- **Signals** são usados para gerenciamento de estado reativo no Angular 17+.
- **Models** ajudam a organizar os dados da aplicação.
- Para exibir um componente como uma **página**, é necessário configurar o roteamento com o `RouterModule`.

🚀 Esse resumo cobre os conceitos essenciais dos **Components no Angular** e como usá-los de maneira eficiente. Nos próximos resumos, podemos explorar **event binding, input/output properties e serviços** para melhorar ainda mais a aplicação! 🎯
