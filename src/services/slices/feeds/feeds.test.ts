import { expect, test, describe } from '@jest/globals';
import feedSlice, { fetchFeed, initialState } from './feed';

describe('feedSlice reducer', () => {
  const mockOrders = [
    {
      _id: '123',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 5,
      ingredients: []
    }
  ];

  test('должен обработать fetchFeed.pending', () => {
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('должен обработать fetchFeed.fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: mockOrders,
      total: 10,
      totalToday: 2
    };
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.fulfilled(mockResponse, '', undefined)
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.orders).toEqual(mockResponse.orders);
    expect(nextState.total).toBe(mockResponse.total);
    expect(nextState.totalToday).toBe(mockResponse.totalToday);
    expect(nextState.error).toBeNull();
  });

  test('должен обработать fetchFeed.rejected', () => {
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.rejected(null, '', undefined, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки ленты заказов');
  });
});
