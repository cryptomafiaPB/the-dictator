import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <p className="mt-1">{dbUser.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <p className="mt-1">{dbUser.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <p className="mt-1">{dbUser.role}</p>
        </div>
        {dbUser?.role === "admin" && (
          <Link href="/admin/dashboard">
            <Button>Go to Admin Dashboard</Button>
          </Link>
        )}
        {dbUser?.role === "editor" && (
          <Link href="/editor/dashboard">
            <Button>Go to Editor Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
