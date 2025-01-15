import { RiTimeZoneLine } from "react-icons/ri";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { GiWireframeGlobe } from "react-icons/gi";

export function Header() {
  return (
    <header className="px-4 h-24 flex items-center justify-between border-b border-dark-grey">
      {/* <div className="container mx-auto px-4 h-24 flex items-center justify-between border-b border-dark-grey"> */}
      {/* <SearchBar /> */}
      <div className="items-center space-x-4 flex pl-7 md:pl-0">
        <GiWireframeGlobe className="h-8 w-8 text-dark-grey" />
        <span className="font-semibold text-dark-grey md:block hidden">
          Paperio
        </span>
        <div className="hidden items-center flex-row gap-4 md:flex">
          {/* <span className="mr-2 w-6 h-6">🌍</span> */}
          <RiTimeZoneLine className="h-6 w-6 text-dark-grey" />
          <div className="flex flex-col justify-start">
            <span className="text-dark-grey font-semibold text-sm">
              {new Date().toDateString()}
            </span>
            <span className="text-xs text-muted-foreground text-dark-grey">
              {/* {new Date().toLocaleTimeString()} */}
              7:10:02 PM
            </span>
          </div>
        </div>
      </div>

      <div className="border-dark-grey border-[1px] h-full"></div>

      <Link
        href={"/"}
        className="text-3xl md:text-5xl font-ibarra leading-9 tracking-wide font-semibold text-dark-grey font-anton hover:text-grenadier"
      >
        the Dictator
      </Link>

      <div className="border-dark-grey border-[1px]  h-full"></div>

      <div className="flex md:gap-2 items-center space-x-4">
        {/* <Button
          variant="outline"
          className="hidden md:flex items-center bg-transparent text-lg border-dark-grey text-dark-grey hover:bg-grenadier hover:text-white"
        >
          <span className="mr-2">✎</span> Write News
        </Button> */}
        <SignedIn>
          {/* {sessionClaims?.publicMetadata?.role === "editor" ? (
            <Link
              href="/editor"
              className="text-white hover:text-white scroll-m-20 text-base font-semibold tracking-wide"
            >
              Editor
            </Link>
          ) : ( */}
          <div className="bg-black w-[92px] h-9 hidden md:flex text-white items-center justify-center hover:bg-dark-grey hover:text-white">
            <SignOutButton />
          </div>
          {/* )} */}
          {/* {sessionClaims?.publicMetadata?.role === "admin" ? (
            <Link
              href="/admin"
              className="text-white hover:text-white scroll-m-20 text-base font-semibold tracking-wide"
            >
              Admin
            </Link>
          ) : ( */}
          <div className="md:w-24 flex items-center">
            <UserButton />
          </div>
          {/* )} */}
        </SignedIn>
        <SignedOut>
          <button className=" bg-dark-grey w-[92px] h-9 text-white hover:bg-grenadier transition-all">
            <Link
              href="/sign-up"
              className=" scroll-m-20 text-base font-semibold tracking-wide"
            >
              Register
            </Link>
          </button>
          <button className="hidden md:block w-20 h-9 text-dark-grey hover:text-white hover:bg-grenadier transition-all">
            <Link
              href="/sign-in"
              className=" scroll-m-20 text-base font-semibold tracking-normal"
            >
              Sign In
            </Link>
          </button>
        </SignedOut>
      </div>
      {/* </div> */}
    </header>
  );
}
