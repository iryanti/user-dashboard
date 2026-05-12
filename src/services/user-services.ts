import { User } from '@/types/user';
import { Post } from '@/types/post';
import { Todo }  from '@/types/todo';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function getUserById(
  id: string,
): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}


export async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}


export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}


