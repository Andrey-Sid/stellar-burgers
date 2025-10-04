import { describe, expect, test } from '@jest/globals';
import orderSlice, {
  clearPlacedOrderData,
  fetchOrderByNumber,
  fetchOrders,
  initialState,
  placeOrder
} from './order';

const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'Order 1',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 123,
  ingredients: []
};

const mockOrders = [mockOrder];

describe('orderSlice reducer', () => {
  test('тест clearPlacedOrderData', () => {
    const initialStateOrder = {
      orders: mockOrders,
      orderData: null,
      placedOrderData: mockOrder,
      orderRequest: false
    };
    const newState = orderSlice.reducer(
      initialStateOrder,
      clearPlacedOrderData()
    );
    expect(newState.placedOrderData).toBeNull();
    expect(newState.orders).toEqual(mockOrders);
  });

  test('должен обработать fetchOrders.pending', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrders.pending('', undefined)
    );
    expect(nextState.orderRequest).toBe(true);
  });

  test('должен обработать fetchOrders.fulfilled', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(nextState.orders).toEqual(mockOrders);
    expect(nextState.orderRequest).toBe(false);
  });

  test('должен обработать fetchOrders.rejected', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrders.rejected(null, '', undefined, 'Ошибка загрузки')
    );
    expect(nextState.orderRequest).toBe(false);
  });

  test('должен обработать fetchOrderByNumber.pending', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.pending('', 1)
    );
    expect(nextState.orderRequest).toBe(true);
  });

  test('должен обработать fetchOrderByNumber.fulfilled', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.fulfilled(mockOrder, '', 1)
    );

    expect(nextState.orderData).toEqual(mockOrder);
    expect(nextState.orderRequest).toBe(false);
  });

  test('должен обработать fetchOrderByNumber.rejected', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.rejected(null, '', 1, 'Ошибка загрузки')
    );
    expect(nextState.orderRequest).toBe(false);
  });

  test('должен обработать placeOrder.pending', () => {
    const nextState = orderSlice.reducer(
      initialState,
      placeOrder.pending('', [])
    );
    expect(nextState.orderRequest).toBe(true);
  });

  test('должен обработать placeOrder.fulfilled', () => {
    const nextState = orderSlice.reducer(
      initialState,
      placeOrder.fulfilled(mockOrder, '', [])
    );

    expect(nextState.placedOrderData).toEqual(mockOrder);
    expect(nextState.orderRequest).toBe(false);
  });

  test('должен обработать placeOrder.rejected', () => {
    const nextState = orderSlice.reducer(
      initialState,
      placeOrder.rejected(null, '', [], 'Ошибка загрузки')
    );
    expect(nextState.orderRequest).toBe(false);
  });
});
