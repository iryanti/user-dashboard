"use client";

import { User } from "@/types/user";
import { useRouter } from "next/navigation";

type Props = {
  users: User[];
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
