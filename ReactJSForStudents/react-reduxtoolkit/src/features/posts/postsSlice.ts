import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from './types';

const draftsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => String(a.id).localeCompare(String(b.id)),
});

type PostsRootState = {
  posts: ReturnType<typeof draftsAdapter.getInitialState>;
};

export const draftsSelectors = draftsAdapter.getSelectors<PostsRootState>((state) => state.posts);

// Local state slice used for drafts/offline edits
const postsSlice = createSlice({
  name: 'posts',
  initialState: draftsAdapter.getInitialState({
    // track UI metadata
    syncQueue: [] as string[], // ids of posts to sync
  }),
  reducers: {
    addDraft: draftsAdapter.addOne,
    upsertDraft: draftsAdapter.upsertOne,
    removeDraft: draftsAdapter.removeOne,
    markToSync(state, action: PayloadAction<string>) {
      if (!state.syncQueue.includes(action.payload)) state.syncQueue.push(action.payload);
    },
    clearSyncQueue(state) {
      state.syncQueue = [];
    },
    // optional: bulk upsert (e.g., when rehydrating)
    upsertManyDrafts: draftsAdapter.upsertMany,
  },
});

export const { addDraft, upsertDraft, removeDraft, markToSync, clearSyncQueue, upsertManyDrafts } =
  postsSlice.actions;

export default postsSlice.reducer;

// Type import for selector helper (not required here)