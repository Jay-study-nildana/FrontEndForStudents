export interface Post {
  id: number | string; // string for temporary optimistic ids
  userId?: number;
  title: string;
  body: string;
}