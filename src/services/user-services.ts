import { User } from '@/types/user';

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