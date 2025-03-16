
```markdown
# Angular: Standalone vs Módulos

## Standalone
- **O que é?** Componentes, diretivas e pipes que não precisam de um módulo para funcionar.
- **Vantagem:** Mais simples, menos boilerplate, ideal para projetos menores ou experimentais.
- **Como criar?** Use `ng new nome-do-projeto` (padrão desde Angular 14).

## Com Módulos
- **O que é?** Estrutura tradicional com `NgModule` para organizar componentes, serviços, etc.
- **Vantagem:** Melhor para projetos grandes, com mais controle e modularidade.
- **Como criar?**
  1. Rode o comando:
     ```bash
     ng new NOME_DO_PROJETO --no-standalone
     ```
  2. Isso cria um projeto com `app.module.ts` como módulo principal.
  3. Organize seus componentes, serviços e imports no `NgModule`.

## Diferença Rápida
- **Standalone:** Sem `NgModule`, tudo é independente.
- **Módulos:** Usa `NgModule` para agrupar e configurar.

Escolha com base no tamanho e complexidade do projeto!
```
