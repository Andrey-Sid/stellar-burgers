import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi, registerUserApi, TRegisterData } from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../../utils/cookie';
import { login } from '../login/login';

type TProfileState = {
  isError: boolean;
};
export const initialState: TProfileState = {
  isError: false
};

export const register = createAsyncThunk('profile/register', registerUserApi);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  selectors: {
    selectIsError: (sliceState) => sliceState.isError
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isError = false;
      })
      .addCase(register.rejected, (state) => {
        state.isError = true;
      });
  }
});

export default registerSlice;
