import {
  getPostsByUser,
  getTodosByUser,
  getUserById,
} from "@/services/user-services";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name} | User Detail`,
  };
}

export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const { id } = await params;
  const { search } = await searchParams;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  const [posts, todos] = await Promise.all([
    getPostsByUser(id),
    getTodosByUser(id),
  ]);

  return (
    <main className="space-y-4 p-6">
      <Link
        href={search ? `/users?search=${search}` : "/users"}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to users
      </Link>
      <h1 className="text-2xl font-bold">{user.name}</h1>

      <p>Email: {user.email}</p>

      <p>Phone: {user.phone}</p>

      <p>Website: {user.website}</p>

      <p>Company: {user.company.name}</p>

      <div>
        <h2 className="mb-2 text-xl font-bold">Posts</h2>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="rounded border p-3">
              <p className="font-medium">{post.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">Tasks</h2>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="rounded border p-3">
              <p>{todo.title}</p>

              <p className="text-sm text-gray-500">
                {todo.completed ? "Completed" : "Pending"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
