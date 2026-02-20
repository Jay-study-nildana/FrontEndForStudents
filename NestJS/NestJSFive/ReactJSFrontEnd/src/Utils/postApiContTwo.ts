export async function fetchPosts(apiUrl: string) {
  const response = await fetch(`${apiUrl}/posts?page=1&limit=10`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || response.statusText);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function addPost(
  apiUrl: string,
  post: { title: string; content: string; published: boolean },
) {
  const response = await fetch(`${apiUrl}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || response.statusText);
  }
  return await response.json();
}

export async function updatePost(
  apiUrl: string,
  id: string,
  post: { title: string; content: string; published: boolean },
) {
  const response = await fetch(`${apiUrl}/posts/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || response.statusText);
  }
  return await response.json();
}

export async function deletePost(apiUrl: string, id: string) {
  const response = await fetch(`${apiUrl}/posts/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || response.statusText);
  }
  return await response.json();
}
