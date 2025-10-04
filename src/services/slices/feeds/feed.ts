import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  orders: TOrder[];
  error: string | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
};

export const initialState: TFeedState = {
  orders: [],
  error: null,
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const fetchFeed = createAsyncThunk<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>('orders/fetchFeed', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки ленты заказов';
      });
  }
});

export const {} = feedSlice.actions;

export const { selectOrders, selectTotal, selectTotalToday, selectIsLoading } =
  feedSlice.selectors;

export default feedSlice;
