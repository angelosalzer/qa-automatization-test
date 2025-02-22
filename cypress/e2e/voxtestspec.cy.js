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

describe('Visualização de Produtos', () => {
  beforeEach(() => {
    // Visita a página de login e faz login com um usuário válido
    cy.visit('https://www.saucedemo.com/v1/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verifica se o login foi bem-sucedido
    cy.url().should('include', '/inventory.html');
  });

  it('Deve exibir todos os produtos disponíveis no menu', () => {
    // Verifica se todos os produtos estão visíveis
    cy.get('.inventory_item').should('have.length', 6); // Verifica se há 6 produtos na página

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
      expect($el.text()).to.equal(expectedProducts[index]); // Verifica se o nome do produto corresponde ao esperado
    });
  });
});
