/// <reference types="cypress"

describe('Finalização de compra', () => {
    beforeEach(() => {
        // Visita a página de login e faz login com um usuário válido
        cy.visit('https://www.saucedemo.com/v1/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    
        // Verifica se o login foi bem-sucedido
        cy.url().should('include', '/inventory.html');
      });
    
    it('Deve finalizar a compra de um item com sucesso', () => {
        // Adiciona um produto ao carrinho
        cy.get('.btn_primary').first().click();
    
        // Navega para o carrinho
        cy.get('.shopping_cart_link').click();
    
        // Clica no botão de checkout
        cy.get('.checkout_button').click();
    
        // Preenche as informações de checkout
        cy.get('#first-name').type('Fulano');
        cy.get('#last-name').type('de Tal');
        cy.get('#postal-code').type('12345');
    
        // Clica no botão "Continue"
        cy.get('.cart_button').click();
    
        // Verifica se a página de resumo do pedido é exibida
        cy.url().should('include', '/checkout-step-two.html');
    
        // Verifica o produto no resumo do pedido
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
    
        // Clica no botão "Finish" para finalizar a compra
        cy.get('.cart_button').click();
    
        // Verifica se a compra foi finalizada com sucesso
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
      });
    
    it('Deve finalizar a compra de dois itens com sucesso', () => {
        // Adiciona dois produtos ao carrinho
        cy.get('.btn_primary').eq(0).click(); // Adiciona o primeiro produto
        cy.get('.btn_primary').eq(1).click(); // Adiciona o segundo produto
    
        // Verifica se o ícone do carrinho mostra "2"
        cy.get('.shopping_cart_badge').should('contain', '2');
    
        // Navega para o carrinho
        cy.get('.shopping_cart_link').click();
    
        // Clica no botão de checkout
        cy.get('.checkout_button').click();
    
        // Preenche as informações de checkout
        cy.get('#first-name').type('Fulano');
        cy.get('#last-name').type('de Tal');
        cy.get('#postal-code').type('12345');
    
        // Clica no botão "Continue"
        cy.get('.cart_button').click();
    
        // Verifica se a página de resumo do pedido é exibida
        cy.url().should('include', '/checkout-step-two.html');
    
        // Verifica os produtos no resumo do pedido
        cy.get('.inventory_item_name').should('have.length', 2); // Verifica se há 2 produtos
        cy.get('.inventory_item_name').eq(0).should('contain', 'Sauce Labs Backpack'); // Verifica o primeiro produto
        cy.get('.inventory_item_name').eq(1).should('contain', 'Sauce Labs Bolt T-Shirt'); // Verifica o segundo produto
    
        // Clica no botão "Finish" para finalizar a compra
        cy.get('.cart_button').click();
    
        // Verifica se a compra foi finalizada com sucesso
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
    });
      
     it ('Deve finalizar a compra de três itens e fazer logout', () => { 
        // Adiciona três produtos ao carrinho
        cy.get('.btn_primary').eq(0).click(); // Adiciona o primeiro produto
        cy.get('.btn_primary').eq(1).click(); // Adiciona o segundo produto
        cy.get('.btn_primary').eq(2).click(); // Adiciona o terceiro produto

        // Verifica se o ícone do carrinho mostra "3"
        cy.get('.shopping_cart_badge').should('contain', '3');

        // Navega para o carrinho
        cy.get('.shopping_cart_link').click();

        // Clica no botão de checkout
        cy.get('.checkout_button').click();

        // Preenche as informações de checkout
        cy.get('#first-name').type('Fulano');
        cy.get('#last-name').type('de Tal');
        cy.get('#postal-code').type('12345');

        // Clica no botão "Continue"
        cy.get('.cart_button').click();

     // Verifica se a página de resumo do pedido é exibida
        cy.url().should('include', '/checkout-step-two.html');

        // Verifica os produtos no resumo do pedido
        cy.get('.inventory_item_name').should('have.length', 3); // Verifica se há 3 produtos
        cy.get('.inventory_item_name').eq(0).should('contain', 'Sauce Labs Backpack'); // Verifica o primeiro produto
        cy.get('.inventory_item_name').eq(1).should('contain', 'Sauce Labs Bolt T-Shirt'); // Verifica o segundo produto
        cy.get('.inventory_item_name').eq(2).should('contain', 'Sauce Labs Onesie'); // Verifica o terceiro produto

        // Clica no botão "Finish" para finalizar a compra
        cy.get('.cart_button').click();

        // Verifica se a compra foi finalizada com sucesso
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');

        // Volta para a página inicial (inventário)
        cy.get('.bm-burger-button').click(); // Abre o menu lateral
        cy.get('#inventory_sidebar_link').click(); // Clica em "All Items"

        // Faz logout
        cy.get('.bm-burger-button').click(); // Abre o menu lateral
        cy.get('#logout_sidebar_link').click(); // Clica em "Logout"

        // Verifica se o logout foi bem-sucedido
        cy.url().should('include', '/index.html');
    });
});