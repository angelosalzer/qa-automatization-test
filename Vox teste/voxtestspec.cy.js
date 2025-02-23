describe('Saucedemo Tela de Login', () => {
  it('Login com sucesso', () => {
    // Acesso a página da Saucedemo
    cy.visit('https://www.saucedemo.com/v1/');

    // Preenche o campo de usuário
    cy.get('#user-name').type('standard_user');

    // Preenche o campo de senha
    cy.get('#password').type('secret_sauce');

    // Clica no botão de login
    cy.get('#login-button').click();

    // Verifica se o login foi bem-sucedido
    cy.url().should('include', '/inventory.html'); // Verifica a URL após o login
    cy.get('.product_label').should('contain', 'Products'); // Verifica o título da página
  });

  it('Exibir mensagem de erro ao tentar login com usuário inexistente', () => {
    // Acesso a página da Saucedemo
    cy.visit('https://www.saucedemo.com/v1/');

    // Preenche o campo de usuário com um usuário inexistente
    cy.get('#user-name').type('usuario_inexistente');

    // Preenche o campo de senha com uma senha qualquer
    cy.get('#password').type('senha_qualquer');

    // Clica no botão de login
    cy.get('#login-button').click();

    // Verifica se a mensagem de erro é exibida
    cy.get('[data-test="error"]')
      .should('be.visible') // Verifica se o elemento de erro está visível
      .and('contain', 'Epic sadface: Username and password do not match any user in this service'); // Verifica o texto da mensagem de erro
  });

  it('Exibir mensagem de erro ao tentar login com senha incorreta', () => {
    // Visita a página da Saucedemo
    cy.visit('https://www.saucedemo.com/v1/');

    // Preenche o campo de usuário com um usuário inexistente
    cy.get('#user-name').type('stardand_user');

    // Preenche o campo de senha com uma senha qualquer
    cy.get('#password').type('senha_qualquer');

    // Clica no botão de login
    cy.get('#login-button').click();

    // Verifica se a mensagem de erro é exibida
    cy.get('[data-test="error"]')
      .should('be.visible') // Verifica se o elemento de erro está visível
      .and('contain', 'Epic sadface: Username and password do not match any user in this service'); // Verifica o texto da mensagem de erro
  });

  it('Exibir mensagem de erro "Epic sadface: Sorry, this user has been locked out." quando usuário existir bloqueado', () => {
    // Visita a página da Saucedemo
    cy.visit('https://www.saucedemo.com/v1/');

    // Preenche o campo de usuário com um usuário inexistente
    cy.get('#user-name').type('locked_out_user');

    // Preenche o campo de senha com uma senha qualquer
    cy.get('#password').type('secret_sauce');

    // Clica no botão de login
    cy.get('#login-button').click();

    // Verifica se a mensagem de erro é exibida
    cy.get('[data-test="error"]')
      .should('be.visible') // Verifica se o elemento de erro está visível
      .and('contain', 'Epic sadface: Sorry, this user has been locked out.'); // Verifica o texto da mensagem de erro
  });
});

describe('Lista de Produtos', () => {
  beforeEach(() => {
    // Visita a página de login e faz login com um usuário válido
    cy.visit('https://www.saucedemo.com/v1/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verifica se o login foi bem-sucedido
    cy.url().should('include', '/inventory.html');
  });

  it('Deve verificar se o login foi bem-sucedido', () => {
    // Verifica se o título da página é "Products"
    cy.get('.product_label').should('contain', 'Products');
  });

  it('Deve listar todos os produtos corretamente', () => {
    // Verifica se todos os 6 produtos estão visíveis
    cy.get('.inventory_item').should('have.length', 6);

    // Verifica os nomes dos produtos
    const expectedProducts = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)'
    ];

    cy.get('.inventory_item_name').each(($el, index) => {
      expect($el.text()).to.equal(expectedProducts[index]);
    });
  });

  it('Deve filtrar os produtos por nome (A to Z)', () => {
    // Seleciona a opção de filtro "Name (A to Z)"
    cy.get('.product_sort_container').select('az');

    // Verifica se os produtos estão ordenados por nome (A to Z)
    const expectedProducts = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)'
    ];

    cy.get('.inventory_item_name').each(($el, index) => {
      expect($el.text()).to.equal(expectedProducts[index]);
    });
  });

  it('Deve filtrar os produtos por preço (low to high)', () => {
    // Seleciona a opção de filtro "Price (low to high)"
    cy.get('.product_sort_container').select('lohi');

    // Obtém todos os preços dos produtos
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = $prices.toArray().map((el) => parseFloat(el.innerText.replace('$', '')));

      // Verifica se os preços estão em ordem crescente
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Deve filtrar os produtos por preço (high to low)', () => {
    // Seleciona a opção de filtro "Price (high to low)"
    cy.get('.product_sort_container').select('hilo');

    // Obtém todos os preços dos produtos
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = $prices.toArray().map((el) => parseFloat(el.innerText.replace('$', '')));

      // Verifica se os preços estão em ordem decrescente
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Deve adicionar e remover produtos do carrinho', () => {
    // Adiciona o primeiro produto ao carrinho
    cy.get('.btn_primary').first().click();

    // Verifica se o botão muda para "Remove"
    cy.get('.btn_secondary').first().should('contain', 'Remove');

    // Verifica se o ícone do carrinho mostra "1"
    cy.get('.shopping_cart_badge').should('contain', '1');

    // Remove o produto do carrinho
    cy.get('.btn_secondary').first().click();

    // Verifica se o botão muda para "Add to Cart"
    cy.get('.btn_primary').first().should('contain', 'Add to Cart');

    // Verifica se o ícone do carrinho não está mais visível
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Deve navegar para o carrinho', () => {
    // Adiciona um produto ao carrinho
    cy.get('.btn_primary').first().click();

    // Clica no ícone do carrinho
    cy.get('.shopping_cart_link').click();

    // Verifica se a URL mudou para a página do carrinho
    cy.url().should('include', '/cart.html');

    // Verifica se o produto adicionado está no carrinho
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
  });

  it('Deve fazer logout', () => {
    // Abre o menu lateral
    cy.get('.bm-burger-button').click();

    // Clica no botão de logout
    cy.get('#logout_sidebar_link').click();

    // Verifica se a URL mudou para a página de login
    cy.url().should('include', '/index.html');
  });
});
