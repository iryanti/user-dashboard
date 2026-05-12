import {
  getTodosByUser,
  getUserById,
} from "@/services/user-services";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostList from "@/components/users/post-list";
import TaskList from "@/components/users/task-list";
import UserOverviewCard from "@/components/users/user-overview-card";

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

  const todos = await getTodosByUser(id);

  const completedTasks = todos.filter((todo) => todo.completed).length;

  const pendingTasks = todos.length - completedTasks;

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      <Link
        href={search ? `/?search=${search}` : "/"}
        className="inline-flex text-sm font-medium text-gray-500 transition hover:text-gray-900"
      >
        ← Back
      </Link>

      <UserOverviewCard
        name={user.name}
        email={user.email}
        company={user.company.name}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <section className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 xl:min-h-[600px]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
          </div>

          <PostList userId={id} />
        </div>

        <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 xl:min-h-[600px]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Tasks</h2>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
              {todos.length}
            </span>
          </div>

          <TaskList todos={todos} />
        </div>
      </section>
    </main>
  );
}
