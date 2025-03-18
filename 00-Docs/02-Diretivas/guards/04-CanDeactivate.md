
```markdown
# Guarda de Rota CanDeactivate no Angular 19

## Índice
1. [Standalone Components](#standalone-components)
2. [Com Módulos](#com-módulos)

---

## Standalone Components

### Configuração
```typescript
// unsaved-changes.guard.ts
import { CanDeactivateFn } from '@angular/router';
import { EditComponent } from './edit/edit.component';

export const unsavedChangesGuard: CanDeactivateFn<EditComponent> = (component) => {
  if (component.hasUnsavedChanges()) {
    // Pergunta ao usuário se quer sair com alterações não salvas
    return confirm('Você tem alterações não salvas. Deseja sair mesmo assim?');
  }
  return true; // Permite saída se não houver alterações
};

// app.routes.ts
import { Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { unsavedChangesGuard } from './unsaved-changes.guard';

export const routes: Routes = [
  { 
    path: 'edit', 
    component: EditComponent, 
    canDeactivate: [unsavedChangesGuard] // Aplica o guarda ao sair da rota
  }
];

// edit.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  template: `
    <input [(ngModel)]="data" (ngModelChange)="onChange()" />
    <p>{{ data }}</p>
  `,
  imports: [FormsModule] // Necessário para ngModel
})
export class EditComponent {
  data: string = '';
  isDirty: boolean = false;

  onChange() {
    this.isDirty = true; // Marca como alterado ao modificar o input
  }

  hasUnsavedChanges(): boolean {
    return this.isDirty; // Retorna se há alterações não salvas
  }
}

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

### Como Funciona
- **`CanDeactivateFn`**: Função que verifica se o componente permite saída.
- **Lógica**: Se `hasUnsavedChanges()` for `true`, exibe um `confirm`; caso contrário, permite sair.
- **Exemplo**: Ao sair de `/edit` com alterações, o usuário é questionado.

---

## Com Módulos

### Configuração
```typescript
// unsaved-changes.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditComponent } from './edit/edit.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<EditComponent> {
  canDeactivate(component: EditComponent): boolean {
    if (component.hasUnsavedChanges()) {
      // Pergunta ao usuário se quer sair
      return confirm('Você tem alterações não salvas. Deseja sair mesmo assim?');
    }
    return true; // Permite saída se não houver alterações
  }
}

// app.routes.ts
import { Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

export const routes: Routes = [
  { 
    path: 'edit', 
    component: EditComponent, 
    canDeactivate: [UnsavedChangesGuard] // Aplica o guarda ao sair da rota
  }
];

// edit.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  template: `
    <input [(ngModel)]="data" (ngModelChange)="onChange()" />
    <p>{{ data }}</p>
  `
})
export class EditComponent {
  data: string = '';
  isDirty: boolean = false;

  onChange() {
    this.isDirty = true; // Marca como alterado
  }

  hasUnsavedChanges(): boolean {
    return this.isDirty; // Retorna se há alterações não salvas
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { routes } from './app.routes';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
  declarations: [AppComponent, EditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Como Funciona
- **`CanDeactivate`**: Interface implementada para verificar saída.
- **Lógica**: Igual ao standalone, mas como classe.
- **Exemplo**: Protege a saída de `/edit` com alterações não salvas.

---

## Notas
- **`CanDeactivate`**:
  - Controla se o usuário pode sair de uma rota.
  - Recebe o componente atual como argumento para verificar estado (ex.: alterações não salvas).
- **Standalone**: Usa função (`CanDeactivateFn`) com tipagem genérica, mais moderno.
- **Módulos**: Usa classe (`Injectable`) com interface, abordagem tradicional.
- **Uso prático**: Ideal para formulários ou edições que precisam de confirmação ao sair.

