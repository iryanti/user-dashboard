"use client";

import { UserWithStats } from "@/types/user";
import { useRouter } from "next/navigation";

type Props = {
  users: UserWithStats[];
};

export default function UserTable({ users }: Props) {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Website</th>
            <th className="p-3">Posts</th>
            <th className="p-3">Completed</th>
            <th className="p-3">Pending</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="cursor-pointer border-t hover:bg-gray-50"
              onClick={() => router.push(`/users/${user.id}`)}
            >
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.website}</td>
              <td className="p-3">{user.totalPosts}</td>
              <td className="p-3">{user.completedCount}</td>
              <td className="p-3">{user.pendingTodos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
