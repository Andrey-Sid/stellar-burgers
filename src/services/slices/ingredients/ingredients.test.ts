import { describe, expect, test } from '@jest/globals';
import ingredientsSlice, {
  fetchIngredients,
  initialState
} from './ingredients';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
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
    }
  ];

  test('должен обработать fetchIngredients.pending', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать fetchIngredients.fulfilled', () => {
    const mockItems: TIngredient[] = mockIngredients;
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockItems, '', undefined)
    );
    expect(nextState.items).toEqual(mockItems);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать fetchIngredients.rejected', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.rejected(null, '', undefined, undefined)
    );
    expect(nextState.isLoading).toBe(false);
  });
});
