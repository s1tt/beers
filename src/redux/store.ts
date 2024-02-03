import { configureStore } from '@reduxjs/toolkit';
import { beersReducer } from './beersSlice';
import { beersApi } from './index';

export const store = configureStore({
  reducer: {
    [beersApi.reducerPath]: beersApi.reducer,
    beers: beersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(beersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
