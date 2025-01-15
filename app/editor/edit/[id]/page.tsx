import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ArticleEditor from "@/components/ArticleEditor";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import slugify from "slugify";

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
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

  const article = await prisma.article.findUnique({
    where: { id: params.id, authorId: dbUser.id },
  });

  if (!article) {
    redirect("/editor");
  }

  const handleSave = async (
    content: string,
    title: string,
    categories: string[],
    tags: string[],
    image?: string
  ) => {
    "use server";

    const articles = await prisma.article.update({
      where: { id: params.id },
      data: {
        title: title, // Keep the existing title or allow editing
        content,
        image,
        slug: slugify(title), // change the slug to the new title
        published: article.published, // Keep the existing published status
        categoriesIDs: categories,
        tagsIDs: tags,
      },
    });

    await prisma.category.update({
      where: { id: categories[0] },
      data: { articlesIDs: { push: [articles.id] } },
    });

    await prisma.tag.update({
      where: { id: tags[0] },
      data: { articlesIDs: { push: [articles.id] } },
    });

    redirect("/editor");
  };

  const handlePublish = async () => {
    "use server";

    await prisma.article.update({
      where: { id: params.id },
      data: { published: true },
    });

    redirect("/editor");
  };

  const handleUnpublish = async () => {
    "use server";

    await prisma.article.update({
      where: { id: params.id },
      data: { published: false },
    });

    redirect("/editor");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <ArticleEditor
        onSave={handleSave}
        initialContent={article}
        categories={categories}
        tags={tags}
      />
      <div className="mt-4">
        {article.published ? (
          <form action={handleUnpublish}>
            <Button variant="destructive">Unpublish</Button>
          </form>
        ) : (
          <form action={handlePublish}>
            <Button>Publish</Button>
          </form>
        )}
      </div>
    </div>
  );
}
