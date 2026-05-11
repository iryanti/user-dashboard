"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user-services";
import UserTable from "./user-table";

export default function UsersList() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Failed to load users.</p>;
  }

  return (
    <div>
      <UserTable users={users ?? []} />
    </div>
  );
}
