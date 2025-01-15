import prisma from "@/lib/prisma";
import ArticleFilters from "@/components/ArticleFilters";
import Link from "next/link";
import { Article } from "@prisma/client";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { category: string; tag: string };
}) {
  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      AND: [
        searchParams.category
          ? { categories: { some: { name: searchParams.category } } }
          : {},
        searchParams.tag ? { tags: { some: { name: searchParams.tag } } } : {},
      ],
    },
    include: {
      categories: true,
      tags: true,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ArticleFilters categories={categories} tags={tags} />
        </div>
        <div className="md:col-span-3">
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article: any) => (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.id}
                  className="border p-4 rounded cursor-pointer"
                >
                  <h2 className="text-xl font-bold">{article.title}</h2>
                  <p>{article.content.substring(0, 200)}...</p>
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">
                      Categories:{" "}
                      {article.categories.map((c: any) => c.name).join(", ")}
                    </span>
                    <span className="text-sm text-gray-600 ml-4">
                      Tags: {article.tags.map((t: any) => t.name).join(", ")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
