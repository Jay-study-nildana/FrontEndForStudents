import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Apod } from './types';

interface ApodLocalState {
  favorites: Record<string, Apod>; // keyed by date
  history: string[]; // most-recent-first list of viewed dates
  settings: {
    showHdLink: boolean;
  };
}

const initialState: ApodLocalState = {
  favorites: {},
  history: [],
  settings: {
    showHdLink: true,
  },
};

const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Apod>) {
      state.favorites[action.payload.date] = action.payload;
    },
    removeFavorite(state, action: PayloadAction<string>) {
      delete state.favorites[action.payload];
    },
    toggleFavorite(state, action: PayloadAction<Apod>) {
      const date = action.payload.date;
      if (state.favorites[date]) delete state.favorites[date];
      else state.favorites[date] = action.payload;
    },
    addHistory(state, action: PayloadAction<string>) {
      const date = action.payload;
      // remove existing occurrence
      state.history = state.history.filter((d) => d !== date);
      // keep a reasonable history length, e.g. 50
      state.history.unshift(date);
      state.history = state.history.slice(0, 50);
    },
    clearHistory(state) {
      state.history = [];
    },
    setShowHdLink(state, action: PayloadAction<boolean>) {
      state.settings.showHdLink = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  addHistory,
  clearHistory,
  setShowHdLink,
} = apodSlice.actions;

export default apodSlice.reducer;