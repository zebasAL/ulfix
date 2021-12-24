/// <reference types="cypress" />

const user = {
  name: 'sebastian',
  email: `${Math.random()}@gmail.com`,
  password: 123456,
}

describe('Sign up a new account', () => {
  it('Tests sign up form', () => {
    cy.visit('http://localhost:3000/signup');
    cy.signUp(user.name, user.email, user.password);
    cy.get('[data-cy="wlecome-header"]').should('be.visible');
   });
});

// cy.get('input[type="text"]').click({ force: true });
// cy.get('input[type="text"]').type('acer');
// cy.get('.autocomplete-wrapper li').click();
// cy.get('input[type="text"]').should('be.visible', '');
// cy.get('[data-cy="product-info-title"]').should('be.visible', 'acer');
//     // Check if homepage components are mounted
//     cy.get('img.pokemon-logo').should('be.visible', 'img');
//     cy.get('.pokemon-details').should('be.visible', 'charizard');
//     cy.get('.pokemon-details')
//       .find('img')
//       .should('have.attr', 'src');
//     cy.get('button.switch-background').should('be.visible');
//     cy.get('button.load-more-pokemons-button').should('be.visible');

//     // Set shiny pokemons
//     cy.get('button.switch-background').click();
//     cy.get('.pokemon-details')
//       .find('img')
//       .should('have.attr', 'src')
//       .should('include', 'shiny');

//     // Load more pokemons
//     cy.get('button.load-more-pokemons-button').click();
//     cy.get('div.loader').should('be.visible');
//     cy.contains('p', 'nidoking');
//     cy.contains('p', 'ninetales');

//     // Search pokemon using input field
//     cy.get('input.autocomplete-input-field')
//       .type('rayquaza')
//       .type('{enter}');
//     cy.get('.pokemons-wrapper').should('have.length', 1);
//     cy.get('.pokemons-wrapper')
//       .click();

//     // Full view, pokemon card
//     cy.get('.pokemon-card-wrapper').should('be.visible');
//     cy.get('#pokemon-card-id').should('be.visible', '#');
//     cy.get('#pokemon-card-id').should('be.visible', 'rayquaza');
//     cy.get('#pokemon-card-height').should('be.visible', 'm');
//     cy.get('#pokemon-card-weight').should('be.visible', 'kg');
//     cy.get('.pokemon-card-wrapper')
//       .find('img')
//       .should('have.attr', 'src')
//       .should('include', 'shiny');
//     cy.get('p.pokemon-card-description').should('be.visible');
//     cy.get('.divider-line-container').should('be.visible');
//     cy.get('.pokemon-card-stats > div').should((stat) => {
//       expect(stat, '6 stats').to.have.length(6);
//       expect(stat.eq(0), 'first stat').to.contain('HP');
//       expect(stat.eq(1), 'second stat').to.contain('ATTACK');
//       expect(stat.eq(2), 'third stat').to.contain('DEFENSE');
//       expect(stat.eq(3), 'fourth stat').to.contain('SPECIAL-ATTACK');
//       expect(stat.eq(4), 'fifth stat').to.contain('SPECIAL-DEFENSE');
//       expect(stat.eq(5), 'sixth stat').to.contain('SPEED');
//     });

//     // Set normal pokemons
//     cy.get('button.switch-background').click();
//     cy.get('.pokemon-card-wrapper')
//       .find('img')
//       .should('have.attr', 'src')
//       .should('not.include', 'shiny');

//     // Go home
//     cy.get('img.pokemon-logo')
//       .click();
//     cy.get('.pokemon-details').should('be.visible', 'bulbasaur');
//     cy.get('.pokemon-details')
//       .find('img')
//       .should('have.attr', 'src')
//       .should('not.include', 'shiny');
//     cy.get('button.switch-background').should('be.visible');
//     cy.get('button.load-more-pokemons-button').should('be.visible');
//   });
// });

