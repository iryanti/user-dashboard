"use client";

import { UserWithStats } from "@/types/user";
import { useRouter } from "next/navigation";

type Props = {
  users: UserWithStats[];
  search: string;
};

export default function UserTable({ users, search }: Props) {
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Website
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Posts
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Completed
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Pending
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() =>
                    router.push(
                      search
                        ? `/users/${user.id}?search=${search}`
                        : `/users/${user.id}`
                    )
                  }
                  className="cursor-pointer border-t border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{user.email}</td>

                  <td className="px-6 py-4 text-gray-600">{user.website}</td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                      {user.totalPosts}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                      {user.completedCount}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
                      {user.pendingTodos}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
