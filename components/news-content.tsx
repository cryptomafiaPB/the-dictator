import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
// import { Article } from "@prisma/client";
import ArticleList from "./ArticleList";
import { IoMdStar } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Article } from "@/types";

dayjs.extend(relativeTime);

export function NewsContent({ latest }: { latest: Article[] }) {
  if (!latest || latest.length === 0) {
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

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  // const stripHtml = (html: string) => {
  //   const div = document.createElement("div");
  //   div.innerHTML = html;
  //   return div.textContent || div.innerText || "";
  // };

  // console.log(latest)
  return (
    <div className="space-y-8 font-test text-dark-grey">
      {/* Top News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] border-b-2 mt-4 border-t-[14px] bg-dark-grey border-dark-grey">
        {/* Left Column */}
        <div className="md:col-span-3 py-4  bg-[url('/noise-light.svg')]  p-4 rounded-tr-2xl">
          <article className="space-y-4">
            <div className="space-y-4">
              <Link
                href={`/articles/${latest[0].slug}`}
                className="text-xl font-anton"
              >
                {latest[0].title.substring(0, 200) || "Untitled"}
              </Link>
              <div className="flex items-center space-x-2 text-sm font-sans">
                <hr className="border-dark-grey border-[1px] w-[30px]" />
                <Link href="#" className="text-muted-foreground">
                  Art
                </Link>
                {/* <span>•</span> */}
                <IoMdStar className="fill-grenadier" />
                <h2 className="text-muted-foreground">Johan S</h2>
                {/* <span>•</span> */}
                <IoMdStar className="fill-grenadier " />
                <time className="text-muted-foreground ">
                  {formatDate(latest[0].createdAt)}
                </time>
              </div>
              <hr className="border-dark-grey border-[1px] !mt-8" />
            </div>
            <Image
              src={latest[0].image || "/placeholder.svg"}
              alt="Picasso painting"
              width={400}
              height={300}
              className="w-full rounded-lg"
            />
            {/* <div
              className=" text-sm sm:text-base font-test leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: latest[0].content.substring(0, 400),
              }}
            /> */}
            <p className="text-sm sm:text-base leading-relaxed">
              {stripHtml(latest[0].content.substring(0, 400))}
            </p>
          </article>
        </div>

        {/* Center Column */}
        <div className="md:col-span-6  bg-[url('/noise-light.svg')]  p-3 rounded-tl-2xl rounded-br-xl">
          <Card className=" bg-[url('/noise-light.svg')]  border-none shadow-none">
            <CardContent className="p-2 md:p-6">
              <div className="space-y-4">
                <div className="border border-dark-grey p-4 md:p-5 flex flex-col gap-4">
                  <Link
                    href={`/articles/${latest[1].slug}`}
                    className="text-3xl font-anton text-dark-grey"
                  >
                    {latest[1].title.substring(0, 200) || "Untitled"}
                  </Link>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm font-sans">
                      <hr className="border-dark-grey border-[1px] w-[30px]" />
                      <span className="text-muted-foreground">
                        Catastrophic
                      </span>
                      <IoMdStar className="fill-grenadier" />
                      <span className="text-muted-foreground">
                        Miles Sandy E
                      </span>
                      <IoMdStar className="fill-grenadier hidden md:block" />
                      <time className="text-muted-foreground hidden md:block">
                        {formatDate(latest[1].createdAt)}
                      </time>
                    </div>
                    {/* <Share className="w-4 h-4 text-muted-foreground" /> */}
                    <PiShareFatLight className="w-6 h-6  text-muted-foreground" />
                  </div>
                </div>
                {/* <hr className="border-dark-grey border-[1px] !mt-8" /> */}
                <Image
                  src={latest[1].image || "/placeholder.png"}
                  alt="Volcanic eruption"
                  width={200}
                  height={200}
                  className="w-full max-h-80 object-cover rounded-lg"
                />
                {/* <div
                  className=" leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: clientContent || "",
                  }}
                /> */}
                <p className="leading-relaxed">
                  {stripHtml(latest[1].content.substring(0, 700))}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <ArticleList articles={latest.slice(3, 8)} />
      </div>

      {/* Bottom News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] !mt-0 bg-dark-grey border-dark-grey border-b-[10px] ">
        {/* Conservation Article */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3  bg-[url('/noise-light.svg')]  p-4 rounded-tr-xl py-4">
            <div>
              <Link
                href={`/articles/${latest[8].slug}`}
                className="text-2xl font-anton "
              >
                {latest[8].title.substring(0, 200) || "Untitled"}
              </Link>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 text-sm sm:text-base">
                  <hr className="border-dark-grey border-[1px] w-[30px] font-sans" />
                  <Link href="#" className="text-muted-foreground">
                    Art
                  </Link>
                  <IoMdStar className="fill-grenadier" />
                  <h2 className="text-muted-foreground">Krilivenko Patley</h2>
                  <IoMdStar className="fill-grenadier hidden md:block" />
                  <time className="text-muted-foreground">
                    {formatDate(latest[8].createdAt)}
                  </time>
                </div>
                {/* <Share className="w-4 h-4 text-muted-foreground" /> */}
                <PiShareFatLight className="w-6 h-6 text-muted-foreground" />
              </div>
              <hr className="border-dark-grey border-[1px] !mt-8" />
            </div>
            <div className="grid md:grid-cols-2 gap-4 p-2">
              {/* <div
                className=" text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: latest[8].content.substring(0, 400),
                }}
              /> */}
              <p className="text-sm sm:text-base leading-relaxed">
                {stripHtml(latest[8].content.substring(0, 400))}
              </p>

              <Image
                src="/placeholder.svg"
                alt="Black fox illustration"
                width={300}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* <div
              className=" text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: latest[8].content.substring(0, 400),
              }}
            /> */}
            <p className="text-sm sm:text-base leading-relaxed">
              {stripHtml(latest[8].content.substring(0, 400))}
            </p>
          </div>
          <Card className=" bg-[url('/noise-light.svg')]  border-none shadow-none !mt-[1px] !mb-0 pt-4 rounded-none rounded-bl-xl rounded-br-xl">
            <CardContent className="p-6">
              <div className="flex gap-6 flex-col md:flex-row ">
                <Image
                  src={latest[9].image || "/placeholder.svg"}
                  alt="Composer job listing"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover mx-auto"
                />
                <div className="space-y-4">
                  <h3 className="text-xl font-anton text-dark-grey">
                    {latest[9].title.substring(0, 200) || "Untitled"}
                  </h3>
                  <Link
                    href={`/articles/${latest[9].slug}`}
                    className="text-sm sm:text-base leading-relaxed"
                  >
                    {/* <div
                    className="space-y-2 text-sm sm:text-base  leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: latest[9].content.substring(0, 400),
                    }}
                  /> */}
                    {stripHtml(latest[9].content.substring(0, 400))}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Archaeology Article */}
        <Card className="bg-[url('/noise-light.svg')] border-none shadow-none">
          <CardContent className="p-6 space-y-4">
            <div className="border border-dark-grey p-4 md:p-5 flex flex-col gap-4">
              <Link
                href={`/articles/${latest[9].slug}`}
                className="text-3xl font-anton text-dark-grey"
              >
                {latest[9].title.substring(0, 200)}
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm font-sans">
                  <hr className="border-dark-grey border-[1px] w-[30px]" />
                  <span className="text-primary">Historical</span>
                  <IoMdStar className="fill-grenadier" />
                  <span className="text-muted-foreground">Naheb Abimanyu</span>
                  <IoMdStar className="fill-grenadier hidden  md:block" />
                  <time className="text-muted-foreground hidden md:block">
                    {formatDate(latest[9].createdAt)}
                  </time>
                </div>
                {/* <Share className="w-4 h-4 text-muted-foreground" /> */}
                <PiShareFatLight className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
            <Image
              src={latest[9].image || "/placeholder.svg"}
              alt="Ancient Egyptian tomb"
              width={200}
              height={200}
              className="w-full max-h-80  object-cover rounded-lg"
            />
            <div className="space-y-4 text-sm sm:text-base  font-test leading-relaxed ">
              <p className="text-sm sm:text-base leading-relaxed">
                {stripHtml(latest[9].content.substring(0, 400))}
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                {stripHtml(latest[9].content.substring(400, 700))}
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                {stripHtml(latest[9].content.substring(700, 1000))}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles */}
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4  bg-[url('/noise-light.svg')]"
        // style={{
        //   backgroundImage:
        //     "url('https://33fa1ur95-7yg2u6dr5-koyeb.vercel.app/images/globe.svg'), url(/noise-dark.svg)",
        //   backgroundPosition: "50% 0",
        //   backgroundRepeat: "no-repeat, repeat",
        // }}
      >
        <div className="flex flex-col gap-4 border-t-2 border-black  p-4">
          <Link
            href={"/category/sports"}
            className="hover:underline text-lg font-semibold "
          >
            Sports
          </Link>
          <div className="grid items-start gap-4">
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[0].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2  text-sm">
                <p>{dayjs(latest[0].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[1].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[1].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[2].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2  text-sm">
                <p>{dayjs(latest[2].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <Image
                src={latest[0].image || "/placeholder.svg"}
                alt="Picasso painting"
                width={200}
                height={200}
                className="w-full max-h-80 object-cover rounded-lg"
              />
              <h2 className="font-serif text-lg">
                {latest[2].title.substring(0, 60) + "..." || "Untitled"}
              </h2>
              <div className="font-mono text-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: latest[3].content.substring(0, 90) + "...",
                  }}
                />
              </div>
              <div className="flex h-[32px] items-center gap-2  text-sm">
                <p>{dayjs(latest[2].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t-2  p-4">
          <Link
            className="hover:underline text-lg font-semibold "
            href={"/category/geopolitics"}
          >
            Geopolitics
          </Link>
          <div className="grid items-start gap-4">
            <div className="grid min-h-14 gap-2  border-b border-gray-400">
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <Image
                src={latest[0].image || "/placeholder.svg"}
                alt="Picasso painting"
                width={200}
                height={200}
                className="w-full max-h-80 object-cover rounded-lg"
              />
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="font-mono text-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: latest[3].content.substring(0, 90) + "...",
                  }}
                />
              </div>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t-2 border-black  p-4">
          <Link
            href={"/category/sports"}
            className="hover:underline text-lg font-semibold "
          >
            Sports
          </Link>
          <div className="grid items-start gap-4">
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[0].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2  text-sm">
                <p>{dayjs(latest[0].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[1].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[1].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[2].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2  text-sm">
                <p>{dayjs(latest[2].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <Image
                src={latest[0].image || "/placeholder.svg"}
                alt="Picasso painting"
                width={200}
                height={200}
                className="w-full max-h-80 object-cover rounded-lg"
              />
              <h2 className="font-serif text-lg">
                {latest[2].title.substring(0, 60) + "..." || "Untitled"}
              </h2>
              <div className="font-mono text-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: latest[3].content.substring(0, 90) + "...",
                  }}
                />
              </div>
              <div className="flex h-[32px] items-center gap-2  text-sm">
                <p>{dayjs(latest[2].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Sports</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t-2  p-4">
          <Link
            className="hover:underline text-lg font-semibold "
            href={"/category/geopolitics"}
          >
            Geopolitics
          </Link>
          <div className="grid items-start gap-4">
            <div className="grid min-h-14 gap-2  border-b border-gray-400">
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
            <div className="grid min-h-14 gap-2 border-b border-gray-400 ">
              <Image
                src={latest[0].image || "/placeholder.svg"}
                alt="Picasso painting"
                width={200}
                height={200}
                className="w-full max-h-80 object-cover rounded-lg"
              />
              <h2 className="font-serif text-lg">
                {latest[3].title.substring(0, 50) + "..." || "Untitled"}
              </h2>
              <div className="font-mono text-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: latest[3].content.substring(0, 90) + "...",
                  }}
                />
              </div>
              <div className="flex h-[32px] items-center gap-2 text-sm">
                <p>{dayjs(latest[3].createdAt).fromNow()}</p>
                <div className="border-l h-2/3 border-solid border-[#00000080]"></div>
                <p>Geopolitics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
