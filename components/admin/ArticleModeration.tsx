/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { Article } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Article } from "@/types";

const ArticleModeration = () => {
  const [articles, setArticles] = useState<Article[]>();
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const res = await fetch("/api/articles");
    const data = await res.json();
    setArticles(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleArticleApproval = async (articleId: string, status: string) => {
    const res = await fetch("/api/articles/moderation", {
      method: "PUT",
      body: JSON.stringify({ articleId, status }),
    });
    const data = await res.json();
    alert(`Article ${status === "approve" ? "approved" : "rejected"}`);
    fetchArticles();
  };

  if (loading)
    return (
      <div className="h-96 w-full">
        {/* <Selection className=" h-1/2 w-full  mb-4"></Selection> */}
        <Skeleton className=" h-6 w-ful mb-4 rounded-full"></Skeleton>
        <Skeleton className=" h-6 w-ful mb-4  rounded-full"></Skeleton>
        <Skeleton className=" h-20 w-ful mb-4   rounded "></Skeleton>
        <Skeleton className=" h-6 w-ful mb-4 rounded-full"></Skeleton>
        <Skeleton className=" h-6 w-ful mb-4  rounded-full"></Skeleton>
        {/* <Skeleton className=" h-6 w-ful mb-4   rounded-full "></Skeleton> */}
      </div>
    );

  return (
    <div
      className="p-4 bg-white border rounded-lg shadow-md max-h-[560px] overflow-x-scroll"
      style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <h2 className="text-xl font-semibold mb-4">Article Moderation</h2>
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 border-b">
          {Array.isArray(articles) &&
            articles.map((article: any) => (
              <tr className="border-b border-gray-200" key={article.id}>
                <td className={`py-2 px-4`}>
                  <span className="lg:hidden">
                    {article.title.slice(0, 25)}...
                  </span>
                  <span className="hidden lg:block">{article.title}</span>
                </td>
                <td className="py-2 px-4">
                  {article.published ? "Approved" : "Pending"}
                </td>
                <td className="py-2 px-4">
                  {article.published ? (
                    <button
                      onClick={() =>
                        handleArticleApproval(article.id, "reject")
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleArticleApproval(article.id, "approve")
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleModeration;
