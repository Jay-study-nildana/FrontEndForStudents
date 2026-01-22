import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Apod } from './types';

// All favorites as an array (most-recent insertion order is not tracked; keys are by date)
export const selectFavoritesArray = (state: RootState): Apod[] =>
  Object.values(state.apod.favorites);

// Is a specific date favorited
export const selectIsFavorite = (state: RootState, date?: string) =>
  !!(date && state.apod.favorites[date]);

// Simple selector for history
export const selectHistory = (state: RootState) => state.apod.history;

// Example derived selector: favorite titles (memoized)
export const selectFavoriteTitles = createSelector([selectFavoritesArray], (favorites) =>
  favorites.map((f) => `${f.title} (${f.date})`),
);