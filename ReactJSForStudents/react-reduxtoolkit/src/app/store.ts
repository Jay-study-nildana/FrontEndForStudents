import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { postsApi } from '../features/posts/postsApi';
import postsSlice from '../features/posts/postsSlice';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { apodApi } from '../features/apod/apodApi';
import apodSlice from '../features/apod/apodSlice';

const listener = createListenerMiddleware();

// Example listener: use a predicate to match actions (was using invalid actionCreator signature)
listener.startListening({
  // Predicate matcher is the correct overload when inspecting arbitrary actions
  predicate: (_action) => {
    // Example: match all actions — narrow this to specific action types in real code
    return true;
  },
  effect: async (action, listenerApi) => {
    // No-op default; real listeners would react to matched actions here
    console.log('[listener] matched action type:', (action as any).type);
    console.log('[listener] current state:', listenerApi.getState());
  },
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    posts: postsSlice,
    auth: authReducer,
    [apodApi.reducerPath]: apodApi.reducer,
    apod: apodSlice,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware).concat(apodApi.middleware).prepend(listener.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;