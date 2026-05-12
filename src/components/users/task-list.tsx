"use client";

import { useState } from "react";

import { Todo } from "@/types/todo";

type Props = {
  todos: Todo[];
};

export default function TaskList({
  todos,
}: Props) {
  const [visibleCount, setVisibleCount] =
    useState(5);

  const visibleTodos =
    todos.slice(0, visibleCount);

  return (
    <div className="space-y-3">
      {visibleTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-start justify-between rounded-2xl bg-gray-50 p-4 transition hover:bg-gray-100"
        >
          <p className="pr-4 text-gray-900">
            {todo.title}
          </p>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              todo.completed
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {todo.completed
              ? "Done"
              : "Pending"}
          </span>
        </div>
      ))}

      {todos.length > 5 && (
        <button
          onClick={() => {
            if (
              visibleCount >=
              todos.length
            ) {
              setVisibleCount(5);
            } else {
              setVisibleCount(
                todos.length,
              );
            }
          }}
          className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          {visibleCount >= todos.length
            ? "Show less"
            : "Show more"}
        </button>
      )}
    </div>
  );
}