import UsersList from "@/components/users/users-list";
import { Suspense } from "react";
export default function UsersPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UsersList />
    </Suspense>
  );
}
