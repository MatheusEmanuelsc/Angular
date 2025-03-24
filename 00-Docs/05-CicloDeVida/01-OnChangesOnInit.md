# Ciclos de Vida OnInit e OnChanges no Angular 19

## Índice
1. [Resumo](#resumo)
2. [OnInit](#oninit)
3. [OnChanges](#onchanges)
4. [Exemplos Práticos](#exemplos-práticos)
   - [Standalone Components](#standalone-components)
   - [Com Módulos](#com-módulos)

---

## Resumo
- **O que são**: `OnInit` e `OnChanges` são hooks do ciclo de vida do Angular, usados para executar lógica em momentos específicos da existência de um componente.
- **Ciclo de Vida**: O Angular gerencia componentes em fases (criação, atualização, destruição), e esses hooks permitem interagir com essas fases.

---

## OnInit
- **Definição**: `ngOnInit` é chamado uma vez após a inicialização do componente, quando todas as propriedades `@Input` foram definidas e o componente está pronto para uso.
- **Objetivo**: Configurar o componente (ex.: carregar dados iniciais, inicializar variáveis).
- **Interface**: `OnInit` (importada de `@angular/core`).

---

## OnChanges
- **Definição**: `ngOnChanges` é chamado antes de `ngOnInit` e sempre que uma propriedade `@Input` muda, fornecendo um objeto `SimpleChanges` com detalhes da alteração.
- **Objetivo**: Reagir a mudanças em propriedades vinculadas (ex.: atualizar UI ou lógica baseada em novos valores).
- **Interface**: `OnChanges` (importada de `@angular/core`).

---

## Exemplos Práticos

### Standalone Components
1. **Componente Filho com OnInit e OnChanges**:
   ```typescript
   // child.component.ts
   import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

   @Component({
     selector: 'app-child',
     standalone: true,
     template: `<p>Valor recebido: {{ value }}</p>`
   })
   export class ChildComponent implements OnInit, OnChanges {
     @Input() value: string = '';

     ngOnInit() {
       console.log('ChildComponent inicializado com valor:', this.value);
     }

     ngOnChanges(changes: SimpleChanges) {
       console.log('Mudança detectada:', changes);
       if (changes['value']) {
         console.log('Novo valor:', changes['value'].currentValue);
       }
     }
   }