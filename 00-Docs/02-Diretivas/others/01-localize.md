
```markdown
# @angular/localize no Angular 19

## Índice
1. [Resumo](#resumo)
2. [Configuração Básica](#configuração-básica)
3. [Funcionamento e Uso](#funcionamento-e-uso)

---

## Resumo
- **O que é**: `@angular/localize` é a ferramenta nativa de internacionalização (i18n) do Angular, introduzida na versão 9 e aprimorada até o Angular 19, para traduzir textos em tempo de compilação.
- **Características**:
  - Gera builds separados por idioma usando arquivos XLF (XML Localization Interchange File Format).
  - Suporta pluralização e seleções via ICU expressions.
  - Otimizado para desempenho (AOT) e SEO, mas não permite troca de idioma em runtime sem recarregar.
- **Uso típico**: Aplicações que precisam de alta performance, SEO eficiente e suporte a múltiplos idiomas em versões estáticas.

---

## Configuração Básica
1. **Instalação**:
   - Adicione ao projeto (incluído no Angular CLI desde a versão 9):
     ```bash
     ng add @angular/localize
     ```

2. **Marcação no Template**:
   - Use o atributo `i18n` para marcar textos traduzíveis:
     ```html
     <h1 i18n="@@welcomeTitle">Bem-vindo</h1>
     ```

3. **Extração de Traduções**:
   - Gere o arquivo XLF base:
     ```bash
     ng extract-i18n --output-path src/locale
     ```
   - Resultado: `src/locale/messages.xlf`.

4. **Tradução**:
   - Crie arquivos XLF por idioma (ex.: `messages.en.xlf`):
     ```xml
     <trans-unit id="welcomeTitle" datatype="html">
       <source>Bem-vindo</source>
       <target>Welcome</target>
     </trans-unit>
     ```

5. **Configuração no angular.json**:
   - Defina os idiomas:
     ```json
     "projects": {
       "my-app": {
         "i18n": {
           "sourceLocale": "pt",
           "locales": {
             "en": "src/locale/messages.en.xlf"
           }
         },
         "architect": {
           "build": {
             "configurations": {
               "pt": { "localize": ["pt"] },
               "en": { "localize": ["en"] }
             }
           },
           "serve": {
             "configurations": {
               "pt": { "browserTarget": "my-app:build:pt" },
               "en": { "browserTarget": "my-app:build:en" }
             }
           }
         }
       }
     }
     ```

6. **Build e Execução**:
   - Compile para cada idioma:
     ```bash
     ng build --configuration=pt
     ng build --configuration=en
     ```
   - Sirva localmente:
     ```bash
     ng serve --configuration=pt
     ```

---

## Funcionamento e Uso
- **Traduções**:
  - Textos com `i18n` são substituídos no build com base no arquivo XLF correspondente.
  - Exemplo com pluralização:
    ```html
    <p i18n="{count, plural, =1 {1 item} other {# itens}}">{count}</p>
    ```

- **Valores Dinâmicos**:
  - Use `i18n` com variáveis:
    ```html
    <span i18n="@@greeting">Olá, {name}</span>
    ```
  - No XLF:
    ```xml
    <trans-unit id="greeting">
      <source>Olá, {name}</source>
      <target>Hello, {name}</target>
    </trans-unit>
    ```

- **Componente Standalone**:
  ```typescript
  // app.component.ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    standalone: true,
    template: `
      <h1 i18n="@@welcomeTitle">Bem-vindo</h1>
      <p i18n="@@description">Esta é uma aplicação Angular</p>
    `
  })
  export class AppComponent {}
  ```

- **Builds Separados**:
  - Cada idioma gera uma pasta no `dist/` (ex.: `dist/my-app/pt/`, `dist/my-app/en/`).
  - O servidor deve direcionar o usuário ao build correto (ex.: via URL ou configuração backend).

---

## Notas
- **Vantagens**:
  - Integração nativa com Angular CLI.
  - Builds otimizados para SEO e desempenho.
  - Suporte a ICU para pluralização e seleções.
- **Limitações**:
  - Não suporta troca de idioma em runtime; exige recarregar o build correspondente.
  - Requer rebuild para adicionar ou alterar traduções.
- **Uso prático**: Ideal para sites estáticos multilíngues ou aplicações corporativas com foco em performance.
```

