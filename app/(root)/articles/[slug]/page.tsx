/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import CommentForm from "@/components/CommentForm";
import Like from "@/components/Like";
import DisLike from "@/components/DisLike";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

// SEO

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The article you are looking for does not exist.",
    };
  }

  return {
    title: article.title,
    description: article.content.substring(0, 160), // Use the first 160 characters as the meta description
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      images: article.image ? [article.image] : [],
      type: "article",
      publishedTime: article.createdAt.toISOString(),
      authors: [article.authorId], // Replace with the author's name if available
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.content.substring(0, 160),
      images: article.image ? [article.image] : [],
    },
    alternates: {
      canonical: `https://thedictatoe.vercel.app/articles/${article.slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await currentUser();

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      categories: true,
      tags: true,
      comments: { include: { user: true } },
    },
  });

  const author = await prisma.user.findUnique({
    where: { id: article?.authorId },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  // Increment the view count
  await prisma.article.update({
    where: { id: article.id },
    data: { views: article.views + 1 },
  });
  const handleReaction = async (type: "like" | "dislike") => {
    "use server";
    await fetch(`http://127.0.0.1:3000/api/articles/${article.id}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    // Refresh the page to update the reaction counts
  };

  return (
    <article className="max-w-content mx-auto grid grid-cols-4 items-start gap-x-4 px-3 md:px-4 py-20 md:grid-cols-8 2xl:grid-cols-12">
      <div className="col-span-full lg:hidden">
        <Link
          className="flex items-center gap-1 font-mono text-xs uppercase leading-none hover:underline"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="size-3"
            viewBox="0 0 24 24"
          >
            <path d="m12 19-7-7 7-7M19 12H5"></path>
          </svg>
          All articles
        </Link>
      </div>
      <aside className="flex flex-col col-span-full my-6 max-h-[calc(100vh-4rem)] gap-2 lg:sticky lg:top-8 lg:col-span-2 lg:my-0 lg:gap-8 2xl:col-span-3">
        <div className="flex flex-col gap-8">
          {/* <div className="flex h-12 items-center justify-center rounded-lg border border-solid border-[#18161833] sm:h-48"> */}
          <div className="flex flex-col gap-3 lg:order-1">
            <span className="text-sm font-mono uppercase">
              Categories:{" "}
              {article.categories.map((c: any) => c.name).join(", ")}
            </span>
            <span className="text-sm font-mono uppercase">
              Tags: {article.tags.map((t: any) => t.name).join(", ")}
            </span>
          </div>
          <div className="flex flex-col gap-3 lg:order-3">
            <span className="text-sm font-mono uppercase">
              Published on:{" "}
              {format(new Date(article.createdAt), "MMM dd, yyyy")}
            </span>
            <span className="text-sm font-mono uppercase">
              Last updated on:{" "}
              {format(new Date(article.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
      </aside>
      <div className="flex flex-col col-span-full gap-12 rounded-2xl border border-solid border-[#18161833] bg-white p-6 md:p-8 lg:col-span-4 lg:col-start-3 2xl:col-span-6 2xl:col-start-4">
        <header className="flex flex-col gap-6">
          <a
            className="lg:flex hover:underline hidden items-center gap-1 font-mono text-xs uppercase leading-none"
            href="/blog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="size-3"
              viewBox="0 0 24 24"
            >
              <path d="m12 19-7-7 7-7M19 12H5"></path>
            </svg>
            All articles
          </a>
          <div className="text-[#18161880] text-sm flex  w-fit justify-between gap-5 font-mono font-bold uppercase">
            <div>{format(new Date(article.createdAt), "MMM dd, yyyy")}</div>
            <div className="border-l border-solid border-[#948f9480]"></div>
            <div>{Math.ceil(article.views / 1000)} min read</div>
          </div>
          <h1 className=" md:typo-heading-lg font-anton text-3xl md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <Image
            src={article.image || "/placeholder.png"}
            alt="article image"
            className="rounded-lg mx-auto"
            width={600}
            height={400}
          />
        </header>
        <div className="prose max-w-full">
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="font-[Arial] leading-9 font-normal text-[#374151] text-base md:text-base flex flex-col items-center gap-3 md:gap-5"
          />
        </div>
        <div>
          <hr className="border-gray-200" />
          <div className="lg:order-6 mt-4 space-x-2 flex flex-row lg:hidden">
            {user ? (
              <div className="flex items-center gap-2">
                <Like onEvent={handleReaction} count={article.likes} />
                <DisLike onEvent={handleReaction} count={article.dislikes} />
              </div>
            ) : null}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            {user ? (
              <CommentForm articleId={article.id} />
            ) : (
              <p>
                Please
                <Link
                  href="/sign-in"
                  className="text-primary px-2 hover:underline"
                >
                  sign in
                </Link>
                to leave a comment.
              </p>
            )}
            <div className="mt-4 space-y-4">
              {article.comments.map((comment: any) => (
                <div
                  key={comment.id}
                  className="border p-2 md:p-4 rounded flex gap-3"
                >
                  <div className="pt-1">
                    <Image
                      alt={comment.userId}
                      loading="lazy"
                      width="40"
                      height="40"
                      decoding="async"
                      data-nimg="1"
                      className="border-solid border-[#18161833] size-10 rounded-full border cursor-pointer"
                      style={{ color: "transparent" }}
                      src="https://www.koyeb.com/_next/image?url=%2Fstatic%2Fimages%2Fteam%2Fabroshar.jpg&w=48&q=75"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-mono uppercase text-gray-600">
                      {comment.user.name}
                    </div>
                    <p className="text-base font-[Arial] leading-9 font-normal text-[#374151] md:text-base">
                      {comment.content}
                    </p>
                    <p className="text-sm font-mono text-gray-600">
                      {comment.createdAt.toLocaleString()}
                    </p>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Image
                      alt={comment.userId}
                      loading="lazy"
                      width="40"
                      height="40"
                      decoding="async"
                      data-nimg="1"
                      className="border-solid border-[#18161833] size-10 rounded-full border"
                      style={{ color: "transparent" }}
                      src="https://www.koyeb.com/_next/image?url=%2Fstatic%2Fimages%2Fteam%2Fabroshar.jpg&w=48&q=75"
                    />
                    <div className="text-base font-mono uppercase">
                      {comment.user.name}
                    </div>
                    <p className="text-base font-[Arial] leading-9 font-normal text-[#374151] md:text-base">
                      {comment.content}
                    </p>
                    <p className="text-sm text-gray-600">
                      By {comment.user.name} on{" "}
                      {comment.createdAt.toLocaleString()}
                    </p>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full my-16 lg:hidden">
        <hr className="border-gray-300" />
      </div>
      <aside
        style={{ scrollbarWidth: "thin" }}
        className="  flex flex-col sticky top-8 col-span-full max-h-[calc(100vh-4rem)] gap-8 overflow-y-auto lg:col-span-2 lg:col-start-7 2xl:col-span-3 2xl:col-start-10"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 lg:order-1">
            <div className="text-base font-mono uppercase">/Author</div>
            <div className="row lg:flex flex-col flex-wrap gap-4">
              <div className="row items-center flex">
                <Image
                  alt={article.authorId}
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  data-nimg="1"
                  className="border-solid border-[#18161833] size-10 rounded-full border"
                  style={{ color: "transparent" }}
                  src="https://www.koyeb.com/_next/image?url=%2Fstatic%2Fimages%2Fteam%2Fabroshar.jpg&w=48&q=75"
                />
                <div className="ml-2">{author?.name}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:order-3">
            <div className="typo-body-xs font-mono uppercase">/Share</div>
            <ul className="row items-center gap-4 flex scroll-m-20">
              <li>
                <button
                  type="button"
                  className=" flex-col bg-light-blur size-10 items-center justify-center rounded-lg border border-solid border-[#18161833] lg:order-4 flex"
                >
                  <div className="sr-only">Share on Twitter</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      d="M16.861 4h2.699l-5.896 6.777L20.6 20h-5.431l-4.254-5.593L6.048 20h-2.7l6.306-7.25L3 4h5.569l3.845 5.113L16.86 4Zm-.947 14.375h1.495L7.756 5.54H6.152l9.762 12.836Z"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className=" flex-col bg-light-blur size-10 items-center justify-center rounded-lg border border-solid border-[#18161833] lg:order-4 flex"
                >
                  <div className="sr-only">Share on Facebook</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      d="M9.956 21v-8.21H7v-3.2h2.956V7.23c0-2.739 1.79-4.23 4.403-4.23 1.252 0 2.327.087 2.641.126v2.862h-1.813c-1.42 0-1.696.632-1.696 1.559V9.59h3.39l-.442 3.2h-2.948V21H9.956Z"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className=" flex-col bg-light-blur size-10 items-center justify-center rounded-lg border border-solid border-[#18161833] lg:order-4 flex"
                >
                  <div className="sr-only">Share on LinkedIn</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="14"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M4.039 4.649H.818V14h3.22V4.649Zm.255-2.964C4.294.755 3.458 0 2.43 0 1.396 0 .563.755.563 1.685s.833 1.686 1.866 1.686c1.03 0 1.865-.755 1.865-1.686Zm4.112 2.811H5.538V14h2.989V9.3c0-1.24.237-2.442 1.794-2.442 1.535 0 1.555 1.418 1.555 2.52V14h2.991V8.788c0-2.56-.56-4.527-3.589-4.527-1.456 0-2.432.787-2.83 1.535h-.042v-1.3Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className=" flex-col bg-light-blur size-10 items-center justify-center rounded-lg border border-solid border-[#18161833] lg:order-4 flex"
                >
                  <div className="sr-only">Copy link</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="18"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M2.164 1.786a4.93 4.93 0 0 1 7.15 0l2.562 2.66c1.953 2.03 1.953 5.304 0 7.332l-.01.012c-.414.43-.885.772-1.39 1.022a.875.875 0 0 1-.777-1.568 3.22 3.22 0 0 0 .903-.666l.013-.013c1.3-1.351 1.3-3.554 0-4.905L8.053 3a3.18 3.18 0 0 0-4.628 0l-.012.011c-1.3 1.351-1.3 3.554 0 4.905l1.096 1.139a.875.875 0 0 1-1.26 1.213L2.152 9.13C.2 7.101.2 3.826 2.152 1.798m0 0 .012-.012-.012.012ZM9.57 5.582a.875.875 0 0 1-.395 1.173 3.25 3.25 0 0 0-.903.666l-.001.001-.012.012c-1.3 1.351-1.3 3.554 0 4.905L10.821 15a3.18 3.18 0 0 0 4.629 0l.011-.012c1.3-1.351 1.3-3.553 0-4.904l-1.096-1.14a.875.875 0 1 1 1.26-1.213l1.097 1.139c1.953 2.029 1.953 5.303 0 7.332l-.012.012a4.93 4.93 0 0 1-7.15 0l-2.562-2.662c-1.953-2.028-1.953-5.303 0-7.331l.011-.011c.413-.43.884-.773 1.389-1.023a.875.875 0 0 1 1.172.395Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </article>

    // <div className="md:w-[44rem] lg:[48rem] mx-auto border border-gray-200 text-dark-grey rounded-lg p-4 md:p-8 space-y-4">
    //   <h1 className="text-4xl mb-20 mt-10 font-bold font  font-nyt">
    //     {article.title}
    //   </h1>
    //   <div className="font-[Cambria] leading- leading-9 font-medium text-lg md:text-xl">
    //     <div className="mt-4 mb-14">
    //       <Image
    //         src={article.image || "/placeholder.png"}
    //         alt="article image"
    //         className="rounded-lg"
    //         width={600}
    //         height={400}
    //       />
    //     </div>
    //     <div
    //       dangerouslySetInnerHTML={{ __html: article.content }}
    //       className="font-[Cambria] leading-9 font-medium text-lg md:text-xl flex flex-flex flex-col items-center gap-3 md:gap-5"
    //     />
    //   </div>
    //   <div className="mt-4">
    //     <span className="text-sm text-gray-600">
    //       Categories: {article.categories.map((c) => c.name).join(", ")}
    //     </span>
    //     <span className="text-sm text-gray-600 ml-4">
    //       Tags: {article.tags.map((t) => t.name).join(", ")}
    //     </span>
    //     <span className="text-sm text-gray-600 ml-4">
    //       Views: {article.views}
    //     </span>
    //   </div>
    //   <div className="mt-4 space-x-2 flex flex-row">
    //     {user ? (
    //       <>
    //         <Like onEvent={handleReaction} count={article.likes} />
    //         <DisLike onEvent={handleReaction} count={article.dislikes} />
    //       </>
    //     ) : null}
    //   </div>
    //   <div className="mt-8">
    //     <h2 className="text-xl font-bold mb-4">Comments</h2>
    //     {user ? (
    //       <CommentForm articleId={article.id} />
    //     ) : (
    //       <p>
    //         Please
    //         <Link href="/sign-in" className="text-primary hover:underline">
    //           sign in
    //         </Link>
    //         to leave a comment.
    //       </p>
    //     )}
    //     <div className="mt-4 space-y-4">
    //       {article.comments.map((comment) => (
    //         <div key={comment.id} className="border p-4 rounded">
    //           <p>{comment.content}</p>
    //           <p className="text-sm text-gray-600">
    //             By {comment.user.name} on {comment.createdAt.toLocaleString()}
    //           </p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}
