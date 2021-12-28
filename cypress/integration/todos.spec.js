/// <reference types="cypress" />

const user = {
  name: 'sebastian',
  email: `${Math.random()}@gmail.com`,
  password: 123456,
};

describe('Todos testing', () => {
  it('Tests todo, creates, updates and deltes todo', () => {
    // Sign up with new account
    cy.visit('http://localhost:3000/signup');
    cy.signUp(user.name, user.email, user.password);
    cy.get('[role="alert"]').should('be.visible', 'Signed up successfully');
    cy.get('[data-cy="welcome-header"]').should('be.visible');

    // Create todos
    cy.get('input#create-todo').type('install React.js{enter}');
    cy.get('input').should('be.visible', 'install React.js');
    cy.get('input#create-todo').type('Run create React-App{enter}');
    cy.get('input').should('be.visible', 'Run create React-App');
    cy.get('input#create-todo').type('Code{enter}').type('{enter}');
    cy.get('input').should('be.visible', 'Code');
    cy.get('[role="alert"]').should('be.visible', 'Your todo was created');

    // Update and delete todos
    cy.get('.todo-field input').first().type('New todo{enter}');
    cy.get('.todo-field input').first().should('be.visible', 'New todo');
    cy.get('[role="alert"]').should('be.visible', 'Your todo was updated');
    cy.get('ul#todos-list').find('svg').click({ multiple: true });
    cy.get('[role="alert"]').should('be.visible', 'Your todo was deleted');

    // Delete account
    cy.get('#user-btn').click();
    cy.get('#profile-btn').click();
    cy.get('#delete-button').click();
    cy.contains('p', 'Are you sure you want to delete your account?');
    cy.get('.css-poadzn').click();
    cy.get('[role="alert"]').should('be.visible', 'Profile not found or deleted');
    cy.contains('p', 'Sign In');
  });
});
