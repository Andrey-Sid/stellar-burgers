import { expect, test, describe, jest } from '@jest/globals';
import burgerConstructorSlice, {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient,
  setBun
} from './burger-constructor';

jest.mock('uuid', () => ({
  v4: () => 'fixed-id-123'
}));

const mockIngredients = [
  {
    id: '12',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  },
  {
    id: '13',
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
  },
  {
    id: '14',
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'main',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png'
  }
];

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

const oneIngredients = {
  id: '15',
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
};

describe('burgerConstructorSlice', () => {
  //начальное состояние
  const initialState = {
    bun: null,
    ingredients: [...mockIngredients]
  };

  test('тест редьюсера setBun', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      setBun(mockBun)
    );
    expect(newState.bun).toEqual(mockBun);
  });

  test('тест редьюсера addIngredient', () => {
    const newIngredient = {
      ...oneIngredients,
      id: 'fixed-id-123'
    };

    const expectedIngredients = [...mockIngredients, newIngredient];

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(oneIngredients)
    );

    expect(newState.ingredients).toEqual(expectedIngredients);
  });

  test('тест редьюсера removeIngredient', () => {
    const idToRemove = '12';

    const expectedIngredients = mockIngredients.filter(
      (item) => item.id !== idToRemove
    );

    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(idToRemove)
    );
    expect(newState.ingredients).toEqual(expectedIngredients);
  });

  test('тест редьюсера moveIngredient', () => {
    const expectedIngredients = [
      mockIngredients[1],
      mockIngredients[0],
      mockIngredients[2]
    ];
    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(newState.ingredients).toEqual(expectedIngredients);
  });

  test('тест редьюсера clearConstructor', () => {
    const mockConstructor = {
      bun: mockBun,
      ingredients: [...mockIngredients]
    };
    const newState = burgerConstructorSlice.reducer(
      mockConstructor,
      clearConstructor()
    );
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([]);
  });
});
