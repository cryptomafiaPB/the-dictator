import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ArticleEditor from "@/components/ArticleEditor";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export default async function CreateArticlePage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const category = await prisma.category.findMany();
  const tag = await prisma.tag.findMany();

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    redirect("/sign-in");
  }

  const handleSave = async (
    content: string,
    title: string,
    categories: string[],
    tags: string[]
  ) => {
    "use server";
    const article = await prisma.article.create({
      data: {
        title: title, // Replace with actual title
        content,
        categoriesIDs: categories.map((id) => id),
        tagsIDs: tags.map((id) => id),
        slug: slugify(title), // Generate a unique slug
        authorId: dbUser.id,
      },
    });

    await prisma.category.update({
      where: { id: categories[0] },
      data: { articlesIDs: { push: [article.id] } },
    });

    await prisma.tag.update({
      where: { id: tags[0] },
      data: { articlesIDs: { push: [article.id] } },
    });

    redirect("/editor");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Article</h1>
      <ArticleEditor
        onSave={handleSave}
        initialContent={undefined}
        categories={category}
        tags={tag}
      />
    </div>
  );
}
