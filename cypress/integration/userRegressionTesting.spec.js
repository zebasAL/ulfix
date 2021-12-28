/// <reference types="cypress" />

const user = {
  name: 'sebastian',
  email: `${Math.random()}@gmail.com`,
  password: 123456,
};

describe('User regression testing', () => {
  it('Tests sign up form, sign in, updates and deletes user', () => {
    // Sign up with new account
    cy.visit('http://localhost:3000/signup');
    cy.signUp(user.name, user.email, user.password);
    cy.get('[role="alert"]').should('be.visible', 'Signed up successfully');
    cy.get('[data-cy="welcome-header"]').should('be.visible');

    // Log out
    cy.get('#user-btn').click();
    cy.get('#logout-btn').click();
    cy.get('[role="alert"]').should('be.visible', 'You have logout successfully');

    // Sign in with the same account
    cy.signIn(user.email, user.password);
    cy.get('[data-cy="welcome-header"]').should('be.visible');
    cy.get('[role="alert"]').should('be.visible', 'Signed in successfully');

    // Change user name
    cy.get('#user-btn').click();
    cy.get('#profile-btn').click();
    cy.get('input#name-field').should('be.visible', user.name);
    cy.contains('p', user.email);
    cy.get('input#name-field').type(`sebastian ${user.email}`);
    cy.get('input#name-field').should('be.visible', `sebastian ${user.email}`);
    cy.get('[role="alert"]').should('be.visible', 'Name updated successfully');

    // Delete account
    cy.get('#delete-button').click();
    cy.contains('p', 'Are you sure you want to delete your account?');
    cy.get('.css-poadzn').click();
    cy.get('[role="alert"]').should('be.visible', 'Profile not found or deleted');
    cy.contains('p', 'Sign In');
  });
});
