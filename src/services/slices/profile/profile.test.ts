import { describe, expect, test } from '@jest/globals';
import profileSlice, { getUser, logout, update } from './profile';
import { initialState } from './profile';
import { login } from '../login/login';
import { register } from '../register/register';

describe('profileSlice reducer', () => {
  beforeEach(() => {
    if (!global.localStorage) {
      global.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      } as any;
    }

    if (!global.document) {
      global.document = {} as any;
    }
  });

  const mockUser = {
    email: '',
    name: ''
  };

  const loginData = {
    email: '',
    password: ''
  };

  const mockUserResponse = {
    success: true,
    user: mockUser
  };

  const mockUserData = {
    success: true,
    user: {
      email: 'test@example.com',
      name: 'Test User'
    },
    accessToken: 'access-token',
    refreshToken: 'refresh-token'
  };

  const registerData = {
    email: '',
    name: '',
    password: ''
  };

  test('должен обработать getUser.pending', () => {
    const nextState = profileSlice.reducer(
      initialState,
      getUser.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать getUser.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      getUser.fulfilled(mockUserResponse, '', undefined)
    );

    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать getUser.rejected', () => {
    const nextState = profileSlice.reducer(
      initialState,
      getUser.rejected(null, '', undefined, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  // register

  test('должен обработать register.pending', () => {
    const nextState = profileSlice.reducer(
      initialState,
      register.pending('', registerData)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать register.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      register.fulfilled(mockUserData, '', registerData)
    );
    expect(nextState.user).toEqual(mockUserData.user);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать register.rejected', () => {
    const nextState = profileSlice.reducer(
      initialState,
      register.rejected(null, '', registerData, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  // logout

  test('должен обработать logout.pending', () => {
    const nextState = profileSlice.reducer(
      initialState,
      logout.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать logout.fulfilled', () => {
    let userState = {
      isLoading: true,
      user: mockUser
    };

    const nextState = profileSlice.reducer(
      userState,
      logout.fulfilled(mockUserResponse, '', undefined)
    );

    expect(nextState.user).toEqual(null);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать logout.rejected', () => {
    const nextState = profileSlice.reducer(
      initialState,
      logout.rejected(null, '', undefined, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  // login
  test('должен обработать login.pending', () => {
    const nextState = profileSlice.reducer(
      initialState,
      login.pending('', loginData, undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать login.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      login.fulfilled(mockUserData, '', loginData)
    );
    expect(nextState.user).toEqual(mockUserData.user);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать login.rejected', () => {
    const nextState = profileSlice.reducer(
      initialState,
      login.rejected(null, '', loginData, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });

  // update

  test('должен обработать update.pending', () => {
    const nextState = profileSlice.reducer(
      initialState,
      update.pending('', loginData, undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать update.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      update.fulfilled(mockUserData, '', loginData)
    );
    expect(nextState.user).toEqual(mockUserData.user);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать update.rejected', () => {
    const nextState = profileSlice.reducer(
      initialState,
      update.rejected(null, '', loginData, 'Ошибка загрузки')
    );
    expect(nextState.isLoading).toBe(false);
  });
});
