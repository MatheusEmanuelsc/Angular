# Uso de Interface Tipada e Passagem por Parâmetros no Angular

## Introdução
No Angular, podemos definir interfaces para tipar objetos, garantindo maior segurança e previsibilidade no código. Um exemplo prático disso é quando utilizamos uma interface para tipar um array de opções de menu, que são passadas para o template do componente.

## Definição da Interface
A interface `MenuOption` é criada para estruturar os dados de cada opção do menu:

```typescript
interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}
```

**Explicação:**
- `icon`: Ícone associado à opção de menu.
- `label`: Texto principal exibido.
- `route`: Caminho da rota correspondente.
- `subLabel`: Texto secundário para mais contexto.

## Implementação no Componente Angular
No componente `SideMenuOptionsComponent`, usamos essa interface para tipar a variável `menuOptions`:

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search',
    },
  ];
}
```

**Explicação:**
- O array `menuOptions` é tipado como `MenuOption[]`, garantindo que cada item siga a estrutura definida.
- O Angular gerencia a injeção de dependências do `RouterLink` e `RouterLinkActive`.

## Template (HTML) do Componente
O template exibe dinamicamente as opções do menu:

```html
<div id="nav" class="w-full px-6">
  @for (item of menuOptions; track item.route) {
  <a
    [routerLink]="item.route"
    routerLinkActive="bg-blue-800"
    class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150"
  >
    <div>
      <i [class]="item.icon"></i>
    </div>
    <div class="flex flex-col">
      <span class="text-lg font-bold leading-5 text-white">{{ item.label }}</span>
      <span class="text-sm text-white/50 hidden md:block">{{ item.subLabel }}</span>
    </div>
  </a>
  }
</div>
```

**Explicação:**
- O `@for (item of menuOptions; track item.route)` itera sobre o array.
- O `[routerLink]="item.route"` define o link de navegação.
- O `routerLinkActive="bg-blue-800"` aplica uma classe CSS quando a rota está ativa.
- O `<i [class]="item.icon"></i>` usa `item.icon` para definir dinamicamente a classe do ícone.

## Conclusão
Ao utilizar interfaces para tipagem de dados no Angular:
- Aumentamos a segurança do código.
- Facilitamos a manutenção e legibilidade.
- Evitamos erros comuns como nomes errados de propriedades.
- Melhoramos a previsibilidade do comportamento da aplicação.

Esse padrão é altamente recomendado para aplicações escaláveis!
