import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { registerService, loginService, logoutService, getCurrentSession } from './authService';

export interface AuthUser {
  id: string;
  username: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const session = getCurrentSession();

const initialState: AuthState = {
  user: session ? session.user : null,
  token: session ? session.token : null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await registerService(payload.username, payload.password);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await loginService(payload.username, payload.password);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutService();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    // optionally allow setting user/token (useful for tests / rehydration)
    setAuth(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = 'succeeded';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Registration failed';
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Login failed';
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { clearError, setAuth } = authSlice.actions;
export default authSlice.reducer;