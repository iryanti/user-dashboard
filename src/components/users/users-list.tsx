"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers, getPosts, getTodos } from "@/services/user-services";
import UserTable from "./user-table";
import { useState, useMemo } from "react";
import { UserWithStats } from "@/types/user";
import { useSearchParams, useRouter } from "next/navigation";

export default function UsersList() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const search = searchParams.get("search") ?? "";
  const [sortBy, setSortBy] = useState("name");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const {
    data: todos,
    isLoading: isTodosLoading,
    isError: isTodosError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const usersWithStats = useMemo<UserWithStats[]>(() => {
    if (!users || !posts || !todos) {
      return [];
    }

    return users.map((user) => {
      const postsByUser = posts.filter((post) => post.userId === user.id);
      const todosByUser = todos.filter((todo) => todo.userId === user.id);
      const completedCount = todosByUser.filter(
        (todo) => todo.completed
      ).length;

      return {
        ...user,
        totalPosts: postsByUser.length,
        completedCount,
        pendingTodos: todosByUser.length - completedCount,
      };
    });
  }, [users, posts, todos]);

  const filteredUsers = usersWithStats
    .filter((user) => {
      const keyword = search.toLowerCase();

      return (
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
      );
    })
    .sort((a, b) => {
      if (sortBy === "posts") {
        return b.totalPosts - a.totalPosts;
      }

      return a.name.localeCompare(b.name);
    });

  if (isLoading || isPostsLoading || isTodosLoading) {
    return <p>Loading...</p>;
  }

  if (isError || isPostsError || isTodosError) {
    return <p>Failed to load data.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(event) => {
            const value = event.target.value;

            router.push(`/users?search=${value}`);
          }}
          className="w-full rounded border px-3 py-2"
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="name">Sort by Name</option>
          <option value="posts">Sort by Posts</option>
        </select>
      </div>

      <UserTable users={filteredUsers} search={search} />
    </div>
  );
}
