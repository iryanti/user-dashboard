"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getPostsByUser } from "@/services/user-services";

const POSTS_LIMIT = 5;

type Props = {
  userId: string;
};

export default function PostList({ userId }: Props) {
  const [page, setPage] = useState(1);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", userId, page],
    queryFn: () => getPostsByUser(userId, page, POSTS_LIMIT),
  });

  const hasNextPage = posts?.length === POSTS_LIMIT;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (isError || !posts) {
    return <p>Failed to load posts.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {posts.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-2xl bg-gray-50">
            <p className="text-gray-500">No posts found.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl bg-gray-50 p-4 transition hover:bg-gray-100"
            >
              <p className="font-medium text-gray-900">{post.title}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <p className="text-sm text-gray-500">Page {page}</p>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
