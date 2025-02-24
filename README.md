# 🚀 Projeto de Testes Automatizados com Cypress

Este projeto contém testes automatizados para a página de inventário do site [SauceDemo](https://www.saucedemo.com/v1/), utilizando o framework **Cypress** e a linguagem **JavaScript**. Os testes cobrem cenários como login, listagem de produtos, filtragem, adição de itens ao carrinho, finalização de compra e logout.

---

## 📋 Pré-requisitos

Antes de executar os testes, certifique-se de ter os seguintes requisitos instalados:

1. **Node.js**: Instale a versão mais recente do [Node.js](https://nodejs.org/).
2. **NPM**: O Node.js já vem com o NPM (Node Package Manager), mas você pode atualizá-lo com o comando:
   ```bash
   npm install -g npm
🛠️ Configuração do Projeto
Siga os passos abaixo para configurar o projeto:


1. **Instale as dependências:**

```bash
  npm install
```
2. **Instale o Cypress** (caso não esteja instalado):

```bash
  npm install cypress --save-dev
```

## 🚀 Executando os Testes
Modo Interativo

Para executar os testes no modo interativo (com interface gráfica), use o comando:

```bash
npx cypress open
```
Isso abrirá a interface do Cypress, onde você pode selecionar o arquivo de teste desejado para execução.


## 📂 Estrutura do Projeto
O projeto está organizado da seguinte forma:

```
cypress/
  e2e/
    Vox Teste Qa
    Adição_de_produtos_ao_carrinho.cy.js  # Arquivo de testes principais
    Finalização_de_compra.cy              # Arquivo de testes principais
    Login.cy                              # Arquivo de testes principais
    Tela_de_listagem_de_produtos.cy       # Arquivo de testes principais 
  fixtures/                          # Dados estáticos
  support/                           # Comandos personalizados e configurações
cypress.config.js                    # Configurações do Cypress
README.md                            # Este arquivo
```
## 🧪 Cenários de Teste
Abaixo estão os cenários de teste implementados no arquivo Login.cy.js:

1. Login com sucesso
Verifica se o login é realizado com sucesso e se a página de inventário é carregada.

2. Exibir mensagem de erro ao tentar login com usuário inexistente

3. Exibir mensagem de erro ao tentar login com senha incorreta

4. Exibir mensagem de erro "Epic sadface: Sorry, this user has been locked out." quando usuário existir bloqueado

Abaixo estão os cenários de teste implementados no arquivo Tela_de_listagem_de_produtos.cy.js

1. Deve listar todos os produtos corretamente

Verifica se todos os 6 produtos estão listados corretamente na página de inventário.

2. Filtragem de Produtos

Testa a funcionalidade de filtragem por:

- Nome (A to Z)

- Preço (low to high)

- Preço (high to low)

Abaixo estão os cenários de teste implementados no arquivo Adição_de_produtos_ao_carrinho.cy.js

1. Adição e Remoção de Produtos no Carrinho
Adiciona e remove produtos do carrinho, verificando se o ícone do carrinho reflete a quantidade correta de itens.

2. Navegação para o Carrinho
Verifica se a navegação para a página do carrinho funciona corretamente após adicionar um produto.

3. Adição de múltiplos produtos ao carrinho
Verifca se a adição de múltiplos produtos ao carrinho está funcionando corretamente.

Abaixo estão os cenários de teste implementados no arquivo Finalização_de_compra.cy.js

1. Finalização de Compra

Cobre o fluxo completo de finalização de compra para:

- 1 item

- 2 itens

- 3 itens

2. Inclui preenchimento de informações de checkout e verificação da mensagem de confirmação.

3. Logout
   
Verifica se o logout é realizado com sucesso e se o usuário é redirecionado para a página de login.

## 📝 Observações

Os testes foram dividos em 4 arquivos, para que qualquer alteração no projeto, que venha a necessitar da alteração de um código de teste, seja feita com mais facilidade e precisão.

## ❌ Falhas detectadas

Foram encontrados erros nos usuários "problem_user" e "performance_glitch_user"

O usuário "performance_glitch_user" tem os seguintes problemas:

1. Lentidão no carregamento: A página demora mais para carregar.

2. Problemas de desempenho ao interagir com elementos: Ações como clicar em botões podem demorar mais para serem processadas.

Já o usuário "problem_user" tem os seguintes problemas conhecidos:

1. Imagens quebradas: As imagens dos produtos não são carregadas corretamente.

2. Botões que não funcionam: O botão "Add to Cart" para alguns produtos não funciona.

2. Ordenação incorreta: A funcionalidade de ordenação não funciona corretamente.

4. Erro ao adicionar itens ao carrinho: Alguns itens não são adicionados ao carrinho.





