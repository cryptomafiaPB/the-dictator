import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function EditorDashboard() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    redirect("/sign-in");
  }

  const articles = await prisma.article.findMany({
    where: { authorId: dbUser.id },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editor Dashboard</h1>
      <Link href="/editor/create">
        <Button>Create New Article</Button>
      </Link>
      <div className="mt-4 space-y-4">
        {articles.map((article: any) => (
          <div key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p>{article.content.substring(0, 100)}...</p>
            <div className="mt-2 space-x-2">
              <Link href={`/editor/edit/${article.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              {article.published ? (
                <span className="text-green-500">Published</span>
              ) : (
                <span className="text-yellow-500">Draft</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
