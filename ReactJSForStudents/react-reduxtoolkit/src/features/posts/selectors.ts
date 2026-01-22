import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { postsApi } from './postsApi';
import { draftsSelectors } from './postsSlice';
import type { Post } from './types';

// Combine RTK Query server data and local drafts so UI shows merged view.
// Priority: local draft (same id) overrides server value.
export const selectMergedPosts = createSelector(
  (state: unknown) => postsApi.endpoints.getPosts.select()(state as any)?.data ?? [],
  (state: RootState) => draftsSelectors.selectAll(state as any),
  (serverPosts: Post[], drafts: Post[]) => {
    const draftById = new Map<string | number, Post>();
    drafts.forEach((d) => draftById.set(d.id, d));
    const merged = serverPosts.map((p) => draftById.get(p.id) ?? p);
    // include drafts that don't exist on server (e.g., temp optimistic posts)
    drafts.forEach((d) => {
      if (!merged.find((m) => m.id === d.id)) merged.unshift(d);
    });
    return merged;
  },
);