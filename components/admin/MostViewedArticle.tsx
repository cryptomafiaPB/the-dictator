"use client";

import { Article } from "@prisma/client";
import { useEffect, useState } from "react";

const MostViewedArticles = () => {
  const [articles, setArticles] = useState<Article[]>();

  const fetchData = async () => {
    const res = await fetch("/api/analytics");
    const { mostViewedArticles } = await res.json();
    setArticles(mostViewedArticles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Top 5 Most Viewed Articles</h2>
      <ul className="space-y-2 gap-2 flex flex-col">
        {articles &&
          articles.map((article, index) => (
            <li key={index} className="flex justify-between">
              <span className="inline-flex space-x-2 gap-1">
                <span className="">{(index + 1).toString()}.</span>
                <span className="hidden lg:block">
                  {article.title.slice(0, 25)}...
                </span>
              </span>
              <span className="font-bold">{article.views} views</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MostViewedArticles;
