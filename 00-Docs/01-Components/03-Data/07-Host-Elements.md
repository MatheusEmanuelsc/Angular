
```markdown
# Host Elements no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Host Binding](#host-binding)
3. [Host Listener](#host-listener)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **O que é**: "Host Elements" refere-se ao elemento HTML que encapsula um componente Angular (a tag do componente no DOM). O Angular permite manipular esse elemento diretamente via **Host Binding** e **Host Listener**.
- **Objetivo**: Personalizar o comportamento ou estilo do elemento host sem depender de CSS externo ou manipulação manual do DOM.
- **Características**:
  - Configurado com decoradores `@HostBinding` e `@HostListener`.
  - Permite vincular propriedades/atributos e ouvir eventos no elemento host.

---

## Host Binding
- **Definição**: O `@HostBinding` vincula uma propriedade do componente a um atributo, classe ou estilo do elemento host.
- **Sintaxe**: `@HostBinding('propriedade') propriedadeDoComponente;`
- **Exemplos**:
  - Vincular uma classe: `@HostBinding('class.active') isActive = true;`
  - Vincular um estilo: `@HostBinding('style.backgroundColor') bgColor = 'red';`

---

## Host Listener
- **Definição**: O `@HostListener` escuta eventos DOM no elemento host (ex.: `click`, `mouseover`) e executa uma função no componente.
- **Sintaxe**: `@HostListener('evento', ['args']) método() {}`
- **Exemplos**:
  - Escutar clique: `@HostListener('click') onClick() {}`

---

## Exemplos Práticos

### Standalone Components
1. **Exemplo com Host Binding e Host Listener**:
   ```typescript
   // custom-button.component.ts
   import { Component, HostBinding, HostListener } from '@angular/core';

   @Component({
     selector: 'app-custom-button',
     standalone: true,
     template: `<ng-content></ng-content>`, // Projeta conteúdo interno
     styles: [`
       :host {
         display: inline-block;
         padding: 10px;
         cursor: pointer;
       }
     `]
   })
   export class CustomButtonComponent {
     @HostBinding('class.active') isActive = false; // Adiciona/remova a classe 'active' no host
     @HostBinding('style.backgroundColor') bgColor = 'lightgray'; // Define a cor de fundo

     @HostListener('mouseover')
     onMouseOver() {
       this.isActive = true;
       this.bgColor = 'lightblue'; // Muda ao passar o mouse
     }

     @HostListener('mouseout')
     onMouseOut() {
       this.isActive = false;
       this.bgColor = 'lightgray'; // Volta ao sair
     }

     @HostListener('click')
     onClick() {
       console.log('Botão clicado!');
     }
   }
   ```

2. **Uso no Componente Pai**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';
   import { CustomButtonComponent } from './custom-button.component';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [CustomButtonComponent],
     template: `
       <app-custom-button>Clique Aqui</app-custom-button>
     `
   })
   export class AppComponent {}
   ```
   - **Saída**: Um botão que muda de cor ao passar o mouse, adiciona a classe `active` e loga no console ao clicar.

---

### Com Módulos
1. **Exemplo com Host Binding e Host Listener**:
   ```typescript
   // custom-button.component.ts
   import { Component, HostBinding, HostListener } from '@angular/core';

   @Component({
     selector: 'app-custom-button',
     template: `<ng-content></ng-content>`,
     styles: [`
       :host {
         display: inline-block;
         padding: 10px;
         cursor: pointer;
       }
     `]
   })
   export class CustomButtonComponent {
     @HostBinding('class.active') isActive = false;
     @HostBinding('style.backgroundColor') bgColor = 'lightgray';

     @HostListener('mouseover')
     onMouseOver() {
       this.isActive = true;
       this.bgColor = 'lightblue';
     }

     @HostListener('mouseout')
     onMouseOut() {
       this.isActive = false;
       this.bgColor = 'lightgray';
     }

     @HostListener('click')
     onClick() {
       console.log('Botão clicado!');
     }
   }
   ```

2. **Configuração no Módulo**:
   ```typescript
   // app.module.ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { AppComponent } from './app.component';
   import { CustomButtonComponent } from './custom-button.component';

   @NgModule({
     imports: [BrowserModule],
     declarations: [AppComponent, CustomButtonComponent],
     bootstrap: [AppComponent]
   })
   export class AppModule {}
   ```

3. **Uso no Componente Pai**:
   ```typescript
   // app.component.ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <app-custom-button>Clique Aqui</app-custom-button>
     `
   })
   export class AppComponent {}
   ```
   - **Saída**: Igual ao standalone: botão interativo com mudanças visuais e log no console.

---

## Notas
- **Host Binding**:
  - Pode vincular atributos (`attr.disabled`), classes (`class.nome`) ou estilos (`style.propriedade`).
  - Útil para estados dinâmicos do componente.
- **Host Listener**:
  - Escuta eventos nativos do DOM no elemento host.
  - Pode passar argumentos (ex.: `@HostListener('click', ['$event'])`).
- **Pseudo-seletor `:host`**:
  - Usado no CSS para estilizar o elemento host diretamente (ex.: `:host(.active) {}`).
- **Standalone**: Configuração simples, importa diretamente no componente pai.
- **Módulos**: Requer declaração no `NgModule`, abordagem tradicional.
- **Uso prático**: Criar componentes interativos (botões, cards) com estilos e eventos dinâmicos.

