## Resumo dos Comandos

**Criando um Projeto Angular:**

**Com Módulos:**

```
ng new NOME_DO_PROJETO
```

**Sem Módulos:**

```
ng new NOME_DO_PROJETO --no-standalone
```

**Criando um Componente:**

```
ng generate component NOME_DO_COMPONENTE
```

**Observações:**

* O comando para criar um projeto com módulos não possui a flag `--module`, pois a partir do Angular v14, a criação de módulos é o comportamento padrão.
* A flag `--no-standalone` é utilizada para desabilitar a compilação autônoma de componentes, que pode ser útil se você deseja utilizar módulos em seu projeto.


