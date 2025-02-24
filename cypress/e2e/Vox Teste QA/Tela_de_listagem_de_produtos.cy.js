/// <reference types="cypress" />


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

  });
  