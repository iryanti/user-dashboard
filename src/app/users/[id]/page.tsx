import { getUserById } from "@/services/user-services";
import Link from "next/link";
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const user = await getUserById(id);

  return {
    title: `${user.name} | User Detail`,
  };
}


export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUserById(id);

  return (
    <main className="space-y-4 p-6">
      <Link href="/users" className="text-sm text-blue-600 hover:underline">
        ← Back to users
      </Link>
      <h1 className="text-2xl font-bold">{user.name}</h1>

      <p>Email: {user.email}</p>

      <p>Phone: {user.phone}</p>

      <p>Website: {user.website}</p>

      <p>Company: {user.company.name}</p>
    </main>
  );
}
