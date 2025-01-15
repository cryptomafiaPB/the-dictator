/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
        {
          categories: {
            some: { name: { contains: query, mode: "insensitive" } },
          },
        },
        { tags: { some: { name: { contains: query, mode: "insensitive" } } } },
      ],
      published: true,
    },
    include: {
      categories: true,
      tags: true,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for &quot;{query}&quot;
      </h1>
      {articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((article: any) => (
            <div key={article.id} className="border p-4 rounded">
              <h2 className="text-xl font-bold">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h2>
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
            </div>
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}
