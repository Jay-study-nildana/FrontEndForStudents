import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post } from './types';
import { nanoid } from '@reduxjs/toolkit';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    // GET /posts
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id: id })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),

    // POST /posts  (with optimistic update)
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      // Invalidate list so queries re-fetch when mutation completes successfully
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],

      // Optimistic update example using onQueryStarted + updateQueryData
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Create a temporary post with a client-side id
        const tempId = `temp-${nanoid()}`;
        const optimisticPost: Post = {
          id: tempId,
          title: arg.title ?? 'Untitled',
          body: arg.body ?? '',
          userId: arg.userId,
        };

        // Immediately update the getPosts cache to show the new post
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
            // insert at top
            draft.unshift(optimisticPost);
          }),
        );

        try {
          const { data: returned } = await queryFulfilled;
          // On success: update cache entries to replace tempId with server id
          dispatch(
            postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
              const idx = draft.findIndex((p) => p.id === tempId);
              if (idx !== -1) {
                draft[idx] = returned;
              } else {
                // fallback: unshift returned
                draft.unshift(returned);
              }
            }),
          );
        } catch (err) {
          // rollback optimistic update on failure
          patchResult.undo();
        }
      },
    }),

    // DELETE /posts/:id (example of optimistic removal)
    deletePost: build.mutation<{}, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      // Optimistically remove from cache
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
            const idx = draft.findIndex((p) => p.id === id);
            if (idx !== -1) draft.splice(idx, 1);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } = postsApi;