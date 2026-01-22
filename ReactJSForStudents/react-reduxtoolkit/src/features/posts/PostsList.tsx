import  { useState } from 'react';
import { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } from './postsApi';
import { selectMergedPosts } from './selectors';
import { useAppSelector } from '../../app/hooks';

export default function PostsList() {
  // RTK Query hook: keeps loading / caching / polling etc.
  const { data: _unused, error, isLoading } = useGetPostsQuery();
  // We use a memoized selector to combine server posts + local drafts
  const posts = useAppSelector(selectMergedPosts);

  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function handleAdd() {
    if (!title.trim()) return;
    // Trigger mutation — optimistic update handled in postsApi.onQueryStarted
    await addPost({ title, body, userId: 1 }).unwrap();
    setTitle('');
    setBody('');
  }

  async function handleDelete(id: number | string) {
    // If id is a temp optimistic id (string), you might want to just remove locally,
    // but this demonstrates a delete mutation that will optimistically remove from cache.
    await deletePost(Number(id)).unwrap().catch(() => {
      // handle failure if any (rollback is handled in onQueryStarted)
    });
  }

  if (isLoading) return <div>Loading posts…</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <h2>Posts</h2>

      <div style={{ marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: 300 }}
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          style={{ width: 300, marginLeft: 8 }}
        />
        <button onClick={handleAdd} style={{ marginLeft: 8 }}>
          Add post (optimistic)
        </button>
      </div>

      <ul>
        {posts.slice(0, 20).map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> — <span>{p.body}</span>{' '}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
            {String(p.id).startsWith('temp-') ? <em> (pending)</em> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}