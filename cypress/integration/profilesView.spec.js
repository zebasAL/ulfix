/// <reference types="cypress" />

const user = {
  name: 'sebas',
  email: `${Math.random()}@gmail.com`,
  password: 123456,
};

describe('Profile testing', () => {
  it('Search profile', () => {
    cy.visit('http://localhost:3000/profiles');
    cy.contains('DIV', 'NAME');
    cy.contains('DIV', 'EMAIL');
    cy.contains('DIV', 'MEMBER SINCE');
    cy.get('img#logo').click();
    cy.contains('p', 'Sign In');
    cy.get('a').click();

    // Sign in with the same account
    cy.signUp(user.name, user.email, user.password);
    cy.get('[data-cy="welcome-header"]').should('be.visible');
    cy.get('[role="alert"]').should('be.visible', 'Signed in successfully');

    // Search user account
    cy.get('#users-button').click();
    cy.get('[data-evergreen-table-body="true"]').should('be.visible');
    cy.contains('span', user.email).click();
    cy.get('input#name-field').should('be.visible', user.name);

    // Delete account
    cy.get('#delete-button').click();
    cy.contains('p', 'Are you sure you want to delete your account?');
    cy.get('.css-poadzn').click();
    cy.get('[role="alert"]').should('be.visible', 'Profile not found or deleted');
    cy.contains('p', 'Sign In');
  });
});
