import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from '../slices/ingredients/ingredients';
import { initialState as burgerConstructorInitialState } from '../slices/burger-constructor/burger-constructor';
import { initialState as orderInitialState } from '../slices/order/order';
import { initialState as profileInitialState } from '../slices/profile/profile';
import { initialState as feedInitialState } from '../slices/feeds/feed';
import { initialState as loginInitialState } from '../slices/login/login';
import { initialState as registerInitialState } from '../slices/register/register';

const expectedInitialState = {
  ingredients: ingredientsInitialState,
  burgerConstructor: burgerConstructorInitialState,
  orders: orderInitialState,
  profile: profileInitialState,
  feed: feedInitialState,
  login: loginInitialState,
  register: registerInitialState
};

describe('Тесты для конфигурации rootReducer', () => {
  it('должен возвращать начальное состояние для неизвестного экшена', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(expectedInitialState);
  });
});
