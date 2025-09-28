import { describe, expect, test } from '@jest/globals';
import loginSlice, { initialState, login } from './login';

const mockLoginRequest = {
  success: true,
  email: 'email',
  password: 'password'
};

describe('loginSlice reducer', () => {
  test('должен обработать login.pending', () => {
    const nextState = loginSlice.reducer(
      initialState,
      login.pending('', mockLoginRequest)
    );
    expect(nextState.isError).toBe(false);
  });

  test('должен обработать login.rejected', () => {
    const nextState = loginSlice.reducer(
      initialState,
      login.rejected(null, '', mockLoginRequest, undefined)
    );
    expect(nextState.isError).toBe(true);
  });
});
