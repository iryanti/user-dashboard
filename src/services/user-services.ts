import { User } from "@/types/user";
import { Post } from "@/types/post";
import { Todo } from "@/types/todo";

export async function getUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getUserById(id: string): Promise<User | null> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!response.ok) {
    return null;
  }

  const user = await response.json();

  if (!user.id) {
    return null;
  }

  return user;
}
export async function getPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getPostsByUser(
  userId: string,
  page = 1,
  limit = 5
): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getTodosByUser(userId: string): Promise<Todo[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}
