import { describe, expect, test } from '@jest/globals';

import registerSlice, { register } from './register';
import { initialState } from './register';

describe('profileSlice reducer', () => {
  const registerData = {
    email: '',
    name: '',
    password: ''
  };

  test('должен обработать registerSlice.pending', () => {
    const nextState = registerSlice.reducer(
      initialState,
      register.pending('', registerData)
    );
    expect(nextState.isError).toBe(false);
  });

  test('должен обработать registerSlice.rejected', () => {
    const nextState = registerSlice.reducer(
      initialState,
      register.rejected(null, '', registerData, 'Ошибка загрузки')
    );
    expect(nextState.isError).toBe(true);
  });
});
