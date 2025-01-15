"use client";
import { Article } from "@prisma/client";
import Link from "next/link";

export default function ArticleList({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) {
    return (
      <div>
        {/* Loader */}
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  // Ensure dates are formatted consistently
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().slice(0, 10);
  };

  return (
    // <div className="md:col-span-3 bg-foggy-grey p-4 rounded-bl-xl">
    //   <div className="space-y-6">
    //     <div className="flex flex-col space-y-4">
    //       {/* <div> */}
    //       <div className="text-lg font-semibold flex items-center">
    //         <h3 className="text-lg my-2 font-semibold">Popular Article Now</h3>
    //         <div className="ml-2 text-xs font-semibold text-orange-500 border-[1px] rounded-full border-gray-400 px-2 py-0.5 ">
    //           5 New
    //         </div>
    //       </div>
    //       {/* </div> */}
    //       <hr className="border-dark-grey border-[1px] mt-0" />
    //     </div>
    //     {articles.map((article, index) => (
    //       <div key={index} className="flex items-start space-x-4">
    //         <div className="flex flex-col h-full">
    //           <div className="text-2xl font-bold text-muted-foreground">
    //             {String(index + 1).padStart(2, "0")}
    //           </div>
    //           <hr className="border-dark-grey border-[1px]" />
    //         </div>
    //         <div className="space-y-1">
    //           <Link
    //             href={`/articles/${article.slug}`}
    //             className="font-test  font-semibold leading-tight"
    //           >
    //             {article.title.substring(0, 200)}
    //           </Link>
    //           <div className="text-sm text-muted-foreground flex items-center space-x-2">
    //             <div>{article.createdAt.toDateString()}</div>
    //             <div>, Auther</div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="md:col-span-3 bg-[url('/noise-light.svg')] p-4 rounded-bl-xl font-test">
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="text-lg my-2 font-semibold flex items-center">
            <div className="text-lg my-2 font-semibold flex items-center">
              Popular Article Now
            </div>
            <div className="ml-2 text-xs font-semibold text-orange-500 border-[1px] rounded-full border-gray-400 px-2 py-0.5">
              5 New
            </div>
          </div>
          <hr className="border-dark-grey border mt-0" />
        </div>
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 flex-col font-sans"
          >
            <div className="flex flex-row h-full gap-6">
              <div className="text-2xl font-bold text-dark-grey">
                {String(index + 1).padStart(2, "0")}
              </div>
              {/* <hr className="border-dark-grey border-[1px]" /> */}
              <div className="space-y-1">
                <div className="font-medium leading-tight">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="font-anton text-base tracking-wide font-thin text-dark-grey"
                  >
                    {article.title.substring(0, 80) || "Untitled"}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center !mr-0 !ml-0 gap-4 mt-4">
              <hr className="border-dark-grey w-[30px] border-[1px]" />
              <div className="text-sm text-muted-foreground flex items-center space-x-2">
                <h1>{formatDate(article.createdAt)}</h1>
                <h1>, Author</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
