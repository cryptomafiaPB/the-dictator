import { NewsContent } from "@/components/news-content";
import ArticlesPage from "./articles/page";
import prisma from "@/lib/prisma";

export default async function Home() {
  const latest = await prisma.article.findMany({
    where: {
      published: true,
      // old articles don't have a status field
      // status: "published",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return (
    <div className="w-full bg-[url('/noise-light.svg')]">
      {/* <ArticlesPage searchParams={{ category: "", tag: "" }} />
       */}
      <NewsContent latest={latest} />
    </div>
  );
}
