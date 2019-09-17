import { getGreeting } from '../support/app.po';

describe('react-crud-master-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to react-crud-master-e2e!');
  });
});
