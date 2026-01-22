// ...existing code...
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

// Module-load logs to illustrate Redux slice setup
console.log('[counterSlice] module load — initializing slice for "counter"');
console.log('[counterSlice] initialState:', JSON.stringify(initialState));

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      // Log before mutation (copy to show "previous" state)
      const prev = { value: state.value };
      console.log('[counterSlice][reducer] increment() called');
      console.log('[counterSlice][reducer] prev state:', prev);

      // Immer-powered mutation
      state.value += 1;

      // Log after mutation
      console.log('[counterSlice][reducer] new state after increment:', { value: state.value });
      console.log('[counterSlice] Redux note: reducers should be pure; createSlice uses Immer to allow mutable syntax safely.');
    },
    decrement(state) {
      const prev = { value: state.value };
      console.log('[counterSlice][reducer] decrement() called');
      console.log('[counterSlice][reducer] prev state:', prev);

      state.value -= 1;

      console.log('[counterSlice][reducer] new state after decrement:', { value: state.value });
      console.log('[counterSlice] Redux note: actions describe "what happened"; reducers compute next state from previous state + action.');
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      const prev = { value: state.value };
      console.log('[counterSlice][reducer] incrementByAmount() called');
      console.log('[counterSlice][reducer] prev state:', prev, 'payload:', action.payload);

      state.value += action.payload;

      console.log('[counterSlice][reducer] new state after incrementByAmount:', { value: state.value });
      console.log('[counterSlice] Redux pattern: action.payload used to carry data into reducers.');
    },
  },
});

// Log slice metadata to illustrate what's exported
console.log('[counterSlice] created slice name:', counterSlice.name);
console.log('[counterSlice] available action creators:', Object.keys(counterSlice.actions));
console.log('[counterSlice] reducer ready to be added to the store (exported as default).');

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
// ...existing code...