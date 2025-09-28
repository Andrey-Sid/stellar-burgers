Cypress.Commands.add('getIngredients', () =>
  cy.get('[data-cy="ingredient-item"]')
);

Cypress.Commands.add('getModal', () => cy.get('[data-cy="modal"]'));

Cypress.Commands.add('openIngredientModalByName', (name) => {
  cy.contains(name).click();
});

Cypress.Commands.add('closeModalByButton', () => {
  cy.get('[data-cy="modal-close-button"]').click();
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('[data-cy="modal-overlay"]').click({ force: true });
});
