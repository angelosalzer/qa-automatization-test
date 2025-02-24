/// <reference types="cypress" />

describe('Adição de produtos ao carrinho', () => {
    beforeEach(() => {
        // Visita a página de login e faz login com um usuário válido
        cy.visit('https://www.saucedemo.com/v1/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    
        // Verifica se o login foi bem-sucedido
        cy.url().should('include', '/inventory.html');
      });
    
      it('Deve adicionar múltiplos produtos ao carrinho', () => {
        // Adiciona o primeiro produto ao carrinho
        cy.get('.btn_primary').eq(0).click(); // Adiciona o primeiro produto
        cy.get('.btn_primary').eq(1).click(); // Adiciona o segundo produto
    
        // Verifica se o ícone do carrinho mostra "2"
        cy.get('.shopping_cart_badge').should('contain', '2');
    
        // Navega para o carrinho
        cy.get('.shopping_cart_link').click();
    
        // Verifica se os produtos adicionados estão no carrinho
        cy.get('.inventory_item_name').should('have.length', 2); // Verifica se há 2 produtos no carrinho
        cy.get('.inventory_item_name').eq(0).should('contain', 'Sauce Labs Backpack'); // Verifica o primeiro produto
        cy.get('.inventory_item_name').eq(1).should('contain', 'Sauce Labs Bolt T-Shirt'); // Verifica o segundo produto
      });

    it('Deve adicionar e remover produtos do carrinho', () => {
        // Adiciona o primeiro produto ao carrinho
        cy.get('.btn_primary').first().click();
    
        // Verifica se o botão muda para "Remove"
        cy.get('.btn_secondary').first().should('contain', 'REMOVE');
    
        // Verifica se o ícone do carrinho mostra "1"
        cy.get('.shopping_cart_badge').should('contain', '1');
    
        // Remove o produto do carrinho
        cy.get('.btn_secondary').first().click();
    
        // Verifica se o botão muda para "Add to Cart"
        cy.get('.btn_primary').first().should('contain', 'ADD TO CART');
    
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
});