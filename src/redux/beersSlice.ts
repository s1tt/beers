import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { beersApi } from '.';
import { Beer } from '../types/beer';
import { LS_FAV_KEY, LS_LIST_KEY } from '../utils/constants';

interface IBeersState {
  favorites: Beer[];
  beerList: Beer[];
  searchQueryGlobal: string;
}

const initialState: IBeersState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
  beerList: JSON.parse(localStorage.getItem(LS_LIST_KEY) ?? '[]'),
  searchQueryGlobal: ''
};

export const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    addToFavorite(state, action: PayloadAction<Beer>) {
      state.favorites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
    removeFromFavorite(state, action: PayloadAction<Beer>) {
      state.favorites = state.favorites.filter(
        beer => beer.id !== action.payload.id
      );
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
    setBeerList(state, action: PayloadAction<Beer[]>) {
      state.beerList = action.payload;
    },
    setSearchQueryGlobal(state, action: PayloadAction<string>) {
      state.searchQueryGlobal = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      beersApi.endpoints.getBeers.matchFulfilled,
      (state, action) => {
        state.beerList = [...state.beerList, ...action.payload];
      }
    );
  }
});

export const beersActions = beersSlice.actions;
export const beersReducer = beersSlice.reducer;
