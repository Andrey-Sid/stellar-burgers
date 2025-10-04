import { INGREDIENT_BURGER } from './selectors';

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/orders', { fixture: 'order.json' });

    cy.setCookie('accessToken', 'test-access-token');
    cy.setCookie('refreshToken', 'test-refresh-token');
    cy.visit('http://localhost:4000/');
  });
  // удаление куков и хранилища от моковых данных после тестов
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Должна загрузить ингредиенты и показать булки и соусы', () => {
    // проверка отсутствия ингридиентов
    cy.getIngredients().should('not.exist');

    cy.getIngredients().should('have.length.at.least', 1);
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Соус Spicy-X').should('exist');
  });

  //обновление теста
  it('Добавляет ингредиент при клике по кнопке «Добавить»', () => {
    //проверка пустоты конструктора
    const topBunSelector = '[data-cy="bun-top"]';
    const bottomBunSelector = '[data-cy="bun-bottom"]';
    cy.get(INGREDIENT_BURGER).should('not.exist');
    cy.get(topBunSelector).should('not.exist');
    cy.get(bottomBunSelector).should('not.exist');

    //добавление основы
    const ingredientItemSelector = '[data-cy="ingredient-item"]';
    cy.contains('Краторная булка N-200i')
      .parents(ingredientItemSelector)
      .find('button')
      .click();

    // добавление котлеты
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents(ingredientItemSelector)
      .find('button')
      .click();

    // проверка соответствия булки и котлеты
    cy.get(topBunSelector).should('contain', 'Краторная булка N-200i (верх)');
    cy.get(INGREDIENT_BURGER).should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(bottomBunSelector).should('contain', 'Краторная булка N-200i (низ)');
  });

  it('Открывает модальное окно ингредиента', () => {
    // проверка закрытия модального окна
    cy.getModal().should('not.exist');

    //клик по булке
    cy.openIngredientModalByName('Краторная булка N-200i');

    cy.getModal().as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Краторная булка N-200i');
  });

  it('Закрывает модальное окно по крестику', () => {
    cy.getIngredients().as('ingredients');
    cy.get('@ingredients').first().find('button').click();
    cy.getModal().should('not.exist');

    cy.get('@ingredients').first().click();
    cy.getModal().should('exist');
    cy.closeModalByButton();
    cy.getModal().should('not.exist');
  });

  it('Закрывает модальное окно по клику на оверлей', () => {
    cy.getIngredients().first().click();
    cy.getModal().should('exist');

    cy.closeModalByOverlay();
    cy.getModal().should('not.exist');
  });

  it('Собирает бургер и оформляет заказ', () => {
    // проверка пустоты конструктора
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');

    // Добавление ингредиентов
    cy.getIngredients().as('ingredients');
    cy.get('@ingredients').first().find('button').click();
    cy.get('@ingredients').last().find('button').click();

    // Клик «Оформить заказ»
    cy.contains('Оформить заказ').click();

    // Проверка открытия модалки с номером заказа
    cy.getModal().as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '1234');

    // Закрыти модалки
    cy.closeModalByButton();
    cy.getModal().should('not.exist');

    // Проверка пустоты конструктора
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
