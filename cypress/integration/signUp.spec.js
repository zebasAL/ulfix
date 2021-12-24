/// <reference types="cypress" />

const user = {
  name: 'sebastian',
  email: `${Math.random()}@gmail.com`,
  password: 123456,
};

describe('Sign up a new account', () => {
  it('Tests sign up form', () => {
    cy.visit('http://localhost:3000/signup');
    cy.signUp(user.name, user.email, user.password);
    cy.get('[data-cy="wlecome-header"]').should('be.visible');
  });
});
